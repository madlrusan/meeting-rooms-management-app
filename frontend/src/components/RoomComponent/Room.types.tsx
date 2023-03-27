import { ListItem } from "@mui/material";
import React from "react";
import "./style.css";
export const gridTemplate = (props:any) => {
	const src = "https://ej2.syncfusion.com/react/demos/src/grid/images/" + props.roomId + ".png";
	return (
		<table className="detailtable" style={{ width: "100%" }}>
			<colgroup>
				<col style={{ width: "35%" }}/>
				<col style={{ width: "35%" }}/>
				<col style={{ width: "30%" }}/>
			</colgroup>
			<tbody>
				<tr>
					<td rowSpan={4} className='images'>
						<img className='photo' style={{width: "50%", height: "50%"}} src={src} alt={props.roomId}/>
					</td>
					<td>
						<span style={{ fontWeight: 500 }}>Room Name: </span> {props.name}
					</td>
					<td>
						<span style={{ fontWeight: 500 }}>Room Code: </span> {props.roomId}
					</td>
				</tr>
				<tr>
					<td>
						<span style={{ fontWeight: 500 }}>Room Type: </span> {props.type}
					</td>
					<td>
						<span style={{ fontWeight: 500 }}>Room Capacity: </span> {props.capacity}
					</td>
				</tr>
				<tr>
					<td>
						<span style={{ fontWeight: 500 }}>Room Features: </span> 
						<ul>
							{props.features.map((feature : any, key: number) => {
								return <li style={{ fontWeight: 200}} key={key}>{props.features[key]}</li>;
							})}
						</ul>
					</td>
					<td>
						<span style={{ fontWeight: 500 }}>Location: </span> {props.location}
					</td>
				</tr>
                <tr>
                    <td>
                        <span style={{ fontWeight: 500 }}>See Scheduler: </span> <a href={`${props.link}`}> here </a>
                    </td>
                </tr>
			</tbody>
		</table>);
};