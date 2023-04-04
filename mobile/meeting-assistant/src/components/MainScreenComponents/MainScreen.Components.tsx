import { View, Text } from "react-native";
import styled, { css } from "styled-components/native";
import { Divider, Button } from "@rneui/themed";
export const MainContainer = styled(View)`
	flex: 1;
	flex-direction: row;
`;

export const LeftContainer = styled(View)<{ status: string }>`
	flex: 0.5;
	flex-direction: column;
	${(props) => {
		switch (props.status) {
			case "busy":
				return css`
					background-color: #d98f8f;
				`;
			case "available":
				return css`
					background-color: #9dd98f;
				`;
			case "reserved":
				return css`
					background-color: #8fbfd9;
				`;
		}
	}}
`;

export const RoomDetails = styled(View)`
	flex: 1;
	background-color: #eae8e8;
`;
export const ScreenDivider = styled(Divider)`
	width: 0.3%;
	background-color: grey;
`;

export const ClockText = styled(Text)`
	font-size: 90px;
	margin: 12% 3% 0% 3%;
	font-weight: 300;
	text-align: center;
`;
export const DateText = styled(Text)`
	font-size: 50px;
	font-weight: 200;
	text-align: center;
`;

export const SmallDivider = styled(Divider)`
	margin-top: 10%;
	height: 0.1%;
	background-color: grey;
`;

export const ScheduleContainer = styled(View)`
	flex: 1;
	background-color: #eae8e8;
`;

export const HostText = styled(Text)`
	font-size: 30px;
	margin-top: 10%;
	margin-right: 10%;
	font-weight: 200;
	text-align: right;
`;

export const SubjectText = styled(Text)`
	font-size: 100px;
	margin-top: 1%;
	font-weight: 100;
	text-align: left;
`;
export const MiddleDivider = styled(Divider)`
	height: 0.1%;
	margin-top: 1.6%;
	background-color: grey;
`;

export const StatusText = styled(Text)`
	font-size: 150px;
	font-weight: 400;
	margin-top: 0%;
	text-align: center;
`;

export const RoomCircle = styled(View)<{ status: string }>`
	width: 500px;
	height: 500px;
	border-radius: 250%;
	align-items: right;
	text-align: right;
	justify-content: right;
	margin-left: 5%;
	/* margin-bottom: -10%; */
	${(props) => {
		switch (props.status) {
			case "busy":
				return css`
					background-color: #d98f8f;
				`;
			case "available":
				return css`
					background-color: #9dd98f;
				`;
			case "reserved":
				return css`
					background-color: #8fbfd9;
				`;
		}
	}}
`;
export const RoomNameText = styled(Text)`
	text-align: right;
	width: 60%;
	margin-top: 10%;
	margin-left: 10%;
	font-size: 70px;
`;

export const BottomView = styled(View)`
	flex: 1;
	margin-top: 10%;
	flex-direction: row;
`;

export const DisplayButton = styled(Button)`
	width: 300px;
	margin-top: 250px;
	margin-left: 10%;
`;

export const ButtonStyle = {
	backgroundColor: "#28353a",
	borderRadius: 20,
};
