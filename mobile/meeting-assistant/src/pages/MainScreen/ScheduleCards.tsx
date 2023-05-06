import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, Text } from "@rneui/themed";
import { ScrollView, View } from "react-native";
import moment from "moment";
import { StatusTypes } from "../../dto/enums/Status.enums";
import { IEvents } from "../../dto/models/IEvent";
import { GetEvents } from "../../api/events";
import {
	getHostName,
	getRoomStatusForEvent,
	getTodayEvents,
} from "../../utils/eventsHelper";
import {
	CardText,
	HostTextContainer,
	MeetingCard,
	TextContainer,
} from "../../components/MainScreenComponents/ScheduleCards.components";
import { EventTimeInterval, getTimeIntervals } from "../../dto/ScheduleHours";
import { RoomContext } from "../../context/roomContext";
import { UseQueryResult, useQuery } from "react-query";
import { queryClient } from "../../../App";
import { ConfirmModal } from "../../components/ConfirmModal/MainModal/ConfirmModal";
import { CardModal } from "../../components/ConfirmModal/CardModal/CardModal";
type ScheduleCardProps = {
	openModal: () => void;
};
export const ScheduleCard = (props: ScheduleCardProps) => {
	const { openModal } = props;
	const [events, setEvents] = useState<IEvents[]>([]);
	const eventsData = GetEvents();

	useEffect(() => {
		if (eventsData.data && eventsData.data.pages) {
			setEvents(eventsData.data.pages.flat());
		}
	}, [eventsData.data]);

	const todayEvents = getTodayEvents(events);
	const EventsTimeIntervals: EventTimeInterval[] = getTimeIntervals();

	const {
		roomStatus,
		setRoomStatus,
		currentEvent,
		setCurrentEvent,
		selectedStartTime,
		setSelectedStartTime,
		selectedEndTime,
		setSelectedEndTime,
	} = useContext(RoomContext);

	useEffect(() => {
		const now = new Date().toISOString();
		const nowToCheck = new Date(now);
		let isBusy = false;
		// console.log(nowToCheck);
		for (const event of todayEvents) {
			const startTime = new Date(event.StartTime);
			const endTime = new Date(event.EndTime);
			if (
				nowToCheck.getHours() >= startTime.getHours() &&
				nowToCheck.getMinutes() >= startTime.getMinutes() &&
				nowToCheck.getHours() < endTime.getHours() &&
				nowToCheck.getMinutes() < endTime.getMinutes()
			) {
				isBusy = true;
				setRoomStatus(StatusTypes.Busy);
				return;
			}
		}

		const tempEvent = todayEvents.find((event) => {
			const startTime = new Date(event.StartTime);
			const endTime = new Date(event.EndTime);
			const eventStartTime = new Date(
				nowToCheck.getFullYear(),
				nowToCheck.getMonth(),
				nowToCheck.getDate(),
				startTime.getHours(),
				startTime.getMinutes(),
				startTime.getSeconds()
			);
			const eventEndTime = new Date(
				nowToCheck.getFullYear(),
				nowToCheck.getMonth(),
				nowToCheck.getDate(),
				endTime.getHours(),
				endTime.getMinutes(),
				endTime.getSeconds()
			);
			return (
				nowToCheck.getTime() >= eventStartTime.getTime() &&
				nowToCheck.getTime() < eventEndTime.getTime()
			);
		});

		// console.log(nowToCheck, tempEvent);
		if (tempEvent) {
			setRoomStatus(StatusTypes.Busy);
			setCurrentEvent(tempEvent);
			return;
		}
		setCurrentEvent(undefined);
		setRoomStatus(StatusTypes.Available);
	}, [todayEvents, setRoomStatus, setCurrentEvent, currentEvent]);

	const [visible, setVisible] = useState(false);

	return (
		<ScrollView>
			{eventsData.isLoading ? (
				<View>
					<Text>Loading</Text>
				</View>
			) : (
				<View>
					{EventsTimeIntervals.map((timeInterval, key) => {
						const previousIntervalEnd =
							key > 0
								? EventsTimeIntervals[key - 1].endTime
								: EventsTimeIntervals[0].startTime;
						const currentIntervalStart = timeInterval.startTime;
						const currentIntervalEnd = timeInterval.endTime;

						const intervalEvents: IEvents[] = todayEvents
							.filter((event) => {
								const eventStartHour = moment(
									event.StartTime
								).format("HH:mm");
								const eventEndHour = moment(
									event.EndTime
								).format("HH:mm");
								return (
									(eventStartHour >= previousIntervalEnd &&
										eventStartHour < currentIntervalEnd) ||
									(eventEndHour > currentIntervalStart &&
										eventEndHour <= currentIntervalEnd) ||
									(eventStartHour < currentIntervalStart &&
										eventEndHour > currentIntervalEnd)
								);
							})
							.sort(
								(a, b) =>
									moment(a.StartTime).valueOf() -
									moment(b.StartTime).valueOf()
							);

						return (
							<View key={key}>
								{intervalEvents.length > 0 ? (
									intervalEvents.map((event, eventKey) => {
										const eventStartHour = moment(
											event.StartTime
										).format("HH:mm");
										const eventEndHour = moment(
											event.EndTime
										).format("HH:mm");
										const tempRoomStatus =
											getRoomStatusForEvent(
												eventStartHour,
												eventEndHour
											);
										return (
											<MeetingCard key={eventKey}>
												<TextContainer>
													<CardText toBold={true}>
														{event.Subject}
													</CardText>
													<CardText>
														{`${eventStartHour} - ${eventEndHour}`}{" "}
													</CardText>
												</TextContainer>
												<TextContainer hasEvent={true}>
													<HostTextContainer>
														<CardText>
															{`Hosted by`}
														</CardText>

														<CardText isHost={true}>
															{`${event.HostName}`}
														</CardText>
													</HostTextContainer>
													<CardText
														status={tempRoomStatus}
														toBold={true}
													>
														{`${
															tempRoomStatus
																.charAt(0)
																.toUpperCase() +
															tempRoomStatus.slice(
																1
															)
														}`}{" "}
													</CardText>
												</TextContainer>
											</MeetingCard>
										);
									})
								) : (
									<MeetingCard onPress={() => {
										openModal(); 
										setSelectedEndTime(timeInterval.endTime); 
										setSelectedStartTime(timeInterval.startTime);
									}}>
										<TextContainer>
											<CardText>
												Nothing Scheduled
											</CardText>
											<CardText>
												{`${timeInterval.startTime} - ${timeInterval.endTime}`}{" "}
											</CardText>
										</TextContainer>
										<TextContainer>
											<CardText> </CardText>
											<CardText
												status={"available"}
												toBold={true}
											>
												Available
											</CardText>
										</TextContainer>
									</MeetingCard>
								)}
							</View>
						);
					})}
				</View>
			)}
			{/* <CardModal
				visible={visible}
				setVisible={setVisible}
				actionType={"Start"}
			/> */}
		</ScrollView>
	);
};
