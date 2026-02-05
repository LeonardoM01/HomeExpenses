using HomeExpenses.Server.Data;
using HomeExpenses.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeExpenses.Server.Controllers
{
    [ApiController]
    [Route("api/reports/users")]
    public class UserSummaryController
    {
        private readonly AppDbContext _context;
        public UserSummaryController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var summaries = await _context.Transactions
                .GroupBy(t => new { t.UserId, t.User.Name })
                .Select(g => new UserSummary
                {
                    Id = g.Key.UserId,
                    Name = g.Key.Name,
                    TotalExpenses = g
                        .Where(t => t.TransactionType == Models.TransactionType.Expense)
                        .Sum(t => (decimal?)t.Amount) ?? 0,

                    TotalRevenues = g
                        .Where(t => t.TransactionType == Models.TransactionType.Revenue)
                        .Sum(t => (decimal?)t.Amount) ?? 0
                })
                .Select(s => new UserSummary
                {
                    Id = s.Id,
                    Name = s.Name,
                    TotalExpenses = s.TotalExpenses,
                    TotalRevenues = s.TotalRevenues,
                    Balance = s.TotalRevenues - s.TotalExpenses
                })
                .ToListAsync();

            return new JsonResult(summaries);
        }
    }
}
