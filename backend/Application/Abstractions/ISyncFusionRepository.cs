using System;
using Domain;
using Domain.API.EventsIdentity;
namespace Application.Abstractions
{
	public interface ISyncFusionRepository
	{
		public Task<List<ScheduleEvent>> EditSyncfuion(EventsParams eventsParams);
	}
}

