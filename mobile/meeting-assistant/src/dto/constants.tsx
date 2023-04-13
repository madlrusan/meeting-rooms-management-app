export const BASE_URL_API = "https://localhost:7081";
export const BASE_URL_FE = "http://localhost:3000";

export const USER_ENDPOINTS = {
	login: "/user/login",
	addUser: "/user/register",
	getAllUsers: "/user/getAllUsers",
	updateUser: "/user/updateUser",
	deleteUser: "/user/deleteUser",
	getUserById: "/user/getUserById",
};
export const ROOM_ENDPOINTS = {
	login: "/room/login",
	createRoom: "/room/createRoom",
	getAllRooms: "/room/getAllRooms",
	updateRoom: "/room/updateRoom",
	deleteRoom: "/room/deleteRoom",
};

export const EVENT_ENDPOINTS = {
	createEvent: "/event/createEvent",
	getAllEvents: "/event/getAllEvents",
	updateEvent: "/event/updateEvent",
	deleteEvent: "/event/deleteEvent",
};
