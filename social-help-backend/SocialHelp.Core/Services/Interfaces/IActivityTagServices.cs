using SocialHelp.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialHelp.Core.Services.Interfaces
{
    public interface IActivityTagServices
    {
        List<ActivityTag> GetTags();
        ActivityTag AddTag(ActivityTag tag);
        ActivityTag GetTag(string Id);
        void DeleteTag(string Id);
        ActivityTag UpdateTag(ActivityTag tag);
        List<ActivityTag> ActivityTags(List<string> tags);
    }
}
