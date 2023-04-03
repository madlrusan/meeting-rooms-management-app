using Application.Abstractions;
using DataAccess;
using DataAccess.Repositories;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Configuration
{
    public static class ServicesConfig
    {
        public static IServiceCollection AddServices(this IServiceCollection services, string connectionString)
        {
            services.AddDataServices(connectionString);
            services.AddScopes();
            services.AddHttpContextAccessor();
            return services;
        }
        private static IServiceCollection AddScopes(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRoomRepository, RoomRepository>();
            return services;
        }
        private static IServiceCollection AddDataServices(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<RoomDbContext>(options => options.UseSqlServer(connectionString, b => b.MigrationsAssembly("DataAccess")));
            services.AddIdentity<User, IdentityRole>(o =>
            {
                o.Password.RequireDigit = false;
                o.Password.RequireLowercase = false;
                o.Password.RequireUppercase = false;
                o.Password.RequireNonAlphanumeric = false;
                o.Password.RequiredLength = 7;
            }).AddEntityFrameworkStores<RoomDbContext>()
                .AddDefaultTokenProviders()
                .AddRoleManager<RoleManager<IdentityRole>>();
            return services;
        }

    }
}
