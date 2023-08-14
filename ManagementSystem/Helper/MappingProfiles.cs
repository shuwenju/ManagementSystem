using AutoMapper;
using ManagementSystem.Models.DbModels;
using ManagementSystem.ViewModels;

namespace ManagementSystem.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Order, OrderViewModel>();
            CreateMap<Customer, CustomerViewModel>();
            CreateMap<ApplicationUser, ApplicationUserViewModel>();
            CreateMap<OrderItem, OrderItemViewModel>();
            CreateMap<Item, ItemViewModel>();
        }
    }
}
