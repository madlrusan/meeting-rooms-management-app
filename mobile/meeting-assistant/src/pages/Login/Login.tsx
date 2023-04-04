import React, { useState } from "react";
import { CheckBox, Card, Input } from "@rneui/themed";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import {
	FormContainer,
	InputGroup,
	LoginCard,
	SubmitButton,
	TextH3,
	loginStyles,
} from "../../components/LoginComponents/Login.components";
export const Login = () => {
	const navigator = useNavigation();
	// const {roomName, setRoomName} = useContext(RoomContext);
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const [checked, setChecked] = useState<boolean>(false);
	return (
		<KeyboardAwareScrollView>
			<LoginCard containerStyle={loginStyles.loginCard}>
				<Card.Title>
					<TextH3 h3>Welcome Back!</TextH3>
				</Card.Title>
				<Card.FeaturedTitle>
					<TextH3 h4>Please enter your login details below</TextH3>
				</Card.FeaturedTitle>
				<FormContainer>
					<InputGroup>
						<Input
							id="email_input"
							placeholder="email@mail.com"
							autoComplete="email"
							inputMode="email"
							keyboardType="email-address"
							label="Enter the room email"
						/>
					</InputGroup>
					<InputGroup>
						<Input
							id="password_input"
							placeholder="password"
							autoComplete="password"
							secureTextEntry={!showPassword}
							label="Enter the room password password"
							rightIcon={
								<TextInput.Icon icon="eye" onPress={handleClickShowPassword} />
							}
						/>
					</InputGroup>
				</FormContainer>
				<SubmitButton
					title="Submit"
					onPress={() => {
						navigator.navigate("Dashboard" as never);
					}}
				/>
			</LoginCard>
		</KeyboardAwareScrollView>
	);
};
