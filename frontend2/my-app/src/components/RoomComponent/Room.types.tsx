import { ListItem } from "@mui/material";
import React from "react";
import "./style.css";
export const gridTemplate = (props: any) => {
	const src =
		"https://ej2.syncfusion.com/react/demos/src/grid/images/" +
		props.roomId +
		".png";
	return (
		<table className="detailtable" style={{ width: "100%" }}>
			<colgroup>
				<col style={{ width: "35%" }} />
				<col style={{ width: "35%" }} />
				<col style={{ width: "30%" }} />
			</colgroup>
			<tbody>
				<tr>
					{/* <td rowSpan={4} className="images">
						<img
							className="photo"
							style={{ width: "50%", height: "50%" }}
							src={src}
							alt={props.roomId}
						/>
					</td> */}
					<td>
						<span style={{ fontWeight: 500 }}>Room Name: </span>{" "}
						{props.roomName}
					</td>
					{/* <td>
						<span style={{ fontWeight: 500 }}>Room Code: </span> {props.roomId}
					</td> */}
				</tr>
				<tr>
					<td>
						<span style={{ fontWeight: 500 }}>Room Type: </span>{" "}
						{props.roomType}
					</td>
					<td>
						<span style={{ fontWeight: 500 }}>Room Capacity: </span>{" "}
						{props.roomCapacity}
					</td>
				</tr>
				<tr>
					<td>
						<span style={{ fontWeight: 500 }}>Location: </span>{" "}
						{props.roomLocation}
					</td>
					<td>
						<span style={{ fontWeight: 500 }}>See Scheduler: </span>{" "}
						<a href={`${props.roomLink}`}> here </a>
					</td>
				</tr>
			</tbody>
		</table>
	);
};
