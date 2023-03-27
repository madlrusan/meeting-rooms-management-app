using Domain;
using Domain.API.Identity;
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
    }
}
