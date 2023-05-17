
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IEvents, ICreateEvent } from "../dto/models/IEvent";
import { BASE_URL_API, EVENT_ENDPOINTS } from "../dto/constants";
import {getDate} from "../utils/generalHelper";
import { useInfiniteQuery } from "react-query";

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function GetEvents() {
  return useInfiniteQuery(
    "events",
    async ({ pageParam = 0 }) => {
      const response = await fetch(
        `${BASE_URL_API}${EVENT_ENDPOINTS.getAllEvents}?page=${pageParam}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const events = await response.json();
      const roomId = await AsyncStorage.getItem("sub");
      return events
        .filter((event: any) => event.roomId === roomId)
        .map((event: any) => ({
          Id: event.id,
          Subject: event.subject,
          StartTime: new Date(event.startTime),
          EndTime: new Date(event.endTime),
          IsAllDay: event.isAllDay,
          RecurrenceRule: event.recurrenceRule,
          RecurrenceID: event.recurrenceID === 0 ? null : event.recurrenceID,
          RecurrenceException: event.recurrenceException,
          Description: event.description,
          RoomId: event.roomId,
          HostName: event.hostName,
        }));
    },
    {
      getNextPageParam: (lastPage: any[]) =>
        lastPage.length > 0 ? lastPage[lastPage.length - 1].id : null,
      refetchInterval: 5000 // set the refetch interval to 5 seconds
    }
  );
}


const convertTime = (date) => {
  // Convert to ISO string
  const isoString = date.toISOString();

  // Create new Date object from the ISO string and add 3 hours
  const newDate = new Date(isoString);
  newDate.setHours(newDate.getHours() + 3);

  // Return new date as ISO string
  return newDate.toISOString();
};
export const AddEvent = async (newEvent: ICreateEvent) => {
	const PIN = parseInt(newEvent.HostPIN);
  const startTime = convertTime(getDate(newEvent.StartTime));
	const endTime = convertTime(getDate(newEvent.EndTime));
  const roomId = await AsyncStorage.getItem("sub");
	// console.log(newEvent);
	const body = {
		id: getRandomInt(1,100),
		subject: "On Site Meeting",
		startTime: startTime,
		endTime: endTime,
		roomId: roomId,
		hostEmail: newEvent.HostEmail,
    hostPIN: PIN,
	};
	const response = await fetch(
		`${BASE_URL_API}${EVENT_ENDPOINTS.createEvent}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}
	);
	const responseData = await response.json();
	return responseData;
};

