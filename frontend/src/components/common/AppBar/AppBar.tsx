import {
	AppBar,
	Avatar,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { getInitials, getRandomBgColor } from "../../../utils/helperFunctions";
import { LeftSide } from "./AppBar.components";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router";
type DashboardAppBarProps = {
	drawerWidth: number;
};
export const DashboardAppBar = (props: DashboardAppBarProps) => {
	const { drawerWidth } = props;

	// get username from context
	const logginUserFullName = localStorage.getItem("logginUserFullName");
	const userName =
		logginUserFullName && logginUserFullName.length > 0
			? logginUserFullName
			: "A";
	const { userFullName } = useContext(UserContext);

	// const [hasImage, setHasImage] = useState<boolean>(true);
	// useEffect(()=>{
	// 	setHasImage(false);
	// },[]);
	const hasImage = false;
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
		localStorage.clear();
		navigate("/");
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const navigate = useNavigate();

	return (
		<AppBar position="fixed">
			<Toolbar>
				<LeftSide>
					<Tooltip title="Log Out">
						<IconButton onClick={handleOpenUserMenu}>
							{hasImage ? (
								<Avatar src="../../../assets/img/meeting_room.jpg" />
							) : (
								<Avatar {...getRandomBgColor(userName)}>
									{getInitials(userName)}
								</Avatar>
							)}
						</IconButton>
					</Tooltip>
					<Menu
						sx={{ mt: "45px" }}
						id="menu-appbar"
						anchorEl={anchorElUser}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={Boolean(anchorElUser)}
						onClose={handleCloseUserMenu}>
						<MenuItem onClick={handleCloseNavMenu}>
							<Typography textAlign="center">Log Out</Typography>
						</MenuItem>
					</Menu>
				</LeftSide>
			</Toolbar>
		</AppBar>
	);
};
