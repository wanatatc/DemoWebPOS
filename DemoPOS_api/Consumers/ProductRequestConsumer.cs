using AutoMapper;
using DemoPOS.Contracts;
using DemoPOS.Services;
using MassTransit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.Consumers
{
    public class ProductRequestConsumer : IConsumer<ProductRequest>
    {
        private readonly IProductsService _service;

        public ProductRequestConsumer(IProductsService service, IMapper mapper)
        {
            _service = service;
        }

        public async Task Consume(ConsumeContext<ProductRequest> context)
        {
            var productId = context.Message.ProductId;

            var product = await _service.GetProductResponseByProductId(productId);

            if (product is null)
            {
                await context.RespondAsync(new ProductNotFound() {
                    ProductId = productId
                });
                
                return;
            }

            await context.RespondAsync(product);
        }
    }
}
