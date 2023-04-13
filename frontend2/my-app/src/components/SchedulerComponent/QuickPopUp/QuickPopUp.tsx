import { ResourcesModel } from "@syncfusion/ej2-react-schedule";
import React, { useState } from "react";
import moment from "moment";
import { HeaderSubjectContainer } from "./QuickPopUp.components";
export const QuickPopUpHeader = (props: { [key: string]: Date }) => {
	const [data, setData] = useState(props);
	console.log("QuickPopUpHeader", props);
	const StartTime = moment(data.StartTime).format("hh:mm A");
	const EndTime = moment(data.EndTime).format("hh:mm A");
	console.log("headerEventtype", data.elementType);
	return (
		<div className="quick-info-header">
			<div className="quick-info-header-content">
				{/* // style={getHeaderStyles(props)}> */}
				<HeaderSubjectContainer className="quick-info-title">
					{getHeaderTitle(data)}
				</HeaderSubjectContainer>
				<div className="duration-text">
					{StartTime} - {EndTime}
				</div>
			</div>
		</div>
	);
};

export const QuickPopUpContent = (props: any) => {
    console.log("QuickPopUpContent", props);
    return <h1>content</h1>;
}

export const QuickPopUpFooter = (props: any) => {
    console.log("QuickPopUpFooter", props);
    return <h1>footer</h1>;
}
 function getHeaderTitle(data: Record<string, any>): string {
		return data.elementType === "cell"
			? "Add Appointment"
			: "Appointment Details";
 }