using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ManagementSystem.Models.Authentication;
using ManagementSystem.Models.DbModels;

namespace ManagementSystem.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AspNetUsersController : ControllerBase
	{
		private readonly UserManager<ApplicationUser> _userManager;

		public AspNetUsersController(UserManager<ApplicationUser> userManager)
		{
			_userManager = userManager;
		}

		[HttpGet]
		public IActionResult GetUsers()
		{
			var users = _userManager.Users.ToList();
			return Ok(users);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetUserById(string id)
		{
			var user = await _userManager.FindByIdAsync(id);
			if (user == null)
			{
				return NotFound();
			}
			return Ok(user);
		}

		[HttpPost]
		public async Task<IActionResult> CreateUser([FromBody] ApplicationUser user)
		{
			if (ModelState.IsValid)
			{
				var result = await _userManager.CreateAsync(user);
				if (result.Succeeded)
				{
					return StatusCode(StatusCodes.Status201Created);
				}
				return BadRequest(result.Errors);
			}
			return BadRequest(ModelState);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateUser(string id, [FromBody] ApplicationUser user)
		{
			var existingUser = await _userManager.FindByIdAsync(id);
			if (existingUser == null)
			{
				return NotFound();
			}

			existingUser.UserName = user.UserName;
			existingUser.Email = user.Email;
			// Update other user properties as needed

			var result = await _userManager.UpdateAsync(existingUser);
			if (result.Succeeded)
			{
				return Ok(existingUser);
			}
			return BadRequest(result.Errors);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteUser(string id)
		{
			var user = await _userManager.FindByIdAsync(id);
			if (user == null)
			{
				return NotFound();
			}

			var result = await _userManager.DeleteAsync(user);
			if (result.Succeeded)
			{
				return NoContent();
			}
			return BadRequest(result.Errors);
		}
	}
}

