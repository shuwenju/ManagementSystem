using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.Models.DbModels
{
    public class OrderItem
    {
        public int Id { get; set; }

        //OrderId foreign key property
        public int OrderId { get; set; }

        [ValidateNever]
        public Order Order { get; set; } = null!;

        //ItemId foreign key property
        public int ItemId { get; set; }

        [ValidateNever]
        public Item Item { get; set; } = null!;

        public int ItemQuantity { get; set; }

    }
}
