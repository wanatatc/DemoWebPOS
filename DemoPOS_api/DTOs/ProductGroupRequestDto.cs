using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.DTOs
{
    public class ProductGroupRequestDto
    {

        [StringLength(100)]
        public string ProductGroupName { get; set; }
    }
}
