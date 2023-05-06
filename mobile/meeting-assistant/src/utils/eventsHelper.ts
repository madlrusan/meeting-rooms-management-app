import { GetUserById } from "../api/host";
import { ICreateEvent, IEvents } from "../dto/models/IEvent";
import moment from "moment";

export const isOccurringToday = (event: IEvents): boolean => {
  const { StartTime, EndTime, RecurrenceRule } = event;
  const today = new Date();

  // Check if event occurs today based on start and end time
  const startsToday = StartTime.toDateString() === today.toDateString();
  const endsToday = EndTime.toDateString() === today.toDateString();
  const occursToday = startsToday || endsToday;

  if (occursToday) {
    return true;
  }

  // Check if event occurs today based on recurrence rule
  if (RecurrenceRule) {
    const ruleParts = RecurrenceRule.split(";");
    const freqPart = ruleParts.find((part) => part.startsWith("FREQ"));
    if (!freqPart) {
      return false;
    }
    const freq = freqPart.split("=")[1];

    const intervalPart = ruleParts.find((part) => part.startsWith("INTERVAL"));
    const interval = intervalPart ? parseInt(intervalPart.split("=")[1]) : 1;

    const byDayPart = ruleParts.find((part) => part.startsWith("BYDAY"));
    const byDay = byDayPart ? byDayPart.split("=")[1].split(",") : [];

    let count = 0;
    let currentDate = today;
    const daysOfWeek = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
    while (count <= 366) {
      // Check if the event occurs on the current date
      const currentDayOfWeek = daysOfWeek[currentDate.getUTCDay()];
      const isRecurrentDay = byDay.includes(currentDayOfWeek) || byDay.length === 0 || !byDayPart;
      const isToday = currentDate.toDateString() === today.toDateString();
      if (isRecurrentDay && isToday) {
        return true;
      }

      // Move to the next date according to the recurrence rule
      switch (freq) {
        case "DAILY":
          currentDate.setDate(currentDate.getDate() + interval);
          break;
        case "WEEKLY":
          currentDate.setDate(currentDate.getDate() + interval * 7);
          break;
        case "MONTHLY":
          currentDate.setMonth(currentDate.getMonth() + interval);
          break;
        case "YEARLY":
          currentDate.setFullYear(currentDate.getFullYear() + interval);
          break;
        default:
          return false;
      }
      count++;
    }
  }

  return false;
};

export const getTodayEvents = (events: IEvents[]) => {
  return events.filter((event) => {
    const isToday = isOccurringToday(event);
    if (!isToday) {
      // console.log("Event filtered out: ", event);
    }
    return isToday;
  });
}

export const isCurrentTimeWithinInterval = (startTime: string, endTime: string): boolean =>{
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const startHour = parseInt(startTime.split(':')[0], 10);
  const startMinute = parseInt(startTime.split(':')[1], 10);

  const endHour = parseInt(endTime.split(':')[0], 10);
  const endMinute = parseInt(endTime.split(':')[1], 10);

  if (currentHour < startHour || currentHour > endHour) {
    return false;
  } else if (currentHour === startHour && currentMinute < startMinute) {
    return false;
  } else if (currentHour === endHour && currentMinute > endMinute) {
    return false;
  }

  return true;
}

export const getRoomStatusForEvent = (eventStartTime: string, eventEndTime: string) => {
  if(isCurrentTimeWithinInterval(eventStartTime, eventEndTime)) {
    return "busy";
  }
  return "reserved";
}

export const getHostName = async (id: string) => {
  const hostPromise = await GetUserById(id);
  return hostPromise.then(() =>{});
}

export const createEventObject = (data: any, fromCard: boolean): ICreateEvent => {
  const { hostCredentials, selectedStartTime, selectedEndTime, intervalStart, intervalEnd } = data;
  
  const startTime = fromCard ? selectedStartTime : intervalStart;
  const endTime = fromCard ? selectedEndTime : intervalEnd;
  return {
    StartTime: startTime,
    EndTime: endTime,
    HostEmail: hostCredentials.email,
    HostPIN: hostCredentials.PIN,
  };
}