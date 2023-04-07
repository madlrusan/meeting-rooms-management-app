using System;
using Domain;
using Domain.API.RoomIdentity;

namespace Application.Abstractions
{
	public interface IRoomRepository
	{
        //Room Create(Room room);
        //Room GetByEmail(string email);
        //Room GetById(int id);
        //Room Login(string email);
        //Room Delete(int id);

        public Task RegisterRoom(RoomRegisterModel model);
        //public Task<string> Login(RoomLoginModel model);
        //public Task<IEnumerable<RoomViewsModel>> GetAllRooms();


    }
}

