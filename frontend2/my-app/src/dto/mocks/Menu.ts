import { IChangeableMenuItems, IPermanentMenuItems } from "../models/Menu";
import {Settings, Help, Schedule, Badge, EditLocationAlt, Map, Dashboard} from "@mui/icons-material";
export const PermanentMenuItems: IPermanentMenuItems[] = [
	// {
	// 	id: "setting",
	// 	icon: Settings,
	// 	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque erat vel nisl pharetra convallis. Suspendisse condimentum arcu ac nibh convallis suscipit. Phasellus a dolor eu lacus sollicitudin eleifend",
	// 	itemName: "Settings"
	// },
	{
		id: "help",
		icon: Help,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque erat vel nisl pharetra convallis. Suspendisse condimentum arcu ac nibh convallis suscipit. Phasellus a dolor eu lacus sollicitudin eleifend",
		itemName: "Help me"
	}
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
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque erat vel nisl pharetra convallis. Suspendisse condimentum arcu ac nibh convallis suscipit. Phasellus a dolor eu lacus sollicitudin eleifend",
		path: "/scheduler",
	},
	{
		id: "Rooms",
		icon: EditLocationAlt,
		itemName: "Rooms",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque erat vel nisl pharetra convallis. Suspendisse condimentum arcu ac nibh convallis suscipit. Phasellus a dolor eu lacus sollicitudin eleifend",
		path: "/rooms", 
	},
	{
		id: "Employees",
		icon: Badge,
		itemName: "Employees",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque erat vel nisl pharetra convallis. Suspendisse condimentum arcu ac nibh convallis suscipit. Phasellus a dolor eu lacus sollicitudin eleifend",
		path: "/employees",
	},
	// {
	// 	id: "Map",
	// 	icon: Map,
	// 	itemName: "Map",
	// 	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque erat vel nisl pharetra convallis. Suspendisse condimentum arcu ac nibh convallis suscipit. Phasellus a dolor eu lacus sollicitudin eleifend",
	// 	path: "/map", //to be modified
	// }
];