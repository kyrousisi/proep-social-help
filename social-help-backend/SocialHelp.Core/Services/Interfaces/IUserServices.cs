using SocialHelp.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace SocialHelp.Core
{
    public interface IUserServices
    {
        List<User> GetUsers();
        List<User> GetAllUsers();
        List<User> GetByType(EntityTypes type);
        User AddUser(User user);
        User GetUser(string id);
        string GetUserByEmail(string email);
        void DeleteUser(string id);
        User UpdateUser(User user);
        string Authenticate(AuthenticateUserRequest user);
        string Register(User user);
    }

    public class AuthenticateUserRequest
    {
        public AuthenticateUserRequest() { }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
