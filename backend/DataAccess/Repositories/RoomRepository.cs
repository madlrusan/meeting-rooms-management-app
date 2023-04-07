using System;
using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.Net.Mail;
using Application.Abstractions;
using DataAccess.Services;
using Domain;
using Domain.API.Identity;
using Domain.API.RoomIdentity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
	public class RoomRepository : IRoomRepository
    {
        private readonly UserManager<Room> _roomManager;
        private readonly UserManager<User> _userManager;
        private readonly JwtService _jwtService;

        public RoomRepository(UserManager<Room> roomManager, UserManager<User> userManager, JwtService jwtService)
        {
            _roomManager = roomManager;
            _userManager = userManager;
            _jwtService = jwtService;
        }


        public async Task RegisterRoom(RoomRegisterModel model)
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
                var existingRoom = await GetRoomByEmailAsync(model.Email);
                if (existingRoom is not null)
                {
                    throw new ValidationException("Room already exists");
                }
                var newUser = new User()
                {
                    Email = model.Email,
                };
                var userResult = await _userManager.CreateAsync(newUser, model.Password);
                object roleResult = await _userManager.AddToRoleAsync(newUser, "Room");
                if (userResult.Succeeded)
                {
                    CheckUserName(model.RoomName, model.RoomType);
                    var newRoom = new Room()
                    {
                        RoomName = model.RoomName,
                        RoomType = model.RoomType,
                        RoomCapacity = model.RoomCapacity,
                        RoomFeatures = model.RoomFeatures,
                        RoomLocation = model.RoomLocation,
                        User = newUser,
                        UserId = newUser.Id
                    };
                    await _roomManager.CreateAsync(newRoom, model.Password);
                }
            }
        }

        //public Task<IEnumerable<RoomViewsModel>> GetAllRooms()
        //{
        //    //var rooms = await _roomManager.Users.Include(u => u.User).Select(u => u.);
        //    //return rooms.Select(r => new RoomViewsModel
        //    //{
        //    //    Id = r.Id,
        //    //    RoomName = r.RoomName,
        //    //    RoomType = r.RoomType,
        //    //    RoomCapacity = r.RoomCapacity,
        //    //    RoomFeatures = r.RoomFeatures,
        //    //    RoomLocation = r.RoomLocation,
        //    //});
        //    return new IEnumerable<RoomViewsModel>{ };

        //}
        private bool IsValidPassword(string password)
        {
            return password.Length > 8;
        }

        private async Task<Room?> GetRoomByEmailAsync(string email)
        {
            var room = await _roomManager.FindByEmailAsync(email);
            return room;
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


        //public Task<string> Login(RoomLoginModel model)
        //{
        //    //CheckCredentialsForLogin(model);
        //    //var user = await _roomManager.FindByEmailAsync(model.Email);
        //    //if (user is null)
        //    //    throw new ValidationException("User does not exist or wrong password!");

        //    //var isValidPassword = await _roomManager.CheckPasswordAsync(user, model.Password);
        //    //if (!isValidPassword)
        //    //    throw new ValidationException("User does not exist or wrong password!");
        //    //var roles = _roomManager.GetRolesAsync(user);
        //    //var tokenAsString = _jwtService.GenerateToken(user, (IList<string>)roles);
        //    //return tokenAsString;
        //    return "string";
        //}
        private void CheckCredentialsForLogin(RoomLoginModel model)
        {
            if (!IsValidEmail(model.Email))
                throw new ValidationException("Please provide an email!");

            if (string.IsNullOrWhiteSpace(model.Password))
                throw new ValidationException("Please provide a password!");
        }

    }
}

