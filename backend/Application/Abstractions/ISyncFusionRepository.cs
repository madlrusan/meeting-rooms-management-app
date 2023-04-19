using System;
using Domain;
using Domain.API.EventsIdentity;
namespace Application.Abstractions
{
	public class ISyncFusionRepository
	{
		public Task<List<ScheduleEvent>> EditSyncfuion(EventsParams eventsParams);
	}
}

