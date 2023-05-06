using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.API.EventsIdentity
{
    public class EventCreateModelMobile
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public Nullable<DateTime> StartTime { get; set; }
        public Nullable<DateTime> EndTime { get; set; }
        public string RoomId { get; set; }
        public string HostEmail { get; set; }
        public int HostPIN { get; set; }
    }
}
