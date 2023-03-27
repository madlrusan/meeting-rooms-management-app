import React from "react";
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Toolbar, Edit, Inject, EditSettingsModel, DetailRow, CommandColumn, CommandModel, PageSettingsModel, FilterSettingsModel, Filter, Sort, columnChooserOpened, ColumnChooser } from "@syncfusion/ej2-react-grids";
import { employeeData, roomData } from "../../dto/mocks/data";
import { gridTemplate } from "./Employees.types";
import "./style.css";
export const EmployeeComponent = () => {
	const filterSettings :FilterSettingsModel = { type: "Excel" };
	const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, allowEditOnDblClick: false };
	const editparams = { params: { popupHeight: "300px" } };
	const validationRule = { required: true };
	const idRules = { required: true, number: true };
	const pageSettings: PageSettingsModel = { pageCount: 5, pageSizes: true  };
	const toolbarOptions: any = ["ColumnChooser"];
	const commands: CommandModel[] = [{ type: "Edit", buttonOption: { iconCss: " e-icons e-edit", cssClass: "e-flat" } },
		{ type: "Delete", buttonOption: { iconCss: "e-icons e-delete", cssClass: "e-flat" } },
		{ type: "Save", buttonOption: { iconCss: "e-icons e-update", cssClass: "e-flat" } },
		{ type: "Cancel", buttonOption: { iconCss: "e-icons e-cancel-icon", cssClass: "e-flat" } }];
	return (
		<div className='control-pane'>
			<div className='control-section'>
				<GridComponent 
					dataSource={employeeData} 
					allowPaging={true} 
					editSettings={editSettings} 
					pageSettings={pageSettings} 
					detailTemplate={gridTemplate} 
					height="400"
					allowSorting={true}
					allowFiltering={true} 
					filterSettings={filterSettings}
					toolbar={toolbarOptions}
					showColumnChooser={true}
				>
					<ColumnsDirective>
						<ColumnDirective field='employeePIN' headerText='PIN' width='40' validationRules={idRules}></ColumnDirective>
						<ColumnDirective field='employeeFirstName' headerText='First Name' width='40' validationRules={validationRule}></ColumnDirective>
						<ColumnDirective field='employeeLastName' headerText='Last Name' width='40' validationRules={validationRule}></ColumnDirective>
						<ColumnDirective field='employeePosition' headerText='Position' width='60' editType='dropdownedit' edit={editparams}></ColumnDirective>
						<ColumnDirective field='employeeDepartment' headerText='Department' width='50' editType='dropdownedit' edit={editparams}></ColumnDirective>
						<ColumnDirective headerText='Manage Records' width='50' commands={commands}></ColumnDirective>
					</ColumnsDirective>
					<Inject services={[Page, Edit, DetailRow, CommandColumn, Filter, Sort, ColumnChooser, Toolbar]}/>
				</GridComponent>
			</div>
		</div>
	);
};