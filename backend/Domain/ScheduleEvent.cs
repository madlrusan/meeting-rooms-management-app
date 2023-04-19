using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Domain.API;
namespace Domain
{
	public class ScheduleEvent
	{
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Subject { get; set; }
        public Nullable<DateTime> StartTime { get; set; }
        public Nullable<DateTime> EndTime { get; set; }
        public string StartTimezone { get; set; }
        public string EndTimezone { get; set; }
        public Nullable<bool> IsAllDay { get; set; }
        public string RecurrenceRule { get; set; }
        public Nullable<int> RecurrenceID { get; set; }
        public string RecurrenceException { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string GroupID { get; set; }
        public string RoomId { get; set; }
        public string HostId { get; set; }
        public virtual Room Room { get; set; }
        public virtual User Host { get; set; }

    }
}

