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
	return (
		<ScrollView>
			{EventsTimeIntervals.map((timeInterval, key) => {
				return (
					<MeetingCard key={key}>
						<TextContainer>
							<CardText>Meeting subject </CardText>
							<CardText>
								{timeInterval.startTime} - {timeInterval.endTime}
							</CardText>
						</TextContainer>
						<CardText status={`${StatusTypes.Reserved.toLowerCase()}`}>
							Status
						</CardText>
					</MeetingCard>
				);
			})}
		</ScrollView>
	);
};
