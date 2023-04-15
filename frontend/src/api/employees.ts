import { useQuery, UseQueryResult } from "react-query";
import { BASE_URL_API, USER_ENDPOINTS } from "../dto/constants";
import { IDialogModel } from "../components/EmployeesComponent/DialogTemplate/DialogTemplate.types";
import { IEmployee } from "../dto/models/IEmployee";

export function GetEmployees() {
	return useQuery<IEmployee[]>("allEmployees", async () => {
		const response = await fetch(
			`${BASE_URL_API}${USER_ENDPOINTS.getAllUsers}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch users");
		}
		const employees = await response.json();
		// Map employees to IEmployee interface
		return employees.map((employee: any) => ({
			employeeId: employee.id,
			employeeFirstName: employee.firstName,
			employeeLastName: employee.lastName,
			employeePIN: employee.pin,
			employeePosition: employee.position,
			employeeDepartment: employee.departament,
			employeeEmail: employee.email,
			employeeAvatar:
				"https://robohash.org/maioresetnisi.png?size=50x50&set=set1",
		}));
	});
}

export const AddEmployee = async (newEmployee: IEmployee) => {
	const body = {
		firstName: newEmployee.employeeFirstName,
		lastName: newEmployee.employeeLastName,
		email: newEmployee.employeeEmail,
		password: newEmployee.employeePassword,
		pin: newEmployee.employeePIN,
		departament: newEmployee.employeeDepartment,
		position: newEmployee.employeePosition,
	};
	const response = await fetch(`${BASE_URL_API}${USER_ENDPOINTS.addUser}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
	const responseData = await response.json();
	return responseData;
};

export const UpdateEmployee = async (employee: IEmployee) => {
	const body = {
		id: employee.employeeId,
		firstName: employee.employeeFirstName,
		lastName: employee.employeeLastName,
		email: employee.employeeEmail,
		pin: employee.employeePIN,
		departament: employee.employeeDepartment,
		position: employee.employeePosition,
	};
	const response = await fetch(`${BASE_URL_API}${USER_ENDPOINTS.updateUser}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
		body: JSON.stringify(body),
	});
	const responseData = await response.json();
	return responseData;
};

export const DeleteEmployee = async (employee: IEmployee) => {
	const body = {
		id: employee.employeeId,
	};
	const response = await fetch(`${BASE_URL_API}${USER_ENDPOINTS.deleteUser}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
		body: JSON.stringify(body),
	});
	const responseData = await response.json();
	return responseData;
};
export const GetUserById = async (id: string) => {
	const response = await fetch(
		`${BASE_URL_API}${USER_ENDPOINTS.getUserById}?Id=${id}`,
		{
			method: "GET",
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		}
	);
	if (!response.ok) {
		throw new Error("Failed to fetch users");
	}
	const employee = await response.json();
	return employee;
};
