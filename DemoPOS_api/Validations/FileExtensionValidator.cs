using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.Validations
{
    public class FileExtensionValidator : ValidationAttribute
    {
        public FileExtensionValidator(params string[] allowedExtensions)
        {
            AllowedExtensions = allowedExtensions;
        }

        public string[] AllowedExtensions { get; set; }
        
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null)
                return new ValidationResult("File not selected");

            if (AllowedExtensions == null || AllowedExtensions.Length == 0)
                return ValidationResult.Success;

            IFormFile formFile = value as IFormFile;
            
            var fileExt = System.IO.Path.GetExtension(formFile.FileName);

            if (!AllowedExtensions.Contains(fileExt))
                return new ValidationResult("Invalid file extension");

            return ValidationResult.Success;
        }

        public override string FormatErrorMessage(string name)
        {
            return string.Format("The file extension is not valid.");
        }


    }
}
