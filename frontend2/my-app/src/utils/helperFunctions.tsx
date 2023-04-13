import jwt_decode from "jwt-decode";

export const getInitials = (name: string) => {
	const names = name.split(" ");
	let initials = "";
	for (name in names) {
		initials += names[name].substring(0, 1).toUpperCase();
	}
	return initials;
};

export const getRandomBgColor = (string: string) => {
	let hash = 13;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return {
		sx: {
			bgcolor: color,
		},
	};
};

export const loginHelper = (token: any) => {
	localStorage.setItem("token", token);
	GetJWTData();
};

export const GetJWTData = () => {
	const token = localStorage.getItem("token");
	if (!token) return false;
	if (token) {
		const decoded: JWTDecoded = jwt_decode(token);
		if (decoded) {
			localStorage.setItem("logginUserFullName", decoded.unique_name);
			localStorage.setItem("sub", decoded.sub);
			if (decoded.role !== undefined) {
				localStorage.setItem("role", decoded.role);
			} else localStorage.setItem("role", "Admin");
		}
	}
	return true;
};

type JWTDecoded = {
	sub: string;
	email: string;
	unique_name: string;
	role: string;
};

export const getRandomHexColor = (str: string): string => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	let color = "#";
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 3)) & 0xff;
		const component = Math.floor(value * 0.8); // set minimum value to 128
		color += component.toString(16).padStart(2, "0");
	}
	return color;
};
export const convertTime = (date: Date) => {
	// Convert to ISO string
	const isoString = date.toISOString();

	// Create new Date object from the ISO string and add 3 hours
	const newDate = new Date(isoString);
	newDate.setHours(newDate.getHours() + 3);

	// Return new date as ISO string
	return newDate.toISOString();
};
