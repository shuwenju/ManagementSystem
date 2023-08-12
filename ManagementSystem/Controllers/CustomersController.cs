using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ManagementSystem.Models;
using ManagementSystem.Models.DbModels;
using ManagementSystem.Dtos;

namespace ManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            if (_context.Customers == null)
            {
                return NotFound();
            }
            return await _context.Customers.ToListAsync();
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer([FromRoute] int id)
        {
            if (_context.Customers == null)
            {
                return NotFound();
            }
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Id == id);

            if (customer == null)
            {
                return NotFound("Customer Not Found");
            }

            return Ok(customer);
        }

        // POST: api/Customers
        [HttpPost]
        public async Task<ActionResult> PostCustomer([FromBody] CustomerDto dto)
        {

            var newCustomer = new Customer()
            {
                Name = dto.Name,
                Email = dto.Email,
                Address = dto.Address,
                PhoneNumber = dto.PhoneNumber
            };
            await _context.Customers.AddAsync(newCustomer);
            await _context.SaveChangesAsync();

            return Ok("Customer Saved Successfully");
        }

        // PUT: api/Customers/id
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer([FromRoute] int id, [FromBody] CustomerDto dto)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Id == id);

            if (customer is null)
            {
                return NotFound("Customer Not Found");
            }

            customer.Name = dto.Name;
            customer.Email = dto.Email;
            customer.Address = dto.Address;
            customer.PhoneNumber = dto.PhoneNumber;

            await _context.SaveChangesAsync();

            return Ok("Customer Updated Successfully");
        }

        // DELETE: api/Customers/id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer([FromRoute] int id)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(q => q.Id == id);

            if (customer is null)
            {
                return NotFound("Customer Not Found");
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return Ok("Customer Deleted Successfully");
        }
    }
}
