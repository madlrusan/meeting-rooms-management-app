import React from "react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import {DropDownListComponent}  from "@syncfusion/ej2-react-dropdowns";
import { roomData } from "../../dto/mocks/data";
import { RecurrenceEditorComponent } from "@syncfusion/ej2-react-schedule";
export const resourceHeaderTemplate = (props : any) => {
	function getRoomName(value: any) {
		return value.resourceData[value.resource.textField];
	}
	function getRoomType(value : any) {
		return value.resourceData.type;
	}
	function getRoomCapacity(value : any) {
		return value.resourceData.capacity;
	}
	return (
		<div className="template-wrap">
			<div className="room-name">{getRoomName(props)}</div>
			<div className="room-type">{getRoomType(props)}</div>
			<div className="room-capacity">{getRoomCapacity(props)}</div>
		</div>
	);
};

export const onRenderCell = (args : any) => {
	if (args.elementType === "emptyCells" && args.element.classList.contains("e-resource-left-td")) {
		const target = args.element.querySelector(".e-resource-text");
		target.innerHTML = "<div class=\"name\">Rooms</div><div class=\"type\">Type</div><div class=\"capacity\">Capacity</div>";
	}
};
export const editorWindowTemplate = (props: any) => {
	const roomField = {text: "name", value: "id"};
	const roomDataS = roomData.map((room) => ({name : room.name, id: room.roomId}));
    let recurrenceObj;
	return(
		<table className="custom-event-editor" style={{ width: "100%" }}>
			<tbody>
				<tr>
					<td className="e-textlabel">Summary</td>
					<td >
						<input id="Summary" className="e-field e-input" type="text" name="Name" style={{ width: "100%" }} value={props.subject}/>
					</td>
				</tr>
				<tr>
					<td className="e-textlabel">RoomId</td>
					<td >
						<DropDownListComponent id="RoomId" className="e-field" data-name="RoomId" dataSource={roomDataS} fields={roomField} placeholder="Select a room" popupHeight="220px" value={props.roomId} />
					</td>
				</tr>
				<tr>
					<td className="e-textlabel">From</td>
					<td >
						<DateTimePickerComponent id="StartTime" className="e-field" format="dd/MM/yy hh:mm a" value={new Date(props.startTime || props.StartTime)}></DateTimePickerComponent>
					</td>
				</tr>
				<tr>
					<td className="e-textlabel">To</td>
					<td >
						<DateTimePickerComponent id="EndTime" className="e-field" format="dd/MM/yy hh:mm a" value={new Date(props.endTime || props.EndTime)}></DateTimePickerComponent>
					</td>
				</tr>
                <tr>
                        <td className="e-textlabel">Recurrence</td>
                        <td colSpan={4}>
                            <RecurrenceEditorComponent ref={recurrence => recurrenceObj = recurrence} data-name="RecurrenceRule" className="e-field" id="RecurrenceEditor"></RecurrenceEditorComponent>
                        </td>
                    </tr>
				<tr>
					<td className="e-textlabel">Notes</td>
					<td >
						<textarea id="Notes" className="e-field e-input" name="Notes" rows={3} cols={50} style={{ width: "100%", height: "60px !important", resize: "vertical" }}></textarea>
					</td>
				</tr>
			</tbody>
		</table>
	);
};
export const majorSlotTemplate = (props: any) => {
	return (<div>{props.date.toLocaleTimeString().slice(0,5)}</div>);
};

