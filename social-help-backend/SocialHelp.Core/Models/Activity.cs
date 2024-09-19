

using MongoDB.Bson.Serialization.Attributes;

namespace SocialHelp.Core.Models
{
    public class Activity
    {


        public Activity()
        {
            Created = DateTime.UtcNow;
            LastUpdated = DateTime.UtcNow;
        }

        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string? Blog { get; set; }
        public string? Location { get; set; }
        public string? Url { get; set; }
        public string AuthorId { get; set; }
        public string? CompanyId { get; set; }
        public string? EventNote { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastUpdated { get; set; }
        public ActivityType Type { get; set; }
        public List<String>? Attendees { get; set; } 
        public List<String> tags { get; set; }
    }
}
