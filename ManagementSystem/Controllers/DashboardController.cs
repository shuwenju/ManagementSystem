using ManagementSystem.Models;
using ManagementSystem.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ManagementSystem.Controllers
{
    [Authorize(Roles = "Admin, User")]
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DashboardController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Dashboard
        [HttpGet]
        public async Task<ActionResult<DashboardViewModel>> Index()
        {
            int newOrdersCount = _context.Orders.Where(o => o.CreatedAt >= DateTime.Today.AddDays(-7)).Count();
            int cancelledOrdersCount = _context.Orders.Where(o => o.OrderStatus == "Cancelled").Count();
            int totalOrdersCount = _context.Orders.Count();
            int lowInStockItemsCount = _context.Items.Where(i => i.QuantityInStock < 5).Count();
            int OutOfStockItemsCount = _context.Items.Where(i => i.QuantityInStock == 0).Count();

            var dashboard = new DashboardViewModel()
            {
                NewOrdersCount = newOrdersCount,
                CancelledOrdersCount = cancelledOrdersCount,
                TotalOrdersCount = totalOrdersCount,
                LowInStockItemsCount = lowInStockItemsCount,
                OutOfStockItemsCount = OutOfStockItemsCount,
            };
            return Ok(dashboard);
        }
    }
}
