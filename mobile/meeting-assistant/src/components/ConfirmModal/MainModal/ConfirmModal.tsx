import React, { useContext, useEffect, useState } from "react";
import { Button, Dialog, TextInput } from "react-native-paper";
import { Text } from "react-native-paper";
import { QueryCache } from "react-query";
import {
	ActionsContainer,
	ButtonStyle,
	ConfirmModalContainer,
	ConfirmPin,
	ConfirmPinContainer,
	EmailInput,
	LabelPINContainer,
	PINLabel,
	avoidingView,
} from "../ConfirmModal.components";
import {
	getDialogTitle,
	getEndTime,
	getStartTime,
} from "../ConfirmModal.types";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import moment from "moment";
import PINInput from "../../PinInput/PINInput";
import { RoomContext } from "../../../context/roomContext";
import { InputGroup } from "../../LoginComponents/Login.components";
import { queryClient } from "../../../../App";
import { useMutation } from "react-query";
import { AddEvent } from "../../../api/events";
import { createEventObject } from "../../../utils/eventsHelper";
export type ConfirmModalProps = {
	visible: boolean;
	setVisible: (value: boolean) => void;
	fromCard: boolean;
};
export const ConfirmModal = (props: ConfirmModalProps) => {
	const { visible, setVisible, fromCard } = props;
	const { selectedStartTime, selectedEndTime } = useContext(RoomContext);
	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);
	const DialogTitle = getDialogTitle(fromCard);
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
	const [state, setState] = useState({
		hostCredentials: { email: "", PIN: "" },
		isSubmitted: true,
		selectedStartTime: null,
		selectedEndTime: null,
		intervalStart: null,
		intervalEnd: null,
	});
	const [pin, setPin] = useState("");

	const handleSetPin = (newPin: string) => {
		setPin(newPin);
		setState((prevState: any) => {
			return {
				...prevState,
				hostCredentials: {
					email: prevState.hostCredentials.email,
					PIN: newPin,
				},
			};
		});
	};

	useEffect(() => {
		if (
			state.hostCredentials.email !== "" &&
			state.hostCredentials.PIN !== ""
		) {
			setState((prevState: any) => {
				return {
					...prevState,
					isSubmitted: false,
					selectedStartTime: fromCard ? selectedStartTime : null,
					selectedEndTime: fromCard ? selectedEndTime : null,
					intervalStart: fromCard ? null : intervalStart,
					intervalEnd: fromCard ? null : intervalEnd,
				};
			});
		} else {
			setState((prevState: any) => {
				return {
					...prevState,
					isSubmitted: true,
					selectedStartTime: fromCard ? selectedStartTime : null,
					selectedEndTime: fromCard ? selectedEndTime : null,
					intervalStart: fromCard ? null : intervalStart,
					intervalEnd: fromCard ? null : intervalEnd,
				};
			});
		}
	}, [
		state.hostCredentials,
		fromCard,
		selectedStartTime,
		selectedEndTime,
		intervalStart,
		intervalEnd,
	]);

  const createEvent = useMutation(AddEvent, {
    // onSuccess: (data) => {
    //   queryClient.invalidateQueries("events"); 
    // },
  });

	// const refresh = () => {
	// 	queryClient.invalidateQueries("allEvents");

	// };
	return (
		<ConfirmModalContainer visible={visible}>
			<KeyboardAvoidingView
				contentContainerStyle={avoidingView}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<Dialog.Title>{DialogTitle}</Dialog.Title>
				<Dialog.Content>
					{fromCard === false ? (
						<View>
							<Text>
								Are you sure you want to start a meeting in the
								interval {intervalStart} - {intervalEnd} ?
							</Text>
						</View>
					) : (
						<Text>
							Are you sure you want to book a meeting in the
							interval {selectedStartTime} - {selectedEndTime}?
						</Text>
					)}
				</Dialog.Content>
				<ActionsContainer>
					<Button
						mode="contained"
						onPress={hideModal}
						style={ButtonStyle}
					>
						Cancel
					</Button>
					<Button
						mode="contained"
						onPress={() => {
							setOpenPIN(true);
						}}
						style={ButtonStyle}
					>
						Ok
					</Button>
				</ActionsContainer>
				<ConfirmPinContainer visible={openPIN}>
					<Dialog.Title>Please confirm your email & PIN</Dialog.Title>
					<ConfirmPin>
						<LabelPINContainer>
							<PINLabel>Enter your work email</PINLabel>
							<EmailInput
								mode="outlined"
								id="email_input"
								placeholder="email@mail.com"
								autoComplete="email"
								inputMode="email"
								keyboardType="email-address"
								selectionColor="#000"
								underlineColor="#000"
								activeUnderlineColor="#000"
								outlineColor="#000"
								activeOutlineColor="#000"
								textColor="#000"
								// value="roomtest1@mail.com"
								value={state.hostCredentials.email}
								onChangeText={(text: string) =>
									setState((prevState: any) => {
										return {
											...prevState,
											hostCredentials: {
												email: text,
												PIN: prevState.hostCredentials
													.PIN,
											},
										};
									})
								}
							/>
						</LabelPINContainer>
						<PINInput
							value={pin}
							setValue={handleSetPin}
						/>
					</ConfirmPin>
					<ActionsContainer>
						<Button
							mode="contained"
							onPress={() => {
								setOpenPIN(false);
							}}
							style={ButtonStyle}
						>
							Cancel
						</Button>
						<Button
    mode="contained"
    onPress={() => {
      // if (fromCard) createEvent.mutate({ state.hostCredntials.email, });
      console.log(state);
      const body = createEventObject(state, fromCard);
      createEvent.mutate(body);
      setOpenPIN(false);
      setVisible(false);
    }}
    style={ButtonStyle}
  >
    Ok
  </Button>
					</ActionsContainer>
				</ConfirmPinContainer>
			</KeyboardAvoidingView>
		</ConfirmModalContainer>
	);
};
