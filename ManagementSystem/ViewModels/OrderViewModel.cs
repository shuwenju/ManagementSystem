namespace ManagementSystem.ViewModels
{
    public class OrderViewModel
    {
        public int Id { get; set; }
        public CustomerViewModel? Customer { get; set; }
        public ApplicationUserViewModel? ApplicationUser { get; set; }
        public DateTime CreatedAt { get; set; }
        public double CrossAmount { get; set; }
        public string? ShippingAddress { get; set; }
        public string? OrderStatus { get; set; }
        public ICollection<OrderItemViewModel> OrderItems { get; set; }
    }
}
