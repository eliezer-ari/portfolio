import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home.js";

import { Amplify } from "aws-amplify";
import { Storage } from "@aws-amplify/storage";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} exact />
			</Routes>
		</Router>
	);
}

export default App;
