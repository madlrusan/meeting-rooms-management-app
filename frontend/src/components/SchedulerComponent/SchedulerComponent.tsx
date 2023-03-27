import React, { useContext } from "react";
import { 
	Inject, 
	ResourceDirective, 
	ResourcesDirective, 
	TimelineViews, 
	ViewDirective, 
	ViewsDirective, 
	Resize, 
	DragAndDrop} from "@syncfusion/ej2-react-schedule";
import { extend } from "@syncfusion/ej2-base";
import { ScheduleContainer } from "./Scheduler.components";
import "./style.css";
import { editorWindowTemplate, majorSlotTemplate, onRenderCell, resourceHeaderTemplate } from "./Scheduler.types";
import { eventData, roomData } from "../../dto/mocks/data";
import { UserContext } from "../../context/userContext";


export const SchedulerContainer = () => {
    const {userRole} = useContext(UserContext);
	const mockData = extend([], eventData,  true );
	let scheduleObj;
	return userRole === "admin" ? (
		<div className='schedule-control-section'>
			<div className='col-lg-12 control-section'>
				<div className='control-wrapper'>
					<ScheduleContainer 
						width='100%'
						height='650px' 
						ref={(schedule: any) => scheduleObj = schedule}
						currentView="TimelineDay" 
						selectedDate={new Date()} 
						eventSettings={{
							dataSource: mockData,
							fields: {
								id: "Id",
								subject: { title: "Summary", name: "subject" },
								startTime: { title: "From", name: "startTime" },
								endTime: { title: "To", name: "endTime" }
							}
						}}
						group={{ resources: ["MeetingRoom"] }}
						editorTemplate= {editorWindowTemplate}
						resourceHeaderTemplate = {resourceHeaderTemplate}
						cssClass="timeline-resource virtual-scrolling"
						startHour="08:00"
						endHour="19:00"
						timeScale={{
							enable: true, majorSlotTemplate: majorSlotTemplate
						}}
						renderCell={onRenderCell}
                        showWeekend={false}
					>
						<ResourcesDirective>
							<ResourceDirective field='roomId' title='Room Type' name='MeetingRoom' allowMultiple={true}
								dataSource={roomData} textField='name' idField='roomId' colorField='color'>
							</ResourceDirective>
						</ResourcesDirective>
						<ViewsDirective>
							<ViewDirective option='TimelineWeek' interval={5}/>
						</ViewsDirective>
						< Inject services={[TimelineViews, Resize, DragAndDrop]} />
					</ScheduleContainer>
				</div>
			</div>
		</div>
	) : (
        <div className='schedule-control-section'>
			<div className='col-lg-12 control-section'>
				<div className='control-wrapper'>
					<ScheduleContainer 
						width='100%'
						height='650px' 
						ref={(schedule: any) => scheduleObj = schedule}
						currentView="TimelineDay" 
						selectedDate={new Date()} 
						eventSettings={{
							dataSource: mockData,
							fields: {
								id: "Id",
								subject: { title: "Summary", name: "subject" },
								startTime: { title: "From", name: "startTime" },
								endTime: { title: "To", name: "endTime" }
							}
						}}
						group={{ resources: ["MeetingRoom"] }}
						editorTemplate= {editorWindowTemplate}
						resourceHeaderTemplate = {resourceHeaderTemplate}
						cssClass="timeline-resource virtual-scrolling"
						startHour="08:00"
						endHour="19:00"
						timeScale={{
							enable: true, majorSlotTemplate: majorSlotTemplate
						}}
						renderCell={onRenderCell}
                        showWeekend={false}
					>
						<ResourcesDirective>
							<ResourceDirective field='roomId' title='Room Type' name='MeetingRoom' allowMultiple={true}
								dataSource={roomData} textField='name' idField='roomId' colorField='color'>
							</ResourceDirective>
						</ResourcesDirective>
						<ViewsDirective>
							<ViewDirective option='TimelineWeek' interval={5}/>
						</ViewsDirective>
						< Inject services={[TimelineViews, Resize, DragAndDrop]} />
					</ScheduleContainer>
				</div>
			</div>
		</div>
    );
};

