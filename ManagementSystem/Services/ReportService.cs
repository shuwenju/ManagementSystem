using ManagementSystem.Models;
using ManagementSystem.Models.DbModels;

namespace ManagementSystem.Services
{
    public class ReportService
    {
        private readonly ApplicationDbContext _context;

        public ReportService(ApplicationDbContext context)
        {
            _context = context;
        }

        //Gives 5 employees, replace .Take() value with amount of employees you'd like to sort.
        public IEnumerable<ApplicationUser> GetTopEmployeesByOrderRevenue(DateTime startDate, DateTime endDate)
        {
            var topEmployeeIds = _context.Orders
                .Where(o => o.CreatedAt >= startDate && o.CreatedAt <= endDate)
                .GroupBy(o => o.ApplicationUserId)
                .OrderByDescending(g => g.Sum(o => o.CrossAmount))
                .Take(5)
                .Select(g => g.Key)
                .ToList();

            return _context.Users
                .Where(u => topEmployeeIds.Contains(u.Id))
                .ToList();
        }


        public IEnumerable<Item> GetTop10PopularItems(DateTime startDate, DateTime endDate)
        {
            return _context.OrderItems
                .Where(oi => oi.Order.CreatedAt >= startDate && oi.Order.CreatedAt <= endDate)
                .GroupBy(oi => oi.ItemId)
                .OrderByDescending(g => g.Sum(oi => oi.ItemQuantity))
                .Take(10)
                .Select(g => g.First().Item)
                .ToList();
        }

        public IEnumerable<Customer> GetTop5CustomersByRevenue(DateTime startDate, DateTime endDate)
        {
            return _context.Orders
                .Where(o => o.CreatedAt >= startDate && o.CreatedAt <= endDate)
                .GroupBy(o => o.CustomerId)
                .OrderByDescending(g => g.Sum(o => o.CrossAmount))
                .Take(5)
                .Select(g => g.First().Customer)
                .ToList();
        }

        public IEnumerable<Item> GetItemsWithLowestStock()
        {
            return _context.Items
                .OrderBy(i => i.QuantityInStock)
                .Take(10)
                .ToList();
        }


    }

}
