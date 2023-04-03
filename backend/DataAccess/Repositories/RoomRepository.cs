using System;
using System.Net.Mail;
using Application.Abstractions;
using Domain;
using Domain.API.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
	public class RoomRepository : IRoomRepository
    {
        private readonly RoomDbContext roomDbContext;

        public RoomRepository(RoomDbContext roomDbContext) {
            this.roomDbContext = roomDbContext;
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

        private bool IsValidPassword(string password)
        {
            return password.Length > 8;
        }

        public Room GetByEmail(string email)
        {
            return roomDbContext.Rooms.Include(r => r.IsActive)
                .FirstOrDefault(r => r.Email == email.ToLower());
        }

        private Room GetRoomByEmailAsync(string email)
        {
            var room = GetByEmail(email);
            return room;
        }

        public Room Login(string email)
        {
            return roomDbContext.Rooms.Include(r => r.IsActive)
                .FirstOrDefault(r => r.Email == email.ToLower());
        }

        public Room Create(Room room)
        {

            if (string.IsNullOrEmpty(room.RoomName))
            {
                throw new FormatException("RoomName is invalid");
            }

            if (string.IsNullOrEmpty(room.RoomType))
            {
                throw new FormatException("RoomType is invalid");
            }

            if (GetByEmail(room.Email) != null)
            {
                throw new FormatException("Email already exists");
            }

            if (string.IsNullOrEmpty(room.Email) || new System.Net.Mail.MailAddress(room.Email) == null)
            {
                throw new FormatException("Email is invalid");
            }
            if (string.IsNullOrEmpty(room.Password))
            {
                throw new FormatException("Password is invalid");
            }


            roomDbContext.Rooms.Add(room);
            roomDbContext.SaveChanges();

            return GetByEmail(room.Email);
        }

        public Room Delete(int Id)
        {
            Room room = GetById(Id);
            if (room == null)
            {
                throw new Exception(message: "Room not found");
            }

           roomDbContext.Rooms.Remove(room);
            roomDbContext.SaveChanges();
            return room;
        }

        public Room GetById(int id)
        {
            Room room = roomDbContext.Rooms.Include(r => r.IsActive)
                .FirstOrDefault(r => r.Id == id);

            return room;
        }

    }
}

