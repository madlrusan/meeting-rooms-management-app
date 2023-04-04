import React from "react";
import { Card, Text } from "@rneui/themed";
import { ScrollView } from "react-native";
import {
	CardText,
	MeetingCard,
	TextContainer,
} from "../../components/MainScreenComponents/ScheduleCards.components";
import { EventTimeInterval, getTimeIntervals } from "../../dto/ScheduleHours";
import moment from "moment";
import { StatusTypes } from "../../dto/Status.enums";
export const ScheduleCard = () => {
	const EventsTimeIntervals: EventTimeInterval[] = getTimeIntervals();
	const GlobalStatus = StatusTypes.Available;
	return (
		<ScrollView>
			{EventsTimeIntervals.map((timeInterval, key) => {
				return (
					<MeetingCard key={key}>
						<TextContainer>
							{GlobalStatus === StatusTypes.Available ? (
								<CardText>Nothing scheduled</CardText>
							) : (
								<CardText>Meeting subject </CardText>
							)}
							<CardText>
								{timeInterval.startTime} - {timeInterval.endTime}
							</CardText>
						</TextContainer>
						<TextContainer>
							{GlobalStatus === StatusTypes.Available ? (
								<CardText>{""}</CardText>
							) : (
								<CardText>Hosted by Madalina Rusan </CardText>
							)}
							<CardText status={`${GlobalStatus.toLowerCase()}`}>
								{GlobalStatus}
							</CardText>
						</TextContainer>
					</MeetingCard>
				);
			})}
		</ScrollView>
	);
};
