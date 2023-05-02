import React, { useState, useEffect } from "react";
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
    ButtonText
} from "../../components/MainScreenComponents/MainScreen.Components";
import { ScheduleCard } from "./ScheduleCards";
import {
	Clock,
	getButtonText,
} from "../../components/MainScreenComponents/MainScreen.types";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";
import { ScrollView, TouchableOpacity, Text } from "react-native";
// import {getData} from "../../utils/helperFunctions.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MainScreen = () => {
	// use context --> to get room details
	const [visible, setVisible] = useState(false);
	const GlobalStatus = StatusTypes.Available;
	const ButtonText = getButtonText(GlobalStatus);
    const [userName, setUserName] = useState("");

  useEffect(() => {
    const getUserName = async () => {
      const name = await AsyncStorage.getItem("roomName");
      setUserName(name);
    };
    getUserName();
  }, []);
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
						<RoomNameText>Room {userName}</RoomNameText>
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
