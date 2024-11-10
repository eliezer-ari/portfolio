import React, { useState, useEffect, useRef } from "react";
import "./styles/Standard.css";
import AudioPlayer from "./AudioPlayer";
import Contact from "./Contact";

const Music = ({ setNextSection }) => {
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
				<div className="player">
					<AudioPlayer />
				</div>
			</div>
			<div className="contact-parent">
				<Contact />
			</div>
		</>
	);
};

export default Music;
