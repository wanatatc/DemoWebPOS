using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DemoPOS.Data;
using DemoPOS.Models;
using DemoPOS.DTOs;
using DemoPOS.Services;
using Microsoft.AspNetCore.Authorization;

namespace DemoPOS.Controllers
{
    [Route("api")]
    [ApiController]
    [Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsService _service;

        public ProductsController(IProductsService service)
        {
            _service = service;
        }

        // GET: api/ProductGroups
        [HttpGet("ProductGroup")]
        public async Task<ServiceResponse<List<ProductGroupResponseDto>>> GetProductGroups([FromQuery] PaginationDto pagination, [FromQuery] QueryFilterDto filter, [FromQuery] QuerySortDto order)
        {
            return await _service.GetProductGroups(pagination, filter, order);
        }

        // POST: api/ProductGroups/Reposition
        [HttpPost("ProductGroup/Reposition")]
        public async Task<ServiceResponse<List<ProductGroupResponseDto>>> RepositionProductGroups([FromBody] List<ProductGroupRepositionDto> productGroupRepositionDtos)
        {
            return await _service.RepositionProductGroups(productGroupRepositionDtos);
        }

        // GET: api/ProductGroups/5
        [HttpGet("ProductGroup/{id}")]
        public async Task<ServiceResponse<ProductGroupResponseDto>> GetProductGroup([FromRoute] Guid id)
        {
            return await _service.GetProductGroup(id);
        }


        [HttpGet("ProductGroup/{id}/Products")]
        public async Task<ServiceResponse<List<ProductResponseDto>>> GetProducts([FromRoute] Guid id, [FromQuery] PaginationDto pagination, [FromQuery] QueryFilterDto filterBy, [FromQuery] QuerySortDto orderBy)
        {
            return await _service.GetProductsByProductGroupId(id, pagination, filterBy, orderBy);
        }
        
        // POST: api/ProductGroups
        [HttpPost("ProductGroup")]
        public async Task<ServiceResponse<ProductGroupResponseDto>> CreateProductGroup([FromBody] ProductGroupRequestDto productGroupDto)
        {
            return await _service.CreateProductGroup(productGroupDto);
        }

        // Post: api/ProductGroups/5
        [HttpPost("ProductGroup/{id}")]
        public async Task<ServiceResponse<ProductGroupResponseDto>> UpdateProductGroup([FromRoute] Guid id, [FromBody] ProductGroupRequestDto productGroupDto)
        {
            return await _service.UpdateProductGroup(id, productGroupDto);
        }

        // DELETE: api/ProductGroups/5
        [HttpPost("ProductGroup/{id}/Delete")]
        public async Task<ServiceResponse<ProductGroupResponseDto>> DeleteProductGroup([FromRoute] Guid id)
        {
            return await _service.DeleteProductGroup(id);
        }

        // GET: api/Products
        [HttpGet("Product")]
        public async Task<ServiceResponse<List<ProductResponseDto>>> GetProducts([FromQuery] PaginationDto pagination, [FromQuery] QueryFilterDto filterBy, [FromQuery] QuerySortDto orderBy)
        {
            return await _service.GetProducts(pagination, filterBy, orderBy);
        }

        // GET: api/Products/5
        [HttpGet("Product/{id}")]
        public async Task<ServiceResponse<ProductResponseDto>> GetProduct([FromRoute] Guid id)
        {
            return await _service.GetProduct(id);
        }

        // POST: api/Products
        [HttpPost("Product")]
        public async Task<ServiceResponse<ProductResponseDto>> CreateProduct([FromForm] ProductRequestDto productDto)
        {
            return await _service.CreateProduct(productDto);
        }

        // Post: api/Products/5
        [HttpPost("Product/{id}")]
        public async Task<ServiceResponse<ProductResponseDto>> UpdateProduct([FromRoute] Guid id, [FromForm] ProductRequestDto productDto)
        {
            return await _service.UpdateProduct(id, productDto);
        }

        // DELETE: api/Products/5
        [HttpPost("Product/{id}/Delete")]
        public async Task<ServiceResponse<ProductResponseDto>> DeleteProduct([FromRoute] Guid id)
        {
            return await _service.DeleteProduct(id);
        }
    }
}
