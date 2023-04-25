using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.API.UserIdentity
{
    public class RegisterModel
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public int Pin { get; set; }
        public string? Departament { get; set; }
        public string? Position { get; set; }
        public bool isAdmin { get; set; }
        public bool isFirstLogin { get; set; }
    }
}
