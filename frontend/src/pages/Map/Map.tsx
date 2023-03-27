import React from "react";
import { MainContentCard } from "../../components/MainCard/MainCard";
import { SideMenu } from "../../components/SideMenu/SideMenu";
import { DashboardAppBar } from "../../components/common/AppBar/AppBar";
import { AdminMenuItems } from "../../dto/mocks/Menu";
import { Pages } from "../../dto/enums/Pages";

type MapProps = {
    userRole: string;
}
export const Map =(props : MapProps) => {
	const {userRole} = props;
	const drawerWidth = 200;
	const getPath = window.location.pathname;
	return userRole === "admin" ? (
		<>
			<DashboardAppBar drawerWidth={drawerWidth}/>
			<SideMenu userRole={""} menuItems={AdminMenuItems} width={drawerWidth} selectedItem={getPath}/>
			<MainContentCard page={Pages.Map}  />
		</>
	) : (
		<div>client</div>
	) ;
};