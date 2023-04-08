using System;
using Domain;
using Domain.API.RoomIdentity;

namespace Application.Abstractions
{
    public interface IRoomRepository
    {
        public Task CreateRoom(RoomCreateModel model);
        public Task<string> Login(RoomLoginModel model);
        public Task<IEnumerable<RoomsViewModel>> GetAllRooms();
        public Task UpdateRoom(UpdateRoomModel model);
        public Task DeleteRoom(DeleteRoomModel model);

    }
}

