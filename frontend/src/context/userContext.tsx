import React, { createContext, useState } from "react";
export const UserContext = createContext({
    userRole: "",
    setUserRole: (userRole: string) => {},
    userFullName: "",
    setUserFullName: (userFullName: string) => {},
});

const UserContextProvider = (props: any) => {
    const [userRole, setUserRole] = useState("");
    const [userFullName, setUserFullName] = useState("");
    return (
        <UserContext.Provider value={{userRole, setUserRole, userFullName, setUserFullName}}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;