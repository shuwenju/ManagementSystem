using ManagementSystem.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagementSystem.Controllers
{
	[Authorize(Roles = "Admin")]
	[Route("api/[controller]")]
	[ApiController]
	public class AdminController : ControllerBase
	{

		private readonly ApplicationDbContext _dbContext;

		public AdminController(ApplicationDbContext context)
		{
			_dbContext = context;
		}

		[HttpGet("employees")]
		public IEnumerable<string> Get()
		{
			return new List<string> { "Annie", "Bob", "Carter" };
		}
	}
}
