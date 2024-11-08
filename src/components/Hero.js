import React, { useState, useEffect } from "react";
import "./styles/Hero.css";
import Navbar from "./Navbar.js";
import NavbarMobile from "./NavbarMobile.js";
import WebDesign from "./WebDesign.js";
import VFX from "./VFX.js";
import Lighting from "./Lighting.js";
import Music from "./Music.js";
import Graphics from "./Graphics.js";
import Cinematography from "./Cinematography.js";
import Home from "./Home.js";

export default function Hero() {
	const [activeSection, setActiveSection] = useState("Home");
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [visibleSection, setVisibleSection] = useState("Home");

	const handleSectionChange = (section) => {
		if (section !== activeSection) {
			setIsTransitioning(true);
			const sectionContainer = document.querySelector(".section-container");

			// Set up transitionend listener to update display after fade-out
			const onTransitionEnd = () => {
				setVisibleSection(section);
				setActiveSection(section);
				setIsTransitioning(false);
				window.location.hash = section;
				sessionStorage.setItem("lastActiveSection", section);
				sectionContainer.removeEventListener("transitionend", onTransitionEnd);
			};

			// Attach listener and initiate transition
			sectionContainer.addEventListener("transitionend", onTransitionEnd);
		}
	};

	// Function to set the next section, used by back button in `Lighting`
	const setNextSection = (section) => {
		handleSectionChange(section);
	};

	const [isNavMobileVisible, setIsNavMobileVisible] = useState(true);

	// Manage visibility of the mobile nav
	useEffect(() => {
		if (activeSection === "Home") {
			setIsNavMobileVisible(true);
		} else {
			setTimeout(() => setIsNavMobileVisible(false), 500);
		}
	}, [activeSection]);

	// Set initial section based on sessionStorage or hash in URL
	useEffect(() => {
		const savedSection = sessionStorage.getItem("lastActiveSection");
		const initialSection =
			window.location.hash.replace("#", "") || savedSection || "Home";
		setActiveSection(initialSection);
	}, []);

	const renderSection = () => {
		switch (activeSection) {
			case "Cinematography":
				return <Cinematography setNextSection={setNextSection} />;

			case "Lighting":
				return <Lighting setNextSection={setNextSection} />; // Pass setNextSection
			case "VFX":
				return <VFX setNextSection={setNextSection} />;
			case "Graphics":
				return <Graphics setNextSection={setNextSection} />;
			case "WebDesign":
				return <WebDesign setNextSection={setNextSection} />;
			case "Music":
				return <Music setNextSection={setNextSection} />;
			default:
				return <Home />;
		}
	};

	return (
		<div id="hero" className="herocontainer">
			<div id="page-container" className="page-container">
				<div
					className={`section-container ${
						isTransitioning ? "fade-out" : "fade-in"
					}`}
				>
					{renderSection(activeSection)}
				</div>
			</div>
			<div className="navreplacement">
				<Navbar
					setActiveSection={handleSectionChange}
					activeSection={activeSection}
				/>
			</div>
			{isNavMobileVisible && (
				<div
					className={`navreplacementmobile ${
						activeSection === "Home" ? "fade-in" : "fade-out"
					}`}
				>
					<NavbarMobile
						setActiveSection={handleSectionChange}
						activeSection={activeSection}
					/>
				</div>
			)}
		</div>
	);
}
