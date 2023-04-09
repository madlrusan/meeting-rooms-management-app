import React, { useContext, useState } from "react";
import {
	Inject,
	ResourceDirective,
	ResourcesDirective,
	TimelineViews,
	ViewDirective,
	ViewsDirective,
	Resize,
	DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { extend } from "@syncfusion/ej2-base";
import { ScheduleContainer } from "./Scheduler.components";
import "./style.css";
import {
	EditorWindowTemplate,
	getSchedulerRooms,
	majorSlotTemplate,
	onPopupOpen,
	onRenderCell,
	resourceHeaderTemplate,
} from "./Scheduler.types";
import { eventData } from "../../dto/mocks/data";
import { UserContext } from "../../context/userContext";
import { GetRooms } from "../../api/rooms";
import { GetEmployees } from "../../api/employees";

export const SchedulerContainer = () => {
	const { data: roomData } = GetRooms();
	const { data: employeeData } = GetEmployees();
	const { userRole } = useContext(UserContext);
	const mockData = extend([], eventData, true);
	const roomSchedulerData = roomData ? getSchedulerRooms(roomData) : [{}];
	let scheduleObj;

	return (
		<div className="schedule-control-section">
			<div className="col-lg-12 control-section">
				<div className="control-wrapper">
					<ScheduleContainer
						width="100%"
						height="75vh"
						ref={(schedule: any) => (scheduleObj = schedule)}
						currentView="TimelineDay"
						selectedDate={new Date()}
						eventSettings={{
							dataSource: mockData,
							fields: {
								id: "Id",
								subject: { title: "Summary", name: "Subject" },
								startTime: { title: "From", name: "StartTime" },
								endTime: { title: "To", name: "EndTime" },
								hostId: { title: "Host:", name: "HostId" },
							},
						}}
						group={{ resources: ["MeetingRoom"] }}
						popupOpen={onPopupOpen}
						editorTemplate={EditorWindowTemplate}
						resourceHeaderTemplate={resourceHeaderTemplate}
						cssClass="timeline-resource virtual-scrolling"
						startHour="08:00"
						endHour="19:00"
						timeScale={{
							enable: true,
							majorSlotTemplate: majorSlotTemplate,
						}}
						// timeZone={"Europe/Bucharest"}
						renderCell={onRenderCell}
						showWeekend={false}>
						<ResourcesDirective>
							<ResourceDirective
								field="RoomId"
								title="Room Location"
								name="MeetingRoom"
								allowMultiple={true}
								dataSource={roomSchedulerData}
								textField="roomName"
								idField="roomId"
								colorField="color"></ResourceDirective>
						</ResourcesDirective>
						<ViewsDirective>
							<ViewDirective option="TimelineWeek" interval={5} />
						</ViewsDirective>
						<Inject services={[TimelineViews, Resize, DragAndDrop]} />
					</ScheduleContainer>
				</div>
			</div>
		</div>
	);
};
