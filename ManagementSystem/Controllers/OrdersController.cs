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
using AutoMapper;
using ManagementSystem.ViewModels;
using Humanizer;
using System.Security.Claims;

namespace ManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public OrdersController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderViewModel>>> GetOrders()
        {
            if (_context.Orders == null)
            {
                return NotFound();
            }
            var orders = await _context.Orders
                .Include(o => o.ApplicationUser)
                .Include(o => o.Customer)
                .AsNoTracking()
                .ToListAsync();

            var ordersViewModel = _mapper.Map<List<OrderViewModel>>(orders);
            return Ok(ordersViewModel);
        }

        // GET: api/Orders/id
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder([FromRoute] int id)
        {
            if (_context.Orders == null)
            {
                return NotFound();
            }
            // load order with all relationship
            var order = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.ApplicationUser)
                .Include(o => o.OrderItems)
                .ThenInclude(o => o.Item)
                .AsNoTracking()
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound(
                    new Response { Status = "Error", Message = "Order not found!" }
                    );
            }

            // retun only the required fileds by mapping to OrderViewModel
            OrderViewModel orderViewModel = _mapper.Map<OrderViewModel>(order);

            return Ok(orderViewModel);
        }

        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder([FromBody] OrderDto dto)
        {
            //string currenetUserName = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;
            //for testing UserName is "admin" to be change with currenetUserName
            var authUser = _context.Users.FirstOrDefault(u => u.UserName == "admin");

            var newOrder = new Order()
            {
                CustomerId = dto.CustomerId,
                ApplicationUser = authUser,
                CrossAmount = dto.CrossAmount,
                ShippingAddress = dto.ShippingAddress,
                OrderStatus = "Pending"
            };

            try
            {
                foreach (var orderItemDto in dto.OrderItemDtos)
                {
                    var orderItem = new OrderItem()
                    {
                        ItemId = orderItemDto.ItemId,
                        ItemQuantity = orderItemDto.ItemQuantity,
                        Order = newOrder
                    };
                    await _context.OrderItems.AddAsync(orderItem);
                }

                await _context.Orders.AddAsync(newOrder);
                await _context.SaveChangesAsync();

                return Ok("Order Saved Successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Status = "Error", Message = "Order failed to create! " + ex.Message });
            }

        }

        // PUT: api/Orders/id
        [HttpPut("{id}")]
        public async Task<IActionResult> EditOrderStatus([FromRoute] int id, [FromBody] OrderStatusDto dto)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == id);

            if (order is null)
            {
                return NotFound("Order Not Found");
            }

            order.OrderStatus = dto.Status;

            await _context.SaveChangesAsync();

            return Ok("Order Status Updated Successfully");
        }
    }
}
