import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./MainRouter";
import "./App.css";
export default function App() {
	return (
		<>		
					<Router>
						<MainRouter />
					</Router>
	
		</>
	);
}
