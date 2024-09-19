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
    public class BuddyServices : IBuddyServices
    {
        private readonly IMongoCollection<Buddy> _buddies;
        private readonly IUserServices _userServices;

        public BuddyServices(IDbClient dbClient, IUserServices userServices)
        {
            _buddies = dbClient.GetBuddyCollection();
            _userServices = userServices;
        }

        public Buddy AddBuddy(Buddy buddy)
        {
             _buddies.InsertOne(buddy);
            return buddy;
        }

        public void DeleteBuddy(string Id)
        {
            _buddies.DeleteOne(req => req.Id == Id);
        }

        public List<FoundBuddy> FindBuddy(List<string> preferences)
        {
            List<Buddy> all = this.GetBuddies();
            List<Tuple<Buddy, int>> matches = new List<Tuple<Buddy, int>>();
            

            foreach (var buddy in all)
            {
                var hs = new HashSet<string>(preferences);
                var cnt = buddy.Categories.Count(x => hs.Contains(x));

                var currentMatch = new Tuple<Buddy, int>(buddy, cnt);
                matches.Add(currentMatch);
            }

            List<FoundBuddy> foundBuddies = new List<FoundBuddy>();
            //after each match preference
            //create the found list
            foreach (var match in matches)
            {
                User currentBuddy = _userServices.GetUser(match.Item1.UserId);
                int exprience = (DateTime.UtcNow - match.Item1.ApprovalDate).Days;
                var newMatch = new FoundBuddy(currentBuddy.Email, currentBuddy.FirstName, currentBuddy.LastName, match.Item1.Categories,exprience, match.Item2);
                foundBuddies.Add(newMatch);
            }

            //order by the match count then be the date
            var sorted = foundBuddies.OrderByDescending(x => x.MatchCount).ThenBy(x => x.Experience);
            return sorted.ToList();
        }

        public List<Buddy> GetBuddies()
        {
            return _buddies.Find(rq => true).ToList();
        }

        public Buddy GetBuddy(string Id)
        {
            return _buddies.Find(rq => rq.Id == Id).First();
        }

        public Buddy UpdateBuddy(Buddy buddy)
        {
            GetBuddy(buddy.Id);
            _buddies.ReplaceOne(rq => rq.Id == buddy.Id, buddy);
            return buddy;
        }
    }
}
