﻿using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using DemoPOS.Configurations;
using DemoPOS.Filters;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.Startups
{
    public static class SwaggerServices
    {

        /// <summary>
        /// Add Swagger
        /// </summary>
        public static IServiceCollection AddSwaggerWithOAuth(
            this IServiceCollection services, 
            ProjectSetting projectSetting, 
            OAuthSetting oAuthSetting)
        {
            services.AddSwaggerGen(config =>
            {
                config.SwaggerDoc("v1",
                    new OpenApiInfo
                    {
                        Version = projectSetting.Version,
                        Title = projectSetting.Title,
                        Description = projectSetting.Description,
                    });

                if (!string.IsNullOrWhiteSpace(oAuthSetting.Authority))
                {
                    config.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                    {
                        Type = SecuritySchemeType.OAuth2,
                        Flows = new OpenApiOAuthFlows
                        {
                            AuthorizationCode = new OpenApiOAuthFlow
                            {
                                AuthorizationUrl = new Uri($"{oAuthSetting.Authority}/connect/authorize"),
                                TokenUrl = new Uri($"{oAuthSetting.Authority}/connect/token"),
                                Scopes = oAuthSetting.Scopes
                            }
                        }
                    }); 

                    config.OperationFilter<AuthorizeCheckOperationFilter>(oAuthSetting.Audience);
                }

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                config.IncludeXmlComments(xmlPath);
            });

            return services;
        }

        public static IApplicationBuilder UseSwaggerWithOAuth(
            this IApplicationBuilder app, 
            ProjectSetting projectSetting)
        {

            app.UseSwagger(config =>
            {
                config.PreSerializeFilters.Add((swagger, httpRequest) =>
                {
                    swagger.Servers.Clear();
                });
            });

            app.UseSwaggerUI(config =>
            {
                config.SwaggerEndpoint("/swagger/v1/swagger.json", projectSetting.Title);

                config.OAuthClientId("admin-client_api_swaggerui");
                config.OAuthAppName(projectSetting.Title);
                config.OAuthUsePkce();
            });

            return app;
        }
    }
}
