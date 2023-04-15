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
                .AnyAsync(e => e.Subject == model.Subject
                    && e.StartTime == model.StartTime && e.EndTime == model.EndTime
                    && e.Room.Id == model.RoomId && e.Host.Id == model.HostId))
            {
                throw new ValidationException("Schedule event with the same subject, start time, end time, room ID, and host ID already exists");
            }
            // Check if another event exists in any of the srooms
            if (await _appDbContext.ScheduleEvents
                .AnyAsync(e => e.Room.Id == model.RoomId
                && (e.StartTime >= model.StartTime && e.StartTime < model.EndTime
                || e.EndTime > model.StartTime && e.EndTime <= model.EndTime)))
            {
                throw new ValidationException("Another schedule event exists in the selected room during the selected time period");
            }
            // Check if all room IDs are valid
            var invalidRoomId = await _appDbContext.Rooms.FirstOrDefaultAsync(r => r.Id == model.RoomId);
            if (invalidRoomId == null)
            {
                throw new ValidationException($"Invalid room ID: {model.RoomId}");
            }
            // Check if host ID is valid
            if (!await _appDbContext.Users.AnyAsync(u => u.Id == model.HostId))
            {
                throw new ValidationException($"Invalid host ID: {model.HostId}");
            }
            var scheduleEvent = new ScheduleEvent
            {
                Subject = model.Subject,
                StartTime = model.StartTime,
                EndTime = model.EndTime,
                RecurrenceRule = model.RecurrenceRule,
                Notes = model.Notes,
                Room = await _appDbContext.Rooms.FindAsync(model.RoomId),
                Host = await _appDbContext.Users.FindAsync(model.HostId),
                //CreatedTimeUTC = DateTime.UtcNow
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
                        GId = @event.Id,
                        Id = i++,
                        Subject = @event.Subject,
                        StartTime = @event.StartTime,
                        EndTime = @event.EndTime,
                        RecurrenceRule = @event.RecurrenceRule,
                        Notes = @event.Notes,
                        RoomId = @event.Room.Id,
                        HostId = @event.Host.Id
                    });
                }

            return eventViewModels;
        }

        public async Task UpdateEvent(EventUpdateModel model)
        {
            if(model is not null)
            {

                var existingEvent = await _appDbContext.ScheduleEvents
                    .Include(e => e.Room)
                    .Include(e => e.Host)
                    .FirstOrDefaultAsync(e => e.Id == model.Id);

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
                var invalidRoomId = await _appDbContext.Rooms.FirstOrDefaultAsync(r => r.Id == model.RoomId);
                if (invalidRoomId == null)
                {
                    throw new ValidationException($"Invalid room ID: {model.RoomId}");
                }
                //// Check if another event exists in the same room during the updated time period
                //if (await _appDbContext.ScheduleEvents
                //    .AnyAsync(e => e.Room.Id == model.RoomId
                //    && e.Id != model.Id // exclude the current event being updated
                //    && (e.StartTime >= model.StartTime && e.StartTime < model.EndTime
                //    || e.EndTime > model.StartTime && e.EndTime <= model.EndTime)))
                //{
                //    throw new ValidationException("Another schedule event exists in the selected room during the updated time period");
                //}

                existingEvent.Subject = model.Subject;
                existingEvent.StartTime = model.StartTime;
                existingEvent.EndTime = model.EndTime;
                existingEvent.RecurrenceRule = model.RecurrenceRule;
                existingEvent.Notes = model.Notes;
                existingEvent.Room = await _appDbContext.Rooms.FindAsync(model.RoomId);
       

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

        public async Task<ScheduleEvent> GetEventByIdAsync(string id)
        {
            var scheduleEvent = await _appDbContext.ScheduleEvents.FindAsync(id);
            return scheduleEvent;
        }
    }
}

