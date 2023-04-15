using System;
namespace Domain.API.EventsIdentity
{
	public class CRUDEventsModel
	{
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsAllDay { get; set; }
        public int RecurrenceID { get; set; }
        public string RecurrenceException { get; set; }
        public string RecurrenceRule { get; set; }
        public string Notes { get; set; }
        public bool IsReadOnly { get; set; }
        public bool IsBlock { get; set; }
        public string RoomId { get; set; }
        public string HostId { get; set; }
    }
}

