import React, { useState } from "react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import {
	DropDownListComponent,
	MultiSelectComponent,
} from "@syncfusion/ej2-react-dropdowns";
import { RecurrenceEditorComponent } from "@syncfusion/ej2-react-schedule";
import { IRoom } from "../../dto/models/IRooms";
import { getRandomHexColor } from "../../utils/helperFunctions";
import { GetRooms } from "../../api/rooms";
import { GetUserById } from "../../api/employees";
import { Autocomplete, TextField } from "@mui/material";
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
export const EditorWindowTemplate = (props: any) => {
	// console.log(props);
	const [val, setVal] = useState(props);
	const { data: roomData } = GetRooms();
	// const {data: hostData}. =GetHost();
	const roomField = { text: "roomName", value: "roomId" };
	const roomDataS =
		roomData &&
		roomData.map((room) => ({
			roomName: room.roomName,
			roomId: room.roomId,
		}));
	let recurrenceObj;
	// console.log("roomdatas", roomDataS);
	// console.log(props);
	// console.log(val);
	return (
		<>
			<table className="custom-event-editor" style={{ width: "100%" }}>
				<tbody>
					<tr>
						<td className="e-textlabel">Summary</td>
						<td>
							<input
								id="Summary"
								className="e-field e-input"
								type="text"
								name="Name"
								style={{ width: "100%" }}
								value={props.subject}
							/>
						</td>
					</tr>
					<tr>
						<td className="e-textlabel">Location</td>
						<td>
							<MultiSelectComponent
								id="roomId"
								className="e-field"
								data-name="RoomId"
								dataSource={roomDataS}
								fields={roomField}
								placeholder="Select a room"
								popupHeight="220px"
								value={props.roomId}
								onChange={(event: any) =>
									setVal({ ...val, roomId: event.target.value })
								}
							/>
							{/* <Autocomplete
								multiple
								id="tags-standard"
								options={roomDataS}
                                onClick={()=>{console.log({...props})}}
								getOptionLabel={(option) => option.name}
								// defaultValue={[top100Films[13]]}
								renderInput={(params) => (
									<TextField
										{...params}
										variant="standard"
										// label="Multiple values"
										// placeholder="Favorites"
									/>
								)}
							/>{" "} */}
						</td>
					</tr>
					<tr>
						<td className="e-textlabel">From</td>
						<td>
							<DateTimePickerComponent
								id="StartTime"
								className="e-field"
								format="dd/MM/yy hh:mm a"
								value={
									new Date(props.startTime || props.StartTime)
								}></DateTimePickerComponent>
						</td>
					</tr>
					<tr>
						<td className="e-textlabel">To</td>
						<td>
							<DateTimePickerComponent
								id="EndTime"
								className="e-field"
								format="dd/MM/yy hh:mm a"
								value={
									new Date(props.endTime || props.EndTime)
								}></DateTimePickerComponent>
						</td>
					</tr>
					<tr>
						<td className="e-textlabel">Recurrence</td>
						<td colSpan={4}>
							<RecurrenceEditorComponent
								ref={(recurrence) => (recurrenceObj = recurrence)}
								data-name="RecurrenceRule"
								className="e-field"
								id="RecurrenceEditor"
								value={props.RecurrenceRule}></RecurrenceEditorComponent>
						</td>
					</tr>
					<tr>
						<td className="e-textlabel">Notes</td>
						<td>
							<textarea
								id="Notes"
								className="e-field e-input"
								name="Notes"
								rows={3}
								cols={50}
								style={{
									width: "100%",
									height: "60px !important",
									resize: "vertical",
								}}
								value={props.Notes}></textarea>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
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
