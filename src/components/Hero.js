import React, { useState, useEffect, useRef } from "react";
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
	const [nextSection, setNextSection] = useState(null);
	const [showSection, setShowSection] = useState(true);
	const containerRef = useRef(null); // Ref for the scrollable container

	useEffect(() => {
		// Check for hash fragment in the URL on component mount
		const hash = window.location.hash.replace("#", "");
		if (hash) {
			setActiveSection(hash);
		}
	}, []);

	useEffect(() => {
		if (nextSection !== null) {
			// Start slide-out animation for the current section
			setShowSection(false);

			// Update the section after slide-out animation
			const slideOutTimeout = setTimeout(() => {
				setActiveSection(nextSection);
				window.location.hash = nextSection; // Set the URL hash to the new section
				setShowSection(true); // Start slide-in animation for the new section
				setNextSection(null);
				// Scroll to the top of the container
				if (containerRef.current) {
					containerRef.current.scrollTop = 0;
				}
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
			<div id="page-container" ref={containerRef} className="page-container">
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
