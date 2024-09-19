using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using SocialHelp.Core.Models;
using SocialHelp.Core.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialHelp.Core.Services.Managers
{
    public class CompanyService: ICompanyService
    {
        private readonly IMongoCollection<Company> _companies;
        //add configuration later if needed, currently dont see why. No jwt auth done here

        public CompanyService(IDbClient dbClient)
        {
            _companies = dbClient.GetCompanyCollection();
        }

        public void DeleteCompany(string id)
        {
            _companies.DeleteOne(company => company.Id == id);
        }

        public List<Company> GetCompanies()
        {
            return _companies.Find(company => true).ToList();
        }

        public Company GetCompany(string id)
        {
            return _companies.Find(company => company.Id == id).First();
        }

        public Company RegisterCompany(Company company)
        {
            //first check if company with such details exist
            //for the moment this can be the company Name
            var comp = this._companies.Find(x => x.Name == company.Name).FirstOrDefault();

            if (comp == default || comp == null)
            {
                //generate company code
                company.Code = GenerateCompnanyCode();
                _companies.InsertOne(company);
                return company;
            }
            else
            {
                throw new Exception("Company already exists");
            }

            throw new Exception("Unexpected error, Company was not registered");
        }

        public Company UpdateCompany(Company company)
        {
            GetCompany(company.Id);
            _companies.ReplaceOne(c => c.Id == company.Id, company);
            return company;
        }

        public Company VerifyCompany(string code)
        {
            var comp = this._companies.Find(x => x.Code == code).FirstOrDefault();
            if (comp == default || comp == null)
            {
                throw new Exception("Incorrect or false company code");
            }
            return GetCompany(comp.Id);
        }

        private string GenerateCompnanyCode()
        {
            int length = 7;

            // creating a StringBuilder object()
            StringBuilder str_build = new StringBuilder();
            Random random = new Random();

            char letter;

            for (int i = 0; i < length; i++)
            {
                double flt = random.NextDouble();
                int shift = Convert.ToInt32(Math.Floor(25 * flt));
                letter = Convert.ToChar(shift + 65);
                str_build.Append(letter);
            }

            string code = str_build.ToString();
            //check if company code exists already
            var comp = this._companies.Find(x => x.Code == code).FirstOrDefault();

            if(comp == default || comp == null)
            {
                return code;
            }

            return GenerateCompnanyCode();
        }
    }
}
