import React, { useState } from "react";
import { BASE_URL_API, USER_ENDPOINTS } from "../dto/constants";

export const LoginUser = async ({ email, password }: any) => {
	const response = await fetch(`${BASE_URL_API}${USER_ENDPOINTS.login}`, {
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

export const UpdatePassword = async (password : string) => {
	const id = localStorage.getItem("sub");
	const response = await fetch(`${BASE_URL_API}${USER_ENDPOINTS.updateUserPassowrd}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + localStorage.getItem("token"),
		},
		body: JSON.stringify({ id, password }),
	});
	const responseData = await response.json();
	return responseData;
}