using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.DTOs
{
    public class ProductGroupResponseDto
    {
        public Guid ProductGroupId { get; set; }
        public string ProductGroupName { get; set; }
        public bool? IsActive { get; set; }
        public int? Position { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedByUserId { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
