export const BASE_URL_API = "https://meetingly-api.azurewebsites.net";
// export const BASE_URL_API = "https://localhost:7046";

export const BASE_URL_FE = "http://localhost:3000";

export const USER_ENDPOINTS = {
	login: "/user/login",
	addUser: "/user/register",
	getAllUsers: "/user/getAllUsers",
	updateUser: "/user/updateUser",
	deleteUser: "/user/deleteUser",
	getUserById: "/user/getUserById",
	updateUserPassowrd: "/user/updateUserPasssword",
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
	getEventsByParams: "/event/CRUDEventsByDateRange",
	updateEventsByParams: "/event/updateEventsByParams",
	addEventsByParams: "/event/addEventsByParams",
};
