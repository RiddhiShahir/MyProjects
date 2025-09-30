using Microsoft.AspNetCore.Mvc;

namespace HelloApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HelloController : ControllerBase
    {
        public class NameRequest
        {
            public string? Name { get; set; }
        }

        [HttpPost]
        public IActionResult Post([FromBody] NameRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Name))
            {
                return BadRequest(new { response = "Name is required" });
            }

            return Ok(new { response = $"Hello {request.Name}" });
        }
    }
}