using Microsoft.EntityFrameworkCore;

namespace HomeExpenses.Server.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    }
}
