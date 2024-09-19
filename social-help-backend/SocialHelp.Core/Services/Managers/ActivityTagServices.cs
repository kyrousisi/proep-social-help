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
    public class ActivityTagServices : IActivityTagServices
    {
        private readonly IMongoCollection<ActivityTag> _activityTags;
        //add configuration later if needed, currently dont see why. No jwt auth done here

        public ActivityTagServices(IDbClient dbClient)
        {
            _activityTags = dbClient.GetTagsCollection();
        }

        public List<ActivityTag> ActivityTags(List<string> tags)
        {
            List<ActivityTag> activityTags = new List<ActivityTag>();
            //for through the list and return list of activitiy tags
            foreach (var item in tags)
            {
                ActivityTag? current = GetTag(item);
                activityTags.Add(current);
            }

            return activityTags;
        }

        public ActivityTag AddTag(ActivityTag tag)
        {
            //check if tag exists
            var req = this._activityTags.Find(x => x.Description == tag.Description).FirstOrDefault();

            if(req == default)
            {
                _activityTags.InsertOne(tag);
                return tag;
            }
            else
            {
                throw new Exception($"Tag: {tag.Description} already exists");
            }
            
        }

        public void DeleteTag(string id)
        {
            _activityTags.DeleteOne(tag => tag.Id == id);
        }

        public ActivityTag GetTag(string Id)
        {
            return _activityTags.Find(tag => tag.Id == Id).First();
        }

        public List<ActivityTag> GetTags()
        {
            return _activityTags.Find(company => true).ToList();
        }
    

        public ActivityTag UpdateTag(ActivityTag tag)
        {
            GetTag(tag.Id);
            _activityTags.ReplaceOne(c => c.Id == tag.Id, tag);
            return tag;
        }
    }
}
