import React, { useState } from "react";
import { Button, Dialog } from "react-native-paper";
import { Text } from "react-native-paper";
import { Input } from "@rneui/themed";
import {
	ActionsContainer,
	ButtonStyle,
	ConfirmModalContainer,
	ConfirmPin,
	ConfirmPinContainer,
	avoidingView,
} from "./ConfirmModal.components";
import { getDialogTitle, getEndTime, getStartTime } from "./ConfirmModal.types";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import moment from "moment";
import PINInput from "../PinInput/PINInput";
export type ConfirmModalProps = {
	visible: boolean;
	setVisible: (value: boolean) => void;
	actionType: string;
};
export const ConfirmModal = (props: ConfirmModalProps) => {
	const { visible, setVisible, actionType } = props;

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);
	const DialogTitle = getDialogTitle(actionType);
	const startTime = getStartTime();
	const endTime = getEndTime(startTime);
	const intervalStart = moment()
		.hour(startTime.hour)
		.minutes(startTime.minutes)
		.format("HH:mm");
	const intervalEnd = moment()
		.hour(endTime.endHour)
		.minutes(startTime.minutes + endTime.diffMinutes)
		.format("HH:mm");

	const [openPIN, setOpenPIN] = useState(false);
	return (
		<ConfirmModalContainer visible={visible}>
			<KeyboardAvoidingView
				contentContainerStyle={avoidingView}
				behavior={Platform.OS === "ios" ? "padding" : "height"}>
				<Dialog.Title>{DialogTitle}</Dialog.Title>
				<Dialog.Content>
					{actionType === "Start" ? (
						<View>
							<Text>
								Are you sure you want to start a meeting in the interval{" "}
								{intervalStart} - {intervalEnd} ?
							</Text>
						</View>
					) : (
						<Text>Are you sure you want to cancel the meeting?</Text>
					)}
				</Dialog.Content>
				<ActionsContainer>
					<Button mode="contained" onPress={hideModal} style={ButtonStyle}>
						Cancel
					</Button>
					<Button
						mode="contained"
						onPress={() => {
							setOpenPIN(true);
						}}
						style={ButtonStyle}>
						Ok
					</Button>
				</ActionsContainer>
				<ConfirmPinContainer visible={openPIN}>
					<Dialog.Title>Please confirm your PIN</Dialog.Title>
					<ConfirmPin>
						<PINInput />
					</ConfirmPin>
					<ActionsContainer>
						<Button
							mode="contained"
							onPress={() => {
								setOpenPIN(false);
							}}
							style={ButtonStyle}>
							Cancel
						</Button>
						<Button
							mode="contained"
							onPress={() => {
								setOpenPIN(false);
							}}
							style={ButtonStyle}>
							Ok
						</Button>
					</ActionsContainer>
				</ConfirmPinContainer>
			</KeyboardAvoidingView>
		</ConfirmModalContainer>
	);
};
