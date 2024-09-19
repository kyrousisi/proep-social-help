using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialHelp.Core;
using SocialHelp.Core.Models;

namespace SocialHelp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserServices _userServices;

        public UsersController(IUserServices userServices) => _userServices = userServices;

        [AllowAnonymous]
        [Route("authenticate")]
        [HttpPost]
        public ActionResult Login([FromBody] AuthenticateUserRequest user)
        {
            var token = _userServices.Authenticate(user);
            if (token == null)
            {
                return Unauthorized("Incorrect email or password");
            }
            string userId = _userServices.GetUserByEmail(user.Username);
            User current = _userServices.GetUser(userId);
            string currentRole = current.Role.ToString();
            return Ok(new {token, userId, currentRole});
        }

        [AllowAnonymous]
        [Route("authenticate/register")]
        [HttpPost]
        public IActionResult Register(User user)
        {
            try
            {
                var token = _userServices.Register(user);
                if (token == null)
                    return Unauthorized();
                return Ok(new {token, user.Id});
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        public IActionResult GetUsers() => Ok(_userServices.GetAllUsers());

        [HttpGet("valid")]
        public IActionResult GetAllUsers() => Ok(_userServices.GetUsers());

        [HttpGet("myRole/{userId}")]
        public IActionResult GetMyRole(string userId)
        {
            try
            {
                User current = _userServices.GetUser(userId);
                string currentRole = current.Role.ToString();
                return Ok(new {currentRole});
            }
            catch(Exception e)
            {
               return BadRequest(e.Message);
            }
        }

        [HttpGet("byType")]
        public IActionResult GetByType(EntityTypes type) => Ok(_userServices.GetByType(type));

        [HttpGet("{id}", Name ="GetUser")]
        public IActionResult GetUser(string id)
        {
            try
            {
                return Ok(_userServices.GetUser(id));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public IActionResult AddUser(User user)
        {
            _userServices.AddUser(user);
            return CreatedAtRoute("GetUser", new { id = user.Id}, user); 
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBook(string id)
        {
            _userServices.DeleteUser(id);
            return NoContent();
        }

        [HttpPut]
        public IActionResult UpdateUser(User user)
        {
            var updated = _userServices.UpdateUser(user);
            return Ok(updated);
        }
    }
}