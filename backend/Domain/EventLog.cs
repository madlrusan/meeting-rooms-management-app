using System;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace Domain
{
	public class EventLog
	{
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Value { get; set;}
        public virtual EventCategory EventCategory { get; set; }
        public DateTime TimeStamp { get; set; }

    }
}

