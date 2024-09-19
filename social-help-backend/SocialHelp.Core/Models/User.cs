using MongoDB.Bson.Serialization.Attributes;
using SocialHelp.Core.Models;

namespace SocialHelp.Core
{
    public class User
    {
        public User()
        {
            Role = EntityTypes.Member;
        }

        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }
        public string FirstName { get; set;}
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string CompanyId { get; set; }
        public EntityTypes Role { get; set; } 
    }
}
