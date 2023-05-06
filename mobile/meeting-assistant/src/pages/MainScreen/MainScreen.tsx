import React, { useState, useEffect, useContext } from "react";
import { StatusTypes } from "../../dto/enums/Status.enums";
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
import { ConfirmModal } from "../../components/ConfirmModal/MainModal/ConfirmModal";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetEvents } from "../../api/events";
import { IEvents } from "../../dto/models/IEvent";
import { RoomContext } from "../../context/roomContext";
import { getStatusAsEnum } from "../../utils/roomHelpers";

export const MainScreen = () => {
	const [visible, setVisible] = useState(false);
	const { roomStatus, setRoomStatus, currentEvent } = useContext(RoomContext);
	const [status, setStatus] = useState<StatusTypes>(StatusTypes.Available);
	const [openedFromCard, setOpenedFromCard] = useState<boolean>(false);
	useEffect(() => {
		const tempStatus = getStatusAsEnum(roomStatus);
		setStatus(tempStatus);
	}, [roomStatus]);

	console.log(
		"current event",
		currentEvent,
		roomStatus,
		roomStatus === StatusTypes.Available
	);
	const ButtonText = getButtonText(status);

	const [roomName, setRoomName] = useState("");
const handleOpenDialog = () => {
	setVisible(true);
	setOpenedFromCard(true);
};
	useEffect(() => {
		const getUserName = async () => {
			const name = await AsyncStorage.getItem("roomName");
			if (name) setRoomName(name);
		};
		getUserName();
	}, []);
	return (
		<MainContainer>
			<LeftContainer status={status}>
				<Clock />
				<SmallDivider />
				<ScheduleContainer>
					<ScheduleCard openModal={handleOpenDialog} />
				</ScheduleContainer>
			</LeftContainer>
			<ScreenDivider />
			<RoomDetails>
				{roomStatus === StatusTypes.Available ? (
					<HostText>No one is host</HostText>
				) : (
					<HostText>Hosted by {currentEvent?.HostName}</HostText>
				)}
				<SubjectContainer
					horizontal
					showsHorizontalScrollIndicator={false}
				>
					{roomStatus === StatusTypes.Available ? (
						<SubjectText>Nothing scheduled</SubjectText>
					) : (
						<SubjectText>{currentEvent?.Subject}</SubjectText>
					)}
				</SubjectContainer>
				<MiddleDivider />
				<StatusText>{roomStatus.toUpperCase()}</StatusText>
				<BottomView>
					{roomStatus === StatusTypes.Available && (
						<DisplayButton
							type="solid"
							buttonStyle={ButtonStyle}
							onPress={() => {
								setVisible(true);
								setOpenedFromCard(false);
							}}
						>
							{ButtonText}
						</DisplayButton>
					)}
					<RoomCircle status={status}>
						<RoomNameText>Room {roomName}</RoomNameText>
					</RoomCircle>
				</BottomView>
			</RoomDetails>
			<ConfirmModal
				visible={visible}
				setVisible={setVisible}
				fromCard={openedFromCard}
			/>
		</MainContainer>
	);
};
