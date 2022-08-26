using DemoPOS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.Examples.Models
{
    public class ExampleModels : IId
    {
        public Guid Id { get; set; }

        public string ExampleName { get; set; }

        public decimal Price { get; set; }

        public int UserId { get; set; }
    }
}
