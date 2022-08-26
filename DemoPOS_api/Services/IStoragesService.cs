using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.Services
{
    public interface IStorageService
    {
        Task DeleteFile(string fileRoute, string containerName);
        Task<string> SaveFile(IFormFile file, string containerName, string fileName);
        Task<string> UpdateFile(IFormFile file, string containerName, string fileName, string fileRoute);
    }
}
