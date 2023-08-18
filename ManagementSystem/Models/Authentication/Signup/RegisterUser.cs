using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.Models.Authentication.Signup
{
	public class RegisterUser
	{
        [Required(ErrorMessage = "FirstName is required")]
        public string? FirstName { get; set; }

        [Required(ErrorMessage = "LastName is required")]
        public string? LastName { get; set; }

        [Required(ErrorMessage="User Name is required")]
		public string? Username { get; set; }

		[EmailAddress]
		[Required(ErrorMessage = "Email is required")]
		public string? Email { get; set; }

		[Required(ErrorMessage = "Password is required")]
		public string? Password { get; set; }

		public string RoleType { get; set; }

	}
}
