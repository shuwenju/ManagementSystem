using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ManagementSystem.Models.Authentication.Signup;
using ManagementSystem.Models;
using Management.Service.Services;
using Management.Service.Models;
using ManagementSystem.Models.Authentication.Login;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using System.ComponentModel.DataAnnotations;
using ManagementSystem.Models.DbModels;

namespace ManagementSystem.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthenticationController : ControllerBase
	{
        private readonly UserManager<ApplicationUser> _userManager;
		private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IEmailService _emailService;
		private readonly IConfiguration _configuration;
          
        public AuthenticationController(UserManager<ApplicationUser> userManager, 
               RoleManager<IdentityRole> roleManager,
			   IEmailService emailService, 
			   IConfiguration configuration,
			   SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
			_emailService = emailService;
			_signInManager = signInManager;
			_configuration = configuration;
        }

        [HttpPost]
		[Route("register")]
		public async Task<IActionResult> Register([FromBody] RegisterUser registerUser/*, string role*/)
        {
			// check if user exist, if exist return error
			var existUser = await _userManager.FindByEmailAsync(registerUser.Email);
			if (existUser != null)
			{
				return StatusCode(StatusCodes.Status403Forbidden,
					new Response { Status = "Error", Message = "User already exists!" });
			}

			// if user not exist, add to database
			ApplicationUser user = new ApplicationUser
			{
                FirstName = registerUser.FirstName,
                LastName = registerUser.LastName,
                Email = registerUser.Email,
				SecurityStamp = Guid.NewGuid().ToString(),
				UserName = registerUser.Username,
				//TwoFactorEnabled = true
			};

			//check if role exist
			//if(await _roleManager.RoleExistsAsync(role))
			//{
				var result = await _userManager.CreateAsync(user, registerUser.Password);

				if (!result.Succeeded)
				{
					return StatusCode(StatusCodes.Status500InternalServerError,
						new Response { Status = "Error", Message = "User failed to create!" });
				}

				//if role exist, asign role to user
				await _userManager.AddToRoleAsync(user, "User");

				// Add token to verify email
				var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
				var confirmationLink = Url.Action(nameof(ConfirmEmail), "Authentication", new { token, email = user.Email }, Request.Scheme);
				var message = new Message(new string[] { user.Email! }, "Confirmation email link", confirmationLink!);
			    _emailService.SendEmail(message);

				return StatusCode(StatusCodes.Status200OK,
					new Response { Status = "Success", Message = "User created successfully, email sent successfully" });
			//}
			//else
			//{
			//	return StatusCode(StatusCodes.Status500InternalServerError,
			//			new Response { Status = "Error", Message = "Role doesn't exist!" });
			//}


		}

		[HttpGet("ConfirmEmail")]
		public async Task<IActionResult> ConfirmEmail(string token, string email)
		{
			var user = await _userManager.FindByEmailAsync(email);
			if(user != null)
			{
				var result = await _userManager.ConfirmEmailAsync(user, token);
				if(result.Succeeded)
				{
					return StatusCode(StatusCodes.Status200OK,
						new Response { Status = "Success", Message = "Email verified successfully" });
				}
			}
			return StatusCode(StatusCodes.Status500InternalServerError,
				new Response { Status = "Error", Message = "User doesn't exist" });
		}

		[HttpPost]
		[Route("login")]
		public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
		{
			// check if user is present + check the password is valid?
			var user = await _userManager.FindByNameAsync(loginModel.Username);

			//if user enabled two factor auth, we won't give him the token right away
			//if (user.TwoFactorEnabled)
			//{
			//	await _signInManager.SignOutAsync();
			//	await _signInManager.PasswordSignInAsync(user, loginModel.Password, false, true);
			//	//generate token
			//	var token = await _userManager.GenerateTwoFactorTokenAsync(user, "Email");

			//	var message = new Message(new string[] { user.Email! }, "OTP Confirmation", token);
			//	_emailService.SendEmail(message);

			//	return StatusCode(StatusCodes.Status200OK,
			//		new Response { Status = "Success", Message = $"We sent an OTP to your Email {user.Email}" });
			//}

			if (user != null && await _userManager.CheckPasswordAsync(user,loginModel.Password) && user.EmailConfirmed)
			{
				//claimlist creation
				var authClaims = new List<Claim>
				{
					new Claim(ClaimTypes.Name, user.UserName),
					new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				};
				var userRoles = await _userManager.GetRolesAsync(user);

				foreach(var role in userRoles)
				{
					//add roles to the claimlist
					authClaims.Add(new Claim(ClaimTypes.Role, role));
				}


				//generate token with cliams
				var jwtToken = GetToken(authClaims);

				return Ok(new
				{
					token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
					expiration = jwtToken.ValidTo
				});
				//return the token
			}
			return Unauthorized();
			
		}

		//[HttpPost]
		//[Route("login-2FA")]
		//public async Task<IActionResult> LoginwithOTP(string accesscode, string username)
		//{
		//	var user = await _userManager.FindByNameAsync(username);
		//	var signIn = await _signInManager.TwoFactorSignInAsync("Email", accesscode, false, false);
		//	if (signIn.Succeeded)
		//	{
		//		if (user != null)
		//		{
		//			//claimlist creation
		//			var authClaims = new List<Claim>
		//		{
		//			new Claim(ClaimTypes.Name, user.UserName),
		//			new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
		//		};
		//			var userRoles = await _userManager.GetRolesAsync(user);

		//			foreach (var role in userRoles)
		//			{
		//				//add roles to the claimlist
		//				authClaims.Add(new Claim(ClaimTypes.Role, role));
		//			}


		//			//generate token with cliams
		//			var jwtToken = GetToken(authClaims);

		//			return Ok(new
		//			{
		//				token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
		//				expiration = jwtToken.ValidTo
		//			});
		//			//return the token
		//		}
		//	}
		//	return StatusCode(StatusCodes.Status404NotFound,
		//		new Response { Status = "Not Found", Message = "Invalid Code" });
		//}

		[HttpPost]
		[Route("forgot-password")]
		[AllowAnonymous]
		public async Task<IActionResult> ForgotPassword([Required] string email)
		{
			var user = await _userManager.FindByEmailAsync(email);
			if(user != null)
			{
				// if user found, you create and give them a token
				var token = await _userManager.GeneratePasswordResetTokenAsync(user);
				var forgotPasswordLink = Url.Action(nameof(ResetPassword), "Authentication", new {token, email=user.Email}, Request.Scheme);
				var message = new Message(new string[] { user.Email! }, "Forgot password link", forgotPasswordLink!);
				_emailService.SendEmail(message);
				return StatusCode(StatusCodes.Status200OK,
					new Response { Status = "Success", Message = $"Reset password request sent to email {user.Email}, please verify through email link" });
			}
			else
			{
				return StatusCode(StatusCodes.Status404NotFound,
					new Response { Status = "Not Found", Message = "User not found" });
			}
			return StatusCode(StatusCodes.Status400BadRequest,
					new Response { Status = "Error", Message = "Could not send to email, please try again" });
		}

		[HttpGet("reset-password")]
		public async Task<IActionResult> ResetPassword(string token, string email)
		{
			var model = new ResetPassword { Token = token, Email = email };
			return Ok(new
			{
				model
			});
		}

		[HttpPost]
		[Route("reset-password")]
		[AllowAnonymous]
		public async Task<IActionResult> ResetPassword(ResetPassword resetPassword)
		{
			var user = await _userManager.FindByEmailAsync(resetPassword.Email);
			if (user != null)
			{
				var resetPasswordResult = await _userManager.ResetPasswordAsync(user, resetPassword.Token, resetPassword.Password);
				// if its not succeed, we want to see the errors through model state
				if (!resetPasswordResult.Succeeded)
				{
					foreach(var error in resetPasswordResult.Errors)
					{
						ModelState.AddModelError(error.Code, error.Description);
					}
					return Ok(ModelState);
				}

				//if succeeded just return success response
				return StatusCode(StatusCodes.Status200OK,
					new Response { Status = "Success", Message = "Password has been changed."});

			}
			return StatusCode(StatusCodes.Status400BadRequest,
				new Response { Status = "Error", Message = "Could not find user." });
			
		}

		private JwtSecurityToken GetToken(List<Claim> authClaims)
		{
			var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

			var token = new JwtSecurityToken (
				issuer: _configuration["JWT:ValidIssuer"],
				audience: _configuration["JWT:ValidAudience"],
				expires: DateTime.Now.AddHours(3),
				claims: authClaims,
				signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));
			return token;
		}

	}
}
