using System;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Net.Mail;
using Application.Abstractions;
using DataAccess.Services;
using Domain;
using Domain.API.RoomIdentity;
using Domain.API.UserIdentity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class RoomRepository : IRoomRepository
    {
        private readonly AppDbContext _appDbContext;
        private readonly JwtService _jwtService;

        public RoomRepository(AppDbContext appDbContext, JwtService jwtService)
        {
            _appDbContext = appDbContext;
            _jwtService = jwtService;
        }

        public async Task CreateRoom(RoomCreateModel model)
        {
            if(model.Email is not null && model.Password is not null)
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
                CheckRoomContent(model.RoomName, model.RoomType);
                var newRoom = new Room()
                {
                    RoomName = model.RoomName,
                    RoomType = model.RoomType,
                    RoomCapacity = model.RoomCapacity,
                    RoomFeatures = model.RoomFeatures,
                    RoomLocation = model.RoomLocation,
                    Email = model.Email,

                };
                await CreateRoomAsync(newRoom, model.Password);
            }
        }

        public async Task<string> Login(RoomLoginModel model)
        {
            CheckCredentialsForLogin(model);
            var room = await GetRoomByEmailAsync(model.Email);
            if(room is null)
            {
                throw new ValidationException("Room does not exist or wrong password!");
            }
            var isValidPassword = await CheckRoomPasswordAsync(room, model.Password);
            if (!isValidPassword)
                throw new ValidationException("Room does not exist or wrong password!");

            var tokenAsString = _jwtService.GenerateRoomToken(room);
            return tokenAsString;

        }

        public async Task<IEnumerable<RoomsViewModel>> GetAllRooms()
        {
            var rooms = await _appDbContext.Rooms.ToListAsync();
            return rooms.Select(r => new RoomsViewModel
            {
                Id = r.Id,
                RoomCapacity = r.RoomCapacity,
                RoomFeatures = r.RoomFeatures,
                RoomLocation = r.RoomLocation,
                RoomName = r.RoomName,
                RoomType = r.RoomType,
            });
        }

        //public async Task UpdateRoom()
        //-------- helper functions
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
        private bool IsValidPassword(string password)
        {
            return password.Length > 8;
        }
        private async Task<Room?> GetRoomByEmailAsync(string email)
        {
            var user = await _appDbContext.Rooms.FirstOrDefaultAsync(r => r.Email == email);
            return user;
        }
        private void CheckRoomContent(string? name, string? type)
        {
            if(string.IsNullOrEmpty(name) || string.IsNullOrEmpty(type))
            {
                throw new ValidationException("Invalid room name or room type!");
            }

        }
        public async Task<bool> CreateRoomAsync(Room newRoom, string password)
        {
            newRoom.Password = new PasswordHasher<Room>().HashPassword(newRoom, password);
            _appDbContext.Rooms.Add(newRoom);
            await _appDbContext.SaveChangesAsync();
            return true;
        }
        private void CheckCredentialsForLogin(RoomLoginModel model)
        {
            if (!IsValidEmail(model.Email))
                throw new ValidationException("Please provide an email!");

            if (string.IsNullOrWhiteSpace(model.Password))
                throw new ValidationException("Please provide a password!");
        }
        public async Task<bool> CheckRoomPasswordAsync(Room room, string password)
        {
            var dbRoom = await _appDbContext.Rooms.FirstOrDefaultAsync(r => r.Id == room.Id);
            if(dbRoom is null)
            {
                throw new ValidationException("Room does not exist or wrong password!");
            }

            var passwordHasher = new PasswordHasher<Room>();
            var result = passwordHasher.VerifyHashedPassword(dbRoom, dbRoom.Password, password);
            return result == PasswordVerificationResult.Success;
        }
    }
}

