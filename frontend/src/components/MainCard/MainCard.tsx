import React, { useContext, useEffect, useState } from "react";
import { Link, Typography } from "@mui/material";
// import { Login } from "../../pages/Login/Login";
import { MainContainer } from "./MainCard.components";
import { DashboardSmallCard } from "../common/MultipleCommons.components";
import { AdminMenuItems } from "../../dto/mocks/Menu";
import { DashboardCardContent } from "../common/DashboardCardContent/DashboardCardContent";
import { SchedulerContainer } from "../SchedulerComponent/SchedulerComponent";
import { RoomContainer } from "../RoomComponent/RoomComponent";
import { EmployeeComponent } from "../EmployeesComponent/EmployeesComponent";
import { GetUserById } from "../../api/employees";
import { UpdatePasswordModal } from "../UpdatePasswordModal/UpdatePasswordModal";
import { UserContext } from "../../context/userContext";
type DashboardCardProps = {
	page: string;
};
export const MainContentCard = (props: DashboardCardProps) => {
	const { page } = props;
	const [openD, setOpenD] = useState<boolean>(false);
	const isFirstLogin = localStorage.getItem("firstLogin");
	const { userRole } = useContext(UserContext);
	useEffect(() => {
		if (isFirstLogin === "true") {
			setOpenD(true);
		}
		else setOpenD(false);
	}, [isFirstLogin]);
	switch (page) {
		case "dashboard": {
			
			const DashboardItems = userRole !== "Admin" ? AdminMenuItems.filter(
							(item) => item.itemName !== "Dashboard" && item.itemName !== "Employees"
						) : AdminMenuItems.filter(
							(item) => item.itemName !== "Dashboard"
						);

			const handleClose = (e: any) => {
				console.log(e);
				setOpenD(false);
			};
			return (
				<>
					<MainContainer>
						{DashboardItems.map((item, key) => {
							return (
								<DashboardSmallCard key={key}>
									<DashboardCardContent
										title={item.itemName}
										description={item.description}
										path={item.path}
									/>
								</DashboardSmallCard>
							);
						})}
						<UpdatePasswordModal
							open={openD}
							handleClose={(e: any) => handleClose(e)}
						/>
					</MainContainer>
				</>
			);
		}
		case "scheduler": {
			return (
				<>
					<MainContainer>
						<SchedulerContainer />
					</MainContainer>
				</>
			);
		}
		case "rooms": {
			return (
				<>
					<MainContainer>
						<Typography variant="h3"> Rooms Records </Typography>
						<RoomContainer />
					</MainContainer>
				</>
			);
		}
		case "employees": {
			return (
				<>
					<MainContainer>
						<Typography variant="h3">
							{" "}
							Employees Records{" "}
						</Typography>
						<EmployeeComponent />
					</MainContainer>
				</>
			);
		}
		// case "map": {
		// 	return (
		// 		<>
		// 			<MainContainer>
		// 				<Typography variant="h3"> Interactive Map of Floor </Typography>
		// 				<MapCompontent />
		// 			</MainContainer>
		// 		</>
		// 	);
		// }
		default:
			return <Smth1 />;
	}
};

const Smth1 = () => {
	return (
		<>
			<h2>Recent Deposits</h2>
			<Typography
				component="p"
				variant="h4"
			>
				$3,024.00$3,024.00$3,024.00$3,024.00$3,024.00$3,024.00$3,024.00$3,024.00$3,024.00
			</Typography>
			<Typography
				color="text.secondary"
				sx={{ flex: 1 }}
			>
				on 15 March, 2019
			</Typography>
			<div>
				<Link
					color="primary"
					href="/dashboard"
				>
					View balance
				</Link>
			</div>
		</>
	);
};
