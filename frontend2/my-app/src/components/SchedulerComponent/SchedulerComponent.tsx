import {
	Inject,
	ResourceDirective,
	ResourcesDirective,
	TimelineViews,
	ViewDirective,
	ViewsDirective,
	Resize,
	ScheduleComponent,
	CellClickEventArgs,
} from "@syncfusion/ej2-react-schedule";
import { extend } from "@syncfusion/ej2-base";
import { ScheduleContainer } from "./Scheduler.components";
import "./style.css";
import {
	EDTemplate,
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
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { IRoom } from "../../dto/models/IRooms";
import { IEvents } from "../../dto/models/IEvents";
import { eventData } from "../../dto/mocks/data";
import { EditorWindow } from "./EditorWindow/EditorWindow";
import {
	QuickPopUpContent,
	QuickPopUpFooter,
	QuickPopUpHeader,
} from "./QuickPopUp/QuickPopUp";
import React from "react";

export const SchedulerContainer = memo(() => {
	const [events, setEvents] = useState<IEvents[]>([]);
	const [rooms, setRooms] = useState<IRoom[]>([]);
	const { data: roomsData } = GetRooms();
	const eventsData = GetEvents();
	const FinalEventsData: IEvents[] = eventsData.data ?? [];
	const FinalRoomsData = roomsData ? getSchedulerRooms(roomsData) : [];
	const scheduleRef = useRef<ScheduleComponent>(null);
	// useMemo(() => {
	// 	setEvents(FinalEventsData);
	// 	setRooms(FinalRoomsData);
	// }, [FinalEventsData]);

	useEffect(() => {
		eventsData.data && setEvents(FinalEventsData);
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
	}, [FinalEventsData]);

	return eventsData.isLoading === false ? (
		<div>
			<ScheduleContainer
				enablePersistence={true}
				width="100%"
				allowMultiCellSelection={true}
				height="75vh"
				ref={scheduleRef}
				// showQuickInfo={false}
				currentView="TimelineWeek"
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
				cellClick={(e: any) => {
					onCellClick(e, events, FinalRoomsData);
				}}
				firstDayOfWeek={1}
				delayUpdate={true}
				actionBegin={(args: any, allEvents: IEvents) => {
					onActionBegin(args, events);
				}}
				eventClick={onEventClick}
				allowDragAndDrop={false}
				popupOpen={(e: any, ref: any) => {
					onPopupOpen(e, scheduleRef);
				}}
				allowResizing={false}
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
					<ViewDirective option="TimelineWeek" timeScale={{ enable: true }} />
				</ViewsDirective>
				<Inject services={[TimelineViews, Resize]} />
			</ScheduleContainer>
		</div>
	) : (
		<div>Is Loadinssg</div>
	);
});
