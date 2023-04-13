import { TextField } from "@mui/material";
import React, { useState } from "react";
import { DialogContainer } from "./EditorWindow.components";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { FormValidator, TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { registerLicense } from "@syncfusion/ej2-base";
import { LICENSE_KEY } from "../../../utils/syncFusionKey";
import { RecurrenceEditorComponent } from "@syncfusion/ej2-react-schedule";
import { MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
import { GetRooms } from "../../../api/rooms";
export const EditorWindow = (props: any) => {
	const [formData, setFormData] = useState(props);
	const roomData = GetRooms() ?? [];
	const rooms = roomData.data ?? [];
	const roomField = { text: "RoomName", value: "RoomId" };
	const roomDataS =
		roomData &&
		rooms.map((room) => ({
			RoomName: room.roomName,
			RoomId: room.roomId,
		}));
	const [initialRooms, setInitialRooms] = useState<string[]>([formData.RoomId]);
	return (
		<div>
			{/* // <DialogContainer> */}
			{/* // <div className="form-row"> */}
			{/* <div className="form-group col-md-6"> */}
			{/* <div className="e-float-input e-control-wrapper"> */}
			<label className="e-float-text e-label-top"> Meeting subject:</label>
			<TextBoxComponent
				// floatLabelType="Auto"
				value={formData.Subject}
				// placeholder="Meeting subject:"
				onChange={(event: any) => {
					setFormData((prevFormData: any) => ({
						...prevFormData,
						Subject: event.value,
					}));
				}}></TextBoxComponent>
			{/* </div> */}
			{/* <div className="e-float-input e-control-wrapper"> */}
			<label className="e-float-text e-label-top"> Start Time:</label>
			<DateTimePickerComponent
				id="StartTime"
				allowEdit={false}
				step={15}
				// placeholder="Start Time"
				className="e-field"
				data-name="StartTime"
				floatLabelType="Auto"
				format="dd/MM/yy hh:mm a"
				value={new Date(props.StartTime)}
				onChange={(event: any) => {
					setFormData((prevFormData: any) => ({
						...prevFormData,
						StartTime: new Date(event.target.value),
					}));
				}}></DateTimePickerComponent>
			<DateTimePickerComponent
				// id="StartTime"
				step={15}
				allowEdit={false}
				// placeholder="End Time"
				className="e-field"
				id="EndTime"
				data-name="EndTime"
				floatLabelType="Auto"
				format="dd/MM/yy hh:mm a"
				value={new Date(props.EndTime)}
				onChange={(event: any) => {
					setFormData((prevFormData: any) => ({
						...prevFormData,
						EndTime: new Date(event.target.value),
					}));
				}}></DateTimePickerComponent>
			{/* </div> */}
			{/* <div className="e-float-input e-control-wrapper"> */}
			<RecurrenceEditorComponent
				id="RecurrenceEditor"
				className="e-field"
				data-name="RecurrenceRule"
				// ref={(t) => (recObject = t)}
				value={formData.RecurrenceRule}
				change={(event: any) => {
					setFormData((prevFormData: any) => ({
						...prevFormData,
						RecurrenceRule: event.value,
					}));
				}}
			/>
			{/* </div> */}
			{/* <div className="e-float-input e-control-wrapper"> */}
			<MultiSelectComponent
				id="roomId"
				className="e-field"
				data-name="RoomId"
				dataSource={roomDataS}
				fields={roomField}
				placeholder="Location(s)"
				// floatLabelType="Auto"
				value={initialRooms}
				onChange={(event: any) => {
					const selectedItems = event.value;
					setFormData((prevFormData: any) => ({
						...prevFormData,
						RoomId: selectedItems,
					}));
				}}
			/>
			{/* </div> */}
			{/* <div className="e-float-input e-control-wrapper"> */}
			<TextBoxComponent
				multiline={true}
				placeholder="Notes"
				// floatLabelType="Auto"
				value={formData.Description}
				onChange={(event: any) => {
					setFormData((prevFormData: any) => ({
						...prevFormData,
						Description: event.value,
					}));
				}}></TextBoxComponent>
			{/* </div> */}
			{/* </div> */}
			{/* // </div> */}
		</div>
	);
};
