using SocialHelp.Core.Models;


namespace SocialHelp.Core.Services.Interfaces
{
    public interface ICompanyService
    {
        List<Company> GetCompanies();
        Company RegisterCompany(Company company);
        Company GetCompany(string id);
        void DeleteCompany(string id);
        Company UpdateCompany(Company company);
        Company VerifyCompany(string code);
    }
}
