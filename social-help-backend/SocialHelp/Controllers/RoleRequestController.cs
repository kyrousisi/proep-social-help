using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialHelp.Core.Models;
using SocialHelp.Core.Services.Interfaces;

namespace SocialHelp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleRequestController : ControllerBase
    {
        public readonly IRoleRequestServices _roleRquestServices;

        public RoleRequestController(IRoleRequestServices roleRequestServices) => _roleRquestServices = roleRequestServices;

        [HttpGet]
        public IActionResult GetRoleRequests() => Ok(_roleRquestServices.GetRoleRequests());

        [HttpPost]
        public IActionResult AddRoleRequest(RoleRequest roleRequest)
        {
            try
            {
                _roleRquestServices.AddRoleRequest(roleRequest);
                return CreatedAtRoute("GetRoleRequest", new { id = roleRequest.Id }, roleRequest);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        public IActionResult DeleteRoleRequest(string id)
        {
            try
            {
                //check if company exists
                var current = _roleRquestServices.GetRoleRequest(id);
                _roleRquestServices.DeleteRoleRequest(id);
                return Ok($"Request: {current.Id} was succesfully deleted");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }


        [HttpGet("{id}", Name = "GetRoleRequest")]
        public IActionResult GetRoleRequest(string id)
        {
            try
            {
                return Ok(_roleRquestServices.GetRoleRequest(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        public IActionResult UpdateRoleRequest(RoleRequest roleRequest)
        {
            try
            {
                return Ok(_roleRquestServices.UpdateRoleRequest(roleRequest));
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpGet("MyRoleRequest")]
        public IActionResult GetMyRoleRequest(string userId)
        {
            try
            {
                return Ok(_roleRquestServices.MyRoleRequest(userId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ByType")]
        public IActionResult GetByStatus(EntityTypes role) => Ok(_roleRquestServices.GetByStatus(role));

        [HttpPost("ApproveDeny")]
        public IActionResult ApproveDeny(ApproveRole current)
        {
            try
            {
                return Ok(_roleRquestServices.ApproveDeny(current.Id, current.Status));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
