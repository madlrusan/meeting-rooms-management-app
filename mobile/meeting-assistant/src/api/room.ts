import { BASE_URL_API, ROOM_ENDPOINTS } from "../dto/constants";
export const LoginRoom = async ({ email, password }: any) => {
	const response = await fetch(`${BASE_URL_API}${ROOM_ENDPOINTS.login}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({ email, password }),
	});
	const responseData = await response.json();
    // console.log(responseData);
	return responseData;
};