using Domain;
using Domain.API.UserIdentity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Abstractions
{
    public interface IUserRepository
    {
        public Task<string> Login(LoginModel model);
        public Task Register(RegisterModel model);
        public Task<IEnumerable<UsersViewModel>> GetAllUsers();
        public Task UpdateUser(UpdateUserModel model);
        public Task DeleteUser(DeleteUserModel model);
    }
}
