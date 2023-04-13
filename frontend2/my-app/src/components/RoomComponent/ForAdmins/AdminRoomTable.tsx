import {
	ColumnChooser,
	ColumnDirective,
	ColumnsDirective,
	CommandColumn,
	DetailRow,
	Edit,
	Filter,
	GridComponent,
	Inject,
	Page,
	Sort,
	Toolbar,
} from "@syncfusion/ej2-react-grids";
import React, { useRef } from "react";
import {
	commands,
	editSettings,
	editparams,
	filterSettings,
	handleActionBegin,
	onComplete,
	pageSettings,
	toolbarOptions,
	validationRule,
} from "./AdminRoomTable.types";
import { gridTemplate } from "../Room.types";
import { IRoom } from "../../../dto/models/IRooms";
type AdminRoomTableProps = {
	roomsData: IRoom[] | undefined;
};
export const AdminRoomTable = (props: AdminRoomTableProps) => {
	const { roomsData } = props;
	const gridRef = useRef<GridComponent>(null);
	return (
		<div className="control-pane">
			<div className="control-section">
				<GridComponent
					id="AdminRoomsGrid"
					ref={gridRef}
					dataSource={roomsData}
					allowPaging={true}
					editSettings={editSettings}
					pageSettings={pageSettings}
					detailTemplate={gridTemplate}
					height="400"
					allowSorting={true}
					allowFiltering={true}
					filterSettings={filterSettings}
					toolbar={toolbarOptions}
					actionComplete={onComplete}
					actionBegin={handleActionBegin}
					showColumnChooser={true}>
					<ColumnsDirective>
						<ColumnDirective
							field="roomName"
							headerText="Room Name"
							width="50"
							validationRules={validationRule}></ColumnDirective>
						<ColumnDirective
							field="roomLocation"
							headerText="Location"
							width="50"
							validationRules={validationRule}></ColumnDirective>
						<ColumnDirective
							field="roomType"
							headerText="Room type"
							width="50"
							editType="dropdownedit"
							edit={editparams}></ColumnDirective>
						<ColumnDirective
							field="roomCapacity"
							headerText="Capacity"
							width="50"
							format="N0"
							editType="numericedit"></ColumnDirective>
						<ColumnDirective
							headerText="Manage Records"
							width="50"
							commands={commands}></ColumnDirective>
					</ColumnsDirective>
					<Inject
						services={[
							Page,
							Edit,
							DetailRow,
							CommandColumn,
							Filter,
							Sort,
							Toolbar,
							ColumnChooser,
						]}
					/>
				</GridComponent>
			</div>
		</div>
	);
};
