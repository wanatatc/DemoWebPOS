using DemoPOS.Services;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.HostedServices
{
    public class ProductExpriedJob : IJob
    {
        private readonly IProductsService _service;

        public ProductExpriedJob(IProductsService service)
        {
            _service = service;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            await _service.RemoveExpiredProducts();
        }
    }
}
