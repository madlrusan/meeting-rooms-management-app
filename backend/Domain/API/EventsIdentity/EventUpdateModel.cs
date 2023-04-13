using System;
namespace Domain.API.EventsIdentity
{
	public class EventUpdateModel
	{
        public string Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string RecurrenceRule { get; set; }
        public string Notes { get; set; }
        public string RoomId { get; set; }
    }
}

