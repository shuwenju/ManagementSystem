using ManagementSystem.Models.DbModels;

namespace ManagementSystem.Dtos
{
    public class OrderDto
    {
        public int CustomerId { get; set; }
        public double CrossAmount { get; set; }
        public string ShippingAddress { get; set; } = string.Empty;
        public ICollection<OrderItemDto> OrderItemDtos { get; set; }
    }
}
