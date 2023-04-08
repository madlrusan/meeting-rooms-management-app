import { useRef } from "react";
import { IRoom } from "../../../dto/models/IRooms";
import {
    ColumnChooser,
	ColumnDirective,
	ColumnsDirective,
	CommandColumn,
	DetailRow,
	Filter,
	GridComponent,
    Inject,
    Page,
    Sort,
    Toolbar,
} from "@syncfusion/ej2-react-grids";
import { gridTemplate } from "../Room.types";
import { filterSettings, pageSettings, toolbarOptions } from "./UserRoomTable.types";
type UserRoomTableProps = {
	roomsData: IRoom[] | undefined;
};
export const UserRoomTable = (props: UserRoomTableProps) => {
	const { roomsData } = props;
	const gridRef = useRef<GridComponent>(null);
	return (
		<div className="control-pane">
			<div className="control-section">
				<GridComponent
					id="UserRoomsGrid"
					ref={gridRef}
					dataSource={roomsData}
					allowPaging={true}
					pageSettings={pageSettings}
					detailTemplate={gridTemplate}
					height="400"
					allowSorting={true}
					allowFiltering={true}
					filterSettings={filterSettings}
					toolbar={toolbarOptions}
					showColumnChooser={true}>
					<ColumnsDirective>
						<ColumnDirective
							field="roomName"
							headerText="Room Name"
							width="50"></ColumnDirective>
						<ColumnDirective
							field="roomLocation"
							headerText="Location"
							width="50"></ColumnDirective>
						<ColumnDirective
							field="roomType"
							headerText="Room type"
							width="50"></ColumnDirective>
						<ColumnDirective
							field="roomCapacity"
							headerText="Capacity"
							width="50"
							format="N0"></ColumnDirective>
					</ColumnsDirective>
					<Inject
						services={[
							Page,
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
