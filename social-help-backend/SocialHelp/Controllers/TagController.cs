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
    public class TagController : ControllerBase
    {
        private readonly IActivityTagServices _activityTagService;

        public TagController(IActivityTagServices activityTagServices) => _activityTagService = activityTagServices;


        [HttpGet]
        public IActionResult GetTags() => Ok(_activityTagService.GetTags());

        [HttpPost]
        public IActionResult AddTags(ActivityTag tag)
        {
            try
            {
                _activityTagService.AddTag(tag);
                return CreatedAtRoute("GetTag", new { id = tag.Id }, tag);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTag(string id)
        {
            try
            {
                //check if company exists
                var current = _activityTagService.GetTag(id);
                _activityTagService.DeleteTag(id);
                return Ok($"Tag: {current.Description} was succesfully deleted");
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

        [HttpGet("{id}", Name = "GetTag")]
        public IActionResult GetCompany(string id)
        {
            try
            {
                return Ok(_activityTagService.GetTag(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        
        [HttpGet("ActivityTags")]
        public IActionResult VerifyCompany(List<string> tags)
        {
            try
            {
                return Ok(_activityTagService.ActivityTags(tags));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        public IActionResult UpdateCompany(ActivityTag tag)
        {
            try
            {
                return Ok(_activityTagService.UpdateTag(tag));
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

    }
}
