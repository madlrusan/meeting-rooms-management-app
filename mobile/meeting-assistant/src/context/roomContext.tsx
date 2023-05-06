import React, { createContext, useState } from "react";
import { StatusTypes } from "../dto/enums/Status.enums";
import { IEvents } from "../dto/models/IEvent";

export const RoomContext = createContext({
	roomStatus: "",
	setRoomStatus: (roomStatus: string) => {},
	currentEvent: undefined as IEvents | undefined,
	setCurrentEvent: (event: IEvents | undefined) => {},
	selectedStartTime: "",
	setSelectedStartTime: (time: string) => {},
	selectedEndTime: "",
	setSelectedEndTime: (time: string) => {},
});

const RoomContextProvider = (props: any) => {
	const [roomStatus, setRoomStatus] = useState<string>("");
	const [currentEvent, setCurrentEvent] = useState<IEvents | undefined>(
		undefined
	);
	const [selectedStartTime, setSelectedStartTime] = useState<string>("");
	const [selectedEndTime, setSelectedEndTime] = useState<string>("");

	return (
		<RoomContext.Provider
			value={{
				roomStatus,
				setRoomStatus,
				currentEvent,
				setCurrentEvent,
				selectedStartTime,
				setSelectedStartTime,
				selectedEndTime,
				setSelectedEndTime,
			}}
		>
			{props.children}
		</RoomContext.Provider>
	);
};

export default RoomContextProvider;
