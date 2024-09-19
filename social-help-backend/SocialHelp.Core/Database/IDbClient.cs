using MongoDB.Driver;
using SocialHelp.Core.Models;

namespace SocialHelp.Core
{
    public interface IDbClient
    {
        IMongoCollection<User> GetUsersCollection();
        IMongoCollection<Company> GetCompanyCollection();
        IMongoCollection<Activity> GetActivityCollection();
        IMongoCollection<RoleRequest> GetRoleRequestCollection();
        IMongoCollection<ActivityTag> GetTagsCollection();
        IMongoCollection<Buddy> GetBuddyCollection();
    }
}
