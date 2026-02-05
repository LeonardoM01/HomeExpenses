using HomeExpenses.Server.Data;
using HomeExpenses.Server.Models;
using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeExpenses.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase 
    {
        private readonly AppDbContext _context;

        public TransactionController(AppDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            return await _context.Transactions.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }
            return transaction;
        }

        [HttpPost]
        public async Task<ActionResult<TransactionCreateDto>> CreateTransaction(TransactionCreateDto dto)
        {
            var category = await _context.Categories.FindAsync(dto.CategoryId);
            if (category == null)
                return BadRequest("Categoria inválida.");

            var user = await _context.Users.FindAsync(dto.UserId);
            if (user == null)
                return BadRequest("Usuário inválido.");

            var transaction = new Transaction
            {
                Description = dto.Description,
                Amount = dto.Value,
                TransactionType = dto.TransactionType,
                CategoryId = dto.CategoryId,
                UserId = dto.UserId
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTransaction), new { id = transaction.Id }, transaction);
        }
    }
}
