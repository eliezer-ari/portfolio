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
			console.log(`Starting transition from ${activeSection} to ${section}`);

			setIsTransitioning(true);
			const sectionContainer = document.querySelector(".section-container");

			if (!sectionContainer) {
				console.error("Section container not found!");
				return;
			}

			console.log("Adding transitionend listener to section container...");

			// Set up transitionend listener to update display after fade-out
			const onTransitionEnd = () => {
				console.log(
					"Fade-out animation ended. Attempting to scroll to the top..."
				);

				console.log("Fade-out animation ended. Scrolling instantly...");
				sectionContainer.scrollTop = 0; // Instantly scroll container to top
				console.log(
					"SectionContainer scrolled to:",
					sectionContainer.scrollTop
				);

				window.scrollTo({ top: 0, left: 0, behavior: "instant" });
				console.log("Window scrolled to the top.");

				console.log("Switching to the new section...");
				setVisibleSection(section);
				setActiveSection(section);

				// Start fade-in animation
				sectionContainer.classList.remove("fade-out");
				sectionContainer.classList.add("fade-in");

				// End the transition
				console.log("Setting transition state to false...");
				setIsTransitioning(false);

				// Save the new section in sessionStorage
				console.log(`Saving active section '${section}' to sessionStorage.`);
				window.location.hash = section;
				sessionStorage.setItem("lastActiveSection", section);

				// Remove the event listener
				sectionContainer.removeEventListener("transitionend", onTransitionEnd);
				console.log("Removed transitionend listener.");
			};

			// Attach listener and initiate transition
			sectionContainer.addEventListener("transitionend", onTransitionEnd);

			// Start fade-out animation
			console.log("Starting fade-out animation...");
			sectionContainer.classList.add("fade-out");
			sectionContainer.classList.remove("fade-in");
		} else {
			console.log(`Section '${section}' is already active. No action needed.`);
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

	// Set the actual viewport height on mobile devices
	function setVhProperty() {
		const vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	}

	// Initial setting and on resize
	setVhProperty();
	window.addEventListener("resize", setVhProperty);

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
