using System.Text.Json.Serialization;

namespace HomeExpenses.Server.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public CategoryType CategoryType { get; set; }
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum CategoryType
    {
        Revenue,
        Expense,
        Both
    }
}
