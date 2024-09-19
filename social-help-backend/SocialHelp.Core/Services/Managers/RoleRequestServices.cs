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
    public class RoleRequestServices : IRoleRequestServices
    {

        private readonly IMongoCollection<RoleRequest> _roleRquests;
        private readonly IUserServices _userServices;
        private readonly IBuddyServices _buddyServices;
        public RoleRequestServices(IDbClient dbClient, IUserServices userServices, IBuddyServices buddyServices)
        {
            _roleRquests = dbClient.GetRoleRequestCollection();
            _userServices = userServices;
            _buddyServices = buddyServices;
        }
        public RoleRequest AddRoleRequest(RoleRequest roleRequest)
        {
            //currently the author is manually put, later on it will be automatically implemented
            //with the Iuserdata interface with the current user


            //first check if the current user has a role request already
            //only one per user
            var req = this._roleRquests.Find(x => x.UserID == roleRequest.UserID).FirstOrDefault();

            if (req == default)
            {
                //this user currently has no request made

                //check the role requested
                if (roleRequest.Role == EntityTypes.Administrator || roleRequest.Role == EntityTypes.Blocked)
                {
                    throw new Exception($"Invalid. Role {roleRequest.Role} was requested");
                }
                _roleRquests.InsertOne(roleRequest);
                return roleRequest;
            }
            else
            {
                throw new Exception($"User:{roleRequest.UserID} already has pending/Approved requests");
            }
        }

        public void DeleteRoleRequest(string Id)
        {
            _roleRquests.DeleteOne(req => req.Id == Id);
        }

        public RoleRequest GetRoleRequest(string Id)
        {
            return _roleRquests.Find(rq => rq.Id == Id).First();
        }

        public List<RoleRequest> GetRoleRequests()
        {
            return _roleRquests.Find(rq => rq.Status == RequestStatus.Pending).ToList();
        }

        public RoleRequest UpdateRoleRequest(RoleRequest roleRequest)
        {
            GetRoleRequest(roleRequest.Id);
            _roleRquests.ReplaceOne(rq => rq.Id == roleRequest.Id, roleRequest);
            return roleRequest;
        }

        public RoleRequest MyRoleRequest(string UserId)
        {
            //for the currently logged in user, currently we use the id
            //later when getcurrent user is implemented, we can just call on the currents user and pass through the controller

            var req = this._roleRquests.Find(x => x.UserID == UserId).FirstOrDefault();

            if (req == default)
            {
                //this user currently has no request made
                throw new Exception($"User:{UserId} has no pending request");
            }
            else
            {
                return req;
            }
        }

        public List<RoleRequest> GetByStatus(EntityTypes Role)
        {
            return _roleRquests.Find(rq => rq.Role == Role).ToList();
        }

        public string ApproveDeny(string id, bool status)
        {
            //change the status request
            var current = GetRoleRequest(id);
            string result;
            if (current == null || current == default)
            {
                throw new Exception($"Request:{id} does not exist");
            }

            if (status)
            {
                current.Status = RequestStatus.Approved;
                //change the user status
                var currentUser = _userServices.GetUser(current.UserID);
                currentUser.Role = current.Role;

                //update the user
                _userServices.UpdateUser(currentUser);
                result = $"Aprroved, {currentUser.Email} : {currentUser.Role}";

                //add user to buddy table
                if (current.Role == EntityTypes.Buddy)
                {
                    Buddy approvedBuddy = new Buddy(current.UserID, current.Categories);
                    _buddyServices.AddBuddy(approvedBuddy);
                }
                else
                {
                    //role should be Therapist
                    if(current.Role != EntityTypes.Proffesional)
                    {
                        throw new Exception($"Role:{current.Role}, is not a valid Role");
                    }
                    
                    //add therapist and associated tags here.
                }
            }
            else
            {
                current.Status = RequestStatus.Denied;
                this.DeleteRoleRequest(current.Id);
                result = $"Denied, Request:{id}";
            }

            this.UpdateRoleRequest(current);
            return result;
        }

    }
}
