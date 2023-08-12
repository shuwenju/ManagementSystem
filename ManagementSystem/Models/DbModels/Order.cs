using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using static System.Reflection.Metadata.BlobBuilder;

namespace ManagementSystem.Models.DbModels
{
    public class Order
    {
        // initialize navigation property collection in constructor
        public Order() => OrderItems = new HashSet<OrderItem>();
        public int Id { get; set; }

        //CustomerId foreign key property
        [Required(ErrorMessage = "Please select a customer.")]
        public int CustomerId { get; set; }

        // navigation properties
        [ValidateNever]
        public Customer Customer { get; set; } = null!;

        //UserId foreign key property
        public int ApplicationUserId { get; set; }

        // navigation properties
        [ValidateNever]
        public ApplicationUser ApplicationUser { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public double CrossAmount { get; set; }

        public string ShippingAddress { get; set; } = string.Empty;

        public ICollection<OrderItem> OrderItems { get; set; }
    }
}
