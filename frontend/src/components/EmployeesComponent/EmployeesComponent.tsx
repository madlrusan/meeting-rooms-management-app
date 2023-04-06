import {
	GridComponent,
	ColumnsDirective,
	ColumnDirective,
	Page,
	Toolbar,
	Edit,
	Inject,
	DetailRow,
	CommandColumn,
	Filter,
	Sort,
	ColumnChooser,
} from "@syncfusion/ej2-react-grids";
import {
	commands,
	editparams,
	editSettings,
	filterSettings,
	gridTemplate,
	idRules,
	onComplete,
	pageSettings,
	toolbarOptions,
	validationRule,
} from "./Employees.types";
import "./style.css";
import { GetEmployees } from "../../api/employees";
interface GridProps {
	// Define component props here
}
export const EmployeeComponent: React.FC<GridProps> = (props) => {
	const { data: employees } = GetEmployees();
	return (
		<div className="control-pane">
			<div className="control-section">
				<GridComponent
					dataSource={employees}
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
					// currentAction={onActionBegin}
					showColumnChooser={true}>
					<ColumnsDirective>
						<ColumnDirective
							field="employeePIN"
							headerText="PIN"
							width="40"
							validationRules={idRules}></ColumnDirective>
						<ColumnDirective
							field="employeeFirstName"
							headerText="First Name"
							width="40"
							validationRules={validationRule}></ColumnDirective>
						<ColumnDirective
							field="employeeLastName"
							headerText="Last Name"
							width="40"
							validationRules={validationRule}></ColumnDirective>
						<ColumnDirective
							headerText="Email"
							field="employeeEmail"
							width="50"></ColumnDirective>
						<ColumnDirective
							field="employeePosition"
							headerText="Position"
							width="60"
							edit={editparams}></ColumnDirective>
						<ColumnDirective
							field="employeeDepartment"
							headerText="Department"
							width="50"
							edit={editparams}></ColumnDirective>

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
							ColumnChooser,
							Toolbar,
						]}
					/>
				</GridComponent>
			</div>
		</div>
	);
};
