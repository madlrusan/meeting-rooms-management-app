import { AppBar, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import React from "react";
import { DashboardAppBar } from "../../components/common/AppBar/AppBar";
import { Inbox, Mail } from "@mui/icons-material";
import { AdminMenuItems, PermanentMenuItems } from "../../dto/mocks/Menu";
import { SideMenu } from "../../components/SideMenu/SideMenu";
import { MainContentCard } from "../../components/MainCard/MainCard";
import { Pages } from "../../dto/enums/Pages";
type DahsboardProps = {
    userRole: string;
}
export const Dashboard = (props: DahsboardProps) => {
	const { userRole } = props;
	const drawerWidth = 200;
	const getPath = window.location.pathname;
	return userRole === "admin" ? (
		<>
			<DashboardAppBar drawerWidth={drawerWidth}/>
			<SideMenu userRole={""} menuItems={AdminMenuItems} width={drawerWidth} selectedItem={getPath}/>
			<MainContentCard page={Pages.Dashboard}  />
		</>
	) : (
		<>
            <DashboardAppBar drawerWidth={drawerWidth} />
			<SideMenu userRole={""} menuItems={AdminMenuItems.filter(item =>  item.itemName !== "Employees")} width={drawerWidth} selectedItem={getPath}/>
            <MainContentCard page={Pages.Dashboard} />
        </>
	) ;
};