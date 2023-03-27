import React, { useContext, useEffect } from "react";
import "./App.css";
import { Login } from "./pages/Login/Login";
import {
	Routes,
	Route
} from "react-router-dom";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Scheduler } from "./pages/Scheduler/Scheduler";
import { Rooms } from "./pages/Rooms/Rooms";
import { Employees } from "./pages/Employees/Employee";
import { Map } from "./pages/Map/Map";
import { UserContext } from "./context/userContext";
const App = () => {
    const {userRole, setUserRole} = useContext(UserContext);
    useEffect(()=>{
       const role = localStorage.getItem("role");
       if(role) setUserRole(role);
    },[localStorage]);
	return (
		<Routes>
			<Route path="/" element={<Login  />} />

			<Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
			<Route path="/scheduler" element={<Scheduler userRole={userRole} />} />
			<Route path="/rooms" element={<Rooms userRole={userRole} />} />
			<Route path="/employees" element={<Employees userRole={userRole} />} />
			<Route path="/map" element={<Map userRole={userRole}  />} />
		</Routes>

	);
};

export default App;
