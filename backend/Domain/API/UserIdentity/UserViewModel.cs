using System;
namespace Domain.API.UserIdentity
{
	public class UserViewModel
	{
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Departament { get; set; }
        public string Position { get; set; }
        public string Email { get; set; }
        public bool isFirstLoggin {  get; set; }
    }
}

