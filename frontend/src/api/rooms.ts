import { useQuery } from "react-query";
import { BASE_URL_API, ROOM_ENDPOINTS } from "../dto/constants";
import { IRoom } from "../dto/models/IRooms";

export function GetRooms() {
	return useQuery<IRoom[]>("allRooms", async () => {
		const response = await fetch(
			`${BASE_URL_API}${ROOM_ENDPOINTS.getAllRooms}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch users");
		}
		const rooms = await response.json();

		return rooms
			.map((room: any) => ({
				roomId: room.id,
				roomName: room.roomName,
				roomType: room.roomType,
				roomCapacity: room.roomCapacity,
				roomLocation: room.roomLocation,
				roomEmail: room.email,
			}))
			.sort((a: { roomName: string }, b: { roomName: any }) =>
				a.roomName.localeCompare(b.roomName)
			);
	});
}

export const AddRoom = async (newRoom: IRoom) => {
	const body = {
		roomName: newRoom.roomName,
		roomType: newRoom.roomType,
		roomCapacity: newRoom.roomCapacity,
		roomLocation: newRoom.roomLocation,
		email: newRoom.roomEmail,
		password: newRoom.roomPassword,
	};
	const response = await fetch(`${BASE_URL_API}${ROOM_ENDPOINTS.createRoom}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
	const responseData = await response.json();
	return responseData;
};

export const UpdateRoom = async (room: IRoom) => {
	const body = {
		id: room.roomId,
		roomName: room.roomName,
		roomType: room.roomType,
		roomCapacity: room.roomCapacity,
		roomLocation: room.roomLocation,
		email: room.roomEmail,
	};
	const response = await fetch(`${BASE_URL_API}${ROOM_ENDPOINTS.updateRoom}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
		body: JSON.stringify(body),
	});
	const responseData = await response.json();
	return responseData;
};

export const DeleteRoom = (body: any) => {
	fetch(`${BASE_URL_API}${ROOM_ENDPOINTS.deleteRoom}`, {
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
