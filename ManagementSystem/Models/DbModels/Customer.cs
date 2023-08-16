using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.Models.DbModels
{
    public class Customer
    {
        // initialize navigation property collection in constructor
       //public Customer() => Orders = new HashSet<Order>();
        // primary key property
        public int Id { get; set; }

        [Required(ErrorMessage = "Company name is required")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required"), EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;
        //public ICollection<Order> Orders { get; set; }
    }
}
