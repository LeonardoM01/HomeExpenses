namespace HomeExpenses.Server.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public enum TransactionType
        {
            Expense,
            Income
        }
        public Category Category { get; set; } = null!;
        public User User { get; set; } = null!;
    }
}
