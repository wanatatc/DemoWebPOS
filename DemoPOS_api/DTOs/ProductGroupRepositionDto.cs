using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.DTOs
{
    public class ProductGroupRepositionDto
    {
        public Guid ProductGroupId { get; set; }
        public int Position { get; set; }
    }
}
