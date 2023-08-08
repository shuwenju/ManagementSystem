using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.Models.Authentication.Signup
{
	public class ResetPassword
	{
		[Required]
		public string Password { get; set; } = null!;

		[Compare("Password", ErrorMessage = "Password and Comfirm Password do not match")]
		public string ConfirmPassword { get; set;} = null!;
		public string Email { get; set; }= null!;
		public string Token { get; set; } = null!;
	}
}
