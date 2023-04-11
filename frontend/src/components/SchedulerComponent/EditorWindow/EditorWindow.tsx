import { TextField } from "@mui/material";
import React from "react";
import { DialogContainer } from "./EditorWindow.components";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { registerLicense } from "@syncfusion/ej2-base";
import { LICENSE_KEY } from "../../../utils/syncFusionKey";

export const EditorWindow = (props: any) => {
	return (
		<DialogContainer>
			<TextBoxComponent placeholder="Meeting Subject" />
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
			<TextBoxComponent multiline={true} placeholder="Meeting Subject" />
		</DialogContainer>
	);
};
