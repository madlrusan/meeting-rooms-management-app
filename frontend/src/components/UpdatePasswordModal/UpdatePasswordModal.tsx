import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	InputAdornment,
	InputLabel,
	TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
	DialogFooter,
	DialogHeader,
	FormInput,
	InputGroup,
} from "./UpdatePasswordModal.components";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useMutation } from "react-query";
import { UpdatePassword } from "../../api/user";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
type UpdatePasswordModalProps = {
	open: boolean;
	handleClose: (e: any) => void;
};
export const UpdatePasswordModal = (props: UpdatePasswordModalProps) => {
	const { open, handleClose } = props;
	const { setUserRole } = useContext(UserContext);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const handleClickShowPassword = () => setShowPassword((show: any) => !show);
	const [password, setPassword] = useState<string>("");
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};
	const updatePassword = useMutation(UpdatePassword, {
		onSuccess: (data) => {
			localStorage.clear();
			setUserRole("");
			// navigate("/");
			localStorage.setItem("firstLogin", "false");
			handleClose(data);
			navigate("/");
		},
	});
	const navigate = useNavigate();
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogHeader>
				You need to change your password!
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}>
					<CloseIcon />
				</IconButton>
			</DialogHeader>
			<DialogContent>
				Please change your password after first login or if it was changed by an
				admin to keep your account secure. Also, remember to log in again after
				changing your password. Thank you.
				<InputGroup>
					{/* <InputLabel htmlFor="password_input"> Password</InputLabel> */}
					<FormInput
						id="password_input"
						placeholder="Enter your new password"
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
							setPassword(e.target.value);
						}}
					/>
				</InputGroup>
			</DialogContent>
			<DialogFooter>
				<Button onClick={handleClose}>Cancel</Button>
				<Button
					onClick={() => {
						updatePassword.mutate(password);
						navigate("/");
					}}>
					Submit
				</Button>
			</DialogFooter>
		</Dialog>
	);
};
