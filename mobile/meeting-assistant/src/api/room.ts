import { BASE_URL_API, ROOM_ENDPOINTS } from "../dto/constants";
import axios from "axios";
export const LoginRoom = async ({ email, password }: any) => {
	try {
		const response = await axios.post(
			BASE_URL_API + ROOM_ENDPOINTS.login,
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ email, password }),
			},
			{ timeout: 5000 }
		);
		const responseData = response.data;
		console.log(responseData);
		return responseData;
	} catch (error) {
		console.error(error);
		throw error;
	}
};