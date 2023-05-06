import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetJWTData = async () => {
	const token = await AsyncStorage.getItem("token");
	if (!token) return false;
	if (token) {
		const decoded: JWTDecoded = jwt_decode(token);
		if (decoded) {
            // console.log("ss",decoded.unique_name);
			await AsyncStorage.setItem("roomName", decoded.unique_name);
			await AsyncStorage.setItem("sub", decoded.sub);
		}
		
	}
	
	return true;
};
export const loginHelper = async (token: any) => {
	await AsyncStorage.setItem("token", token);
	GetJWTData();
	
};
type JWTDecoded = {
	sub: string;
	email: string;
	unique_name: string;
};
export const getData = async (name: string) => {
	try {
		const value = await AsyncStorage.getItem(name);
		if (value !== null) {
			return value;
		}
	} catch (e) {
		console.log(e);
	}
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


export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getDate =(time: string): Date => {
  const [hours, minutes] = time.split(':');
  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);
  return date;
}