using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext() { }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            var defaultUserRoles = new List<IdentityRole>()
            {
                new IdentityRole("Admin"){NormalizedName = "ADMIN"},
                new IdentityRole("User"){NormalizedName = "USER"},
                new IdentityRole("Room"){NormalizedName = "ROOM"}
            };
            base.OnModelCreating(builder);
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms { get; set; }

    }
}
