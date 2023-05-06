using System;
using Domain.API.EventsIdentity;
using Domain.API.RoomIdentity;

namespace Application.Abstractions
{
    public interface IEventRepository
	{
        public Task CreateEvent(EventCreateModel model);
        public Task<IEnumerable<EventViewModel>> GetAllEvents();
        public Task UpdateEvent(EventUpdateModel model);
        public Task DeleteEvent(EventDeleteModel model);
        public Task<IEnumerable<EventViewModelMobile>> GetAllEventsMobile();
        public Task CreateEventMobile(EventCreateModelMobile model);

    }
}

