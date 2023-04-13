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
import { useMutation } from "react-query";
export const Login = () => {
	const navigator = useNavigation();
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const [checked, setChecked] = useState<boolean>(false);

	const [email, setEmail] = useState<string>("");
	const [password, setPasssword] = useState<string>("");
	const logIn = useMutation(LoginRoom, {
		onSuccess: (data) => {
			localStorage.setItem("token", data.token);
			loginHelper(data.token);
			navigator.navigate("Dashboard" as never);
		},
	});
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
							onChange={(e) => {
								setEmail(e.target.value);
							}}
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
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</InputGroup>
				</FormContainer>
				<SubmitButton
					title="Submit"
					onPress={() => {
						logIn.mutate({ email, password });
					}}
				/>
			</LoginCard>
		</KeyboardAwareScrollView>
	);
};
