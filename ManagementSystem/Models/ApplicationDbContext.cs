using ManagementSystem.Models.DbModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ManagementSystem.Models
{
	public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
	{
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        // DbSet for the AspNetUsers table
        //public DbSet<ApplicationUser> User { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);
			SeedDataAdmin(builder);
		}


		private void SeedDataAdmin(ModelBuilder builder)
		{
			// Seed roles

			var adminRole = new IdentityRole() { Name = "Admin", ConcurrencyStamp = "1", NormalizedName = "Admin" };
			var userRole = new IdentityRole() { Name = "User", ConcurrencyStamp = "2", NormalizedName = "User" };
			builder.Entity<IdentityRole>().HasData(adminRole, userRole);

			// Create a hasher to hash the password
			var hasher = new PasswordHasher<ApplicationUser>();
			var adminUser = new ApplicationUser
			{
				Id = Guid.NewGuid().ToString(),
				UserName = "admin",
				NormalizedUserName = "ADMIN",
				Email = "admin@test.com",
				NormalizedEmail = "ADMIN@TEST.COM",
				EmailConfirmed = true,
				PasswordHash = hasher.HashPassword(null, "Admin-123")
			};

			builder.Entity<ApplicationUser>().HasData(adminUser);

			// Assign the "Admin" role to the admin user
			builder.Entity<IdentityUserRole<string>>().HasData(
				new IdentityUserRole<string> { RoleId = adminRole.Id, UserId = adminUser.Id }
			);
		}

	}
}
