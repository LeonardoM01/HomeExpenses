using Microsoft.AspNetCore.Mvc;

namespace HomeExpenses.Server.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
