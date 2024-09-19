using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialHelp.Core.Models
{
    public class Buddy
    {

        public Buddy(string uid, List<string> cats)
        {
            this.ApprovalDate = DateTime.UtcNow;
            this.Categories = cats;
            this.UserId = uid;
        }

        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }
        public string UserId { get; set; }
        public List<string> Categories { get; set; }
        public DateTime ApprovalDate { get; set; }
    }
}
