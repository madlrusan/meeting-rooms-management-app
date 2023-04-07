import {
	DataManager,
	Query,
	ReturnOption,
	WebApiAdaptor,
} from "@syncfusion/ej2-data";
import {
	CommandModel,
	FilterSettingsModel,
	GridComponent,
	PageSettingsModel,
	ToolbarItems,
} from "@syncfusion/ej2-react-grids";
import React, { useRef } from "react";
import "./style.css";
import { IDialogModel } from "./DialogTemplate/DialogTemplate.types";
import {
	DialogForm,
	FTemplate,
	HTemplate,
} from "./DialogTemplate/DialogTemplate";
import { BASE_URL_API, USER_ENDPOINTS } from "../../dto/constants";
import { Browser } from "@syncfusion/ej2-base";
import { useMutation } from "react-query";
import { DeleteEmployee } from "../../api/employees";
import { IEmployee } from "../../dto/models/IEmployee";

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
	if (args.requestType === "searching") {
		new DataManager(args.employees).executeQuery(
			new Query().search(args.searchString, [])
		);
	}
	if (args.requestType === "beginEdit" || args.requestType === "add") {
		if (Browser.isDevice) {
			args.dialog.height = window.innerHeight - 90 + "px";
			args.dialog.dataBind();
			args.dialog.close();
		}
	}
};
const DialogTemplate = (props: any) => {
	return <DialogForm {...props} />;
};

export const handleActionBegin = (args: any) => {
	if (args.requestType === "delete") {
		const body = {
			id: args.data[0].employeeId,
		};
		fetch(`${BASE_URL_API}${USER_ENDPOINTS.deleteUser}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
			body: JSON.stringify(body),
		})
			.then((response) => {
				response.json();
			})
			.catch((error) => {
				console.error("Error deleting record:", error);
			});
	}
};
export const OnDelete = (employee: IEmployee) => {
	const onDelete = useMutation(DeleteEmployee, {
		onSuccess: (data) => {
			console.log("successful deleted", data);
		},
	});
	onDelete.mutate(employee);
};
export const editSettings: any = {
	allowEditing: true,
	allowAdding: true,
	allowDeleting: true,
	mode: "Dialog",
	headerTemplate: HTemplate,
	footerTemplate: FTemplate,
	template: DialogTemplate,
	allowEditOnDblClick: false,
	showDeleteConfirmDialog: true,
};
