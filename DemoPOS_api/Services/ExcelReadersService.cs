using Microsoft.AspNetCore.Http;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.Services
{
    public class ExcelReadersService<TDto> : IExcelReadersService<TDto>, IDisposable where TDto : class
    {
        private readonly MemoryStream _stream;
        private readonly ExcelPackage _excelPackage;

        private bool _disposed = false;

        public ExcelReadersService(IFormFile file)
        {
            file = file ?? throw new ArgumentNullException(nameof(file));

            _stream = new MemoryStream();
            file.CopyTo(_stream);

            // If you use EPPlus in a noncommercial context
            // according to the Polyform Noncommercial license:
            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;

            _excelPackage = new ExcelPackage(_stream);
        }

        public List<TDto> ReadSheet(string sheetName, Func<Dictionary<string, string>, TDto> mapper, string[] requireColumn)
        {
            if (string.IsNullOrEmpty(sheetName) || requireColumn.Length == 0)
            {
                return null;
            }

            List<TDto> result = new List<TDto>();

            using (ExcelWorksheet workSheet = _excelPackage.Workbook.Worksheets[sheetName])
            {

                if (workSheet is null)
                {
                    return null;
                }

                for (int i = 0; i < requireColumn.Length; i++)
                {
                    if (workSheet.Cells[1, i + 1].Value?.ToString() != requireColumn[i])
                    {
                        return null;
                    }
                }

                for (int y = 1; y < workSheet.Dimension.Rows; y++)
                {
                    var rowData = new Dictionary<string, string>();

                    for (int x = 0; x < workSheet.Dimension.Columns; x++)
                    {
                        rowData.Add(requireColumn[x], workSheet.Cells[y + 1, x + 1].Text);
                    }

                    result.Add(mapper(rowData));
                }
            }

            return result;
        }

        public void Dispose()
        {
            if (_disposed) return;

            _stream.Dispose();
            _excelPackage.Dispose();

            _disposed = true;
        }
    }
}
