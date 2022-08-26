﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using DemoPOS.Configurations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DemoPOS.Startups
{
    public static class AuthorizationServices
    {
        /// <summary>
        /// Add Authentication
        /// </summary>
        public static IServiceCollection AddAuthorizationWithOAuth(
            this IServiceCollection services, 
            OAuthSetting oAuthSetting)
        {
            if (!oAuthSetting.EnableOAuth) return services;

            services.AddAuthorization(options =>
            {
                // อ่าน Class Permission.cs หา string ทั้งหมด
                FieldInfo[] names = typeof(Permission).GetFields()
                    .Where(_ => _.FieldType == typeof(string)).ToArray();

                // อ่าน Class Permission.cs หา AuthorizationPolicy ทั้งหมด
                FieldInfo[] permissions = typeof(Permission).GetFields()
                    .Where(_ => _.FieldType == typeof(AuthorizationPolicy)).ToArray();

                // ตั้งค่า Permission ตามข้อมูลใน Permission.cs
                foreach (FieldInfo name in names)
                {
                    string permissionName = name.GetValue(null).ToString();
                    AuthorizationPolicy permission = 
                        (AuthorizationPolicy) permissions.Where(p => p.Name == $"{name.Name}Permission").First().GetValue(null);

                    if (permission != null) options.AddPolicy(permissionName, permission);
                }
            });

            services.AddAuthentication(config =>
            {
                config.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.Authority = oAuthSetting.Authority;
                    options.Audience = oAuthSetting.Audience;
                    options.RequireHttpsMetadata = true;

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero,
                        NameClaimType = "name",
                        RoleClaimType = "roles"
                    };
                });

            return services;
        }

    }
}
