import React, { useContext } from "react";
import "./style.css";
import { UserContext } from "../../context/userContext";
import { AdminRoomTable } from "./ForAdmins/AdminRoomTable";
import { GetRooms } from "../../api/rooms";
import { UserRoomTable } from "./ForUsers/UserRoomTable";
export const RoomContainer = () => {
	const { userRole } = useContext(UserContext);
	const { data: rooms } = GetRooms();
	return userRole === "Admin" ? (
		<AdminRoomTable roomsData={rooms} />
	) : (
		<UserRoomTable roomsData={rooms} />
	);
};
