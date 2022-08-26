using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DemoPOS.Data;
using DemoPOS.Models;
using DemoPOS.Services;
using DemoPOS.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace DemoPOS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly IOrdersService _service;

        public OrdersController(IOrdersService service)
        {
            _service = service;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ServiceResponse<List<OrderResponseDto>>> GetOrders([FromQuery] PaginationDto paginationDto = null, [FromQuery] QueryFilterDto filter = null, [FromQuery] QuerySortDto sort = null)
        {
            return await _service.GetOrders(paginationDto, filter, sort);
        }

        [HttpGet("Report")]
        public async Task<IActionResult> GetOrdersReport([FromQuery] DateTime? startDate = null, [FromQuery] DateTime? endDate = null)
        {
            var report = await _service.GetOrdersReport(startDate, endDate);

            if (report is null)
            {
                return Ok(ResponseResult.Failure<string>("Order within required datetime is not aviable."));
            }

            return File(report, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ServiceResponse<OrderWithDetailResponseDto>> GetOrder([FromRoute] Guid id)
        {
            return await _service.GetOrder(id);
        }
        
        [HttpGet("{id}/OrderDetails")]
        public async Task<ServiceResponse<List<OrderDetailResponseDto>>> GetOrderDetails([FromRoute] Guid id)
        {
            return await _service.GerOrderDetailsByOrderId(id);
        }

        // POST: api/Orders
        [HttpPost]
        public async Task<ServiceResponse<OrderWithDetailResponseDto>> PostOrder([FromBody] OrderRequestDto orderRequestDto)
        {
            return await _service.CreateOrder(orderRequestDto);
        }

        // POST: /api/Orders/5/Delete
        [HttpPost("{id}/Delete")]
        public async Task<ServiceResponse<OrderResponseDto>> DeleteOrder([FromRoute] Guid id)
        {
            return await _service.DeleteOrder(id);
        }
        /*
        // PUT: api/Orders/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(Guid id, Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Orders
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            _context.Orders.Add(order);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (OrderExists(order.OrderId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Order>> DeleteOrder(Guid id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return order;
        }

        private bool OrderExists(Guid id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }*/
    }
}
