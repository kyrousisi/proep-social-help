using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using SocialHelp.Core.Models;
using SocialHelp.Core.Services.Interfaces;

namespace SocialHelp.Core
{
    public class UserServices : IUserServices
    {
        private readonly IMongoCollection<User> _users;
        private readonly ICompanyService companyService;
        private readonly IConfiguration _configuration;
        private readonly string _jwtToken;
        public UserServices(IDbClient dbClient, IConfiguration config, ICompanyService companyService)
        {
            _users = dbClient.GetUsersCollection();
            this.companyService = companyService;
            _configuration = config;
            _jwtToken = _configuration["JWTKey"];

        }

        public List<User> GetUsers()
        {
            
            return _users.Find(user => user.Role != EntityTypes.Blocked).ToList();
        }

        public List<User> GetAllUsers()
        {
            return _users.Find(user => true).ToList();
        }

        public List<User> GetByType(EntityTypes type)
        {
            return _users.Find(user => user.Role == type).ToList();
        }

        public User AddUser(User user)
        {
            _users.InsertOne(user);
            return user;
        }

        public User GetUser(string id)
        {
           return _users.Find(user => user.Id == id).First();
        }

        public void DeleteUser(string id)
        {
            _users.DeleteOne(user => user.Id == id);
        }

        public User UpdateUser(User user)
        {
            GetUser(user.Id);
            _users.ReplaceOne(u => u.Id == user.Id, user);
            return user;
        }

        public string Authenticate(AuthenticateUserRequest user)
        {
            var userRecord = this._users
                .Find(x => x.Email == user.Username && x.Password == user.Password)
                .FirstOrDefault();

            if (userRecord == null) return null;

            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenKey = Encoding.ASCII.GetBytes(_jwtToken);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, userRecord.Email)
                }),
                Expires = DateTime.UtcNow.AddHours(1),

                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(tokenKey),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string Register(User user)
        {
            //check if email exists
            var userRecord = this._users
                .Find(x => x.Email == user.Email)
                .FirstOrDefault();


            if (userRecord == default || userRecord == null)
            {
                //get company id
                Company com = companyService.VerifyCompany(user.CompanyId);
                user.CompanyId = com.Id;
                //Create new user
                var newUser = this.AddUser(user);

                var tokenHandler = new JwtSecurityTokenHandler();

                var tokenKey = Encoding.ASCII.GetBytes(_jwtToken);

                var tokenDescriptor = new SecurityTokenDescriptor()
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim("User_Id", newUser.Id)
                    }),
                    Expires = DateTime.UtcNow.AddHours(1),

                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(tokenKey),
                        SecurityAlgorithms.HmacSha256Signature
                    )
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            else
            {
                throw new Exception("Email already Exists");
            }

            throw new Exception("Unexpected Error, User was not Added");
        }

        public string GetUserByEmail(string email)
        {
            var userRecord = this._users
                .Find(x => x.Email == email)
                .FirstOrDefault();


            if (userRecord == default || userRecord == null)
            {
                throw new Exception("Internal error invalid email approverd");
            }

            return userRecord.Id;
        }
    }
}