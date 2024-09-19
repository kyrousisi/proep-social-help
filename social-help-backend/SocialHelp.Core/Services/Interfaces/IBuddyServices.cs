using SocialHelp.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialHelp.Core.Services.Interfaces
{
    public  interface IBuddyServices
    {
        List<Buddy> GetBuddies();
        Buddy AddBuddy(Buddy Buddy);
        Buddy GetBuddy(string Id);
        void DeleteBuddy(string Id);
        Buddy UpdateBuddy(Buddy buddy);
        List<FoundBuddy> FindBuddy(List<string> preferences);
       
    }
}
