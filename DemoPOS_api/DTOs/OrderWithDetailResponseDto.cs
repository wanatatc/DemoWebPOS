using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DemoPOS.DTOs
{
    public class OrderWithDetailResponseDto
    {
        public Guid OrderId { get; set; }
        [StringLength(150)]
        public string OrderName { get; set; }
        [StringLength(36)]
        public string CardId { get; set; }
        [StringLength(16)]
        public string PhoneNo { get; set; }
        [StringLength(150)]
        public string Address1 { get; set; }
        [StringLength(150)]
        public string Address2 { get; set; }
        [StringLength(150)]
        public string Province { get; set; }
        [StringLength(150)]
        public string District { get; set; }
        [StringLength(150)]
        public string Subdistrict { get; set; }
        [StringLength(10)]
        public string ZipCode { get; set; }

        public decimal? Amount { get; set; }

        public decimal? Subtotal { get; set; }

        public decimal? Discount { get; set; }

        public decimal? Total { get; set; }
        public bool? IsActive { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedByUserId { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public List<OrderDetailResponseDto> OrderDetails { get; set; }

    }
}
