import React, { createContext, useState } from "react";
export const UserContext = createContext({
	userRole: "",
	setUserRole: (userRole: string) => {},
});

const UserContextProvider = (props: any) => {
	const [userRole, setUserRole] = useState("");
	return (
		<UserContext.Provider value={{ userRole, setUserRole }}>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
