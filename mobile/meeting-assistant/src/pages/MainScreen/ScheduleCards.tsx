import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, Text } from "@rneui/themed";
import { useInfiniteQuery } from "react-query";
// import {queryClient} from "../../../App";
import { ScrollView, View, RefreshControl } from "react-native";
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
const { data: eventsData, fetchNextPage, isFetchingNextPage, isLoading } = GetEvents();

useEffect(() => {
  if (eventsData) {
    const allEvents = eventsData.pages ? eventsData.pages.flatMap((page) => page) : [];
    setEvents(allEvents);
  }
}, [eventsData]);


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
     const [refreshKey, setRefreshKey] = useState(0);
const [refreshing, setRefreshing] = useState(false);
const eventsQuery = useQuery("events", GetEvents);
 const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchNextPage(); // Assuming this triggers a refresh of the data
      setRefreshKey((prevKey) => prevKey + 1); // Update the refreshKey value to trigger re-render
    } catch (error) {
      // Handle error if necessary
    } finally {
      setRefreshing(false);
    }
  };


	return (
		<ScrollView key={refreshKey} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
			{isLoading ? (
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
  const intervalEvents: IEvents[] = todayEvents.filter((event) => {
    const eventStartHour = moment(event.StartTime).format("HH:mm");
    const eventEndHour = moment(event.EndTime).format("HH:mm");
    return (
      (eventStartHour >= previousIntervalEnd &&
        eventStartHour < currentIntervalEnd) ||
      (eventEndHour > currentIntervalStart &&
        eventEndHour <= currentIntervalEnd) ||
      (eventStartHour < currentIntervalStart &&
        eventEndHour > currentIntervalEnd)
    );
  }).sort(
    (a, b) =>
      moment(a.StartTime).valueOf() - moment(b.StartTime).valueOf()
  );

  return (
    <React.Fragment key={key}>
      {intervalEvents.length > 0 ? (
        intervalEvents.map((event, eventKey) => {
          const eventStartHour = moment(event.StartTime).format("HH:mm");
          const eventEndHour = moment(event.EndTime).format("HH:mm");
          const tempRoomStatus = getRoomStatusForEvent(
            eventStartHour,
            eventEndHour
          );
          return (
            <MeetingCard key={eventKey}>
              <PopulatedTimeSlotDetails
                event={event}
                eventStartHour={eventStartHour}
                eventEndHour={eventEndHour}
                tempRoomStatus={tempRoomStatus}
              />
            </MeetingCard>
          );
        })
      ) : (
        <MeetingCard
          onPress={() => {
            openModal();
            setSelectedEndTime(timeInterval.endTime);
            setSelectedStartTime(timeInterval.startTime);
          }}
        >
          <EmptyTimeSlotDetails timeInterval={timeInterval} />
        </MeetingCard>
      )}
    </React.Fragment>
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

export const PopulatedTimeSlotDetails = (props: any) =>{
    return(
        <>
        <TextContainer>
													<CardText toBold={true}>
														{props.event.Subject}
													</CardText>
													<CardText>
														{`${props.eventStartHour} - ${props.eventEndHour}`}{" "}
													</CardText>
												</TextContainer>
												<TextContainer hasEvent={true}>
													<HostTextContainer>
														<CardText>
															{`Hosted by`}
														</CardText>

														<CardText isHost={true}>
															{`${props.event.HostName}`}
														</CardText>
													</HostTextContainer>
													<CardText
														status={props.tempRoomStatus}
														toBold={true}
													>
														{`${
															props.tempRoomStatus
																.charAt(0)
																.toUpperCase() +
															props.tempRoomStatus.slice(
																1
															)
														}`}{" "}
													</CardText>
												</TextContainer>
        
        </>

    )
}
export const EmptyTimeSlotDetails = (props: any) =>
{
    return (
        <>
        <TextContainer>
			<CardText>
				Nothing Scheduled
			</CardText>
			<CardText>
				{`${props.timeInterval.startTime} - ${props.timeInterval.endTime}`}{" "}
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
        </>
    )
}