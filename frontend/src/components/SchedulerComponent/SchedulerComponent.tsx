import {
	Inject,
	ResourceDirective,
	ResourcesDirective,
	TimelineViews,
	ViewDirective,
	ViewsDirective,
	Resize,
	DragAndDrop,
	ScheduleComponent,
    CellClickEventArgs,
} from "@syncfusion/ej2-react-schedule";
import { extend } from "@syncfusion/ej2-base";
import { ScheduleContainer } from "./Scheduler.components";
import "./style.css";
import {
	getSchedulerRooms,
	majorSlotTemplate,
	onActionBegin,
	onCellClick,
	onPopupOpen,
	onRenderCell,
	resourceHeaderTemplate,
} from "./Scheduler.types";
import { GetRooms } from "../../api/rooms";
import { GetEvents } from "../../api/events";
import { useEffect, useMemo, useRef, useState } from "react";
import { IRoom } from "../../dto/models/IRooms";
import { IEvents } from "../../dto/models/IEvents";

export const SchedulerContainer = () => {
	const [schedulEventData, setScheduleEventData] = useState<IEvents[]>([]);
	const [scheduleRoomData, setScheduleRoomData] = useState<IRoom[] | {}[]>([]);
	const { data: roomData } = GetRooms();
	const { data: eventsData } = GetEvents();
	const mockData : IEvents[] = eventsData ?? [];
	const roomSchedulerData = roomData ? getSchedulerRooms(roomData) : [{}];
	const scheduleRef = useRef<ScheduleComponent>(null);
    const options = {
        allowAllDay : false,
    }
	useMemo(() => {
		setScheduleEventData(mockData);
		setScheduleRoomData(roomSchedulerData);
	}, [eventsData]);

	useEffect(() => {
		setScheduleEventData(mockData);
        setScheduleRoomData(roomSchedulerData);
		const handleClickOutside = (event: MouseEvent) => {
			const componentNode = scheduleRef?.current?.element;
			if (componentNode?.contains(event.target as Node)) {
				return;
			}
			if (
				scheduleRef.current &&		!scheduleRef.current.element.contains(event.target as Node)
			) {
				scheduleRef.current.activeViewOptions.allowVirtualScrolling = false;
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [eventsData, roomData]);

	return (
		<div className="schedule-control-section">
			<div className="col-lg-12 control-section">
				<div className="control-wrapper">
					<ScheduleContainer
                    {...options}
						width="100%"
						allowMultiCellSelection={true}
						height="75vh"
						ref={scheduleRef}
						currentView="TimelineDay"
						selectedDate={new Date()}
						eventSettings={{
							dataSource: schedulEventData,
							fields: {
								Id: "Id",
								Subject: { title: "Subject", name: "Subject" },
								StartTime: { title: "From", name: "StartTime" },
								EndTime: { title: "To", name: "EndTime" },
								// HostId: { title: "Host:", name: "HostId" },
								// RecurrenceRule: {title: "RecurrenceRule", name: "RecurrenceRule"},
								// Description: { title: "Notes", name: "Notes" },
								// RoomId: { title: "RoomId", name: "RoomId"}
							},
							allowFollowingEvents: false,
						}}
						group={{ enableCompactView: false, resources: ["MeetingRoom"] }}
						popupOpen={onPopupOpen}
						showTimeIndicator={true}
						resourceHeaderTemplate={resourceHeaderTemplate}
						cssClass="timeline-resource"
						startHour="07:00"
						endHour="20:00"
						timeScale={{
							slotCount: 4,
							enable: true,
							majorSlotTemplate: majorSlotTemplate,
						}}
						renderCell={onRenderCell}
						cellClick={(e: CellClickEventArgs) => {
							onCellClick(e, schedulEventData);
						}}
						// select={onCellClick}
						actionBegin={onActionBegin}
						showWeekend={false}>
						<ResourcesDirective>
							<ResourceDirective
								field="RoomId"
								title="Room Location"
								name="MeetingRoom"
								allowMultiple={true}
								dataSource={scheduleRoomData}
								textField="roomName"
								idField="roomId"
								colorField="color"></ResourceDirective>
						</ResourcesDirective>
						<ViewsDirective>
							<ViewDirective
								option="TimelineWeek"
								interval={5}
							/>
						</ViewsDirective>
						<Inject services={[TimelineViews, Resize, DragAndDrop]} />
					</ScheduleContainer>
				</div>
			</div>
		</div>
	);
};
