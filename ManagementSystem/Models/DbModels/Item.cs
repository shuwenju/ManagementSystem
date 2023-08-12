using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.Models.DbModels
{
    public class Item
    {
        // initialize navigation property collection in constructor
        public Item() => OrderItems = new HashSet<OrderItem>();
        public int Id { get; set; }

        [Required(ErrorMessage = "Item name is required")]
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "Price is required")]
        public double Price { get; set; }

        [Required(ErrorMessage = "Quantity is required")]
        public int QuantityInStock { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; }
    }
}
