namespace HomeExpenses.Server.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        enum CategoryType
        {
            Income,
            Expense,
            Both
        }
    }
}
