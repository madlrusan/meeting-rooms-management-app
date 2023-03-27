using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace Domain
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [JsonIgnore]
        public int Pin { get; set; }
        public DateTime CreatedTimeUTC { get; set; }   
    }
}