import { useQuery } from "react-query";
import { IEvents } from "../dto/models/IEvents";
import { BASE_URL_API, EVENT_ENDPOINTS } from "../dto/constants";

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
			GId: event.gId,
			Id: event.id,
			Subject: event.subject,
			StartTime: new Date(event.startTime),
			EndTime: new Date(event.endTime),
			RecurrenceRule: event.recurrenceRule,
			Description: event.notes,
			RoomId: event.roomId,
			HostId: event.hostId,
		}));
	});
}

export const AddEvent = async (newEvent: any) => {
	const body = {
		subject: "string",
		startTime: "string",
		endTime: "string",
		recurrenceRule: "string",
		notes: "string",
		roomIds: ["string", "string"],
		hostId: "string",
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
