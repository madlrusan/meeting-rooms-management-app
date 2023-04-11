import { TextField } from "@mui/material";
import React from "react";
import { DialogContainer } from "./EditorWindow.components";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { registerLicense } from "@syncfusion/ej2-base";
import { LICENSE_KEY } from "../../../utils/syncFusionKey";
import { RecurrenceEditorComponent } from "@syncfusion/ej2-react-schedule";
import { MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
export const EditorWindow = (props: any) => {
	return (
		<DialogContainer>
			<TextBoxComponent placeholder="Meeting Subject"></TextBoxComponent>
			<>
				<DateTimePickerComponent
					id="StartTime"
					placeholder="Start Time"
					className="e-field"
					format="dd/MM/yy hh:mm a"
					value={new Date(props.StartTime)}></DateTimePickerComponent>
				<DateTimePickerComponent
					id="StartTime"
					placeholder="End Time"
					className="e-field"
					format="dd/MM/yy hh:mm a"
					value={new Date(props.StartTime)}></DateTimePickerComponent>
			</>
			<RecurrenceEditorComponent />
			<MultiSelectComponent
				id="roomId"
				className="e-field"
				data-name="RoomId"
				// dataSource={roomDataS}
				// fields={roomField}
				placeholder="Select a room"
				// popupHeight="220px"
				// value={[props.RoomId[0]]}
				// onChange={(event: any) => {
				// 	const selectedItems = event.target.value;
				// 	const selectedIds = selectedItems.map((item: any) => item.roomId);
				// 	setVal({ ...val, RoomId: selectedIds });
				// }}
			/>
			<TextBoxComponent multiline={true} placeholder="Notes"></TextBoxComponent>
		</DialogContainer>
	);
};
