import "./App.css";
import { Login } from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import { WholeWindow } from "./pages/UniversalPage";
import { registerLicense } from "@syncfusion/ej2-base";
import { LICENSE_KEY } from "./utils/syncFusionKey";
import React from "react";
registerLicense(LICENSE_KEY);
const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/dashboard" element={<WholeWindow />} />
			<Route path="/scheduler" element={<WholeWindow />} />
			<Route path="/rooms" element={<WholeWindow />} />
			<Route path="/employees" element={<WholeWindow />} />
		</Routes>
	);
};

export default App;
