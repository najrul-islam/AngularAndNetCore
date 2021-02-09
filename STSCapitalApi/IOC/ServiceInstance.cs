using DataAccess.GenericRepositoryAndUnitOfWork;
using DataAccess.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Service;
using Utility.PasswordHelper;
using Utility.StaticData;

namespace STSCapitalApi
{
    public static class ServiceInstance
    {
        public static void RegisterSTSCapitalServiceInstance(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString(nameof(STSCapitalContext));
            services.AddDbContext<STSCapitalContext>(options => options.UseSqlServer(connectionString, sql => sql.MigrationsAssembly(StaticData.MIGRATION_ASSEMBLY)));
            services.AddScoped<DbContext, STSCapitalContext>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient(provider => configuration);


            services.AddTransient<IAuthorizationService, AuthorizationService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<ITaskService, TaskService>();
            services.AddTransient<IPasswordHasher, PasswordHasher>();

            // generic DI
            services.AddTransient(typeof(IRepository<>), typeof(Repository<>));
        }
    }
}
