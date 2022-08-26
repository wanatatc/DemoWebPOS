using AutoMapper;
using DemoPOS.Contracts;
using DemoPOS.Data;
using DemoPOS.DTOs;
using DemoPOS.Helpers;
using DemoPOS.Models;
using DemoPOS.Services.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoPOS.Services
{
    public class ProductsService : ServiceBase, IProductsService
    {
        private readonly AppDBContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILoginDetailServices _login;
        private readonly IStorageService _storage;
        private readonly HttpContext _httpContext;
        private readonly ILogger _logger;

        public ProductsService(AppDBContext dbContext,
                               IMapper mapper,
                               IHttpContextAccessor httpContext, 
                               ILoginDetailServices login,
                               IStorageService storage) 
        : base(dbContext, mapper, httpContext, login)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _login = login;
            _storage = storage;
            _httpContext = httpContext.HttpContext;
            _logger = Log.ForContext("ConnectionId", _httpContext.Connection.Id);
        }

        // Service's name
        private const string _serviceName = nameof(ProductsService);

        // List of columns that can be filter by
        private List<string> _filterableProductGroupColumns
            = new List<string> { "ProductGroupId", "ProductGroupName", "IsActive" };
        private List<string> _filterableProductColumns
            = new List<string> { "ProductId", "ProductName", "ProductGroupId", "IsActive" };

        // List of columns that can be sort by
        private List<string> _sortableProductGroupColumns
            = new List<string> { "ProductGroupName", "CreatedDate", "UpdatedDate", "Position" };
        private List<string> _sortableProductColumns
            = new List<string> { "ProductName", "Price", "CreatedDate", "UpdatedDate" };

        #region ProductGroup

        /// <summary>
        /// Get all products.
        /// </summary>
        /// <param name="pagination">Pagination string query</param>
        /// <param name="filter">Filter string query</param>
        /// <param name="sort">Order string query</param>
        /// <returns>List of product groups</returns>
        public async Task<ServiceResponse<List<ProductGroupResponseDto>>> GetProductGroups(PaginationDto pagination, QueryFilterDto filter, QuerySortDto sort)
        {
            _logger.Debug("{ServiceName} Start GetProductGroups [Pagination={@Pagination,Filter={@Filter},Sort={@Sort}]", _serviceName, pagination, filter, sort);

            var productGroupsQuery = _dbContext.ProductGroups.AsQueryable();

            // Add filter
            productGroupsQuery = FilterProductGroups(productGroupsQuery, filter);

            // Add pagination
            var productGroupsPaginationResult =
                await _httpContext.InsertPaginationParametersInResponse(
                        productGroupsQuery,
                        pagination.RecordsPerPage,
                        pagination.Page
                    );

            // Add order
            productGroupsQuery = SortProductGroups(productGroupsQuery, sort);

            // Query all product groups
            var productGroups = await productGroupsQuery.Paginate(pagination).ToListAsync();

            // Map to dto
            var productGroupsDto = _mapper.Map<List<ProductGroupResponseDto>>(productGroups);

            _logger.Information("{ServiceName} GetProductGroups Successful", _serviceName);
            return ResponseResult.Success(productGroupsDto, productGroupsPaginationResult);
        }

        /// <summary>
        /// Filter product groups.
        /// </summary>
        /// <param name="query">ProductGroup's IQueryable</param>
        /// <param name="filter">Filter query string</param>
        /// <returns>ProductGroup's IQueryable</returns>
        private IQueryable<ProductGroup> FilterProductGroups(IQueryable<ProductGroup> query, QueryFilterDto filter)
        {
            _logger.Debug("{ServiceName} FilterProductGroups Start [Type={Entity},Filter={@Filter}]", _serviceName, nameof(ProductGroup), filter);

            if (string.IsNullOrWhiteSpace(filter.FilterColumn) || string.IsNullOrWhiteSpace(filter.Value))
            {
                _logger.Debug("{ServiceName} FilterProductGroups - Filter has no column or keyword. [Type={Entity},Filter={@Filter}]", _serviceName, nameof(ProductGroup), filter.FilterColumn);
                return query;
            }

            if (!_filterableProductGroupColumns.Contains(filter.FilterColumn))
            {
                _logger.Debug("{ServiceName} FilterProductGroups - Invalid column. [Type={Entity},Filter={@Filter}]", _serviceName, nameof(ProductGroup), filter);
                return query;
            }

            try
            {   
                switch (filter.FilterColumn)
                {
                    case "ProductGroupId":
                        query = query.Where(x => x.ProductGroupId.ToString().Contains(filter.Value));
                        break;

                    case "ProductGroupName":
                        query = query.Where(x => x.ProductGroupName.Contains(filter.Value));
                        break;

                    case "IsActive":
                        query = query.Where(x => x.IsActive == Boolean.Parse(filter.Value));
                        break;

                    default:
                        _logger.Warning("{ServiceName} FilterProductGroups - Invalid column. [Type={Entity},Filter={@Filter}]", _serviceName, nameof(ProductGroup), filter);
                        break;
                }
            }
            catch (Exception ex)
            {
                _logger.Warning(ex, "{ServiceName} FilterProductGroups - Error. [Type={Entity},Filter={@Filter}]", _serviceName, nameof(ProductGroup), filter);
                return query;
            }

            _logger.Debug("{ServiceName} FilterProductGroups Successful", _serviceName);
            return query;
        }

        /// <summary>
        /// Sort product groups.
        /// </summary>
        /// <param name="query">ProductGroup's IQueryable</param>
        /// <param name="sort">Order string query</param>
        /// <returns>ProductGroup's IQueryable</returns>
        private IQueryable<ProductGroup> SortProductGroups(IQueryable<ProductGroup> query, QuerySortDto sort)
        {
            _logger.Debug("{ServiceName} SortProductGroups Start [Type={Entity},Sort={@Sort}]", _serviceName, nameof(ProductGroup), sort);

            if (string.IsNullOrWhiteSpace(sort.OrderingField))
            {
                _logger.Debug("{ServiceName} SortProductGroups - Sort has no column or ordering. [Type={Entity},Sort={@Sort}]", _serviceName, nameof(ProductGroup), sort);
                
                // Set default sorting
                sort.OrderingField = "Position";
                sort.AscendingOrder = true;
            }

            if (!_sortableProductGroupColumns.Contains(sort.OrderingField))
            {
                _logger.Debug("{ServiceName} SortProductGroups - Invalid column. [Type={Entity},Sort={@Sort}]", _serviceName, nameof(ProductGroup), sort);
                return query;
            }

            switch (sort.OrderingField)
            {
                case "ProductGroupName":
                    query = sort.AscendingOrder
                        ? query.OrderBy(x => x.ProductGroupName) 
                        : query.OrderByDescending(x => x.ProductGroupName);
                    break;

                case "CreatedDate":
                    query = sort.AscendingOrder
                        ? query.OrderBy(x => x.CreatedDate) 
                        : query.OrderByDescending(x => x.CreatedDate);
                    break;

                case "UpdatedDate":
                    query = sort.AscendingOrder
                        ? query.OrderBy(x => x.UpdatedDate)
                        : query.OrderByDescending(x => x.UpdatedDate);
                    break;
                    
                case "Position":
                    query = sort.AscendingOrder
                        ? query.OrderBy(x => x.Position)
                        : query.OrderByDescending(x => x.Position);
                    break;

                default:
                    _logger.Warning("{ServiceName} SortProductGroups - Invalid column. [Type={Entity},Sort={@Sort}]", _serviceName, nameof(ProductGroup), sort);
                    break;
            }

            _logger.Information("{ServiceName} SortProductGroups Successful [Type={Entity},Sort={@Sort}]", _serviceName, nameof(ProductGroup), sort);
            return query;
        }

        /// <summary>
        /// Get product group by id.
        /// </summary>
        /// <param name="id">ProductGroup's id </param>
        /// <returns>ProductGroup</returns>
        public async Task<ServiceResponse<ProductGroupResponseDto>> GetProductGroup(Guid id)
        {
            Log.Debug("{ServiceName} Start GetProductGroup [ProductGroupsId = {ProductGroupId}]", _serviceName, id);

            var productGroup = await _dbContext.ProductGroups.FindAsync(id);

            if (productGroup == null)
            {
                Log.Debug("{ServiceName} Could not found ProductGroupId [ProductGroupId={ProductGroupId}]", _serviceName, id);
                return ResponseResult.NotFound<ProductGroupResponseDto>("Product Group");
            }

            var productGroupDto = _mapper.Map<ProductGroupResponseDto>(productGroup);

            Log.Information("{ServiceName} GetProductGroup Successful", _serviceName);
            return ResponseResult.Success(productGroupDto);
        }

        /// <summary>
        /// Reposition product group.
        /// </summary>
        /// <param name="productGroups">List of product group id with new position</param>
        /// <returns>List of product group</returns>
        public async Task<ServiceResponse<List<ProductGroupResponseDto>>> RepositionProductGroups(List<ProductGroupRepositionDto> productGroups)
        {
            Log.Debug("{ServiceName} Start RepositionProductGroups [ProductGroups={@ProductGroups}]", _serviceName, productGroups);

            var productGroupIds = productGroups.Select(x => x.ProductGroupId).ToList();
            var productGroupsToReposition = await _dbContext.ProductGroups.Where(x => productGroupIds.Contains(x.ProductGroupId)).ToListAsync();

            if (productGroupsToReposition.Count != productGroups.Count)
            {
                Log.Debug("{ServiceName} RepositionProductGroups - Could not found all product groups. [ProductGroups={@ProductGroups}]", _serviceName, productGroups);
                return ResponseResult.NotFound<List<ProductGroupResponseDto>>("Product Groups");
            }

            var productGroupsToRepositionByPosition = productGroupsToReposition.Where(x => productGroupIds.Contains(x.ProductGroupId)).OrderBy(x => x.Position).ToList();

            for (int i = 0; i < productGroupsToRepositionByPosition.Count; i++)
            {
                productGroupsToRepositionByPosition[i].Position = i + 1;
            }

            await _dbContext.SaveChangesAsync();

            var productGroupsResponse = _mapper.Map<List<ProductGroupResponseDto>>(productGroupsToRepositionByPosition);
            
            Log.Information("{ServiceName} RepositionProductGroups Successful", _serviceName);
            return ResponseResult.Success(productGroupsResponse, "Product Group Position has been changed");
        }

        /// <summary>
        /// Get products by product group by id.
        /// </summary>
        /// <param name="id">ProductGroup Id</param>
        /// <param name="pagination">Pagination query string</param>
        /// <param name="filterBy">Filter query string</param>
        /// <param name="orderBy">Order query string</param>
        /// <returns>List of products in product group</returns>
        public async Task<ServiceResponse<List<ProductResponseDto>>> GetProductsByProductGroupId(Guid id, PaginationDto pagination, QueryFilterDto filterBy, QuerySortDto orderBy)
        {
            Log.Debug("{ServiceName} GetProductsByProductGroupId [ProductGroupId={ProductGroupId}]", _serviceName, id);

            var productsQuery = _dbContext.Products.Where(_ => _.ProductGroupId == id).Include(_=> _.ProductGroup).AsQueryable();

            // Add filter
            productsQuery = FilterProduct(productsQuery, filterBy);

            // Add order
            productsQuery = SortProduct(productsQuery, orderBy);

            // Add pagination
            var productsPaginationResult = await _httpContext
                .InsertPaginationParametersInResponse(
                    productsQuery,
                    pagination.RecordsPerPage,
                    pagination.Page
                );

            // Query all products
            var products = await productsQuery.Paginate(pagination).ToListAsync();

            // Map to dto
            var productsDto = _mapper.Map<List<ProductResponseDto>>(products);

            Log.Information("{ServiceName} GetProductsByProductGroupId Successful", _serviceName);
            return ResponseResult.Success(productsDto, productsPaginationResult);
        }

        /// <summary>
        /// Create product group.
        /// </summary>
        /// <param name="productGroupDto"></param>
        /// <returns>New product group</returns>
        public async Task<ServiceResponse<ProductGroupResponseDto>> CreateProductGroup(ProductGroupRequestDto productGroupDto)
        {
            Log.Debug("{ServiceName} Start CreateProductGroup [ProductGroup={@ProductGroup}]", _serviceName, productGroupDto);

            // Map to entity
            var productGroup = _mapper.Map<ProductGroup>(productGroupDto);

            var user = _login.GetClaim();
            
            productGroup.ProductGroupId = Guid.NewGuid();
            productGroup.Position = await GetProductGroupNextPosition();
            productGroup.IsActive = true;
            productGroup.CreatedByUserId = user.UserId;
            productGroup.CreatedDate = DateTime.Now;
            productGroup.UpdatedByUserId = user.UserId;
            productGroup.UpdatedDate = DateTime.Now;

            // Add to database
            _dbContext.ProductGroups.Add(productGroup);
            await _dbContext.SaveChangesAsync();

            // Map to dto
            var productGroupDtoResponse = _mapper.Map<ProductGroupResponseDto>(productGroup);

            // Return response
            Log.Information("{ServiceName} CreateProductGroup Successful", _serviceName);
            return ResponseResult.Success(productGroupDtoResponse);
        }

        /// <summary>
        /// Get ProductGroup's Next Position
        /// </summary>
        /// <returns>Number of position for new Productgroup record</returns>
        private async Task<int> GetProductGroupNextPosition()
        {
            var maxPositition = await _dbContext.ProductGroups.CountAsync();

            return maxPositition + 1;
        }

        /// <summary>
        /// Update product group.
        /// </summary>
        /// <param name="id">Product group id</param>
        /// <param name="productGroupDto">Update product group details</param>
        /// <returns>Updated product group.</returns>
        public async Task<ServiceResponse<ProductGroupResponseDto>> UpdateProductGroup(Guid id, ProductGroupRequestDto productGroupDto)
        {
            Log.Debug("{ServiceName} Start UpdateProductGroup [ProductGroupId={ProductGroupId},ProductGroupDto]", _serviceName, id);

            // Get product group
            var productGroup = await _dbContext.ProductGroups.FindAsync(id);

            // Check if product group exists
            if (productGroup == null)
            {
                Log.Debug("{ServiceName} UpdateProductGroup - Could not found ProductGroupId [ProductGroupId={ProductGroupId}]", _serviceName, id);
                return ResponseResult.NotFound<ProductGroupResponseDto>("Product Group");
            }

            var user = _login.GetClaim();
            
            // Map to entity
            _mapper.Map(productGroupDto, productGroup);
            productGroup.UpdatedByUserId = user.UserId;
            productGroup.UpdatedDate = DateTime.Now;

            // Update to database
            await _dbContext.SaveChangesAsync();

            // Map to dto
            var productGroupDtoResponse = _mapper.Map<ProductGroupResponseDto>(productGroup);

            // Return response
            Log.Information("{ServiceName} UpdateProductGroup Successful", _serviceName);
            return ResponseResult.Success(productGroupDtoResponse);
        }

        /// <summary>
        /// Delete product group.
        /// </summary>
        /// <param name="id">Product group id</param>
        /// <returns>Deleted product group</returns>
        public async Task<ServiceResponse<ProductGroupResponseDto>> DeleteProductGroup(Guid id)
        {
            Log.Debug("{ServiceName} Start DeleteProductGroup [ProductGroupId={ProductGroupId}]", _serviceName, id);

            // Get product group
            var productGroup = await _dbContext.ProductGroups.FindAsync(id);

            // Check if product group exists
            if (productGroup == null)
            {
                Log.Debug("{ServiceName} DeleteProductGroup - Could not found ProductGroupId [ProductGroupId={ProductGroupId}]", _serviceName, id);
                return ResponseResult.NotFound<ProductGroupResponseDto>("Product Group");
            }

            var user = _login.GetClaim();

            // Delete product group
            productGroup.IsActive = false;
            productGroup.UpdatedByUserId = user.UserId;
            productGroup.UpdatedDate = DateTime.Now;

            // Delete all products in product group
            var allProducts = _dbContext.Products.Where(_ => _.ProductGroupId == id).ToList();
            foreach (var product in allProducts)
            {
                product.IsActive = false;
                product.UpdatedByUserId = user.UserId;
                product.UpdatedDate = DateTime.Now;
            }

            // Update to database
            _dbContext.ProductGroups.Update(productGroup);
            _dbContext.Products.UpdateRange(allProducts);
            await _dbContext.SaveChangesAsync();

            // Map to dto
            var productGroupDtoResponse = _mapper.Map<ProductGroupResponseDto>(productGroup);

            // Return response
            Log.Information("{ServiceName} DeleteProductGroup Successful", _serviceName);
            return ResponseResult.Success(productGroupDtoResponse);
        }


        #endregion

        #region Product

        /// <summary>
        /// Filter products.
        /// </summary>
        /// <param name="query">Product's IQueryable</param>
        /// <param name="filter">Filter query string</param>
        /// <returns>Product's IQueryable</returns>
        private IQueryable<Product> FilterProduct(IQueryable<Product> query, QueryFilterDto filter)
        {
            Log.Debug("{ServiceName} FilterProduct Start [Type={Entity},Filter={@Filter}]", _serviceName, nameof(Product), filter);

            if (string.IsNullOrWhiteSpace(filter.FilterColumn) || string.IsNullOrWhiteSpace(filter.Value))
            {
                Log.Debug("{ServiceName} FilterProduct - Filter has no column or keyword. [Type={Entity},Filter={@Filter}]", _serviceName, nameof(Product), filter);
                return query;
            }

            if (!_filterableProductColumns.Contains(filter.FilterColumn))
            {
                Log.Debug("{ServiceName} FilterProduct - Invalid column. [Type={Entity},Filter={@Filter}]", _serviceName, nameof(Product), filter);
                return query;
            }

            try
            {

                switch (filter.FilterColumn)
                {
                    case "ProductId":
                        query = query.Where(x => x.ProductId.ToString().Contains(filter.Value));
                        break;

                    case "ProductName":
                        query = query.Where(x => x.ProductName.Contains(filter.Value));
                        break;

                    case "IsActive":
                        query = query.Where(x => x.IsActive.ToString().Contains(filter.Value));
                        break;

                    default:
                        Log.Debug("{ServiceName} FilterProduct - Invalid column. [Type={Entity},Filter={@Filter}]", _serviceName, nameof(Product), filter);
                        break;
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "{ServiceName} FilterProduct - Error while filtering. [Type={Entity},Filter={@Filter}]", _serviceName, nameof(Product), filter);
            }

            Log.Debug("{ServiceName} FilterProduct Successful", _serviceName, nameof(Product), filter);
            return query;
        }

        /// <summary>
        /// Products order.
        /// </summary>
        /// <param name="query">Product's IQueryable</param>
        /// <param name="sort">Order query string</param>
        /// <returns>Product's IQueryable</returns>
        private IQueryable<Product> SortProduct(IQueryable<Product> query, QuerySortDto sort)
        {
            Log.Debug("{ServiceName} SortProduct Start [Type={Entity},Sort={@Sort}]", _serviceName, nameof(Product), sort);

            if (string.IsNullOrWhiteSpace(sort.OrderingField))
            {
                Log.Debug("{ServiceName} SortProduct - Order has no column or keyword. [Type={Entity},Sort={@Sort}]", _serviceName, nameof(Product), sort);

                // Add default order
                sort.OrderingField = "CreatedDate";
                sort.AscendingOrder = false;
            }

            if (!_sortableProductColumns.Contains(sort.OrderingField))
            {
                Log.Debug("{ServiceName} SortProduct - Invalid column. [Type={Entity},Sort={@Sort}]", _serviceName, nameof(Product), sort);
                return query;
            }

            switch (sort.OrderingField)
            {
                case "ProductName":
                    query = sort.AscendingOrder
                        ? query.OrderBy(x => x.ProductName) 
                        : query.OrderByDescending(x => x.ProductName);
                    break;

                case "Price":
                    query = sort.AscendingOrder
                        ? query.OrderBy(x => x.Price) 
                        : query.OrderByDescending(x => x.Price);
                    break;

                case "CreatedDate":
                    query = sort.AscendingOrder
                        ? query.OrderBy(x => x.CreatedDate) 
                        : query.OrderByDescending(x => x.CreatedDate);
                    break;

                case "UpdatedDate":
                    query = sort.AscendingOrder
                        ? query.OrderBy(x => x.UpdatedDate) 
                        : query.OrderByDescending(x => x.UpdatedDate);
                    break;

                default:
                    Log.Debug("{ServiceName} SortProduct - Invalid column. [Type={Entity},Sort={@Sort}]", _serviceName, nameof(Product), sort);
                    break;
            }

            Log.Debug("{ServiceName} SortProduct Successful", _serviceName, nameof(Product), sort);
            return query;

        }

        /// <summary>
        /// Get all product.
        /// </summary>
        /// <param name="pagination">Pagination query string</param>
        /// <param name="filter">Filter query string</param>
        /// <param name="sort">Order query string</param>
        /// <returns>List of products</returns>
        public async Task<ServiceResponse<List<ProductResponseDto>>> GetProducts(PaginationDto pagination, QueryFilterDto filter, QuerySortDto sort)
        {
            Log.Debug("{ServiceName} GetProducts [Pagination={@Pagination},Filter={@Filter},Sort={@Sort}]", _serviceName,filter,sort);

            var allProductQuery = _dbContext.Products.Include(_ => _.ProductGroup).AsQueryable();

            // Add filter
            allProductQuery = FilterProduct(allProductQuery, filter);

            // Add order
            allProductQuery = SortProduct(allProductQuery, sort);

            // Add pagination
            var allProductPaginationResult = await _httpContext
                .InsertPaginationParametersInResponse(
                    allProductQuery,
                    pagination.RecordsPerPage,
                    pagination.Page
                );

            // Query all products
            var allProduct = await allProductQuery.Paginate(pagination).ToListAsync();

            // Map to dto
            var allProductDto = _mapper.Map<List<ProductResponseDto>>(allProduct);

            Log.Information("{ServiceName} GetProducts Successful", _serviceName);
            return ResponseResult.Success(allProductDto, allProductPaginationResult);
        }

        /// <summary>
        /// Get product by id.
        /// </summary>
        /// <param name="productId">Product's Id</param>
        /// <returns>Product</returns>
        public async Task<ServiceResponse<ProductResponseDto>> GetProduct(Guid productId)
        {
            Log.Debug("{ServiceName} Start GetProduct [ProductId={ProductId}]", _serviceName, productId);

            var product = await _dbContext.Products.Where(_ => _.ProductId == productId).Include(_ => _.ProductGroup).FirstOrDefaultAsync();

            if (product == null)
            {
                Log.Debug("{ServiceName} GetProduct - Could not found ProductId [ProductId={ProductId}]", _serviceName, productId);
                return ResponseResult.NotFound<ProductResponseDto>("Product");
            }

            var productDto = _mapper.Map<ProductResponseDto>(product);

            Log.Information("{ServiceName} GetProduct Successful", _serviceName);
            return ResponseResult.Success(productDto);
        }

        public async Task<ProductResponse> GetProductResponseByProductId(Guid productId)
        {
            Log.Debug("{ServiceName} Start GetProductResponseByProductId [ProductId={ProductId}]", _serviceName, productId);

            var product = await _dbContext.Products.Where(_ => _.ProductId == productId).Include(_ => _.ProductGroup).FirstOrDefaultAsync();

            if (product == null)
            {
                Log.Debug("{ServiceName} GetProductResponseByProductId - Could not found ProductId [ProductId={ProductId}]", _serviceName, productId);
                return null;
            }

            var productResponse = _mapper.Map<ProductResponse>(product);

            Log.Information("{ServiceName} GetProductResponseByProductId Successful", _serviceName);
            return productResponse;
        }

        /// <summary>
        /// Create product.
        /// </summary>
        /// <param name="productDto">Product details</param>
        /// <returns>Created product.</returns>
        public async Task<ServiceResponse<ProductResponseDto>> CreateProduct(ProductRequestDto productDto)
        {
            Log.Debug("{ServiceName} Start CreateProduct [Product={@Product}]", _serviceName, productDto);

            // Check product group is exist
            var productGroup = await _dbContext.ProductGroups.FindAsync(productDto.ProductGroupId);

            if (productGroup == null)
            {
                Log.Debug("{ServiceName} Could not found ProductGroupId [ProductGroupId={ProductGroupId}]", _serviceName, productDto.ProductGroupId);
                return ResponseResult.NotFound<ProductResponseDto>("ProductGroup");
            }

            var newProductId = Guid.NewGuid();

            // Map to entity
            var product = _mapper.Map<Product>(productDto);

            var user = _login.GetClaim();

            if(!(productDto.Thumbnail is null))
            {
                var filePath = await _storage.SaveFile(productDto.Thumbnail, "uploads/Products", newProductId.ToString());
                product.Thumbnail = filePath;
            }

            product.ProductId = newProductId;
            product.ProductGroup = productGroup;
            product.IsActive = true;
            product.CreatedByUserId = user.UserId;
            product.CreatedDate = DateTime.Now;
            product.UpdatedByUserId = user.UserId;
            product.UpdatedDate = DateTime.Now;

            // Save to database
            _dbContext.Products.Add(product);
            await _dbContext.SaveChangesAsync();

            // Map to dto
            var productDtoResponse = _mapper.Map<ProductResponseDto>(product);

            // Return response
            Log.Information("{ServiceName} CreateProduct Successful", _serviceName);
            return ResponseResult.Success(productDtoResponse);
        }

        /// <summary>
        /// Update product.
        /// </summary>
        /// <param name="id">Product's Id</param>
        /// <param name="productDto">Product's Detail</param>
        /// <returns>Updated product</returns>
        public async Task<ServiceResponse<ProductResponseDto>> UpdateProduct(Guid id, ProductRequestDto productDto)
        {
            Log.Debug("{ServiceName} Start UpdateProduct [ProductId={ProductId},Product={@Product}]", _serviceName, id, productDto);

            // Check product is exist
            var product = await _dbContext.Products.Where(_ => _.ProductId == id).Include(_=>_.ProductGroup).FirstOrDefaultAsync();

            if (product == null)
            {
                Log.Debug("{ServiceName} UpdateProduct - Could not found ProductId [ProductId={ProductId}]", _serviceName, id);
                return ResponseResult.NotFound<ProductResponseDto>("Product");
            }

            var filePath = "";

            if (product.Thumbnail != null && productDto.Thumbnail != null)
            {
                filePath = await _storage.UpdateFile(productDto.Thumbnail, "upload/Products", product.ProductId.ToString(), product.Thumbnail);
            }
            else if (product.Thumbnail != null)
            {
                filePath = await _storage.SaveFile(productDto.Thumbnail, "upload/Products", product.ProductId.ToString());
            }

            var user = _login.GetClaim();
            

            // Map to entity
            _mapper.Map(productDto, product);

            // If product group is changed, update product group
            if (productDto.ProductGroupId != null)
            {
                // Check product group is exist
                var productGroup = await _dbContext.ProductGroups.FindAsync(productDto.ProductGroupId);

                if (productGroup == null)
                {
                    Log.Debug("{ServiceName} UpdateProduct - Could not found ProductGroupId [ProductGroupId={ProductGroupId}]", _serviceName, productDto.ProductGroupId);
                    return ResponseResult.NotFound<ProductResponseDto>("ProductGroup");
                }

                // Update product group
                Log.Verbose("{ServiceName} UpdateProduct - Update ProductGroup [ProductGroup={@ProductGroup}]", _serviceName, productGroup);
                product.ProductGroup = productGroup;
            }

            if (!string.IsNullOrWhiteSpace(filePath))
            {
                product.Thumbnail = filePath;
            }

            product.CreatedByUserId = user.UserId;
            product.CreatedDate = DateTime.Now;
            product.UpdatedByUserId = user.UserId;
            product.UpdatedDate = DateTime.Now;

            // Save to database
            await _dbContext.SaveChangesAsync();

            // Map to dto
            var productDtoResponse = _mapper.Map<ProductResponseDto>(product);

            // Return response
            Log.Information("{ServiceName} UpdateProduct Successful", _serviceName);
            return ResponseResult.Success(productDtoResponse);

        }

        /// <summary>
        /// Delete product.
        /// </summary>
        /// <param name="id">Product's Id</param>
        /// <returns>Deleted product</returns>
        public async Task<ServiceResponse<ProductResponseDto>> DeleteProduct(Guid id)
        {
            Log.Debug("{ServiceName} Start DeleteProduct [ProductId={ProductId}]", _serviceName, id);

            // Check product is exist
            var product = await _dbContext.Products.FindAsync(id);

            if (product == null)
            {
                Log.Debug("{ServiceName} DeleteProduct - Could not found ProductId [ProductId={ProductId}]", _serviceName, id);
                return ResponseResult.NotFound<ProductResponseDto>("Product");
            }

            var user = _login.GetClaim();

            // Delete product

            if (!string.IsNullOrWhiteSpace(product.Thumbnail))
            {
                await _storage.DeleteFile(product.Thumbnail, "upload/Product");
                product.Thumbnail = null;
            }

            product.IsActive = false;
            product.UpdatedByUserId = user.UserId;
            product.UpdatedDate = DateTime.Now;

            // Save to database
            _dbContext.Products.Update(product);
            await _dbContext.SaveChangesAsync();

            // Map to dto
            var productDtoResponse = _mapper.Map<ProductResponseDto>(product);

            // Return response
            Log.Information("{ServiceName} DeleteProduct Successful", _serviceName);
            return ResponseResult.Success(productDtoResponse);
        }

        public async Task RemoveExpiredProducts()
        {

            Log.Debug("{ServiceName} Start RemoveExpiredProducts", _serviceName);

            // Get all products that expired
            var products = await _dbContext.Products.Where(_ => _.ExpiryDate < DateTime.Now).ToListAsync();

            // Delete products
            foreach (var product in products)
            {
                product.IsActive = false;

                Log.Verbose("{ServiceName} RemoveExpiredProducts - Update Product [Product={@Product}]", _serviceName, product);
            }

            // Save to database
            _dbContext.Products.UpdateRange(products);
            await _dbContext.SaveChangesAsync();

            Log.Information("{ServiceName} RemoveExpiredProducts Successful", _serviceName);
        }
        
        #endregion
    }
}