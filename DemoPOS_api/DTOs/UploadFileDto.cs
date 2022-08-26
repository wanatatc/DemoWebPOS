using DemoPOS.Validations;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.DTOs
{
    public class ThumbnailFileDto
    {
        public string FileName { get; set; }
        
        [FileSizeValidator(1)]
        [FileExtensionValidator(".jpg", ".jpeg", ".png", ".gif")]
        public IFormFile File { get; set; }
    }
}
