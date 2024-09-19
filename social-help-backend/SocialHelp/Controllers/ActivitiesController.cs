using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialHelp.Core.Models;
using SocialHelp.Core.Services.Interfaces;

namespace SocialHelp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IActivityServices _activityServices;

        public ActivitiesController(IActivityServices activityServices) => _activityServices = activityServices;

        [HttpGet]
        public IActionResult GetCompanies() => Ok(_activityServices.GetActivities());

        [HttpPost]
        public IActionResult AddActivity(Activity activity)
        {
            try
            {
                _activityServices.AddActivity(activity);
                return CreatedAtRoute("GetActivity", new { id = activity.Id }, activity);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteActivity(string id)
        {
            try
            {
                //check if company exists
                var current = _activityServices.GetActivity(id);
                _activityServices.DeleteActivity(id);
                return Ok($"Company: {current.Title} was succesfully deleted");
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

        [HttpGet("{id}", Name = "GetActivity")]
        public IActionResult GetActivity(string id)
        {
            try
            {
                return Ok(_activityServices.GetActivity(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("MyActivities/{userId}")]
        public IActionResult GetMyActivities(string userId)
        {
            try
            {
                return Ok(_activityServices.GetMyActivities(userId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("CompanyActivities/{userId}")]
        public IActionResult GetCompanyActivities(string userId)
        {
            try
            {
                return Ok(_activityServices.GetCompanyActivities(userId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        public IActionResult UpdateActivity(Activity activity)
        {
            try
            {
                return Ok(_activityServices.UpdateActivity(activity));
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
