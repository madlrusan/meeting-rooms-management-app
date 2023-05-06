import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL_API, USER_ENDPOINTS } from "../dto/constants";

export const GetUserById = async (id: string) => {
	const response = await fetch(
		`${BASE_URL_API}${USER_ENDPOINTS.getUserById}?Id=${id}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + AsyncStorage.getItem("token"),
			},
		}
	);
	if (!response.ok) {
		throw new Error("Failed to fetch users");
	}
	const employee = await response.json();
	return employee;
};
