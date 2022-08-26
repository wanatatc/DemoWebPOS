using DemoPOS.Examples.DTOs;
using DemoPOS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.Examples.Services
{
    public interface IExampleServices
    {
        ServiceResponse<GetExampleReponseDto> GetExample(GetExampleRequestDto dto);
    }
}
