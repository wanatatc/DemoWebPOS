using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.Services
{
    public class ExcelGeneratorsService<TDto> : IDisposable where TDto : class
    {
        private ExcelPackage _excelPackage;

        private bool _disposed = false;

        public ExcelGeneratorsService(string filePath)
        {
            FilePath = filePath;
            
            // If you use EPPlus in a noncommercial context
            // according to the Polyform Noncommercial license:
            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
            
            _excelPackage = new ExcelPackage();
        }

        public string FilePath { get; }

        public void AddSheet(string sheetName, IEnumerable<TDto> data)
        {
            var worksheet = _excelPackage.Workbook.Worksheets.Add(sheetName);

            var properties = typeof(TDto).GetProperties();

            var columnIndex = 1;

            foreach (var property in properties)
            {
                worksheet.Cells[1, columnIndex].Value = property.Name;
                columnIndex++;
            }

            var rowIndex = 2;

            foreach (var item in data)
            {
                columnIndex = 1;

                foreach (var property in properties)
                {
                    worksheet.Cells[rowIndex, columnIndex].Value = property.GetValue(item);
                    columnIndex++;
                }

                rowIndex++;
            }

            worksheet.Cells.AutoFitColumns();
        }

        public FileStream GetFile()
        {
            if (File.Exists(FilePath))
            {
                File.Delete(FilePath);
            }

            using (var file = File.Create(FilePath))
            {
                _excelPackage.SaveAs(file);
                return file;
            }
        }

        public void Dispose()
        {
            if (_disposed) return;

            _excelPackage.Dispose();

            _disposed = true;
        }
    }
}
