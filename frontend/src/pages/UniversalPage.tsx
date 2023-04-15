import React, { useContext } from "react";
import { DashboardAppBar } from "../components/common/AppBar/AppBar";
import { SideMenu } from "../components/SideMenu/SideMenu";
import { UserContext } from "../context/userContext";
import { AdminMenuItems } from "../dto/mocks/Menu";
import { MainContentCard } from "../components/MainCard/MainCard";
import { Pages } from "../dto/enums/Pages";

export const WholeWindow = () => {
	const drawerWidth = 200;
	const { userRole } = useContext(UserContext);
	const menuItems =
		userRole === "Admin"
			? AdminMenuItems
			: AdminMenuItems.filter((item) => item.itemName !== "Employees");
	const getPath = window.location.pathname;
	const getPage = (path: string) => {
		switch (path) {
			case "/dashboard":
				return Pages.Dashboard;
			case "/employees":
				return Pages.Employees;
			case "/rooms":
				return Pages.Rooms;
			case "/scheduler":
				return Pages.Schedule;
			default:
				return Pages.Dashboard;
		}
	};
	return (
		<>
			<DashboardAppBar drawerWidth={drawerWidth} />
			<SideMenu
				userRole={""}
				menuItems={menuItems}
				width={drawerWidth}
				selectedItem={getPath}
			/>
			<MainContentCard page={getPage(getPath)} />
		</>
	);
};
