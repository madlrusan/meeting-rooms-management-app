import { useInfiniteQuery, useQuery } from "react-query";
import { ICreateEvent, IEvents } from "../dto/models/IEvent";
import { BASE_URL_API, EVENT_ENDPOINTS } from "../dto/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { convertTime, getDate, getRandomInt } from "../utils/generalHelper";

export function GetEvents() {
  return useInfiniteQuery(
    "allEvents",
    async ({ pageParam = 0 }) => {
      const response = await fetch(
        `${BASE_URL_API}${EVENT_ENDPOINTS.getAllEvents}?page=${pageParam}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
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
      getNextPageParam: (lastPage: string | any[]) => lastPage.length > 0 ? lastPage[lastPage.length - 1].id : null,
      refetchInterval: 5000 // set the refetch interval to 5 seconds
    }
  );
}

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