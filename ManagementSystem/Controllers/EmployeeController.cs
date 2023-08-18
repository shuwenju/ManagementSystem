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
using Microsoft.EntityFrameworkCore;

namespace ManagementSystem.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class EmployeeController : ControllerBase
	{
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly SignInManager<ApplicationUser> _signInManager;
		private readonly RoleManager<IdentityRole> _roleManager;
		private readonly IEmailService _emailService;
		private readonly IConfiguration _configuration;


		public EmployeeController(UserManager<ApplicationUser> userManager,
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
		[Route("blockout/{username}")]
		public async Task<IActionResult> BlockoutEmployee(string username)
		{
			try
			{
				var employee = await _userManager.Users.FirstOrDefaultAsync(user => user.UserName == username);

				if (employee == null)
				{
					return NotFound();
				}

				// Set BlockoutEnd to a future date (e.g., 9999-12-31)
			//	employee.LockoutEnd = new DateTime(9999, 12, 31).ToString("yyyy-MM-dd");
				

				await _userManager.UpdateAsync(employee);

				return Ok(new Response { Status = "Success", Message = $"Employee {username} has been blocked out until 9999-12-31." });
			}
			catch (Exception ex)
			{
				// Handle exceptions
				return StatusCode(500, new Response { Status = "Error", Message = "An error occurred while processing the request." });
			}
		}


		[HttpGet]
		[Route("users")]
		public async Task<IActionResult> GetRegisteredUsers()
		{

			/*var registeredUsers = await _userManager.Users.ToListAsync();
			 * */
			/*
			 * var registeredUsers = await _userManager.Users
				.Where(user=>user.LockoutEnd==null)
				.ToListAsync();*/

			var registeredUsers = await _userManager.Users		   
			   .ToListAsync(); 

		   var userData = registeredUsers.Select(user => new
			{
				user.UserName,
				user.FirstName,
				user.LastName,
				user.Email,
				user.RoleType,
				user.LockoutEnd,
				
			});
			return Ok(userData);
		}


		
		
	}
}






