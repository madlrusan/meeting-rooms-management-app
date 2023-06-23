using System;
using Domain;
using Application.Abstractions;
using Domain.API.EventsIdentity;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
	public class EventRepository : IEventRepository
	{
		private readonly AppDbContext _appDbContext;
		public EventRepository(AppDbContext appDbContext)
		{
			_appDbContext = appDbContext;
		}

		public async Task CreateEvent(EventCreateModel model)
		{
            if (model == null)
            {
                throw new ValidationException("Schedule event data is missing");
            }
            if (string.IsNullOrWhiteSpace(model.Subject))
            {
                throw new ValidationException("Subject is missing");
            }
            if (model.StartTime == default || model.EndTime == default)
            {
                throw new ValidationException("Start time or end time is missing");
            }
            if (model.RoomId == null || !model.RoomId.Any())
            {
                throw new ValidationException("At least one room is required");
            }

            if (string.IsNullOrWhiteSpace(model.HostId))
            {
                throw new ValidationException("Host is missing");
            }

            // Check if event already exists
            if (await _appDbContext.ScheduleEvents
                .AnyAsync(e =>  e.StartTime == model.StartTime && e.EndTime == model.EndTime
                    && e.Room.Id == new Guid(model.RoomId) && e.EventId != model.RecurrenceID && e.EventId != model.Id))
            {
                throw new ValidationException("Schedule event with the same subject, start time, end time, room ID, and host ID already exists");
            }
            // Check if another event exists in any of the srooms
            if (await _appDbContext.ScheduleEvents
                .AnyAsync(e => e.Room.Id ==new Guid(model.RoomId)
                && (e.StartTime >= model.StartTime && e.StartTime < model.EndTime
                || e.EndTime > model.StartTime && e.EndTime <= model.EndTime) && e.EventId != model.RecurrenceID && e.EventId != model.Id))
            {
                throw new ValidationException("Another schedule event exists in the selected room during the selected time period");
            }
            // Check if room ID is valid
            var room = await _appDbContext.Rooms.FirstOrDefaultAsync(r => r.Id == new Guid(model.RoomId));
            if (room == null)
            {
                throw new ValidationException($"Invalid room ID: {model.RoomId}");
            }
            // Check if host ID is valid
            var user = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Id == model.HostId);
            if (user is null)
            {
                throw new ValidationException($"Invalid host ID: {model.HostId}");
            }
            
            var scheduleEvent = new ScheduleEvent
            {
                EventId = model.Id,
                Subject = model.Subject,
                StartTime = model.StartTime,
                EndTime = model.EndTime,
                IsAllDay = model.IsAllDay,
                RecurrenceRule = model.RecurrenceID == 0 ? model.RecurrenceRule:"",
                RecurrenceID = model.RecurrenceID,
                RecurrenceException = model.RecurrenceException,
                Description = model.Description,
                Room = room,
                Host = user,
            };
            await _appDbContext.ScheduleEvents.AddAsync(scheduleEvent);
            await _appDbContext.SaveChangesAsync();
            
        }

        public async Task<IEnumerable<EventViewModel>> GetAllEvents()
        {
            var events = await _appDbContext.ScheduleEvents
                .Include(e => e.Room)
                .Include(e => e.Host)
                .ToListAsync();
            var eventViewModels = new List<EventViewModel>();
            var i = 0;
            foreach (var @event in events)
            {
                eventViewModels.Add(new EventViewModel
                {
                    Id = @event.EventId,
                    Subject = @event.Subject,
                    StartTime = (DateTime)@event.StartTime,
                    EndTime = (DateTime)@event.EndTime,
                    RecurrenceRule = @event.RecurrenceRule,
                    RecurrenceException = @event.RecurrenceException,
                    RecurrenceID = @event.RecurrenceID,
                    Description = @event.Description,
                    RoomId = @event.Room.Id.ToString(),
                    HostId = @event.Host.Id
                });
            }
            return eventViewModels;
        }

        public async Task UpdateEvent(EventUpdateModel model)
        {
            if (model is not null)
            {
                var existingEvent = await _appDbContext.ScheduleEvents
                    .Include(e => e.Room)
                    .Include(e => e.Host)
                    .FirstOrDefaultAsync(e => e.EventId == model.Id);

                if (existingEvent == null)
                {
                    throw new ValidationException("Schedule event does not exist");
                }
                if (string.IsNullOrWhiteSpace(model.Subject))
                {
                    throw new ValidationException("Subject is missing");
                }
                if (model.StartTime == default || model.EndTime == default)
                {
                    throw new ValidationException("Start time or end time is missing");
                }
                if (model.RoomId == null || !model.RoomId.Any())
                {
                    throw new ValidationException("At least one room is required");
                }
                // Check if all room IDs are valid
                var room = await _appDbContext.Rooms.FirstOrDefaultAsync(r => r.Id == new Guid(model.RoomId));
                if (room == null)
                {
                    throw new ValidationException($"Invalid room ID: {model.RoomId}");
                }
                // Check if another event exists in the same room during the updated time period
                if (await _appDbContext.ScheduleEvents
                    .AnyAsync(e => e.Room.Id == new Guid(model.RoomId)
                    && e.EventId != model.Id // exclude the current event being updated
                    && (e.StartTime >= model.StartTime && e.StartTime < model.EndTime
                    || e.EndTime > model.StartTime && e.EndTime <= model.EndTime)))
                {
                    throw new ValidationException("Another schedule event exists in the selected room during the updated time period");
                }
                existingEvent.Subject = model.Subject;
                existingEvent.StartTime = model.StartTime;
                existingEvent.EndTime = model.EndTime;
                existingEvent.RecurrenceRule = model.RecurrenceRule;
                existingEvent.Description = model.Description;
                existingEvent.Room = room;
                await _appDbContext.SaveChangesAsync();
            }
        }
        public async Task DeleteEvent(EventDeleteModel model)
        {
            var existingEvent = await GetEventByIdAsync(model.Id);
            if(existingEvent is null)
            {
                throw new ValidationException("Event does not exist");
            }
            _appDbContext.ScheduleEvents.Remove(existingEvent);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<ScheduleEvent> GetEventByIdAsync(int id)
        {
            var scheduleEvent = await _appDbContext.ScheduleEvents.FirstOrDefaultAsync(e => e.EventId == id);
            return scheduleEvent;
        }

        public async Task<IEnumerable<EventViewModelMobile>> GetAllEventsMobile()
        {
            var events = await _appDbContext.ScheduleEvents
                .Include(e => e.Room)
                .Include(e => e.Host)
                .ToListAsync();
            var eventViewModels = new List<EventViewModelMobile>();
            var i = 0;
            foreach (var @event in events)
            {
                eventViewModels.Add(new EventViewModelMobile
                {
                    Id = @event.EventId,
                    Subject = @event.Subject,
                    StartTime = (DateTime)@event.StartTime,
                    EndTime = (DateTime)@event.EndTime,
                    RecurrenceRule = @event.RecurrenceRule,
                    RecurrenceException = @event.RecurrenceException,
                    RecurrenceID = @event.RecurrenceID,
                    Description = @event.Description,
                    RoomId = @event.Room.Id.ToString(),
                    HostName = @event.Host.FirstName + " " + @event.Host.LastName,
                });
            }
            return eventViewModels;
        }

        public async Task CreateEventMobile(EventCreateModelMobile model)
        {
            if (model == null)
            {
                throw new ValidationException("Schedule event data is missing");
            }
            if (string.IsNullOrWhiteSpace(model.Subject))
            {
                throw new ValidationException("Subject is missing");
            }
            if (model.StartTime == default || model.EndTime == default)
            {
                throw new ValidationException("Start time or end time is missing");
            }
            if (model.RoomId == null || !model.RoomId.Any())
            {
                throw new ValidationException("At least one room is required");
            }
            if (string.IsNullOrWhiteSpace(model.HostEmail) && model.HostPIN == null)
            {
                throw new ValidationException("Host is missing");
            }
            // Check if room ID is valid
            var room = await _appDbContext.Rooms.FirstOrDefaultAsync(r => r.Id == new Guid(model.RoomId));
            if (room == null)
            {
                throw new ValidationException($"Invalid room ID: {model.RoomId}");
            }
            // Check if host is valid
            var user = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Email == model.HostEmail && u.Pin == model.HostPIN );
            if (user is null)
            {
                throw new ValidationException($"Invalid host email: {model.HostEmail} or invalid host PIN : {model.HostPIN}");
            }
            var scheduleEvent = new ScheduleEvent
            {
                EventId = model.Id,
                Subject = model.Subject,
                StartTime = model.StartTime,
                EndTime = model.EndTime,
                IsAllDay = false,
                RecurrenceRule = "",
                RecurrenceID = null,
                RecurrenceException = null,
                Description = "",
                Room = room,
                Host = user,
            };
            await _appDbContext.ScheduleEvents.AddAsync(scheduleEvent);
            await _appDbContext.SaveChangesAsync();
        }

    }
}

