import { IChangeableMenuItems, IPermanentMenuItems } from "../models/Menu";
import {Settings, Help, Schedule, Badge, EditLocationAlt, Map, Dashboard} from "@mui/icons-material";
export const PermanentMenuItems: IPermanentMenuItems[] = [
	// {
	// 	id: "setting",
	// 	icon: Settings,
	// 	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque erat vel nisl pharetra convallis. Suspendisse condimentum arcu ac nibh convallis suscipit. Phasellus a dolor eu lacus sollicitudin eleifend",
	// 	itemName: "Settings"
	// },
	// {
	// 	id: "help",
	// 	icon: Help,
	// 	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque erat vel nisl pharetra convallis. Suspendisse condimentum arcu ac nibh convallis suscipit. Phasellus a dolor eu lacus sollicitudin eleifend",
	// 	itemName: "Help me"
	// }
];

export const AdminMenuItems: IChangeableMenuItems[] = [
	{
		id: "Dashboard",
		icon: Dashboard,
		itemName: "Dashboard",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque erat vel nisl pharetra convallis. Suspendisse condimentum arcu ac nibh convallis suscipit. Phasellus a dolor eu lacus sollicitudin eleifend",
		path:"/dashboard"
	},
	{
		id: "Schedule",
		icon: Schedule,
		itemName: "Schedule",
		description: "  Here, you can easily schedule and manage your meetings and conference rooms.Our simple and intuitive scheduling system allows you to select the desired room, date, and time  in just a few clicks. ",
		path: "/scheduler",
	},
	{
		id: "Rooms",
		icon: EditLocationAlt,
		itemName: "Rooms",
		description: " Here, you can view our available conference rooms and their details, including capacity, equipment, and location. Click the below button to see our selection.",
		path: "/rooms", 
	},
	{
		id: "Employees",
		icon: Badge,
		itemName: "Employees",
		description: "Here, you can view all of our employees and their details, including their name, position, and contact information.",
		path: "/employees",
	},

];