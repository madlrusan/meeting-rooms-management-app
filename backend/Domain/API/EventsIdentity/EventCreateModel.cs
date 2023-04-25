using System;
namespace Domain.API.EventsIdentity
{
	public class EventCreateModel
	{
        public int Id { get; set; }
        public string Subject { get; set; }
        public Nullable<DateTime> StartTime { get; set; }
        public Nullable<DateTime> EndTime { get; set; }
        public Nullable<bool> IsAllDay { get; set; }
        public string? RecurrenceRule { get; set; }
        public Nullable<int> RecurrenceID { get; set; }
        public string? RecurrenceException { get; set; }
        public string? Description { get; set; }
        public string RoomId { get; set; }
        public string HostId { get; set; }
    }
}

