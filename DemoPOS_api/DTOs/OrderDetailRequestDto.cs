using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.DTOs
{
    public class OrderDetailRequestDto
    {
        public Guid ProductId { get; set; }
        public int? Quantity { get; set; }
        public decimal? Amount { get; set; }
    }
}
