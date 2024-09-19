using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialHelp.Core.Models;
using SocialHelp.Core.Services.Interfaces;

namespace SocialHelp.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class FindBuddiesController : ControllerBase
    {
        private readonly IBuddyServices _buddyServices;

        public FindBuddiesController(IBuddyServices buddyServices) => _buddyServices = buddyServices;

        [HttpGet]
        public IActionResult GetCompanies() => Ok(_buddyServices.GetBuddies());


        [HttpPost]
        public IActionResult AddActivity(List<string> preferences)
        {
            try
            {
                return Ok(_buddyServices.FindBuddy(preferences));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }



        [HttpPut]
        public IActionResult UpdateActivity(Buddy buddy)
        {
            try
            {
                return Ok(_buddyServices.UpdateBuddy(buddy));
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
