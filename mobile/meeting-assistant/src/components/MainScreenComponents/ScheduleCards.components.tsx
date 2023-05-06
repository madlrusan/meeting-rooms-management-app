import { Card } from "react-native-paper";
import styled, { css } from "styled-components/native";
import { Text, View } from "react-native";
export const MeetingCard = styled(Card)`
	flex: 1;
	padding: 5%;
	margin: 2%;
	background-color: #f9f7f7;
`;
export const TextContainer = styled(View)<{hasEvent?: boolean}>`
	flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	
	${(props) =>{
		if(props.hasEvent) {
			return css`
				margin-top: 10px;
			`;
		}
	}}
`;
export const CardText = styled(Text)<{ status?: string; toBold?: boolean, isHost?: boolean }>`
	text-align: center;
	${(props) => {
		switch (props.status) {
			case "busy":
				return css`
					color: #c50e0e;
					font-weight: 800;
				`;
			case "available":
				return css`
					color: #268511;
					font-weight: 800;
					margin-top: 10px;
				`;
			case "reserved":
				return css`
					color: #076fa7;
					font-weight: 800;
				`;
		}
		if (props.toBold) {
			return css`
				font-weight: 800;
			`;
		}
		if(props.isHost) {
			return css`
				font-weight: 600;
			`;
		}
	}}
`;
export const HostTextContainer = styled(View)`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: left;
`;