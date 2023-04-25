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
        public int Id { get; set; } //used in db for unique 
        public int EventId { get; set; } //used for frontend
        public string Subject { get; set; }
        public Nullable<DateTime> StartTime { get; set; }
        public Nullable<DateTime> EndTime { get; set; }
        public Nullable<bool> IsAllDay { get; set; }
        public string? RecurrenceRule { get; set; }
        public Nullable<int> RecurrenceID { get; set; }
        public string? RecurrenceException { get; set; }
        public string? Description { get; set; }
        public virtual Room Room { get; set; }
        public virtual User Host { get; set; }
    }
}

