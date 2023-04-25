using System;
namespace Domain.API.RoomIdentity
{
    public class RoomsViewModel
    {
        public Guid Id { get; set; }
        public string RoomName { get; set; }
        public string RoomType { get; set; }
        public int RoomCapacity { get; set; }
        public string RoomLocation { get; set; }
        public string Email { get; set; }
    }
}

