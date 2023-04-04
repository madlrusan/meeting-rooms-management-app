import { Card } from "react-native-paper";
import styled, { css } from "styled-components/native";
import { Text, View } from "react-native";
export const MeetingCard = styled(Card)`
	flex: 1;
	padding: 5%;
	margin: 2%;
	background-color: #f9f7f7;
`;
export const TextContainer = styled(View)`
	flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
export const CardText = styled(Text)<{ status?: string }>`
	text-align: center;
	${(props) => {
		switch (props.status) {
			case "busy":
				return css`
					color: #fa0000;
				`;
			case "available":
				return css`
					color: #165607;
				`;
			case "reserved":
				return css`
					color: #086192;
				`;
		}
	}}
`;
