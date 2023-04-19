﻿using System;
using Application.Abstractions;
using Domain;
using Domain.API.EventsIdentity;
namespace DataAccess.Repositories
{
	public class SyncFusionRepository : ISyncFusionRepository
	{
        private readonly AppDbContext _appDbContext;
        public SyncFusionRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<List<ScheduleEvent>> EditSyncfuion(EventsParams editParams)
        {
            if(editParams.action == "insert" || (editParams.action == "batch" && editParams.action is not null))
            {
                for( var i=0; i<editParams.added.Count; i++)
                {
                    var value = (editParams.action == "insert") ? editParams.value : editParams.added[i];
                    int intMax = _appDbContext.ScheduleEvents.ToList().Count > 0 ? _appDbContext.ScheduleEvents.ToList().Max(p => p.Id) : 1;
                    DateTime startTime = Convert.ToDateTime(value.StartTime);
                    DateTime endTime = Convert.ToDateTime(value.EndTime);
                    ScheduleEvent appointment = new ScheduleEvent()
                    {
                        Id = intMax + 1,
                        StartTime = startTime,
                        EndTime = endTime,
                        Subject = value.Subject,
                        Location = value.Location,
                        Description = value.Description,
                        IsAllDay = value.IsAllDay,
                        StartTimezone = value.StartTimezone,
                        EndTimezone = value.EndTimezone,
                        RecurrenceRule = value.RecurrenceRule,
                        RecurrenceID = value.RecurrenceID,
                        RecurrenceException = value.RecurrenceException,
                        GroupID = value.GroupID.ToString(),
                        Room = await _appDbContext.Rooms.FindAsync(value.RoomId),
                        Host = await _appDbContext.Users.FindAsync(value.HostId),
                    };
                    _appDbContext.ScheduleEvents.AddAsync(appointment);
                    await _appDbContext.SaveChangesAsync();
                }
            }

            if (editParams.action == "update" || (editParams.action == "batch" && editParams.changed != null))
            {
                for(var i=0; i< editParams.changed.Count; i++)
                {
                    var value = (editParams.action == "update") ? editParams.value : editParams.changed[i];
                    var filterData = _appDbContext.ScheduleEvents.Where(c => c.Id == Convert.ToInt32(value.Id));
                    if(filterData.Count() > 0)
                    {
                        DateTime startTime = Convert.ToDateTime(value.StartTime);
                        DateTime endTime = Convert.ToDateTime(value.EndTime);
                        ScheduleEvent appointment = _appDbContext.ScheduleEvents.Single(A => A.Id == Convert.ToInt32(value.Id));
                        appointment.StartTime = startTime;
                        appointment.EndTime = endTime;
                        appointment.StartTimezone = value.StartTimezone;
                        appointment.EndTimezone = value.EndTimezone;
                        appointment.Subject = value.Subject;
                        appointment.Location = value.Location;
                        appointment.Description = value.Description;
                        appointment.IsAllDay = value.IsAllDay;
                        appointment.RecurrenceRule = value.RecurrenceRule;
                        appointment.RecurrenceID = value.RecurrenceID;
                        appointment.RecurrenceException = value.RecurrenceException;
                        appointment.GroupID = value.GroupID.ToString();
                    }
                    await _appDbContext.SaveChangesAsync();
                }
            }
            if (editParams.action == "remove" || (editParams.action == "batch" && editParams.changed != null))
            {
                if(editParams.action == "remove")
                {
                    int key = Convert.ToInt32(editParams.key);
                    ScheduleEvent appointment = _appDbContext.ScheduleEvents.Where(c => c.Id == key).FirstOrDefault();
                    if (appointment is not null) _appDbContext.ScheduleEvents.Remove(appointment);
                }
                else
                {
                    foreach( var app in editParams.deleted)
                    {
                        ScheduleEvent appointment = _appDbContext.ScheduleEvents.Where(c => c.Id == app.Id).FirstOrDefault();
                        if (app is not null) _appDbContext.ScheduleEvents.Remove(appointment);
                    }
                }
                await _appDbContext.SaveChangesAsync();
            }

            return _appDbContext.ScheduleEvents.ToList();
        }
    }
}

