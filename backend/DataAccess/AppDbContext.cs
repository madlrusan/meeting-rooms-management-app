using System.Reflection.Emit;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            var defaultUserRoles = new List<IdentityRole>()
            {
                new IdentityRole("Admin"){NormalizedName = "ADMIN"},
                new IdentityRole("User"){NormalizedName = "USER"},
            };
            builder.Entity<IdentityRole>().HasData(defaultUserRoles);
            base.OnModelCreating(builder);
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<ScheduleEvent> ScheduleEvents { get; set; }

    }
}
