using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace Sevensoft.Mexpress.Backend.Web.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();

            var corsBuilder = new CorsPolicyBuilder();
            corsBuilder.AllowAnyHeader();
            corsBuilder.AllowAnyMethod();
            corsBuilder.AllowAnyOrigin(); // For anyone access.
            corsBuilder.WithOrigins("http://localhost:4200"); // for a specific url. Don't add a forward slash on the end!
            corsBuilder.AllowCredentials();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
       
            //OJO, ESTE ES EL ORIGINAL
            services.AddCors(options =>
            {
                options.AddPolicy("SiteCorsPolicy", corsBuilder.Build());

                // options.AddPolicy("AllowAllOrigins",
                //     builder =>
                //     {
                //         builder
                //             .AllowAnyOrigin()
                //             .AllowAnyHeader()
                //             .AllowAnyMethod();
                //     });
            });


            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
             .AddJwtBearer(options =>
             {
                 options.TokenValidationParameters =
                      new TokenValidationParameters
                      {
                          ValidateIssuer = false,
                          ValidateAudience = false,
                          ValidateLifetime = true,
                          ValidateIssuerSigningKey = true,

                          ValidIssuer = "Sevensoft",
                          ValidAudience = "Sevensoft",
                          IssuerSigningKey = JwtSecurityKey.Create(appSettings.Secret)
                      };
                 options.Events = new JwtBearerEvents
                 {
                     OnAuthenticationFailed = context =>
                      {
                          Console.WriteLine("OnAuthenticationFailed: " +
                              context.Exception.Message);
                          return Task.CompletedTask;
                      },
                     OnTokenValidated = context =>
                      {
                          Console.WriteLine("OnTokenValidated: " +
                              context.SecurityToken);
                          return Task.CompletedTask;
                      }
                 };
             });

            services.AddAntiforgery(options => options.HeaderName = "X-XSRF-TOKEN");

            services.AddMvc();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors(builder =>
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader());
            app.UseAuthentication();
            app.UseMvc();

        }

    }
}
