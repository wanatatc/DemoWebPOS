using DemoPOS.Contracts;
using DemoPOS.DTOs;
using DemoPOS.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DemoPOS.Services
{
    public interface IProductsService
    {
        Task<ServiceResponse<ProductResponseDto>> CreateProduct(ProductRequestDto productDto);
        Task<ServiceResponse<ProductGroupResponseDto>> CreateProductGroup(ProductGroupRequestDto productGroupDto);
        Task<ServiceResponse<ProductResponseDto>> DeleteProduct(Guid id);
        Task<ServiceResponse<ProductGroupResponseDto>> DeleteProductGroup(Guid id);
        Task<ServiceResponse<ProductResponseDto>> GetProduct(Guid id);
        Task<ServiceResponse<ProductGroupResponseDto>> GetProductGroup(Guid id);
        Task<ServiceResponse<List<ProductGroupResponseDto>>> GetProductGroups(PaginationDto pagination, QueryFilterDto filterBy, QuerySortDto orderBy);
        Task<ProductResponse> GetProductResponseByProductId(Guid productId);
        Task<ServiceResponse<List<ProductResponseDto>>> GetProducts(PaginationDto pagination, QueryFilterDto filterBy, QuerySortDto orderBy);
        Task<ServiceResponse<List<ProductResponseDto>>> GetProductsByProductGroupId(Guid id, PaginationDto pagination, QueryFilterDto filterBy, QuerySortDto orderBy);
        Task RemoveExpiredProducts();
        Task<ServiceResponse<List<ProductGroupResponseDto>>> RepositionProductGroups(List<ProductGroupRepositionDto> productGroups);
        Task<ServiceResponse<ProductResponseDto>> UpdateProduct(Guid id, ProductRequestDto productDto);
        Task<ServiceResponse<ProductGroupResponseDto>> UpdateProductGroup(Guid id, ProductGroupRequestDto productGroupDto);
    }
}