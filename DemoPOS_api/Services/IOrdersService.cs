using DemoPOS.DTOs;
using DemoPOS.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace DemoPOS.Services
{
    public interface IOrdersService
    {
        Task<ServiceResponse<OrderWithDetailResponseDto>> CreateOrder(OrderRequestDto orderDto);
        Task<ServiceResponse<OrderResponseDto>> DeleteOrder(Guid id);
        Task<ServiceResponse<List<OrderDetailResponseDto>>> GerOrderDetailsByOrderId(Guid orderId);
        Task<ServiceResponse<OrderWithDetailResponseDto>> GetOrder(Guid id);
        Task<ServiceResponse<List<OrderResponseDto>>> GetOrders(PaginationDto pagination, QueryFilterDto filter, QuerySortDto sort);
        Task<FileStream> GetOrdersReport(DateTime? startDate, DateTime? endDate);
    }
}