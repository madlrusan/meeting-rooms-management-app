using System;
using Domain;
namespace Application.Abstractions
{
	public interface IEventLogRepository
	{
		public bool logEvent(string Message, EventLogType type);
	}
}

