import React, { useState, useEffect } from "react";
import "./styles/Hero.css";
import "./styles/Standard.css";
import Navbar from "./Navbar.js";
import WebDesign from "./WebDesign.js";
import VFX from "./VFX.js";
import Videography from "./Videography.js";
import Lighting from "./Lighting.js";
import Music from "./Music.js";
import Graphics from "./Graphics.js";
import Cinematography from "./Cinematography.js";
import Home from "./Home.js";

export default function Hero() {
	const [activeSection, setActiveSection] = useState("Home");
	const [nextSection, setNextSection] = useState(null); // Holds the new section temporarily
	const [showSection, setShowSection] = useState(true);

	useEffect(() => {
		// Check for hash fragment in the URL on component mount
		const hash = window.location.hash.replace("#", ""); // Remove "#" symbol

		if (hash) {
			setActiveSection(hash); // Set section based on hash fragment
		}
	}, []);

	useEffect(() => {
		if (nextSection !== null) {
			// Start slide-out animation for the current section
			setShowSection(false);

			// After the slide-out animation, update the section
			const slideOutTimeout = setTimeout(() => {
				setActiveSection(nextSection);
				setShowSection(true); // Start slide-in animation for the new section
				setNextSection(null); // Clear nextSection
			}, 500); // Match this delay with slide-out animation duration in CSS

			return () => clearTimeout(slideOutTimeout);
		}
	}, [nextSection]);

	const handleSectionChange = (section) => {
		setNextSection(section);
	};

	const renderSection = () => {
		switch (activeSection) {
			case "Home":
				return <Home />;
			case "Cinematography":
				return <Cinematography />;
			case "Videography":
				return <Videography />;
			case "Lighting":
				return <Lighting />;
			case "VFX":
				return <VFX />;
			case "Graphics":
				return <Graphics />;
			case "WebDesign":
				return <WebDesign />;
			case "Music":
				return <Music />;
			default:
				return null;
		}
	};

	return (
		<div id="hero" className="herocontainer">
			<div id="page-container" className="page-container">
				<div
					className={`section-container ${
						showSection ? "slide-in" : "slide-out"
					}`}
				>
					{renderSection()}
				</div>
			</div>
			<div className="navreplacement">
				<Navbar setActiveSection={handleSectionChange} />
			</div>
		</div>
	);
}
