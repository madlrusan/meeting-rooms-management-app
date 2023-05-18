
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IEvents, ICreateEvent } from "../dto/models/IEvent";
import { BASE_URL_API, EVENT_ENDPOINTS } from "../dto/constants";
import {getDate} from "../utils/generalHelper";
import { useInfiniteQuery } from "react-query";
import {useEffect} from "react";
export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function GetEvents() {
  const query = useInfiniteQuery(
    "events",
    async ({ pageParam = 0 }) => {
      // Fetch events from the API
      const response = await fetch(
        `${BASE_URL_API}${EVENT_ENDPOINTS.getAllEvents}?page=${pageParam}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const events = await response.json();

      // Filter and transform the events
      const roomId = await AsyncStorage.getItem("sub");
      const transformedEvents = events
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

      return transformedEvents;
    },
    {
      getNextPageParam: (lastPage: any[]) =>
        lastPage.length > 0 ? lastPage[lastPage.length - 1].id : null,
      refetchInterval: 500, // set the refetch interval to 5 seconds
    }
  );

  const checkForNewEvent = async () => {
    const newEvents = await query.refetch(); // Refetch the events

    // Check if there is a new event
    if (newEvents && newEvents.pages) {
      const allEvents = newEvents.pages.flatMap((page) => page);
      if (allEvents.length > 0) {
        // Check if the new event is different from the existing events
        const existingEvents = query.data?.pages.flatMap((page) => page);
        const isNewEvent = !existingEvents || existingEvents.length === 0 || allEvents[0].Id !== existingEvents[0].Id;
        if (isNewEvent) {
          // Set a timeout to refetch again after a short delay
          setTimeout(checkForNewEvent, 2000); // 2 seconds delay before next refetch
        }
      }
    }
  };

  useEffect(() => {
    checkForNewEvent(); // Start checking for new events on initial load
  }, []);

  return query;
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

