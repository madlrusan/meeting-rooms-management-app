import React, { useState } from "react";
import {
	CardContainer,
	FormContainer,
	FormInput,
	InputGroup,
	SubmitButton,
} from "./Login.components";
import {
	Checkbox,
	FormControlLabel,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoginUser } from "../../api/user";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { loginHelper } from "../../utils/helperFunctions";
import { GetUserById } from "../../api/employees";
export const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const logIn = useMutation(LoginUser, {
		onSuccess: async (data) => {
			localStorage.setItem("token", data.token);
			loginHelper(data.token);
			
			navigate("/dashboard");
		},
	});

	return (
		<CardContainer>
			<h2>Welcome Back!</h2>
			<h3>Please enter your login details below</h3>
			<FormContainer>
				<InputGroup>
					<InputLabel htmlFor="email_input">
						{" "}
						Email address
					</InputLabel>
					<FormInput
						id="email_input"
						placeholder="Enter your work email"
						type="email"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
				</InputGroup>
				<InputGroup>
					<InputLabel htmlFor="password_input"> Password</InputLabel>
					<FormInput
						id="password_input"
						placeholder="Enter your password"
						type={showPassword ? "text" : "password"}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showPassword ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</InputGroup>
				</FormContainer>
			<SubmitButton
				type="submit"
				variant="contained"
				onClick={() => {
					logIn.mutate({ email, password });
				}}
			>
				Submit
			</SubmitButton>
		</CardContainer>
	);
};
