using ManagementSystem.Models.DbModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ManagementSystem.Models
{
	public class ApplicationDbContext : IdentityDbContext<IdentityUser>
	{
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

		// DbSet for the AspNetUsers table
		//public DbSet<ApplicationUser> User { get; set; }


		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);
			SeedRoles(builder);
		}

		private void SeedRoles(ModelBuilder builder)
		{
			builder.Entity<IdentityRole>().HasData(
				new IdentityRole() { Name = "Admin", ConcurrencyStamp = "1", NormalizedName ="Admin"},
				new IdentityRole() { Name = "User", ConcurrencyStamp = "2", NormalizedName = "User" }
				);
		}
	}
}
