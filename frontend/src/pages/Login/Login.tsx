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
import { getJWTData } from "../../components/common/HelperFunctions";
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
	const [password, setPasssword] = useState<string>("");
	const logIn = useMutation(LoginUser, {
		onSuccess: (data) => {
			localStorage.setItem("token", data.token);
			getJWTData();
			localStorage.setItem("role", "admin");
			navigate("/dashboard");
		},
	});

	return (
		<CardContainer>
			<h2>Welcome Back!</h2>
			<h3>Please enter your login details below</h3>
			<FormContainer>
				<InputGroup>
					<InputLabel htmlFor="email_input"> Email address</InputLabel>
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
									edge="end">
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						onChange={(e) => {
							setPasssword(e.target.value);
						}}
					/>
				</InputGroup>
				<FormControlLabel
					control={<Checkbox value="remember" color="primary" />}
					label="Remember me"
				/>
				<Grid item xs>
					<Link href="#" variant="body2">
						Forgot password?
					</Link>
				</Grid>
			</FormContainer>
			<SubmitButton
				type="submit"
				variant="contained"
				onClick={() => {
					logIn.mutate({ email, password });
				}}>
				Submit
			</SubmitButton>
		</CardContainer>
	);
};
