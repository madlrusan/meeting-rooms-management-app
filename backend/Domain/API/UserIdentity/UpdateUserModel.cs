using System;
using Microsoft.AspNetCore.Identity;

namespace Domain.API.UserIdentity
{
	public class UpdateUserModel
    {
        public string? Id { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public int Pin { get; set; }
        public string? Departament { get; set; }
        public string? Position { get; set; }
        public bool? isFirstLogin { get; set; }
    }
}

