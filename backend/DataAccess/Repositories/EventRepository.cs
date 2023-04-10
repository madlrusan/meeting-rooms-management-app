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
            if (model.RoomIds == null || !model.RoomIds.Any())
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
                && e.StartTime == model.StartTime && e.EndTime == model.EndTime))
            {
                throw new ValidationException("Schedule event with the same subject, start time, and end time already exists");
            }// Check if another event exists in any of the rooms
            if (await _appDbContext.ScheduleEvents
                .AnyAsync(e => e.Rooms.Any(r => model.RoomIds.Contains(r.Id))
                && (e.StartTime >= model.StartTime && e.StartTime < model.EndTime
                || e.EndTime > model.StartTime && e.EndTime <= model.EndTime)))
            {
                throw new ValidationException("Another schedule event exists in one or more of the selected rooms during the selected time period");
            }
            // Check if all room IDs are valid
            var invalidRoomIds = model.RoomIds.Except(await _appDbContext.Rooms.Select(r => r.Id).ToListAsync()).ToList();
            if (invalidRoomIds.Any())
            {
                throw new ValidationException($"Invalid room IDs: {string.Join(",", invalidRoomIds)}");
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
                Rooms = await _appDbContext.Rooms.Where(r => model.RoomIds.Contains(r.Id)).ToListAsync(),
                Host = await _appDbContext.Users.FindAsync(model.HostId),
                //CreatedTimeUTC = DateTime.UtcNow
            };

            await _appDbContext.ScheduleEvents.AddAsync(scheduleEvent);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<EventViewModel>> GetAllEvents()
        {
            var events = await _appDbContext.ScheduleEvents
                .Include(e => e.Rooms)
                .Include(e => e.Host)
                .ToListAsync();
            var eventViewModels = new List<EventViewModel>();
            foreach (var @event in events)
            {
                var roomIdList = @event.Rooms.Select(r => r.Id).ToList();
                for (int i = 0; i < roomIdList.Count; i++)
                {
                    eventViewModels.Add(new EventViewModel
                    {
                        GId = @event.Id,
                        Id = i + 1,
                        Subject = @event.Subject,
                        StartTime = @event.StartTime.ToUniversalTime(),
                        EndTime = @event.EndTime.ToUniversalTime(),
                        RecurrenceRule = @event.RecurrenceRule,
                        Notes = @event.Notes,
                        RoomId = roomIdList[i],
                        HostId = @event.Host.Id
                    });
                }
            }

            return eventViewModels;
        }
    }
}

