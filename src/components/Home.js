import React, { useState, useEffect, useRef } from "react";
import "./styles/Standard.css";
import "./styles/Navbar.css";

import CinemaLoop from "./images/cinematographyloop.mp4";
import { getUrl } from "@aws-amplify/storage";

const Home = ({ setActiveSection, setTriggerRef }) => {
	const triggerRef = useRef(null);

	useEffect(() => {
		// Set the trigger reference when the component mounts
		if (setTriggerRef) {
			setTriggerRef(triggerRef);
			console.log("triggerRef set in Home:", triggerRef); // Debugging log
		}
	}, [setTriggerRef]);

	const videoUrl =
		"https://portfolio-videos-current.s3.us-east-1.amazonaws.com/homereeldesktop.mp4";

	const mobileVideoUrl =
		"https://portfolio-videos-current.s3.us-east-1.amazonaws.com/homereelmobile.mp4";

	const [activeLink, setActiveLink] = useState(null);
	const [menuOpen, setMenuOpen] = useState(false); // New state to track menu visibility

	const handleLinkClick = (section) => {
		setActiveSection(section);
		setActiveLink(section);
		setMenuOpen(false); // Close the menu after selecting a section
	};

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<div className="standard-container">
			<div className="trigger-container">
				<div ref={triggerRef} className="trigger"></div>{" "}
			</div>
			<div className="video-container">
				<video
					src={videoUrl}
					autoPlay
					loop
					muted
					playsInline
					className="video-background"
				/>
				<video
					src={mobileVideoUrl}
					autoPlay
					loop
					muted
					playsInline
					className="video-background-mobile"
				/>
			</div>
		</div>
	);
};

export default Home;
