using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialHelp.Core.Models;
using SocialHelp.Core.Services.Interfaces;

namespace SocialHelp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CompaniesController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompaniesController(ICompanyService companyService) => _companyService = companyService;

        [HttpGet]
        public IActionResult GetCompanies() => Ok(_companyService.GetCompanies());

        [HttpPost]
        public IActionResult RegisterCompany(Company company)
        {
            _companyService.RegisterCompany(company);
            return CreatedAtRoute("GetCompany", new { id = company.Id }, company);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCompany(string id)
        {
            try
            {
                //check if company exists
                var current = _companyService.GetCompany(id);
                _companyService.DeleteCompany(id);
                return Ok($"Company: {current.Name} was succesfully deleted");
            }
            catch(Exception e)
            {
                throw new Exception(e.Message);
            }
            
        }

        [HttpGet("{id}", Name="GetCompany")]
        public IActionResult GetCompany(string id)
        {
            try
            {
                return Ok(_companyService.GetCompany(id));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet("Verify")]
        public IActionResult VerifyCompany(string code)
        {
            try
            {
                return Ok(_companyService.VerifyCompany(code));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        public IActionResult UpdateCompany(Company company)
        {
            try
            {
                return Ok(_companyService.UpdateCompany(company));
            }
            catch(Exception e)
            {
                throw new Exception(e.Message);
            }
        }
        
    }
}
