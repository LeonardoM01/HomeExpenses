using System.Text.Json.Serialization;

namespace HomeExpenses.Server.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }

        public TransactionType TransactionType { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;

        public int UserId { get; set; }
        public User User { get; set; } = null!;
    }

    public class TransactionCreateDto
    {
        public string Description { get; set; } = string.Empty;
        public decimal Value { get; set; }
        public TransactionType TransactionType { get; set; }

        public int CategoryId { get; set; }
        public int UserId { get; set; }
    }

    public class UserSummary
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal TotalExpenses { get; set; }
        public decimal TotalRevenues { get; set; }
        public decimal Balance { get; set; }
    }

    public class CategorySummary
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal TotalExpenses { get; set; }
        public decimal TotalRevenues { get; set; }
        public decimal Balance { get; set; }
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TransactionType
    {
        Revenue,
        Expense
    }
}
