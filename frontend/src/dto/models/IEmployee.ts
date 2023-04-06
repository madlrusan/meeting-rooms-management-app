export interface IEmployee {
	employeeId?: string;
	employeeFirstName: string;
	employeeLastName: string;
	employeePIN: number;
	employeePosition: string;
	employeeDepartment: string;
	employeeEmail: string;
}
export interface RegisterEmployeeModel extends IEmployee {
	employeePassword: string;
}
