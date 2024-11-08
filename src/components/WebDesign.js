import React, { useEffect } from "react";
import "./styles/Standard.css";
import "./styles/WebDesign.css";
import Contact from "./Contact.js";

const WebDesign = ({ setNextSection }) => {
	const handleBackToHome = () => {
		setNextSection("Home");
	};

	return (
		<>
			<div className="standard-container">
				<div className="back-arrow-container">
					<button
						style={{ transform: "rotate(270deg) translateX(-8px)" }}
						className="arrow-button"
						onClick={handleBackToHome}
					>
						&#x2303;
					</button>
				</div>
				<div className="website-copy">
					<h1>Responsive websites coded in React JS.</h1>
				</div>
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
					src="http://localhost:3000/#Lighting"
				></iframe>
			</div>

			<div className="standard-container">
				<Contact />
			</div>
		</>
	);
};

export default WebDesign;
