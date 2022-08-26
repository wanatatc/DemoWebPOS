﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DemoPOS.Models
{
    [Table("ProductGroup")]
    public partial class ProductGroup
    {
        public ProductGroup()
        {
            Products = new HashSet<Product>();
        }

        [Key]
        public Guid ProductGroupId { get; set; }
        [StringLength(100)]
        public string ProductGroupName { get; set; }
        public int? Position { get; set; }
        public bool? IsActive { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedByUserId { get; set; }
        public DateTime? UpdatedDate { get; set; }

        [InverseProperty(nameof(Product.ProductGroup))]
        public virtual ICollection<Product> Products { get; set; }
    }
}