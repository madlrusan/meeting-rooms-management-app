using System;
namespace Domain.API.RoomIdentity
{
	public class RoomViewsModel
	{
        public int Id { get; set; }
        public string RoomName { get; set; }
        public string RoomType { get; set; }
        public int RoomCapacity { get; set; }
        public string RoomLocation { get; set; }
        public List<RoomFeature> RoomFeatures { get; set; }
    }
}

