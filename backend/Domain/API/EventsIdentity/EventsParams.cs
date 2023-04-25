using System;
namespace Domain.API.EventsIdentity
{
    public class EventsParams
    {
        public string key { get; set; }

        public string action { get; set; }

        public List<EventCreateModel> added { get; set; }

        public List<EventCreateModel> changed { get; set; }

        public List<EventCreateModel> deleted { get; set; }
        public EventCreateModel value { get; set; }
    }
}

