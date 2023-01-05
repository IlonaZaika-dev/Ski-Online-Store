using Microsoft.AspNetCore.Mvc;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly StoreContext _context;
        public BuggyController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("testauth")]
        [Authorize]
        public ActionResult<string> GetSecretText()
        {
            return "secret stuf";
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest()
        {
            var item = _context.Products.Find(43);

            if (item == null)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpGet("servererror")]
        public ActionResult GetServerErrorRequest()
        {
            var item = _context.Products.Find(43);
            var itemToReturn = item.ToString();

            return Ok();
        }

        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest();
        }

        [HttpGet("badrequest/{id}")]
        public ActionResult GetBadRequestValidation(int id)
        {
            return Ok();
        }
    }
}