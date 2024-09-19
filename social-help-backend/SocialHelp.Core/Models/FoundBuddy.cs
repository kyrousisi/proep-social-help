using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialHelp.Core.Models
{
    public class FoundBuddy
    {
        public FoundBuddy(string email, string firstName, string lastName, List<string> categories, int experience, int matchCount)
        {
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            Categories = categories;
            Experience = experience;
            MatchCount = matchCount;
        }

        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<string> Categories { get; set; }
        public int Experience { get; set; }
        public int MatchCount { get; set; }

    }
}
