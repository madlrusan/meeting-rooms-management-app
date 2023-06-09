import { useQuery } from "react-query";
import { IEvents } from "../dto/models/IEvents";
import { BASE_URL_API, EVENT_ENDPOINTS } from "../dto/constants";
import { convertTime } from "../utils/helperFunctions";

export function GetEvents() {
	return useQuery<IEvents[]>("allEvents", async () => {
		const response = await fetch(
			`${BASE_URL_API}${EVENT_ENDPOINTS.getAllEvents}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch users");
		}
		const events = await response.json();
		return events.map((event: any) => ({
			Id: event.id,
			Subject: event.subject,
			StartTime: new Date(event.startTime),
			EndTime: new Date(event.endTime),
			IsAllDay: event.isAllDay,
			RecurrenceRule: event.recurrenceRule,
			RecurrenceID: event.recurrenceID === 0? null : event.recurrenceID,
			RecurrenceException: event.recurrenceException,
			Description: event.description,
			RoomId: event.roomId,
			HostId: event.hostId,
		}));
	});
}

export const AddEvent = async (newEvent: IEvents) => {
	const notes = newEvent.Description ?? "";
	const RecurrenceRule = newEvent.RecurrenceRule ?? "";
	const startTime = convertTime(newEvent.StartTime);
	const endTime = convertTime(newEvent.EndTime);
	console.log(newEvent);
	const body = {
		id: newEvent.Id,
		subject: newEvent.Subject,
		startTime: startTime,
		endTime: endTime,
		isAllDay: newEvent.IsAllDay,
		recurrenceRule: RecurrenceRule,
		recurrenceID: newEvent.RecurrenceID,
		recurrenceException: newEvent.RecurrenceException,
		description: notes,
		roomId: newEvent.RoomId,
		hostId: localStorage.getItem("sub"),
	};
	const response = await fetch(
		`${BASE_URL_API}${EVENT_ENDPOINTS.createEvent}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
			body: JSON.stringify(body),
		}
	);
	const responseData = await response.json();
	return responseData;
};

export const UpdateEvent = async (event: any) => {
	const notes = event.Description ?? "";
	const recc = event.RecurrenceRule ?? "";
	const startTime = convertTime(event.StartTime);
	const endTime = convertTime(event.EndTime);
	const body = {
		isAllDay: event.IsAllDay,
		recurrenceID: event.recurrenceID,
		id: event.Id,
		subject: event.Subject,
		startTime: startTime,
		endTime: endTime,
		recurrenceRule: recc,
		recurrenceException: event.RecurrenceException,
		description: notes,
		roomId: event.RoomId,
		hostId: localStorage.getItem("sub"),
	};
	const response = await fetch(
		`${BASE_URL_API}${EVENT_ENDPOINTS.updateEvent}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
			body: JSON.stringify(body),
		}
	);
	const responseData = await response.json();
	return responseData;
};

export const DeleteEvent = (id: string) => {
	const body = {
		id: id,
	};
	fetch(`${BASE_URL_API}${EVENT_ENDPOINTS.deleteEvent}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
		body: JSON.stringify(body),
	})
		.then((response) => {
			response.json();
		})
		.catch((error) => {
			console.error("Error deleting record:", error);
		});
};
