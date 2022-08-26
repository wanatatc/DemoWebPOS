using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.DTOs
{
    public class ProductResponseDto
    {
        public Guid ProductId { get; set; }
        public Guid ProductGroupId { get; set; }
        [StringLength(100)]
        public string ProductName { get; set; }
        public string ProductGroupName { get; set; }
        public decimal? Price { get; set; }
        public DateTime? ExpiryDate { get; set; }
        [StringLength(500)]
        public string Thumbnail { get; set; }
        public bool? IsActive { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedByUserId { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
