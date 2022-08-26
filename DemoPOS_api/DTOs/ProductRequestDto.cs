using DemoPOS.Validations;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.DTOs
{
    public class ProductRequestDto
    {
        public Guid ProductGroupId { get; set; }
        [StringLength(100)]
        public string ProductName { get; set; }
        [Column(TypeName = "decimal(16, 2)")]
        public decimal? Price { get; set; }
        public DateTime? ExpiryDate { get; set; }

        [FileSizeValidator(1)]
        public IFormFile? Thumbnail { get; set; }
    }
}
