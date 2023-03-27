import React from "react";
import { DashboardAppBar } from "../../components/common/AppBar/AppBar";
import { SideMenu } from "../../components/SideMenu/SideMenu";
import { MainContentCard } from "../../components/MainCard/MainCard";
import { AdminMenuItems } from "../../dto/mocks/Menu";
import { Pages } from "../../dto/enums/Pages";

type EmployeesProps ={
    userRole:  string;
}
export const Employees = (props: EmployeesProps)=> {
	const {userRole} = props;
	const drawerWidth = 200;
	const getPath = window.location.pathname;
	return (
		<>
			<DashboardAppBar drawerWidth={drawerWidth}/>
			<SideMenu userRole={""} menuItems={AdminMenuItems} width={drawerWidth} selectedItem={getPath}/>
			<MainContentCard page={Pages.Employees}  />
		</>
	) ;
};