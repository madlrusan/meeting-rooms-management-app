import { useQuery, UseQueryResult } from "react-query";
import { BASE_URL_API } from "../components/constants";
import { IEmployee } from "../dto/models/IEmployee";

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
