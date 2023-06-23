import { IRoom } from "../../dto/models/IRooms";
import { getRandomHexColor } from "../../utils/helperFunctions";
import { GetUserById } from "../../api/employees";
import { IEvents } from "../../dto/models/IEvents";
import { EditorWindow } from "./EditorWindow/EditorWindow";
import React from "react";
import { AddEvent, DeleteEvent, UpdateEvent } from "../../api/events";
import { DataManager, Query, UrlAdaptor } from "@syncfusion/ej2-data";
import { BASE_URL_API, EVENT_ENDPOINTS } from "../../dto/constants";
import { DropDownList } from "@syncfusion/ej2-react-dropdowns";
import { createElement } from "@syncfusion/ej2-base";

export const resourceHeaderTemplate = (props: any) => {
	function getRoomName(value: any) {
		return value.resourceData.roomName;
	}
	function getRoomType(value: any) {
		return value.resourceData.roomType;
	}
	function getRoomCapacity(value: any) {
		return value.resourceData.roomCapacity;
	}
	return (
		<div className="template-wrap">
			<div className="room-name">{getRoomName(props)}</div>
			<div className="room-type">{getRoomType(props)}</div>
			<div className="room-capacity">{getRoomCapacity(props)}</div>
		</div>
	);
};

export const onRenderCell = (args: any) => {
	if (
		args.elementType === "emptyCells" &&
		args.element.classList.contains("e-resource-left-td")
	) {
		const target = args.element.querySelector(".e-resource-text");
		target.innerHTML =
			'<div class="name">Rooms</div><div class="type">Type</div><div class="capacity">Capacity</div>';
	}
};

export const majorSlotTemplate = (props: any) => {
	return <div>{props.date.toLocaleTimeString().slice(0, 5)}</div>;
};

export const getSchedulerRooms = (rooms: IRoom[]) => {
	const schedulerRooms = rooms.map((room) => room);
	schedulerRooms.forEach((room) => {
		room.color = getRandomHexColor(room.roomId);
	});
	return schedulerRooms;
};

export const onPopupOpen = async (args: any, ref: any) => {
	console.log("onPopupOpen", args);
	const resourceEl1 = document.querySelector(
		".e-resource-details.e-text-ellipsis"
	);
	const respurceEl2 = document.querySelector(
		".e-resource-details.e-text-ellipsis"
	);
	const id = args.data.HostId;
	let host;
	if (id) {
		host = await GetUserById(id);
	} else if (localStorage.getItem("sub")) {
		const sub = localStorage.getItem("sub");
		host = sub && (await GetUserById(sub));
	}
	if (resourceEl1)
		resourceEl1.textContent = `Hosted by ${host.firstName} ${host.lastName} `;
};

export const onCellClick = (
	args: any,
	eventsData: IEvents[],
	roomsData: IRoom[]
) => {
	console.log("cellClick", args, eventsData, roomsData);
	const clickedTime = args.startTime;
	const clickedEndTime = args.endTime;
	const groupIndex = args.groupIndex;
	const roomId = roomsData[groupIndex]?.roomId;

	const isConflict = eventsData.some(
		(event: any) =>
			event.StartTime < clickedEndTime &&
			event.EndTime > clickedTime &&
			event.RoomId === roomId
	);
	if (isConflict) {
		args.cancel = true;
	}
	if (args.isAllDay) {
		args.cancel = true;
	}
};

export const onEventClick = (args: any) => {
	console.log(`onEventClick`, args);
};

export const EDTemplate = (args: any) => {
	console.log(`EdTemplate`, args);

	return <EditorWindow {...args} />;
};
export const onActionBegin = async (args: any, allEvents: IEvents[]) => {
	console.log("onActionBegin", args);
	if (args.requestType === "dateNavigate") {
		return;
	}
	if (args.requestType === "eventCreate" && args.addedRecords.length > 0) {
		args.data.forEach(async (record: any) => {
			const eventData = record;
			if (
				allEvents.some(
					(e) =>
						e.RoomId === eventData.RoomId && e.Id === eventData.Id
				)
			) {
				args.requestType = "eventChange"; // Change the requestType to eventChange
				console.log(
					`Event with GId ${eventData.Id} already exists in allEvents`
				);
			} else {
				await AddEvent(eventData);
			}
		});
	}
	if (args.requestType === "eventChange") {
		if (Array.isArray(args.data)) {
			args.data.forEach(async (record: any) => {
				const eventData = record;
				UpdateEvent(eventData);
			});
		} else {
			const eventData = args.data;
			UpdateEvent(eventData);
		}
	}
	if (args.requestType === "eventRemove") {
		// if (args.changedRecords) {
		// 	const eventData = args.changedRecords;
		// 	eventData.forEach(async (element: any) => {
		// 		const id = element.GId;
		// 		DeleteEvent(id);
		// 	});
		// }
		// if (args.deletedRecords) {
		// 	const eventData = args.deletedRecords;
		// 	eventData.forEach(async (element: any) => {
		// 		const id = element.GId;
		// 		DeleteEvent(id);
		// 	});
		// }
		// if (args.data[0].parent) {
		// 	const eventData = args.data[0].parent;
		// 	const id = eventData.GId;
		// 	DeleteEvent(id);
		// }
		// if (args.data[0].occurrence) {
		// 	const id = args.data[0].occurrence.GId;
		// 	DeleteEvent(id);
		// }
		console.log(args.data.args);
	}
};

export const onActionComplete = async (args: any) => {
	console.log(args);
	var deletedRecords = args.deletedRecords;
	var changedRecords = args.changedRecords;
	var addedRecords = args.addedRecords;
	switch (args.requestType) {
		case "eventCreated": {
			var events = args.data;
			events.forEach(async (e: any) => await AddEvent(e));
			break;
		}
		case "eventChanged": {
			deletedRecords.forEach(async (e: any) => await DeleteEvent(e.Id));
			changedRecords.forEach(async (e: any) => await UpdateEvent(e));
			addedRecords.forEach(async (e: any) => await AddEvent(e));
			break;
		}
		case "eventRemoved": {
			console.log(args);
			changedRecords.forEach(async (e: any) => await UpdateEvent(e));
			deletedRecords.forEach(async (e: any) => await DeleteEvent(e.Id));
			break;
		}
		default: {
			console.log("onActionComplete", args);
		}
	}
};

// export const dataEventmanagerSource = new DataManager({
// 	url: `${BASE_URL_API}${EVENT_ENDPOINTS.getEventsByParams}`,
// 	crossDomain: true,
// 	adaptor: new UrlAdaptor(),
// });
