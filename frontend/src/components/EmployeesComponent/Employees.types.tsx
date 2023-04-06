import { DataManager, Query } from "@syncfusion/ej2-data";
import {
	CommandModel,
	FilterSettingsModel,
	PageSettingsModel,
	ToolbarItems,
} from "@syncfusion/ej2-react-grids";
import React from "react";
import "./style.css";
import { Browser, extend } from "@syncfusion/ej2-base";
import { IDialogModel } from "./DialogTemplate/DialogTemplate.types";
import { DialogTemplate } from "./DialogTemplate/DialogTemplate";

export const gridTemplate = (props: any) => {
	const src = props.employeeAvatar;
	return (
		<table className="detailtable" style={{ width: "100%" }}>
			<colgroup>
				<col style={{ width: "50%" }} />
				<col style={{ width: "50%" }} />
			</colgroup>
			<tbody>
				<tr>
					{/* <td rowSpan={4} className='images'>
						<img className='photo' style={{width: "25%", height: "25%"}} src={src} alt={props.employeeId}/>
					</td> */}
					<td>
						<span style={{ fontWeight: 500 }}> First Name: </span>{" "}
						{props.employeeFirstName}
					</td>
					<td>
						<span style={{ fontWeight: 500 }}> Last Name: </span>{" "}
						{props.employeeLastName}
					</td>
				</tr>
				<tr>
					<td>
						<span style={{ fontWeight: 500 }}> Email: </span>{" "}
						{props.employeeEmail}
					</td>
					<td>
						<span style={{ fontWeight: 500 }}> PIN: </span> {props.employeePIN}
					</td>
				</tr>
				<tr>
					<td>
						<span style={{ fontWeight: 500 }}> Position: </span>{" "}
						{props.employeePosition}
					</td>
					<td>
						<span style={{ fontWeight: 500 }}> Department: </span>{" "}
						{props.employeeDepartment}
					</td>
				</tr>
			</tbody>
		</table>
	);
};
export const filterSettings: FilterSettingsModel = { type: "Excel" };

export const editparams = { params: { popupHeight: "300px" } };
export const validationRule = { required: true };
export const idRules = { required: true, number: true };
export const pageSettings: PageSettingsModel = {
	pageCount: 5,
	pageSizes: true,
};
export const toolbarOptions: ToolbarItems[] = [
	"Add",
	"Search",
	"ColumnChooser",
];
export const commands: CommandModel[] = [
	{
		type: "Edit",
		buttonOption: { iconCss: " e-icons e-edit", cssClass: "e-flat" },
	},
	{
		type: "Delete",
		buttonOption: { iconCss: "e-icons e-delete", cssClass: "e-flat" },
	},
	{
		type: "Save",
		buttonOption: { iconCss: "e-icons e-update", cssClass: "e-flat" },
	},
	{
		type: "Cancel",
		buttonOption: { iconCss: "e-icons e-cancel-icon", cssClass: "e-flat" },
	},
];
export const onComplete = (args: any) => {
	if (args.requestType == "searching") {
		new DataManager(args.employees).executeQuery(
			new Query().search(args.searchString, [])
		);
	}
	if (args.requestType == "add") {
		// (args.form.elements.namedItem("EmployeeId") as HTMLInputElement).focus();
		if (Browser.isDevice) {
			args.dialog.height = window.innerHeight - 90 + "px";
			args.dialog.width = window.innerWidth + 90 + "px";
			(args.dialog as any).dataBind();
		}
	}

	if (args.requestType == "save") {
		console.log(args);
	}
};

const dialogTemplate = (props: IDialogModel): any => {
	return <DialogTemplate {...props} />;
};
const HTemplate = (args: any) => {
	console.log("ht", args);
	if (!args.isAdd) {
		return (
			<div>
				Edit {args.employeeFirstName} {args.employeeLastName}
			</div>
		);
	} else if (args.isAdd) {
		return <div>Add a new employee</div>;
	}
};
export const editSettings: any = {
	allowEditing: true,
	allowAdding: true,
	allowDeleting: true,
	mode: "Dialog",
	headerTemplate: HTemplate,
	template: dialogTemplate,
	allowEditOnDblClick: false,
};
