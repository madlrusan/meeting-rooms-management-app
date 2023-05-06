import { View, Text, Platform, ScrollView } from "react-native";
import styled, { css } from "styled-components/native";
import { Divider, Button } from "@rneui/themed";
export const MainContainer = styled(View)`
	flex: 1;
	flex-direction: row;
`;

export const LeftContainer = styled(View)<{ status: string }>`
	flex: 0.6;
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
	font-size: 80px;
	margin: 12% 3% 0% 3%;
	font-weight: 300;
	text-align: center;
`;
export const DateText = styled(Text)`
	font-size: 40px;
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
	font-size: 25px;
	margin-top: 10%;
	margin-right: 10%;
	font-weight: 300;
	text-align: right;
	/* width: 50px; */
`;

export const SubjectText = styled(Text)`
	font-size: 90px;
	/* margin-top: 1%; */
    margin-left: 10px;
	font-weight: 200;
	text-align: left;
`;

export const SubjectContainer = styled(ScrollView)`
	margin: 0px;
	height: 0px;
`;
export const MiddleDivider = styled(Divider)`
	/* height: 0.2%; */
	/* margin-top: -29%; */
	background-color: grey;
    flex: 0.003;
`;

export const StatusText = styled(Text)`
	font-size: 135px;
	font-weight: 400;
	margin-top: 0%;
	padding-top: 0%;
	text-align: center;
`;

export const RoomCircle = styled(View)<{ status: string }>`
	width: 500px;
    /* flex: 15; */
	height: 500px;
	border-radius: 250%;
	text-align: right;
	margin-left: 5%;
	${(props) => {
		switch (props.status) {
			case "busy":
				return css`
					background-color: #d98f8f;
					margin-left: 45%;
				`;
			case "available":
				return css`
					background-color: #9dd98f;
					/* margin-left: 45%; */
				`;
			// case "reserved":
			// 	return css`
			// 		background-color: #8fbfd9;
			// 	`;
		}
	}}
`;
export const RoomNameText = styled(Text)`
	text-align: center;
	width: 70%;
	margin-top: 20%;
	margin-left: 10%;
	font-size: 80px;
`;

export const BottomView = styled(View)`
	flex: 3;
	margin-top: 10%;
	flex-direction: row;
`;

export const DisplayButton = styled(Button)<{buttonStyle: any}>`
	/* width: 200px; */
    /* height: 100px; */
	/* border-radius: 20%; */
	/* color: #28353a !important; */
	margin-top: 110%;
	margin-left: 10%;
    font-size: 500px;
`;

export const ButtonStyle = {
	backgroundColor: '#28353a',
    borderRadius: 20,
    width: 200,
    height: 50,
    // marginLeft: 50,
    // marginTop: 300,
    alignItems: 'center',
    justifyContent: 'center',
    color: "#fff",
    // fontSize: "100px !important",
    // lineHeight: "100px !important",
};
// export const ButtonText ={
//     color: '#fff',
//     fontSize: 20,
// }
