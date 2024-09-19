using MongoDB.Bson.Serialization.Attributes;


namespace SocialHelp.Core.Models
{
    public class RoleRequest
    {

        public RoleRequest()
        {
            Status = RequestStatus.Pending;
            RequestDate = DateTime.UtcNow;
        }

        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }
        public string UserID { get; set; }
        public DateTime RequestDate { get; set; }
        public EntityTypes Role { get; set; }
        public string? Reason { get; set; }
        public List<string> Categories { get; set; }
        public RequestStatus Status { get; set; }
    }
}
