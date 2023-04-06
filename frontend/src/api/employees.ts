import { useQuery, UseQueryResult } from "react-query";
import { BASE_URL_API } from "../components/common/constants";
import { IDialogModel } from "../components/EmployeesComponent/DialogTemplate/DialogTemplate.types";
import { IEmployee, RegisterEmployeeModel } from "../dto/models/IEmployee";

export function GetEmployees() {
	return useQuery<IEmployee[]>("allEmployees", async () => {
		const response = await fetch(`${BASE_URL_API}/user/auth/getAllUsers`);
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

export const AddEmployee = async (newEmployee: RegisterEmployeeModel) => {
	const response = await fetch(`${BASE_URL_API}/user/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newEmployee),
	});
	const responseData = await response.json();
	return responseData;
};
