import React, { useState, useEffect, useRef } from "react";
import "./styles/Hero.css";
import Navbar from "./Navbar.js";
import NavbarMobile from "./NavbarMobile.js";
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
	const containerRef = useRef(null);
	const [triggerRef, setTriggerRef] = useState(null); // State to hold trigger reference from each page

	useEffect(() => {
		// Debugging log to confirm triggerRef is set in Hero
		console.log("Updated triggerRef in Hero:", triggerRef);
	}, [triggerRef]);

	// Set initial section based on URL hash
	useEffect(() => {
		const hash = window.location.hash.replace("#", "");
		if (hash) {
			setActiveSection(hash);
		}
	}, []);

	// Handle section transition with slide effects
	useEffect(() => {
		if (nextSection !== null) {
			setShowSection(false); // Start slide-out effect
			const slideOutTimeout = setTimeout(() => {
				setActiveSection(nextSection);
				window.location.hash = nextSection;
				setShowSection(true); // Trigger slide-in effect
				setNextSection(null);
				if (containerRef.current) {
					containerRef.current.scrollTop = 0;
				}
			}, 500);
			return () => clearTimeout(slideOutTimeout);
		}
	}, [nextSection]);

	// Update the next section to trigger the slide effect
	const handleSectionChange = (section) => {
		setNextSection(section);
	};

	// Render the active section component
	const renderSection = () => {
		switch (activeSection) {
			case "Home":
				return (
					<Home setNextSection={setNextSection} setTriggerRef={setTriggerRef} />
				);
			case "Cinematography":
				return (
					<Cinematography
						setNextSection={setNextSection}
						setTriggerRef={setTriggerRef}
					/>
				);
			case "Videography":
				return (
					<Videography
						setNextSection={setNextSection}
						setTriggerRef={setTriggerRef}
					/>
				);
			case "Lighting":
				return (
					<Lighting
						setNextSection={setNextSection}
						setTriggerRef={setTriggerRef}
					/>
				);
			case "VFX":
				return (
					<VFX setNextSection={setNextSection} setTriggerRef={setTriggerRef} />
				);
			case "Graphics":
				return (
					<Graphics
						setNextSection={setNextSection}
						setTriggerRef={setTriggerRef}
					/>
				);
			case "WebDesign":
				return (
					<WebDesign
						setNextSection={setNextSection}
						setTriggerRef={setTriggerRef}
					/>
				);
			case "Music":
				return (
					<Music
						setNextSection={setNextSection}
						setTriggerRef={setTriggerRef}
					/>
				);
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
				<Navbar
					setActiveSection={handleSectionChange}
					triggerRef={triggerRef}
				/>
			</div>
			<div
				className={`navreplacementmobile ${
					activeSection === "Home" ? "slide-in" : "slide-out"
				}`}
			>
				<NavbarMobile
					setActiveSection={handleSectionChange}
					activeSection={activeSection}
					triggerRef={triggerRef}
				/>
			</div>
		</div>
	);
}
