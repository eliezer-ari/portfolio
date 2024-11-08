import React, { useState, useEffect, useRef } from "react";
import "./styles/Standard.css";
import "./styles/WebDesign.css";
import Contact from "./Contact.js";

const WebDesign = ({ setNextSection }) => {
	// Function to handle back to home navigation with animation
	const handleBackToHome = () => {
		setNextSection("Home"); // Set nextSection to "Home" to trigger the animation
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

				<div className="arrow-container">
					<div
						style={{
							transform: "rotate(180deg) translateY(-3px)",
						}}
						className="down-arrow"
					>
						&#x2303;
					</div>
				</div>
			</div>

			<div className="standard-container">
				<Contact />
			</div>
		</>
	);
};

export default WebDesign;
