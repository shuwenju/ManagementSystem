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
using ManagementSystem.Dtos;

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

		// PUT: api/Customers/id
	
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

				employee.IsLocked = "1";


				var result= await _userManager.UpdateAsync(employee);
				if (result.Succeeded)
				{
					return StatusCode(StatusCodes.Status200OK,
						new Response { Status = "Success", Message = "Customer updated successfully" });
				}



				return Ok(new Response { Status = "Success", Message = $"Employee {username} has been blocked out until 9999-12-31." });
			}
			catch (Exception ex)
			{
				// Handle exceptions
				return StatusCode(500, new Response { Status = "Error", Message = "An error occurred while processing the request." });
			}
		}



		[HttpPut]
		[Route("blockout2/{username}")]
		public async Task<IActionResult> UpdateEmployee([FromRoute] string username, [FromBody] EmployeeUpdateDto updatedEmployee)
		{
			try
			{
				var employee = await _userManager.Users.FirstOrDefaultAsync(user => user.UserName == username);

				if (employee == null)
				{
					return NotFound();
				}

				// Update employee properties based on the provided data
				employee.FirstName = updatedEmployee.FirstName;
				employee.LastName = updatedEmployee.LastName;
				employee.Email = updatedEmployee.Email;
				// Update other properties as needed

				var result = await _userManager.UpdateAsync(employee);
				if (result.Succeeded)
				{
					return StatusCode(StatusCodes.Status200OK,
						new Response { Status = "Success", Message = "Employee updated successfully" });
				}

				return StatusCode(StatusCodes.Status500InternalServerError,
					new Response { Status = "Error", Message = "Employee update failed" });
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
				user.IsLocked,

			});
			return Ok(userData);
		}




	}
}





