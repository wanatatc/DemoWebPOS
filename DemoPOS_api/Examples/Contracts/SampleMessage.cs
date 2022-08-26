using DemoPOS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.Examples.Contracts
{
    public class SampleMessage : IId
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        
    }
}
