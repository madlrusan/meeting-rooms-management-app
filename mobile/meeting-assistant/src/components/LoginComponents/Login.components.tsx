import React from "react";
import { TextInput } from "react-native-paper";
import { ScrollView, View } from "react-native";
import styled, { css } from "styled-components/native";
import { StyleSheet } from "react-native";
import { Card, Text, Button } from "@rneui/themed";

export const LoginCard = styled(Card)`
	display: flex;
	flex-direction: column;
	padding: 0% 5%;
	margin: 10% 10%;
	/* margin-top: 15%; */
	position: relative;
	border-radius: 32px !important;
	backdrop-filter: blur(50px);
	align-items: center;
	justify-content: center;
	/* Note: backdrop-filter has minimal browser support */
	border-radius: 35px;
`;

export const TextH3 = styled(Text)`
	text-align: center;
	margin-top: 10%;
	font-weight: 400;
`;

export const FormContainer = styled(View)`
	margin-top: 5%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 0px;
	gap: 20%;
	/* width: 100%; */
`;

export const InputGroup = styled(View)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	padding: 0px;
	position: relative;
	width: 100%;
`;

export const SubmitButton = styled(Button)`
	margin-top: 0% !important;
	/* width: 50vw; */
	margin-bottom: 0% !important;
`;

export const StyledScrolledView = styled(ScrollView)`
	margin-top: 5% !important;
`;

export const loginStyles = StyleSheet.create({
	scrollView: {
		margin: "10%",
	},
	loginCard: {
		borderRadius: 35,
		padding: "5%",
		margin: "10%",
		alignContent: "center",
		justifyContent: "center",
	},
	rememberCheckbox: {
		justifyContent: "center",
		alignContent: "center",
		fontVariant: "italic",
		flex: 1,
		marginLeft: "40%",
		marginTop: "5%",
		marginBottom: "1%",
	},
});
