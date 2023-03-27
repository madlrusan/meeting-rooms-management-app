import { ListItem } from "@mui/material";
import React from "react";
import "./style.css";
export const gridTemplate = (props:any) => {
	const src = props.employeeAvatar;
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
						<img className='photo' style={{width: "25%", height: "25%"}} src={src} alt={props.employeeId}/>
					</td>
					<td>
						<span style={{ fontWeight: 500 }}> First Name: </span> {props.employeeFirstName}
					</td>
					<td>
						<span style={{ fontWeight: 500 }}> Last Name: </span> {props.employeeLastName}
					</td>
				</tr>
				<tr>
					<td>
						<span style={{ fontWeight: 500 }}> Email: </span> {props.employeeEmail}
					</td>
					<td>
						<span style={{ fontWeight: 500 }}> PIN: </span> {props.employeePIN}
					</td>
				</tr>
				<tr>
					<td>
						<span style={{ fontWeight: 500 }}> Position: </span> {props.employeePosition}
					</td>
					<td>
						<span style={{ fontWeight: 500 }}> Department: </span> {props.employeeDepartment}
					</td>
				</tr>
			</tbody>
		</table>);
};