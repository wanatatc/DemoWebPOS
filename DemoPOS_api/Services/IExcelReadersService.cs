using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.Services
{
    public interface IExcelReadersService<TDto> where TDto : class
    {
        List<TDto> ReadSheet(string sheetName, Func<Dictionary<string, string>, TDto> mapper, string[] requireColumn);
    }
}
