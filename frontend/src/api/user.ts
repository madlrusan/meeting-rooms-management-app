import React, { useState } from "react";
import { BASE_URL_API } from "../components/constants";

export const LoginUser = async ({ email, password }: any) => {
	
	const response = await fetch(`${BASE_URL_API}/user/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({ email, password }),
	});
	const responseData = await response.json();
    return responseData;
};
