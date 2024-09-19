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
    public class ActivityServices : IActivityServices
    {
        private readonly IMongoCollection<Activity> _activities;
        private readonly IUserServices userServices;
        public ActivityServices(IDbClient dbClient, IUserServices userServices)
        {
            _activities = dbClient.GetActivityCollection();
            this.userServices = userServices;
        }
        public Activity AddActivity(Activity activity)
        {
            //currently the author is manually put, later on it will be automatically implemented
            //with the Iuserdata interface with the current user


            //based on the activity type, certain places cannot be null
            if(activity.Type == ActivityType.Blog)
            {
                if (activity.Blog == default)
                {
                    throw new Exception("Cannot create an empty Blog");
                }   
            }
            else if(activity.Type == ActivityType.Video)
            {
                if(activity.Url == default)
                {
                    throw new Exception("Url cannot be empty");
                }
            }
            else if(activity.Type == ActivityType.Event)
            {

                if(activity.Location == default)
                {
                    throw new Exception("location cannot be null");
                }
                if(activity.EventNote == default)
                {
                    throw new Exception("EventNote cannot be null");
                }
            }
            else
            {
                throw new Exception("Type cannot be null");
            }

            //get the correct company id by user.
            User creator = userServices.GetUser(activity.AuthorId);
            activity.CompanyId = creator.CompanyId;

            _activities.InsertOne(activity);
            return activity;
        }

        public void DeleteActivity(string Id)
        {
            _activities.DeleteOne(ac => ac.Id == Id);
        }

        public List<Activity> GetActivities()
        {
            return _activities.Find(activity => true).ToList();
        }

        public Activity GetActivity(string Id)
        {
            return _activities.Find(activity => activity.Id == Id).First();
        }

        public List<Activity> GetCompanyActivities(string userId)
        {
            User current = userServices.GetUser(userId);
            return _activities.Find(activity => activity.CompanyId == current.CompanyId).ToList();
        }

        public List<Activity> GetMyActivities(string userID)
        {
            //currently we pass the Id, but soon once Iuserdata is implemented
            //we can get the current user without having to pass the userId

            //check if user exists
            userServices.GetUser(userID);
            return _activities.Find(activity => activity.AuthorId == userID).ToList();
        }

        public Activity UpdateActivity(Activity activity)
        {
            GetActivity(activity.Id);
            //set the current time
            activity.LastUpdated = DateTime.UtcNow;
            _activities.ReplaceOne(ac => ac.Id == activity.Id, activity);
            return activity;
        }
    }
}
