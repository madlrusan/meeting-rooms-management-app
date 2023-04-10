using System;
namespace Domain.API.EventsIdentity
{
	public class EventCreateModel
	{
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string RecurrenceRule { get; set; }
        public string Notes { get; set; }
        public List<string> RoomIds { get; set; }
        public string HostId { get; set; }
    }
}

