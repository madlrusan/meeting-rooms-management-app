using System;
using Domain.API.EventsIdentity;
using Domain.API.RoomIdentity;

namespace Application.Abstractions
{
    public interface IEventRepository
	{
        public Task CreateEvent(EventCreateModel model);
        public Task<IEnumerable<EventViewModel>> GetAllEvents();
    }
}

