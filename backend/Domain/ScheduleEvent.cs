﻿using System;
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
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsAllDay { get; set; }
        public int RecurrenceID { get; set; }
        public string RecurrenceException { get; set; }
        public string RecurrenceRule { get; set; }
        public string Notes { get; set; }
        public bool IsReadOnly { get; set; }
        public bool IsBlock { get; set; }
        public DateTime CreatedTimeUTC { get; set; }


        public virtual Room Room { get; set; }
        public virtual User Host { get; set; }

    }
}

