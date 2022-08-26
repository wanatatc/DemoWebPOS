using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.Services
{
    public class FileStorageService : IStorageService
    {
        private readonly IWebHostEnvironment env;
        private readonly IHttpContextAccessor httpContextAccessor;

        public FileStorageService(IWebHostEnvironment env,
            IHttpContextAccessor httpContextAccessor
            )
        {
            this.env = env;
            this.httpContextAccessor = httpContextAccessor;
        }
        public async Task<string> SaveFile(IFormFile file, string containerName, string fileName)
        {
            if (file == null)
            {
                return null;
            }

            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                var content = memoryStream.ToArray();
                var extension = Path.GetExtension(file.FileName);
                var fileSize = file.Length;

                fileName = $"{fileName}{extension}";

                string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images" , containerName);

                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                string savingPath = Path.Combine(folder, fileName);

                if (File.Exists(savingPath))
                {
                    File.Delete(savingPath);
                }

                await File.WriteAllBytesAsync(savingPath, content);

                var currentUrl = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}";
                var pathForDatabase = Path.Combine(currentUrl, "images", containerName, fileName).Replace("\\", "/");

                return pathForDatabase;
            }
        }


        public async Task<string> UpdateFile(IFormFile file, string containerName, string fileName, string fileRoute)
        {
            if (!string.IsNullOrEmpty(fileRoute))
            {
                await DeleteFile(fileRoute, containerName);
            }

            return await SaveFile(file, containerName, fileName);
        }


        public Task DeleteFile(string fileRoute, string containerName)
        {
            var fileName = Path.GetFileName(fileRoute);
            string fileDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", containerName, fileName);

            if (File.Exists(fileDirectory))
            {
                File.Delete(fileDirectory);
            }

            return Task.FromResult(0);
        }
    }
}
