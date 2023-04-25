using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.API.UserIdentity
{
    public class UpdatePasswordModel
    {
        public string Id { get; set; }
        public string Password { get; set; }
    }
}
