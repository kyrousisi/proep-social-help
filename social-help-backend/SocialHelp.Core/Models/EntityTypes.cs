using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialHelp.Core.Models
{
    public enum EntityTypes
    {
        Member ,
        Buddy ,
        Proffesional ,
        Administrator ,
        Blocked
    }

    public enum RequestStatus
    {
        Pending,
        Approved,
        Denied
    }

    public enum ActivityType
    {
        Video,
        Blog,
        Event
    }
}
