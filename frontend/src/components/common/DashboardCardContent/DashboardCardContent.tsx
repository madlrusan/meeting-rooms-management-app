import { Link, Typography } from "@mui/material";
import React from "react";
import { Description, ItemLink } from "./DashboardCardContent.components";
type DashboardCardContentProps = {
    title: string;
    description: string;
    path: string;
}
export const DashboardCardContent = (props: DashboardCardContentProps ) => {
	const { title, description, path } = props;
	return (
		<>
			<h2>{title}</h2>
			<Description color="text.secondary" sx={{ flex: 1 }}>
				{description}
			</Description>
			<ItemLink color="primary" href={`${path}`}>
                    Go to see {title}
			</ItemLink>
		</>
	);
};