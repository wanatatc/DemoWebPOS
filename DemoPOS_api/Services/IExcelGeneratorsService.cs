using System.Collections.Generic;
using System.IO;

namespace DemoPOS.Services
{
    public interface IExcelGeneratorsService<TDto> where TDto : class
    {
        string FilePath { get; }

        void AddSheet(string sheetName, IEnumerable<TDto> data);
        FileStream GetFile();
    }
}