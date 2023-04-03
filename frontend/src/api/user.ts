import React from "react";
import { BASE_URL_API } from "../components/constants";

export const loginUser = async ({email, password}: any)=>{
    const response = fetch(`${BASE_URL_API}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({email, password})
    });
    const data = (await response).json();
    return data;
}