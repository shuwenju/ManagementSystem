namespace ManagementSystem.ViewModels
{
    public class DashboardViewModel
    {
        public int NewOrdersCount { get; set; }
        public int CancelledOrdersCount { get; set; }
        public int TotalOrdersCount { get; set; }
        public int LowInStockItemsCount { get; set; }
        public int OutOfStockItemsCount { get; set; }
    }
}
