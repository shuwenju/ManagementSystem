using ManagementSystem.Models;
using ManagementSystem.Models.Authentication.Signup;
using ManagementSystem.Models.DbModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Security.Claims;

namespace ManagementSystem.Controllers;

[Authorize(Roles = "Admin, User")]
[Route("api/[controller]")]
[ApiController]
public class ProfileController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;

    public ProfileController(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }
    [HttpGet]
    public async Task<ActionResult<ApplicationUser>> GetProfile()
    {
        var user = await getAuthUser();

        return Ok(new {user.FirstName, user.LastName, user.Email});
    }

    [HttpPost]
    public async Task<IActionResult> UpdateProfile([FromBody] EmployeeUpdateDto dto)
    {
        ApplicationUser user = await getAuthUser();
        user.FirstName = dto.FirstName;
        user.LastName = dto.LastName;
        var result = await _userManager.UpdateAsync(user);
        if (result.Succeeded)
        {
            return Ok(new Response { Status = "Success", Message = "User updated successfully" });
        }

        return BadRequest(new Response { Status = "Error", Message = "Employee update failed" });
    }

    [HttpPost("changePassword")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePassword dto)
    {
        var user = await getAuthUser();
        var result = await _userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.NewPassword);
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }
            return BadRequest(ModelState);
        }
        return Ok(new Response { Status = "Success", Message = "Password has been changed." });
    }

    private async Task<ApplicationUser> getAuthUser()
    {
        // get current authenticated user
        return await _userManager.FindByNameAsync(User.Identity.Name);
    }
}

