﻿using Microsoft.AspNetCore.Identity;

namespace ManagementSystem.Models.DbModels
{
	public class ApplicationUser : IdentityUser
	{
        // initialize navigation property collection in constructor
        public ApplicationUser() => Orders = new HashSet<Order>();
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = String.Empty;

        public string? RoleType { get; set; }
		public string? IsLocked { get; set; }

		public ICollection<Order> Orders { get; set; }
    }
}
