import React, { useContext } from "react";
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Toolbar, Edit, Inject, EditSettingsModel, DetailRow, CommandColumn, CommandModel, PageSettingsModel, FilterSettingsModel, Filter, Sort, ColumnChooser } from "@syncfusion/ej2-react-grids";
import { roomData } from "../../dto/mocks/data";
import { gridTemplate } from "./Room.types";
import "./style.css";
import { UserContext } from "../../context/userContext";
import { Column } from "@syncfusion/ej2-excel-export";
export const RoomContainer = () => {
    const {userRole} = useContext(UserContext);
	const toolbarOptions: any = ["ColumnChooser"];
	const filterSettings :FilterSettingsModel = { type: "Excel" };
	const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, allowEditOnDblClick: false };
	const editparams = { params: { popupHeight: "300px" } };
	const validationRule = { required: true };
	const idRules = { required: true, number: true };
	const pageSettings: PageSettingsModel = { pageCount: 5, pageSizes: true  };
	const commands: CommandModel[] = [{ type: "Edit", buttonOption: { iconCss: " e-icons e-edit", cssClass: "e-flat" } },
		{ type: "Delete", buttonOption: { iconCss: "e-icons e-delete", cssClass: "e-flat" } },
		{ type: "Save", buttonOption: { iconCss: "e-icons e-update", cssClass: "e-flat" } },
		{ type: "Cancel", buttonOption: { iconCss: "e-icons e-cancel-icon", cssClass: "e-flat" } }];
	return userRole === "admin" ? (
		<div className='control-pane'>
			<div className='control-section'>
				<GridComponent 
					dataSource={roomData} 
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
						<ColumnDirective field='roomId' headerText='Room ID' width='50' validationRules={idRules} isPrimaryKey={true}></ColumnDirective>
						<ColumnDirective field='name' headerText='Room Name' width='50' validationRules={validationRule}></ColumnDirective>
						<ColumnDirective field='location' headerText='Location' width='50' validationRules={validationRule}></ColumnDirective>
						<ColumnDirective field='type' headerText='Room type' width='50' editType='dropdownedit' edit={editparams}></ColumnDirective>
						<ColumnDirective field='capacity' headerText='Capacity' width='50' format='N0' editType='numericedit'></ColumnDirective>
						<ColumnDirective headerText='Manage Records' width='50' commands={commands}></ColumnDirective>
					</ColumnsDirective>
					<Inject services={[Page, Edit, DetailRow, CommandColumn,Filter, Sort, Toolbar, ColumnChooser]}/>
				</GridComponent>
			</div>
		</div>
	): (
        <div className='control-pane'>
			<div className='control-section'>
				<GridComponent 
					dataSource={roomData} 
					allowPaging={true} 
					// editSettings={editSettings} 
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
						<ColumnDirective field='roomId' headerText='Room ID' width='50' validationRules={idRules} isPrimaryKey={true}></ColumnDirective>
						<ColumnDirective field='name' headerText='Room Name' width='50' validationRules={validationRule}></ColumnDirective>
						<ColumnDirective field='location' headerText='Location' width='50' validationRules={validationRule}></ColumnDirective>
						<ColumnDirective field='type' headerText='Room type' width='50' validationRules={validationRule} editType='dropdownedit' edit={editparams}></ColumnDirective>
						<ColumnDirective field='capacity' headerText='Capacity' validationRules={validationRule} width='50' format='N0' editType='numericedit'></ColumnDirective>
					</ColumnsDirective>
					<Inject services={[Page, DetailRow,Filter, Sort, Toolbar, ColumnChooser]}/>
				</GridComponent>
			</div>
		</div>
    );
};