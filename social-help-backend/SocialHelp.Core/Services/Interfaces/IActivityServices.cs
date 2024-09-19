using SocialHelp.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialHelp.Core.Services.Interfaces
{
    public interface IActivityServices
    {
        List<Activity> GetActivities();
        List<Activity> GetCompanyActivities(string userId);
        Activity AddActivity(Activity activity);
        Activity GetActivity(string Id);
        void DeleteActivity(string id);
        Activity UpdateActivity(Activity activity);
        List<Activity> GetMyActivities(string userID);

    }
}
