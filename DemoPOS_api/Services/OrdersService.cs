using AutoMapper;
using DemoPOS.Data;
using DemoPOS.DTOs;
using DemoPOS.Exceptions;
using DemoPOS.Helpers;
using DemoPOS.Models;
using DemoPOS.Services.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DemoPOS.Services
{
    public class OrdersService : ServiceBase, IOrdersService
    {
        private readonly AppDBContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILoginDetailServices _login;
        private readonly HttpContext _httpContext;

        public OrdersService(
            AppDBContext dbContext,
            IMapper mapper,
            IHttpContextAccessor httpContext,
            ILoginDetailServices login) : base(dbContext, mapper, httpContext, login)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _login = login;
            _httpContext = httpContext.HttpContext;
        }

        // Service Name
        private const string _serviceName = nameof(OrdersService);

        // List of filterable columns
        private List<string> _filterableOrderColumns
            = new List<string>() { "OrderId", "OrderName", "IsActive" };
        private List<string> _filterableOrderDetailColumns
            = new List<string>() { "OrderDetailId", "OrderId", "IsActive" };

        // List of sortable columns
        private List<string> _sortableOrderColumns
            = new List<string>() { "CreatedDate", "UpdatedDate" };
        private List<string> _sortableOrderDetailColumns
            = new List<string>() { "CreatedDate", "UpdatedDate" };

        /// <summary>
        /// Get all orders
        /// </summary>
        /// <param name="pagination"></param>
        /// <param name="filter"></param>
        /// <param name="sort"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<List<OrderResponseDto>>> GetOrders(PaginationDto pagination, QueryFilterDto filter, QuerySortDto sort)
        {
            Log.Debug("{ServiceName} Start GetOrders [Pagination={@Pagination},Filter={@filter},Sort={@sort}]", _serviceName, pagination, filter, sort);
            var ordersQuery = _dbContext.Orders.AsQueryable();

            // Filter
            ordersQuery = FilterOrder(ordersQuery, filter);

            // Check pagination
            var ordersPaginationResult = await _httpContext.InsertPaginationParametersInResponse(ordersQuery, pagination.RecordsPerPage, pagination.Page);

            // Sort
            ordersQuery = SortOrder(ordersQuery, sort);

            // Add pagination
            var orders = await ordersQuery.Paginate(pagination).ToListAsync();

            // Map data to dto
            var ordersDto = _mapper.Map<List<OrderResponseDto>>(orders);

            Log.Information("{ServiceName} GetOrders Successful", _serviceName);
            return ResponseResult.Success(ordersDto, ordersPaginationResult);
        }

        /// <summary>
        /// Filter orders
        /// </summary>
        /// <param name="query">Order's IQueryable</param>
        /// <param name="filter">Filter query string</param>
        /// <returns>Order's IQueryable</returns>
        private IQueryable<Order> FilterOrder(IQueryable<Order> query, QueryFilterDto filter)
        {
            Log.Debug("{ServiceName} FilterOrder Start [Filter={@Filter}]", _serviceName, filter);

            if (filter.FilterColumn == null || filter.Value == null)
            {
                Log.Debug("{ServiceName} FilterOrder - Filter has no column or value.", _serviceName);
                return query;
            }

            if (!_filterableOrderColumns.Contains(filter.FilterColumn))
            {
                Log.Debug("{ServiceName} FilterOrder - Invalid column. [Column={Column}]", _serviceName, filter.FilterColumn);
                return query;
            }

            try
            {
                switch (filter.FilterColumn)
                {
                    case "OrderId":
                        query = query.Where(o => o.OrderId == Guid.Parse(filter.Value));
                        break;

                    case "OrderName":
                        query = query.Where(o => o.OrderName.Contains(filter.Value));
                        break;

                    case "IsActive":

                        query = query.Where(o => o.IsActive == bool.Parse(filter.Value));
                        break;

                    default:
                        Log.Warning("{ServiceName} FilterOrder - Invalid column. [Column={Column}]", _serviceName, filter.FilterColumn);
                        break;
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "{ServiceName} FilterOrder - Error. [Filter={@Filter},Error={Error}]", _serviceName, filter, ex.Message);
            }

            Log.Debug("{ServiceName} FilterOrder Successful.", _serviceName);
            return query;
        }

        /// <summary>
        /// Sort orders
        /// </summary>
        /// <param name="query">Order's IQueryable</param>
        /// <param name="sort">Sort query string</param>
        /// <returns>Order's IQueryable</returns>
        private IQueryable<Order> SortOrder(IQueryable<Order> query, QuerySortDto sort)
        {
            Log.Debug("{ServiceName} SortOrder Start [Sort={@Sort}]", _serviceName, sort);

            if (string.IsNullOrWhiteSpace(sort.OrderingField))
            {
                Log.Debug("{ServiceName} SortOrder - Sort has no column or order.", _serviceName);

                // If no sort order is specified, return the items in descending order by default.
                sort.OrderingField = "CreatedDate";
                sort.AscendingOrder = false;
            }

            if (!_sortableOrderColumns.Contains(sort.OrderingField))
            {
                Log.Debug("{ServiceName} SortOrder - Invalid column. [Column={Column}]", _serviceName, sort.OrderingField);
                return query;
            }

            switch (sort.OrderingField)
            {
                case "CreatedDate":
                    query = sort.AscendingOrder
                        ? query.OrderBy(o => o.CreatedDate)
                        : query.OrderByDescending(o => o.CreatedDate);
                    break;

                case "UpdatedDate":
                    query = sort.AscendingOrder
                        ? query.OrderBy(o => o.UpdatedDate)
                        : query.OrderByDescending(o => o.UpdatedDate);
                    break;

                default:
                    Log.Warning("{ServiceName} SortOrder - Invalid column. [Column={Column}]", _serviceName, sort.OrderingField);
                    break;
            }

            Log.Debug("{ServiceName} SortOrder Successful.", _serviceName);
            return query;
        }

        /// <summary>
        /// Filter order detail
        /// </summary>
        /// <param name="query">OrderDetail's IQueryable</param>
        /// <param name="filter">Filter query string</param>
        /// <returns>OrderDetail's IQueryable</returns>
        private IQueryable<OrderDetail> FilterOrderDetail(IQueryable<OrderDetail> query, QueryFilterDto filter)
        {
            Log.Debug("{ServiceName} FilterOrderDetail Start [Filter={@Filter}]", _serviceName, filter);

            if (string.IsNullOrWhiteSpace(filter.FilterColumn))
            {
                Log.Debug("{ServiceName} FilterOrderDetail - Filter has no column or value. [Filter={@Filter}]", _serviceName, filter);
                return query;
            }

            if (!_filterableOrderDetailColumns.Contains(filter.FilterColumn))
            {
                Log.Debug("{ServiceName} FilterOrderDetail - Invalid column. [Column={Column}]", _serviceName, filter.FilterColumn);
                return query;
            }

            try
            {
                switch (filter.FilterColumn)
                {
                    case "OrderDetailId":
                        query = query.Where(o => o.OrderDetailId == Guid.Parse(filter.Value));
                        break;

                    case "OrderId":
                        query = query.Where(o => o.OrderId == Guid.Parse(filter.Value));
                        break;

                    case "IsActive":
                        query = query.Where(o => o.IsActive == bool.Parse(filter.Value));
                        break;

                    default:
                        Log.Warning("{ServiceName} FilterOrderDetail - Invalid column. [Column={Column}]", _serviceName, filter.FilterColumn);
                        break;
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "{ServiceName} FilterOrderDetail - Error. [Type={Entity},Column={Column},Error={Error}]", _serviceName, nameof(OrderDetail), filter.FilterColumn, ex.Message);
            }

            Log.Debug("{ServiceName} FilterOrderDetail Successful", _serviceName);
            return query;
        }

        /// <summary>
        /// Sort order detail
        /// </summary>
        /// <param name="query">OrderDetail's IQueryable</param>
        /// <param name="sort">Sort query string</param>
        /// <returns>OrderDetail's IQueryable</returns>
        private IQueryable<OrderDetail> SortOrderDetail(IQueryable<OrderDetail> query, QuerySortDto sort)
        {
            Log.Debug("{ServiceName} SortOrderDetail Start [Sort={@Sort}]", _serviceName, sort);

            if (string.IsNullOrWhiteSpace(sort.OrderingField))
            {
                Log.Debug("{ServiceName} SortOrderDetail - Sort has no column or order.", _serviceName);

                // If no sort order is specified, return the items in descending order by default.
                sort.OrderingField = "CreatedDate";
                sort.AscendingOrder = false;
            }

            if (!_sortableOrderDetailColumns.Contains(sort.OrderingField))
            {
                Log.Debug("{ServiceName} SortOrderDetail - Invalid column. [Column={Column}]", _serviceName, sort.OrderingField);
                return query;
            }

            switch (sort.OrderingField)
            {
                case "CreatedDate":
                    query = sort.AscendingOrder
                        ? query.OrderBy(o => o.CreatedDate)
                        : query.OrderByDescending(o => o.CreatedDate);
                    break;

                case "UpdatedDate":
                    query = sort.AscendingOrder
                        ? query.OrderBy(o => o.UpdatedDate)
                        : query.OrderByDescending(o => o.UpdatedDate);
                    break;

                default:
                    Log.Warning("{ServiceName} SortOrderDetail - Invalid column. [Column={Column}]", _serviceName, sort.OrderingField);
                    break;

            }

            Log.Debug("{ServiceName} SortOrderDetail Successful.", _serviceName);
            return query;
        }

        /// <summary>
        /// Get order by id
        /// </summary>
        /// <param name="id">Order's id</param>
        /// <returns>Order</returns>
        public async Task<ServiceResponse<OrderWithDetailResponseDto>> GetOrder(Guid id)
        {
            Log.Debug("{ServiceName} Start GetOrder [OrderId={OrderId}]", _serviceName, id);

            // Get the order.
            var order = await _dbContext.Orders
                .Where(_ => _.OrderId == id)
                .Include(_ => _.OrderDetails)
                .ThenInclude(_=>_.Product)
                .FirstOrDefaultAsync();

            if (order == null)
            {
                Log.Debug("{ServiceName} Could not found OrderId [OrderId={OrderId}]", _serviceName, id);
                return ResponseResult.Failure<OrderWithDetailResponseDto>("Order not found");
            }

            // Map the order to dto.
            var orderDto = _mapper.Map<OrderWithDetailResponseDto>(order);

            Log.Information("{ServiceName} GetOrder Successful", _serviceName);
            return ResponseResult.Success(orderDto);
        }

        public async Task<FileStream> GetOrdersReport(DateTime? startDate, DateTime? endDate)
        {
            Log.Debug("{ServiceName} Start GetOrdersReport [StartDate={StartDate},EndDate={EndDate}]", _serviceName, startDate, endDate);

            if (startDate is null || endDate is null)
            {
                Log.Debug("{ServiceName} Start GetOrdersReport StartDate or EndDate is null", _serviceName, startDate, endDate);

                return null;
            }


            // Get Orders
            var ordersQuery = _dbContext.Orders.Where(_ => _.CreatedDate >= startDate && _.CreatedDate <= endDate).OrderBy(_=>_.CreatedDate).AsQueryable();

            var totalOrders = await ordersQuery.CountAsync();

            if(totalOrders == 0)
            {
                return null;
            }

            var maxRows = 5;
            var totalSheet = (int) Math.Ceiling( (decimal) (totalOrders / maxRows));

            var worksheetName = $"Orders_{startDate:yyyyMMdd}_{endDate:yyyyMMdd}";

            var excelWorksheet = new ExcelGeneratorsService<OrderResponseDto>($"C:\\{worksheetName}");

            for (int i = 0; i < totalSheet; i++)
            {
                var orders = await ordersQuery.Skip(i * maxRows).Take(maxRows).ToListAsync();
                var ordersDto = _mapper.Map<List<OrderResponseDto>>(orders);

                excelWorksheet.AddSheet($"worksheetName-{(i+1)}", ordersDto);
            }

            return excelWorksheet.GetFile();

        }

        /// <summary>
        /// Get order deatils by order id
        /// </summary>
        /// <param name="orderId">Order's id</param>
        /// <returns>Order details</returns>
        public async Task<ServiceResponse<List<OrderDetailResponseDto>>> GerOrderDetailsByOrderId(Guid orderId)
        {
            Log.Debug("{ServiceName} Start GerOrderDetails [OrderId={@OrderId}]", _serviceName, orderId);

            var allOrderDetails = await _dbContext.OrderDetails.Include(_ => _.Product).Where(_ => _.OrderId == orderId).ToListAsync();

            var allOrderDetailsDto = _mapper.Map<List<OrderDetailResponseDto>>(allOrderDetails);

            Log.Information("{ServiceName} GerOrderDetails Successful", _serviceName);
            return ResponseResult.Success(allOrderDetailsDto);
        }

        // Create order
        public async Task<ServiceResponse<OrderWithDetailResponseDto>> CreateOrder(OrderRequestDto orderDto)
        {
            Log.Debug("{ServiceName} Start CreateOrder [Order={@Order}]", _serviceName, orderDto);

            // Map the order dto to order.
            var order = _mapper.Map<Order>(orderDto);

            var user = _login.GetClaim();

            Log.Verbose("{ServiceName} CreateOrder [User={@User}]", _serviceName, user);

            order.OrderId = Guid.NewGuid();
            order.CreatedDate = DateTime.Now;
            order.CreatedByUserId = user.UserId;
            order.UpdatedDate = DateTime.Now;
            order.UpdatedByUserId = user.UserId;
            order.IsActive = true;

            // declare total price
            int amount = 0;
            decimal total = 0;

            // check product id is valid
            foreach (var orderDetail in order.OrderDetails)
            {
                var product = await _dbContext.Products.FindAsync(orderDetail.ProductId);
                if (product == null)
                {
                    Log.Debug("{ServiceName} Could not found ProductId [ProductId={ProductId}]", _serviceName, orderDetail.ProductId);
                    return ResponseResult.Failure<OrderWithDetailResponseDto>("Product not found");
                }

                orderDetail.Product = product;
                orderDetail.OrderDetailId = Guid.NewGuid();
                orderDetail.OrderId = order.OrderId;
                orderDetail.CreatedByUserId = user.UserId;
                orderDetail.CreatedDate = DateTime.Now;
                orderDetail.UpdatedByUserId = user.UserId;
                orderDetail.UpdatedDate = DateTime.Now;
                orderDetail.IsActive = true;

                Log.Verbose("{ServiceName} CreateOrder - [OrderId={OrderId},OrderDetail={@OrderDetail}]", _serviceName, order.OrderId, orderDetail);

                orderDetail.Price = product.Price;
                orderDetail.Amount = orderDetail.Price * orderDetail.Quantity;

                amount += orderDetail.Quantity ?? 0;
                total += orderDetail.Amount ?? 0;
            }

            decimal subtotal = total - (order.Discount ?? 0);

            order.Amount = amount;
            order.Total = total;
            order.Subtotal = subtotal;

            // Add the order to db.
            _dbContext.Orders.Add(order);

            // Save the changes.
            await _dbContext.SaveChangesAsync();

            // Map the order to dto.
            var orderDtoResponse = _mapper.Map<OrderWithDetailResponseDto>(order);

            Log.Information("{ServiceName} CreateOrder Successful", _serviceName);
            return ResponseResult.Success(orderDtoResponse);
        }

        // Delete order
        public async Task<ServiceResponse<OrderResponseDto>> DeleteOrder(Guid id)
        {
            Log.Debug("{ServiceName} Start DeleteOrder [OrderId={OrderId}]", _serviceName, id);

            // Get the order.
            var order = await _dbContext.Orders.FindAsync(id);

            if (order == null)
            {
                Log.Debug("{ServiceName} Could not found OrderId [OrderId={OrderId}]", _serviceName, id);
                return ResponseResult.Failure<OrderResponseDto>("Order not found");
            }

            var user = _login.GetClaim();

            order.IsActive = false;
            order.UpdatedByUserId = user.UserId;
            order.UpdatedDate = DateTime.Now;
            
            foreach (var orderDetail in order.OrderDetails)
            {
                orderDetail.IsActive = false;
                orderDetail.UpdatedByUserId = user.UserId;
                orderDetail.UpdatedDate = DateTime.Now;
            }

            // Delete the order.
            _dbContext.Orders.Update(order);
            // _dbContext.OrderDetails.UpdateRange(order.OrderDetails);

            // Save the changes.
            await _dbContext.SaveChangesAsync();

            // Map the order to dto.
            var orderDto = _mapper.Map<OrderResponseDto>(order);

            Log.Information("{ServiceName} DeleteOrder Successful", _serviceName);
            return ResponseResult.Success(orderDto);
        }
    }
}
