using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;
using Domain.API;
namespace Domain
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Pin { get; set; }
        public string Departament { get; set; }
        public string Position { get; set; }
        public bool isAdmin { get; set; }
        public bool? isFirstLoggin {get; set;}
        public DateTime CreatedTimeUTC { get; set; }
    }
}