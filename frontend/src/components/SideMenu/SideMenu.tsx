import React, { useState } from "react";
import { IChangeableMenuItems } from "../../dto/models/Menu";
import {
	Toolbar,
	Divider,
	useTheme,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import { PermanentMenuItems } from "../../dto/mocks/Menu";
import {
	MenuList,
	PermanentMenuList,
} from "../common/PermanentMenuList.components";
import { ListButton, StyledDrawer } from "./Sidemenu.components";
import meetingly_logo from "../../assets/Meetingly.png";
type SideMenuProps = {
	userRole: string;
	menuItems: IChangeableMenuItems[];
	width: number;
	selectedItem: string;
};
export const SideMenu = (props: SideMenuProps) => {
	const theme = useTheme();
	const { userRole, menuItems, width, selectedItem } = props;
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	return (
		<StyledDrawer
			width={width}
			mode={theme.palette.mode.toString()}
			elevation={8}
			variant="permanent"
			anchor="left">
			<Toolbar>
				{/* <Typography variant="h6" noWrap component="div">
					Meeting Room Manager
				</Typography> */}
				<img src={meetingly_logo} alt="logo" style={{ width: "10rem" }} />
			</Toolbar>

			<Divider />
			<MenuList>
				{menuItems.map((item) => (
					<ListItem key={item.id} disablePadding>
						<ListButton
							href={item.path}
							className={selectedItem === item.path ? "selected" : ""}>
							<ListItemIcon>
								<item.icon />
							</ListItemIcon>
							<ListItemText primary={item.itemName} />
						</ListButton>
					</ListItem>
				))}
			</MenuList>
			<Divider />
			<PermanentMenuList>
				{PermanentMenuItems.map((menuItem) => (
					<ListItem key={menuItem.id} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<menuItem.icon color="inherit" />
							</ListItemIcon>
							<ListItemText primary={menuItem.itemName} />
						</ListItemButton>
					</ListItem>
				))}
			</PermanentMenuList>
		</StyledDrawer>
	);
};
