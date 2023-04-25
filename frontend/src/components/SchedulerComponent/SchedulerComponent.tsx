import {
	Inject,
	ResourceDirective,
	ResourcesDirective,
	TimelineViews,
	ViewDirective,
	ViewsDirective,
	Resize,
	ScheduleComponent,
} from "@syncfusion/ej2-react-schedule";
import { ScheduleContainer } from "./Scheduler.components";
import "./style.css";
import {
	// dataEventmanagerSource,
	getSchedulerRooms,
	majorSlotTemplate,
	onActionBegin,
	onActionComplete,
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
import React from "react";
import { Ajax } from "@syncfusion/ej2-base";
import { BASE_URL_API, EVENT_ENDPOINTS } from "../../dto/constants";

export const SchedulerContainer = () => {
	const [events, setEvents] = useState<IEvents[]>([]);
	const [rooms, setRooms] = useState<IRoom[]>([]);
	const { data: roomsData, isLoading } = GetRooms();
	const eventsData = GetEvents();
	const FinalEventsData: IEvents[] = eventsData.data ?? [];
	const FinalRoomsData = roomsData ? getSchedulerRooms(roomsData) : [];
	const scheduleRef = useRef<ScheduleComponent>(null);
	useEffect(() => {
		eventsData.data && setEvents(FinalEventsData);
		// FinalRoomsData && setRooms(FinalRoomsData);
		const handleClickOutside = (event: MouseEvent) => {
			const componentNode = scheduleRef?.current?.element;
			if (componentNode?.contains(event.target as Node)) {
				return;
			}
			if (
				scheduleRef.current &&
				!scheduleRef.current.element.contains(event.target as Node)
			) {
				scheduleRef.current.activeViewOptions.allowVirtualScrolling =
					false;
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
		// const eventsDM = dataEventmanagerSource;
	}, [FinalEventsData]);
	return isLoading === false ? (
		// <div>
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
				dataSource: events, //dataManagerSource
				// query: dataQuery,
				fields: {
					id: "Id",
					subject: { name: "Subject", title: "Meeting Subject" },
					description: { name: "Description", title: "Notes" },
					startTime: { name: "StartTime", title: "From" },
					endTime: { name: "EndTime", title: "To" },
					recurrenceRule: {
						name: "RecurrenceRule",
						title: "Recurrence",
					},
					hostId: { name: "HostId", title: "Host" },
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
			// cellClick={(e: any) => {
			// 	onCellClick(e, events, FinalRoomsData);
			// }}
			firstDayOfWeek={1}
			delayUpdate={true}
			// actionBegin={(args: any, allEvents: IEvents) => {
			// 	onActionBegin(args, events);
			// }}
			eventClick={onEventClick}
			allowDragAndDrop={false}
			popupOpen={(e: any, ref: any) => {
				onPopupOpen(e, scheduleRef);
			}}
			allowResizing={false}
			actionComplete={onActionComplete}
			showWeekend={false}
		>
			<ResourcesDirective>
				<ResourceDirective
					field="RoomId"
					title="Room Location"
					name="MeetingRoom"
					allowMultiple={true}
					dataSource={FinalRoomsData}
					textField="roomName"
					idField="roomId"
					colorField="color"
				></ResourceDirective>
			</ResourcesDirective>
			<ViewsDirective>
				<ViewDirective
					option="TimelineWeek"
					timeScale={{ enable: true }}
				/>
			</ViewsDirective>
			<Inject services={[TimelineViews, Resize]} />
		</ScheduleContainer>
	) : (
		// </div>
		<div>Is Loading</div>
	);
};
