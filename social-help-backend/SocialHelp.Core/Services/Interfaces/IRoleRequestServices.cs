using SocialHelp.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialHelp.Core.Services.Interfaces
{
    public interface IRoleRequestServices
    {
        List<RoleRequest> GetRoleRequests();
        RoleRequest AddRoleRequest(RoleRequest roleRequest);
        RoleRequest GetRoleRequest(string Id);
        void DeleteRoleRequest(string Id);
        RoleRequest UpdateRoleRequest(RoleRequest roleRequest);
        RoleRequest MyRoleRequest(string UserId);
        List<RoleRequest> GetByStatus(EntityTypes Role);
        string ApproveDeny(string id, bool status);
    }
}
