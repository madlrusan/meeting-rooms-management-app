import { Button, Dialog, TextInput } from "react-native-paper";
import { Dimensions, Text, View } from "react-native";
import styled, { css } from "styled-components/native";

export const ActionsContainer = styled(Dialog.Actions)`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
    margin-top: 10%;
`;
export const ButtonStyle = {
	width: "20%",
	backgroundColor: "#28353a",
	borderRadius: 20,
	textColor: "#fff",
};
export const ConfirmPin = styled(Dialog.Content)`
	align-items: center;
	text-align: center;
`;
export const ConfirmPinContainer = styled(Dialog)`
	/* height: 600px; */
	z-index: 1000;
`;

export const ConfirmModalContainer = styled(Dialog)<{isFromCard?:  boolean}>`
	height: 300px;
	margin-bottom: 30%;
	${(props) => {
		if (props.isFromCard) {
			return css`
				z-index: inherit;
				height: 100%;
				width: 100%;
			`;
		}
	}};
`;

const { height, width } = Dimensions.get("screen");

export const avoidingView = {
	borderRadius: 10,
	flex: 1,
	height: height + 50,
	marginBottom: height + 100,
	paddingBottom: height + 100,
	// width: height + 70
};

export const EmailInput = styled(TextInput)`
	width: 60%;
	margin: 0% 0% 5% 0%;
	background-color: transparent;
	color: black !important;
`;

export const PINLabel = styled(Text)`
	/* margin-bottom: 1%; */
	font-size: 17px;
	/* background-color: "#28353a"; */
`;

export const LabelPINContainer = styled(View)`
	display: flex;
	flex-direction: row;
	align-content: center;
	justify-content: space-between;
	align-items: center;
	width: 55%;
`;