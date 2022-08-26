﻿using Microsoft.Extensions.DependencyInjection;
using DemoPOS.Configurations;
using Quartz;
using System;
using DemoPOS.HostedServices;

namespace DemoPOS.Startups
{
    internal static class QuartServices
    {
        internal static IServiceCollection AddQuart(this IServiceCollection services, QuartzSetting quartzSetting)
        {
            if (!quartzSetting.EnableQuartz) return services;
            
            services.AddQuartz(q =>
            {
                // Use a Scoped container to create jobs.
                q.UseMicrosoftDependencyInjectionScopedJobFactory();
                q.ConfigQuartz(quartzSetting);
            });

            services.AddQuartzHostedService(options => options.WaitForJobsToComplete = true);

            return services;
        }

        internal static void AddJobAndTrigger<T>(this IServiceCollectionQuartzConfigurator quartz, QuartzSetting quartSetting) where T : IJob
        {
            // Use the name of the IJob as the appsettings.json key
            string jobName = typeof(T).Name;

            // Try and load the schedule from configuration
            var cronSchedule = quartSetting.Jobs[jobName];

            // Some minor validation
            if (string.IsNullOrEmpty(cronSchedule))
            {
                throw new ArgumentNullException($"No Quartz.NET Cron schedule found for job in configuration at {jobName}");
            }

            // register the job as before
            var jobKey = new JobKey(jobName);
            quartz.AddJob<T>(opts => opts.WithIdentity(jobKey));

            quartz.AddTrigger(opts => opts
                .ForJob(jobKey)
                .WithIdentity(jobName + "-trigger")
                .WithCronSchedule(cronSchedule)); // use the schedule from configuration
        }
    }
}
