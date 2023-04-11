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

export const onPopupOpen = async (args: any) => {
	const resourceEl = document.querySelector(
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
	if (resourceEl)
		resourceEl.textContent = `Hosted by ${host.firstName} ${host.lastName} `;
	if (args.type === "Editor") {
		args.duration = 15;
		const eventData = args.data;
		const formElements = args.element.querySelector(".e-dialog-parent");
        console.log(formElements);
		for(let i=0 ; i<10; i++) {
            const element = formElements
							.querySelectorAll(".e-float-input")[i]
							.querySelector(".e-field")
            console.log(element);
        }
		// console.log(values);
	}
};

export function onActionBegin(args: any, event: any) {
	if (args.requestType === "dateNavigate") {
		//
	}
	if (args.requestType === "eventCreate") {
		console.log("eventCreate", args);
	} else if (args.requestType === "eventChange") {
		// handle event editing here
	} else if (args.requestType === "eventRemove") {
		// handle event removal here
	}
}

export const onCellClick = (
	args: CellClickEventArgs,
	eventsData: IEvents[]
) => {
	console.log("cellClick", args, eventsData);
	const clickedTime = args.startTime;
	const clickedEndTime = args.endTime;
	const isConflict = eventsData.some(
		(event: any) =>
			event.StartTime <= clickedEndTime && event.EndTime >= clickedTime
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

export const FieldsData = {
	id: "Id",
	subject: { name: "Subject", title: "Meeting Subject" },
	description: { name: "Description", title: "Notes" },
	startTime: { name: "StartTime", title: "From" },
	endTime: { name: "EndTime", title: "To" },
	recurrenceRule: { name: "RecurrenceRule", title: "Recurrence" },
};
