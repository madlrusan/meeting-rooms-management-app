import React, { useState } from "react";
import { StatusTypes } from "../../dto/Status.enums";
import {
	MainContainer,
	RoomDetails,
	LeftContainer,
	ScreenDivider,
	SmallDivider,
	ScheduleContainer,
	HostText,
	SubjectText,
	MiddleDivider,
	StatusText,
	RoomNameText,
	RoomCircle,
	BottomView,
	DisplayButton,
	ButtonStyle,
	SubjectContainer,
} from "../../components/MainScreenComponents/MainScreen.Components";
import { ScheduleCard } from "./ScheduleCards";
import {
	Clock,
	getButtonText,
} from "../../components/MainScreenComponents/MainScreen.types";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";
import { ScrollView } from "react-native";
export const MainScreen = () => {
	// use context --> to get room details
	// const {roomName, roomStatus} = useContext(RoomContext);
	const [visible, setVisible] = useState(false);
	const GlobalStatus = StatusTypes.Available;
	const ButtonText = getButtonText(GlobalStatus);
	return (
		<MainContainer>
			<LeftContainer status={GlobalStatus}>
				<Clock />
				<SmallDivider />
				<ScheduleContainer>
					<ScheduleCard />
				</ScheduleContainer>
			</LeftContainer>
			<ScreenDivider />
			<RoomDetails>
				{GlobalStatus === StatusTypes.Available ? (
					<HostText>No one is host</HostText>
				) : (
					<HostText>Hosted by Madalina Rusan</HostText>
				)}
				<SubjectContainer horizontal showsHorizontalScrollIndicator={false}>
					{GlobalStatus === StatusTypes.Available ? (
						<SubjectText>Nothing scheduled</SubjectText>
					) : (
						<SubjectText>React Meeting intro</SubjectText>
					)}
				</SubjectContainer>
				<MiddleDivider />
				<StatusText>{GlobalStatus.toUpperCase()}</StatusText>
				<BottomView>
					<DisplayButton
						type="solid"
						buttonStyle={ButtonStyle}
						onPress={() => {
							setVisible(true);
						}}>
						{ButtonText}
					</DisplayButton>
					<RoomCircle status={GlobalStatus}>
						<RoomNameText>Room Nelson Mandela</RoomNameText>
					</RoomCircle>
				</BottomView>
			</RoomDetails>
			<ConfirmModal
				visible={visible}
				setVisible={setVisible}
				actionType={ButtonText}
			/>
		</MainContainer>
	);
};
