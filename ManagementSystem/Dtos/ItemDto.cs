namespace ManagementSystem.Dtos
{
    public class ItemDto
    {
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public double Price { get; set; }

        public int QuantityInStock { get; set; }
    }
}
