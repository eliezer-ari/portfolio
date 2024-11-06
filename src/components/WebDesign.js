import React from "react";
import "./styles/Standard.css";
import "./styles/WebDesign.css";

export default function WebDesign() {
	return (
		<>
			<div className="standard-container">
				<iframe
					id="site1"
					title="frame"
					className="site1"
					src="https://www.discoverframe.com/troma/"
				></iframe>
				<iframe
					id="site2"
					title="inputcap"
					className="site2"
					src="http://www.inputcap.com/"
				></iframe>
				<iframe
					id="site3"
					title="thiswebsite"
					className="site3"
					src="http://localhost:3000/"
				></iframe>
			</div>

			<div className="standard-container">
				<h1>Contact Form Here</h1>
			</div>
		</>
	);
}
