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

namespace ManagementSystem.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthenticationController : ControllerBase
	{
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IEmailService _emailService;
		private readonly IConfiguration _configuration;
          
        public AuthenticationController(UserManager<IdentityUser> userManager, 
               RoleManager<IdentityRole> roleManager,
			   IEmailService emailService, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
			_emailService = emailService;
			_configuration = configuration;
        }

        [HttpPost]
		[Route("register")]
		public async Task<IActionResult> Register([FromBody] RegisterUser registerUser, string role)
        {
			// check if user exist, if exist return error
			var existUser = await _userManager.FindByEmailAsync(registerUser.Email);
			if (existUser != null)
			{
				return StatusCode(StatusCodes.Status403Forbidden,
					new Response { Status = "Error", Message = "User already exists!" });
			}

			// if user not exist, add to database
			IdentityUser user = new IdentityUser
			{
				Email = registerUser.Email,
				SecurityStamp = Guid.NewGuid().ToString(),
				UserName = registerUser.Username
			};

			//check if role exist
			if(await _roleManager.RoleExistsAsync(role))
			{
				var result = await _userManager.CreateAsync(user, registerUser.Password);

				if (!result.Succeeded)
				{
					return StatusCode(StatusCodes.Status500InternalServerError,
						new Response { Status = "Error", Message = "User failed to create!" });
				}

				//if role exist, asign role to user
				await _userManager.AddToRoleAsync(user, role);

				// Add token to verify email
				var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
				var confirmationLink = Url.Action(nameof(ConfirmEmail), "Authentication", new { token, email = user.Email }, Request.Scheme);
				var message = new Message(new string[] { user.Email! }, "Confirmation email link", confirmationLink!);
			    _emailService.SendEmail(message);

				return StatusCode(StatusCodes.Status200OK,
					new Response { Status = "Success", Message = "User created successfully, email sent successfully" });
			}
			else
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
						new Response { Status = "Error", Message = "Role doesn't exist!" });
			}


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
			if(user != null && await _userManager.CheckPasswordAsync(user,loginModel.Password))
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
