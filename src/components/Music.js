import React, { useState, useEffect, useRef } from "react";
import "./styles/Standard.css";
import AudioPlayer from "./AudioPlayer";
import Contact from "./Contact";

const Music = ({ setNextSection, setTriggerRef }) => {
	const triggerRef = useRef(null);

	// Function to handle back to home navigation with animation
	const handleBackToHome = () => {
		setNextSection("Home"); // Set nextSection to "Home" to trigger the animation
	};

	useEffect(() => {
		// Set the trigger reference when the component mounts
		if (setTriggerRef) {
			setTriggerRef(triggerRef);
			console.log("triggerRef set in Home:", triggerRef); // Debugging log
		}
	}, [setTriggerRef]);
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
				<div className="trigger-container">
					<div ref={triggerRef} className="trigger"></div>{" "}
				</div>
				<div className="player">
					<AudioPlayer />
				</div>
			</div>
			<div className="standard-container">
				<Contact />
			</div>
		</>
	);
};

export default Music;
