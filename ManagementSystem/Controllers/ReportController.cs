using ManagementSystem.Dtos;
using ManagementSystem.Services;
using Microsoft.AspNetCore.Mvc;

namespace ManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly ReportService _reportService;

        public ReportController(ReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet("generate-report")]
        public IActionResult GenerateReport([FromQuery] DateRangeDto dateRange)
        {
            try
            {
                var topCustomerByRevenue = _reportService.GetTop5CustomersByRevenue(dateRange.Start, dateRange.End);
                var topItems = _reportService.GetTop10PopularItems(dateRange.Start, dateRange.End);
                var topEmployeesByRevenue = _reportService.GetTopEmployeesByOrderRevenue(dateRange.Start, dateRange.End);
                var itemsWithLowestStock = _reportService.GetItemsWithLowestStock();

                var reportData = new
                {
                    TopEmployeesByOrders = topCustomerByRevenue,
                    TopItems = topItems,
                    TopEmployeesByRevenue = topEmployeesByRevenue,
                    ItemsWithLowestStock = itemsWithLowestStock,
                };

                return Ok(reportData);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
