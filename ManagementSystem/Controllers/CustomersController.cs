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
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace ManagementSystem.Controllers
{
	[Authorize(Roles = "Admin, User")]
	[Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public CustomersController(ApplicationDbContext context)
        {
			_dbContext = context;
        }

        // GET: api/Customers/allCustomers
        [HttpGet]
		[Route("allCustomers")]
		public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            if (_dbContext.Customers == null)
            {
				return StatusCode(StatusCodes.Status404NotFound,
					new Response { Status = "Error", Message = "Customer not found!" });
			}
            return await _dbContext.Customers.ToListAsync();
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer([FromRoute] int id)
        {
   //         if (_dbContext.Customers == null)
   //         {
			//	return StatusCode(StatusCodes.Status404NotFound,
			//		new Response { Status = "Error", Message = "Customer not found!" });
			//}
            var customer = await _dbContext.Customers.FirstOrDefaultAsync(c => c.Id == id);

            if (customer == null)
            {
				return StatusCode(StatusCodes.Status404NotFound,
					new Response { Status = "Error", Message = "Customer not found!" });
			}

            return Ok(customer);
        }

        // POST: api/Customers/addCustomer
        [HttpPost]
		[Route("addCustomer")]
		public async Task<ActionResult> addCustomer([FromBody] CustomerDto dto)
        {
			var existingCustomer = await _dbContext.Customers.FirstOrDefaultAsync(c => c.Email == dto.Email);
			if (existingCustomer != null)
			{
				return StatusCode(StatusCodes.Status403Forbidden,
					new Response { Status = "Error", Message = "Custoer already exists!" });
			}

			var newCustomer = new Customer()
            {
                Name = dto.Name,
                Email = dto.Email,
                Address = dto.Address,
                PhoneNumber = dto.PhoneNumber
            };
            var result = await _dbContext.Customers.AddAsync(newCustomer);
            if(result != null)
            {
				await _dbContext.SaveChangesAsync();
				return StatusCode(StatusCodes.Status200OK,
					new Response { Status = "Success", Message = "Customer created successfully" });
			}
			return StatusCode(StatusCodes.Status500InternalServerError,
						new Response { Status = "Error", Message = "Customer failed to create!" });
		}

        // PUT: api/Customers/id
        [HttpPut("{id}")]
		public async Task<IActionResult> PutCustomer([FromRoute] int id, [FromBody] CustomerDto dto)
        {
            var customer = await _dbContext.Customers.FirstOrDefaultAsync(c => c.Id == id);

            if (customer is null)
            {
				return StatusCode(StatusCodes.Status404NotFound,
					new Response { Status = "Error", Message = "Customer not found!" });
            }
            else
            {
				customer.Name = dto.Name;
				customer.Email = dto.Email;
				customer.Address = dto.Address;
				customer.PhoneNumber = dto.PhoneNumber;

				var result = await _dbContext.SaveChangesAsync();
				if (result > 0)
				{
					return StatusCode(StatusCodes.Status200OK,
						new Response { Status = "Success", Message = "Customer updated successfully" });
				}
			}
           
			return StatusCode(StatusCodes.Status500InternalServerError,
						 new Response { Status = "Error", Message = "Customer failed to update!" });
		}

        // DELETE: api/Customers/id
        [HttpDelete("{id}")]
		public async Task<IActionResult> DeleteCustomer([FromRoute] int id)
        {
            var customer = await _dbContext.Customers.FirstOrDefaultAsync(q => q.Id == id);

            if (customer is null)
            {
				return StatusCode(StatusCodes.Status404NotFound,
					new Response { Status = "Error", Message = "Customer not found!" });
			}

			_dbContext.Customers.Remove(customer);
			var deletedCount = await _dbContext.SaveChangesAsync();
            if (deletedCount > 0)
            {
                return StatusCode(StatusCodes.Status200OK,
                new Response { Status = "Success", Message = "Customer deleted successfully" });
            }
			return StatusCode(StatusCodes.Status500InternalServerError,
			 new Response { Status = "Error", Message = "Customer failed to delete!" });
		}
    }
}
