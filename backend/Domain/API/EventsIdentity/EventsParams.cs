using System;
namespace Domain.API.EventsIdentity
{
	public class EventsParams
	{
        public string key { get; set; }

        public string action { get; set; }

        public List<ScheduleEvent> added { get; set; }

        public List<ScheduleEvent> changed { get; set; }

        public List<ScheduleEvent> deleted { get; set; }

        public ScheduleEvent value { get; set; }
    }
}

