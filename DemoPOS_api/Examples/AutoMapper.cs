using AutoMapper;
using DemoPOS.Examples.Contracts;
using DemoPOS.Examples.DTOs;
using DemoPOS.Examples.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.Examples
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<SampleMessage, ExampleModels>()
                .ForMember(_=>_.ExampleName, _=>_.MapFrom(_=>_.Name))
                .ReverseMap();

            CreateMap<ExampleModels, GetExampleReponseDto>();
        }
    }
}
