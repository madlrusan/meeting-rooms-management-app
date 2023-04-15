import { Browser } from "@syncfusion/ej2-base";
import { DataManager, Query } from "@syncfusion/ej2-data";
import {
	CommandModel,
	FilterSettingsModel,
	PageSettingsModel,
	ToolbarItems,
} from "@syncfusion/ej2-react-grids";
import { DialogForm, FTemplate, HTemplate } from "./DialogForm/DialogForm";
import { DeleteRoom } from "../../../api/rooms";
import React from "react";

export const toolbarOptions: ToolbarItems[] = [
	"Add",
	"Search",
	"ColumnChooser",
];
export const filterSettings: FilterSettingsModel = { type: "Excel" };

export const editparams = { params: { popupHeight: "300px" } };
export const validationRule = { required: true };
export const idRules = { required: true, number: true };
export const pageSettings: PageSettingsModel = {
	pageCount: 5,
	pageSize: 10,
};
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
		new DataManager(args.room).executeQuery(
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
export const handleActionBegin = (args: any) => {
	if (args.requestType === "delete") {
		const body = {
			id: args.data[0].roomId,
		};
		DeleteRoom(body);
	}
};
const DialogTemplate = (props: any) => {
	return <DialogForm {...props} />;
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
