﻿using System;
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
    public class ItemsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ItemsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Items
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
          if (_context.Items == null)
          {
              return NotFound();
          }
            return await _context.Items.ToListAsync();
        }

        // GET: api/Items/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem([FromRoute] int id)
        {
          if (_context.Items == null)
          {
              return NotFound();
          }
            var item = await _context.Items.FirstOrDefaultAsync(i => i.Id == id);

            if (item == null)
            {
                return NotFound("Item Not Found");
            }

            return Ok(item);
        }

        // POST: api/Items
        [HttpPost]
        public async Task<ActionResult> PostItem([FromBody] ItemDto dto)
        {
            var newItem = new Item()
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                QuantityInStock = dto.QuantityInStock
            };
            await _context.Items.AddAsync(newItem);
            await _context.SaveChangesAsync();

            return Ok("Item Saved Successfully");
        }

        // PUT: api/Items/id
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem([FromRoute] int id, [FromBody] ItemDto dto)
        {
            var item = await _context.Items.FirstOrDefaultAsync(i => i.Id == id);

            if (item is null)
            {
                return NotFound("Customer Not Found");
            }

            item.Name = dto.Name;
            item.Description = dto.Description;
            item.Price = dto.Price;
            item.QuantityInStock = dto.QuantityInStock;

            await _context.SaveChangesAsync();

            return Ok("Item Updated Successfully");
        }

        // DELETE: api/Items/id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Items.FirstOrDefaultAsync(i => i.Id == id);

            if (item is null)
            {
                return NotFound("Item Not Found");
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return Ok("Item Deleted Successfully");
        }
    }
}