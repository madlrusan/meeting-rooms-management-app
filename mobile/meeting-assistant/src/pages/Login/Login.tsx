import React, { useEffect, useState } from "react";
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
import { LoginRoom } from "../../api/room";
import {loginHelper } from "../../utils/generalHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const Login = () => {
	const navigate = useNavigation();
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const [checked, setChecked] = useState<boolean>(false);

	const [state, setState] = useState({
		loginCredentials: { email: "", password: "" },
		isSubmitted: true,
	});
	useEffect(() => {
		if (
			state.loginCredentials.email !== "" &&
			state.loginCredentials.password !== ""
		) {
			setState((prevState: any) => {
				return { ...prevState, isSubmitted: false };
			});
		} else {
			setState((prevState: any) => {
				return { ...prevState, isSubmitted: true };
			});
		}
	}, [state.loginCredentials]);
	const logIn = useMutation(LoginRoom, {
        onSuccess: async (data) => {
            // console.log("token", data.token);
            AsyncStorage.setItem("token", data.token);
            loginHelper(data.token);
            navigate.navigate("Dashboard" as never);
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
                            // value="roomtest1@mail.com"
							value={state.loginCredentials.email}
							onChangeText={(text: string) =>
								setState((prevState: any) => {
									return {
										...prevState,
										loginCredentials: {
											email: text,
											password: prevState.loginCredentials.password,
										},
									};
								})
							}
						/>
					</InputGroup>
					<InputGroup>
						<Input
							id="password_input"
							placeholder="password"
                            // value=""
							value={state.loginCredentials.password}
							autoComplete="password"
							secureTextEntry={!showPassword}
							label="Enter the room password password"
							rightIcon={
								<TextInput.Icon icon="eye" onPress={handleClickShowPassword} />
							}
							onChangeText={(text) =>
								setState((prevState: any) => {
									return {
										...prevState,
										loginCredentials: {
											password: text,
											email: prevState.loginCredentials.email,
										},
									};
								})
							}
						/>
					</InputGroup>
				</FormContainer>
				<SubmitButton
					title="Submit"
					onPress={() => {
						// // onSubmit(state.loginCredentials);
                        
                        logIn.mutate(state.loginCredentials);
                        // navigate.navigate("Dashboard" as never);
					}}
				/>
			</LoginCard>
		</KeyboardAwareScrollView>
	);
};
