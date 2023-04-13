import { IEmployee } from "../../../dto/models/IEmployee";

export interface IDialogModel {
	employeeId?: string;
	employeeFirstName: string;
	employeeLastName: string;
	employeePIN: number;
	employeePosition: string;
	employeeDepartment: string;
	employeeEmail: string;
	isAdd?: boolean;
	isEdit?: boolean;
	employeePassword?: string;
}
