using Application.Abstractions;
using DataAccess.Services;
using Domain;
using Domain.API.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
namespace DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly JwtService _jwtService;
        public UserRepository(UserManager<User> userManager, JwtService jwtService)
        {
            _userManager = userManager;
            _jwtService = jwtService;
        }

        public async Task Register(RegisterModel model)
        {
            if (model.Email is not null && model.Password is not null)
            {
                if (!IsValidEmail(model.Email))
                {
                    throw new ValidationException("Email is invalid!");
                }
                if (!IsValidPassword(model.Password))
                {
                    throw new ValidationException("Password is not correct!");
                }
                var existingUser = await GetUserByEmailAsync(model.Email);
                if (existingUser is not null)
                {
                    throw new ValidationException("User already exists");
                }
                CheckUserName(model.FirstName, model.LastName);
                var newUser = new User()
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.Email,
                    EmailConfirmed = true,
                    UserName = model.Email,
                    Pin = model.Pin,
                    Departament = model.Departament,
                    Position = model.Position
                    
                };
                await _userManager.CreateAsync(newUser, model.Password);
                if(model.isAdmin)
                {
                    object roleResult = await _userManager.AddToRoleAsync(newUser, "Admin");
                }
                else
                {
                    object roleResult = await _userManager.AddToRoleAsync(newUser, "User");
                }

            }
        }

        private bool IsValidPassword(string password)
        {
            return password.Length > 8;
        }

        private async Task<User?> GetUserByEmailAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            return user;
        }
        private bool IsValidEmail(string email)
        {
            var trimmedEmail = email.Trim();

            if (trimmedEmail.EndsWith("."))
            {
                return false;
            }
            try
            {
                var addr = new MailAddress(email);
                return addr.Address == trimmedEmail;
            }
            catch
            {
                return false;
            }
        }

        private void CheckUserName(string? FirstName, string? LastName)
        {
            if (string.IsNullOrEmpty(FirstName) || string.IsNullOrEmpty(LastName))
            {
                throw new ValidationException("Invalid first or last name!");
            }
        }

        public async Task<string> Login(LoginModel model)
        {
            CheckCredentialsForLogin(model);
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user is null)
                throw new ValidationException("User does not exist or wrong password!");

            var isValidPassword = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!isValidPassword)
                throw new ValidationException("User does not exist or wrong password!");
            var roles = _userManager.GetRolesAsync(user);
            var tokenAsString = _jwtService.GenerateToken(user, (IList<string>)roles);
            return tokenAsString;


        }

        private void CheckCredentialsForLogin(LoginModel model)
        {
            if (!IsValidEmail(model.Email))
                throw new ValidationException("Please provide an email!");

            if (string.IsNullOrWhiteSpace(model.Password))
                throw new ValidationException("Please provide a password!");
        }

        public async Task<IEnumerable<UsersViewModel>> GetAllUsers()
        {
            var users = await _userManager.GetUsersInRoleAsync("User");

            return users.Select(u => new UsersViewModel
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Departament = u.Departament,
                Position = u.Position,
                Email = u.Email,
                Pin = (int)u.Pin
            });
        }

        public async Task UpdateUser(UpdateUserModel model)
        {
            if (!IsValidEmail(model.Email))
                throw new ValidationException("Please provide an email!");
            var existingUser = await GetUserByIdAsync(model.Id);
            if (existingUser != null)
            {
                existingUser.FirstName = model.FirstName;
                existingUser.LastName = model.LastName;
                existingUser.Pin = model.Pin;
                existingUser.Departament = model.Departament;
                existingUser.Position = model.Position;
            }
            await _userManager.UpdateAsync(existingUser);

        }
        private async Task<User?> GetUserByIdAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            return user;
        }
        public async Task DeleteUser(DeleteUserModel model)
        {
            var existingUser = await GetUserByIdAsync(model.Id);
            if(existingUser == null)
            {
                throw new ValidationException("User does not exist");
            }
            await _userManager.DeleteAsync(existingUser);
        }
        
    }
}

