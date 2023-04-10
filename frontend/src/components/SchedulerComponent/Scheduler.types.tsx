import { IRoom } from "../../dto/models/IRooms";
import { getRandomHexColor } from "../../utils/helperFunctions";
import { GetUserById } from "../../api/employees";
import { CellClickEventArgs } from "@syncfusion/ej2-react-schedule";
import { IEvents } from "../../dto/models/IEvents";
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

export const onPopupOpen = async (props: any) => {
	const resourceEl = document.querySelector(
		".e-resource-details.e-text-ellipsis"
	);
	const id = props.data.HostId;
	let host;
	if (id) {
		host = await GetUserById(id);
	} else if (localStorage.getItem("sub")) {
		const sub = localStorage.getItem("sub");
		host = sub && (await GetUserById(sub));
	}
	if (resourceEl)
		resourceEl.textContent = `Hosted by ${host.firstName} ${host.lastName} `;
};
export function onActionBegin(args: any, event: any) {
	console.log("actionBegin", args, event);
	if (args.requestType === "dateNavigate") {
		//
	}
	if (args.requestType === "eventCreate") {
		// handle event creation here
	} else if (args.requestType === "eventChange") {
		// handle event editing here
	} else if (args.requestType === "eventRemove") {
		// handle event removal here
	}
}

export const onCellClick = (args: CellClickEventArgs, eventsData: IEvents[]) => {
	console.log("cellClick", args, eventsData);
    const clickedTime = args.startTime;
		const clickedEndTime = args.endTime;
// const eventsArray = Object.keys(eventsData).map((key) => eventsData[key]);
		//Check if any event exists for the selected time range
		const isConflict = eventsData.some(
			(event : any) =>
				event.StartTime <= clickedEndTime && event.EndTime >= clickedTime
		);

		// If there is a conflict, prevent adding a new event
		if (isConflict) {
			args.cancel = true;
		}
        if(args.isAllDay) {
            args.cancel = true;
        }
};