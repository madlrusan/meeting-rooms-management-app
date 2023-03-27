import React from "react";
import { DashboardAppBar } from "../../components/common/AppBar/AppBar";
import { SideMenu } from "../../components/SideMenu/SideMenu";
import { Pages } from "../../dto/enums/Pages";
import { MainContentCard } from "../../components/MainCard/MainCard";
import { AdminMenuItems } from "../../dto/mocks/Menu";
type RoomsProps ={
    userRole:  string;
}
export const Rooms = (props: RoomsProps) => {
	const {userRole} = props;
	const drawerWidth = 200;
	const getPath = window.location.pathname;
	return userRole === "admin" ? (
		<>
			<DashboardAppBar drawerWidth={drawerWidth}/>
			<SideMenu userRole={""} menuItems={AdminMenuItems} width={drawerWidth} selectedItem={getPath}/>
			<MainContentCard page={Pages.Rooms}  />
		</>
	) : (
		<>
			<DashboardAppBar drawerWidth={drawerWidth}/>
			<SideMenu userRole={""} menuItems={AdminMenuItems.filter(item =>  item.itemName !== "Employees")} width={drawerWidth} selectedItem={getPath}/>
			<MainContentCard page={Pages.Rooms}  />
		</>
	) ;
};