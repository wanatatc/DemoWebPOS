using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.DTOs
{
    public class OrderRequestDto
    {
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
        public List<OrderDetailRequestDto> OrderDetails { get; set; }
    }
}
