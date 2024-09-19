using Microsoft.Extensions.Options;
using MongoDB.Driver;
using SocialHelp.Core.Models;

namespace SocialHelp.Core
{
    public class DbClient : IDbClient
    {
        private readonly IMongoCollection<User> _users;
        private readonly IMongoCollection<Company> _companies;
        private readonly IMongoCollection<Activity> _activities;
        private readonly IMongoCollection<RoleRequest> _roleRequests;
        private readonly IMongoCollection<ActivityTag> _activityTags;
        private readonly IMongoCollection<Buddy> _buddies;
        public DbClient(IOptions<SocialHelpDBConfig> socialHelpDBConfig)
        {
            var client = new MongoClient(socialHelpDBConfig.Value.Connection_String);
            var database = client.GetDatabase(socialHelpDBConfig.Value.Database_Name);
            _users = database.GetCollection<User>(socialHelpDBConfig.Value.Users_Collection_Name);
            _companies = database.GetCollection<Company>(socialHelpDBConfig.Value.COMPANY_COLLECTION_NAME);
            _activities = database.GetCollection<Activity>(socialHelpDBConfig.Value.Activities_Collection_Name);
            _roleRequests = database.GetCollection<RoleRequest>(socialHelpDBConfig.Value.RoleRequests_Collection_Name);
            _activityTags = database.GetCollection<ActivityTag>(socialHelpDBConfig.Value.ActivityTags_Collection_Name);
            _buddies = database.GetCollection<Buddy>(socialHelpDBConfig.Value.Buddies_Collection_Name);
        }
        public IMongoCollection<User> GetUsersCollection() => _users;
        public IMongoCollection<Company> GetCompanyCollection() => _companies;
        public IMongoCollection<Activity> GetActivityCollection() => _activities;
        public IMongoCollection<RoleRequest> GetRoleRequestCollection() => _roleRequests;
        public IMongoCollection<ActivityTag> GetTagsCollection() => _activityTags;
        public IMongoCollection<Buddy> GetBuddyCollection() => _buddies;

    }
}
