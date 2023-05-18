using System;
using Application.Abstractions;
using Domain;

namespace DataAccess.Repositories
{
	public class EventLogRepository : IEventLogRepository
	{
		private readonly AppDbContext _appDbContext;

		public EventLogRepository(AppDbContext appDbContext)
		{
			_appDbContext = appDbContext;
		}

		public bool logEvent(string Message, EventLogType type)
		{
			try
			{
				_appDbContext.EventLogs.Add(new EventLog { EventCategory = new EventCategory { Id = ((int)type)}, Value = Message });
				_appDbContext.SaveChanges();
				return true;
			}
			catch (Exception e)
			{
				_appDbContext.EventLogs.Add(new EventLog { EventCategory = new EventCategory { Id = ((int)type) }, Value = "Could not log event!" });
				_appDbContext.SaveChanges();
				return false;
			}
		}
	}
}

