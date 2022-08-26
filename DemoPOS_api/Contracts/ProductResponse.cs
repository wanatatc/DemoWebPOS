using DemoPOS.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.Contracts
{
    public class ProductResponse
    {
        public Guid ProductId { get; set; }
        public Guid ProductGroupId { get; set; }
        public string ProductName { get; set; }
        public string ProductGroupName { get; set; }
        public decimal? Price { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string Thumbnail { get; set; }
    }
}
