import React, { useState, useEffect } from "react";
import Logo from "./images/namelogo.png";
import "./styles/Navbar.css";

const Navbar = ({ setActiveSection, triggerRef }) => {
	const [activeLink, setActiveLink] = useState(null);
	const [logoHidden, setLogoHidden] = useState(false); // Logo visible by default
	let hideTimer = null;

	const handleLinkClick = (section) => {
		setActiveSection(section);
		setActiveLink(section);
	};

	useEffect(() => {
		// Function to handle visibility change
		const handleVisibilityChange = (entries) => {
			const entry = entries[0];

			if (!entry.isIntersecting) {
				// Start a timer when `triggerRef` is out of view
				hideTimer = setTimeout(() => {
					setLogoHidden(true);
					console.log("Logo hidden after 200ms out of view");
				}, 200);
			} else {
				// Clear timer if `triggerRef` becomes visible again within 500ms
				clearTimeout(hideTimer);
				setLogoHidden(false);
				console.log("Logo remains visible");
			}
		};

		// Initial visibility check
		if (triggerRef?.current) {
			const rect = triggerRef.current.getBoundingClientRect();
			const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
			setLogoHidden(!isVisible);
			console.log("Initial visibility of triggerRef:", isVisible); // Debugging
		}

		// Set up Intersection Observer to monitor visibility changes
		const observer = new IntersectionObserver(handleVisibilityChange, {
			threshold: 0.1,
		});

		if (triggerRef?.current) {
			observer.observe(triggerRef.current);
			console.log("Observer set up on triggerRef"); // Debugging
		}

		// Cleanup observer and timer on component unmount or triggerRef change
		return () => {
			if (observer && triggerRef?.current) {
				observer.unobserve(triggerRef.current);
			}
			clearTimeout(hideTimer);
		};
	}, [triggerRef]);

	return (
		<nav className="navbar">
			<div className="logospacer">
				<div className={`logocontainer ${logoHidden ? "hide-logo" : ""}`}>
					<button
						className={`navlinkspecial ${
							activeLink === "Home" ? "active" : ""
						}`}
						onClick={() => handleLinkClick("Home")}
					>
						<img src={Logo} alt="RDS Logo" className="navbarlogo" />
					</button>
				</div>
			</div>
			<div className="navbarcontainer">
				<ul className="navmenu">
					<li className="navitem">
						<button
							className={`navlinks ${
								activeLink === "Lighting" ? "active" : ""
							}`}
							onClick={() => handleLinkClick("Lighting")}
						>
							Lighting
						</button>
					</li>
					<li className="navitem">
						<button
							className={`navlinks ${
								activeLink === "Cinematography" ? "active" : ""
							}`}
							onClick={() => handleLinkClick("Cinematography")}
						>
							Cinematography
						</button>
					</li>
					<li className="navitem">
						<button
							className={`navlinks ${activeLink === "VFX" ? "active" : ""}`}
							onClick={() => handleLinkClick("VFX")}
						>
							VFX
						</button>
					</li>
					<li className="navitem">
						<button
							className={`navlinks ${
								activeLink === "Graphics" ? "active" : ""
							}`}
							onClick={() => handleLinkClick("Graphics")}
						>
							Graphics
						</button>
					</li>
					<li className="navitem">
						<button
							className={`navlinks ${
								activeLink === "WebDesign" ? "active" : ""
							}`}
							onClick={() => handleLinkClick("WebDesign")}
						>
							Web Design
						</button>
					</li>
					<li className="navitem">
						<button
							className={`navlinks ${activeLink === "Music" ? "active" : ""}`}
							onClick={() => handleLinkClick("Music")}
						>
							Music
						</button>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
