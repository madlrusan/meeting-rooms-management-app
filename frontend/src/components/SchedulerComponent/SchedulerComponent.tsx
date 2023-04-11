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
	onEventClick,
	onPopupOpen,
	onRenderCell,
	resourceHeaderTemplate,
} from "./Scheduler.types";
import { GetRooms } from "../../api/rooms";
import { GetEvents } from "../../api/events";
import { useEffect, useMemo, useRef, useState } from "react";
import { IRoom } from "../../dto/models/IRooms";
import { IEvents } from "../../dto/models/IEvents";
import { eventData } from "../../dto/mocks/data";
import { EditorWindow } from "./EditorWindow/EditorWindow";

export const SchedulerContainer = () => {
	const [events, setEvents] = useState<IEvents[]>([]);
	const [rooms, setRooms] = useState<IRoom[] | {}[]>([]);
	const { data: roomsData } = GetRooms();
	const { data: eventsData } = GetEvents();
	const FinalEventsData: IEvents[] = eventsData ?? [];
	const FinalRoomsData = roomsData ? getSchedulerRooms(roomsData) : [{}];
	const scheduleRef = useRef<ScheduleComponent>(null);
	useMemo(() => {
		setEvents(FinalEventsData);
		setRooms(FinalRoomsData);
	}, [FinalEventsData]);

	useEffect(() => {
		setEvents(FinalEventsData);
		setRooms(FinalRoomsData);
		const handleClickOutside = (event: MouseEvent) => {
			const componentNode = scheduleRef?.current?.element;
			if (componentNode?.contains(event.target as Node)) {
				return;
			}
			if (
				scheduleRef.current &&
				!scheduleRef.current.element.contains(event.target as Node)
			) {
				scheduleRef.current.activeViewOptions.allowVirtualScrolling = false;
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [eventsData, roomsData]);

	return (
		<div className="schedule-control-section">
			<div className="col-lg-12 control-section">
				<div className="control-wrapper">
					<ScheduleContainer
						width="100%"
						allowMultiCellSelection={true}
						height="75vh"
						ref={scheduleRef}
						editorTemplate={EditorWindow}
						currentView="TimelineDay"
						selectedDate={new Date()}
						eventSettings={{
							dataSource: FinalEventsData,
							fields: {
								id: "Id",
								subject: { name: "Subject", title: "Meeting Subject" },
								description: { name: "Notes", title: "Notes" },
								startTime: { name: "StartTime", title: "From" },
								endTime: { name: "EndTime", title: "To" },
								recurrenceRule: { name: "RecurrenceRule", title: "Recurrence" },
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
							slotCount: 2,
							enable: true,
							majorSlotTemplate: majorSlotTemplate,
						}}
						renderCell={onRenderCell}
						cellClick={(e: CellClickEventArgs) => {
							onCellClick(e, events);
						}}
						// select={onCellClick}
						actionBegin={onActionBegin}
						eventClick={onEventClick}
						showWeekend={false}>
						<ResourcesDirective>
							<ResourceDirective
								field="RoomId"
								title="Room Location"
								name="MeetingRoom"
								allowMultiple={true}
								dataSource={rooms}
								textField="roomName"
								idField="roomId"
								colorField="color"></ResourceDirective>
						</ResourcesDirective>
						<ViewsDirective>
							<ViewDirective option="TimelineDay" />
						</ViewsDirective>
						<Inject services={[TimelineViews, Resize, DragAndDrop]} />
					</ScheduleContainer>
				</div>
				{/* <EditorWindow /> */}
			</div>
		</div>
	);
};
