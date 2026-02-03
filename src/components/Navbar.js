import React, { useState } from "react";
import "./styles/Navbar.css";

const Navbar = ({ setActiveSection }) => {
	const [activeLink, setActiveLink] = useState(null);

	const handleLinkClick = (section) => {
		setActiveSection(section);
		setActiveLink(section);
	};

	return (
		<nav className="navbar">
			<div className="logospacer">
				<div className="logocontainer">
					<button
						className={`navlinkspecial ${
							activeLink === "Home" ? "active" : ""
						}`}
						onClick={() => handleLinkClick("Home")}
					>
						ARIANA ROSEMAN
					</button>
				</div>
			</div>
			<div className="navbarcontainer">
				<ul className="navmenu">
				<li className="navitem">
						<button
							className={`navlinks ${activeLink === "Music" ? "active" : ""}`}
							onClick={() => handleLinkClick("Music")}
						>
							Original Music
						</button>
					</li>
					{/* <li className="navitem">
						<button
							className={`navlinks ${activeLink === "DJMixes" ? "active" : ""}`}
							onClick={() => handleLinkClick("DJMixes")}
						>
							DJ Mixes
						</button>
					</li> */}
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
					{/* <li className="navitem">
						<button
							className={`navlinks ${
								activeLink === "Cinematography" ? "active" : ""
							}`}
							onClick={() => handleLinkClick("Cinematography")}
						>
							Cinematography
						</button>
					</li> */}
					{/* <li className="navitem">
						<button
							className={`navlinks ${activeLink === "VFX" ? "active" : ""}`}
							onClick={() => handleLinkClick("VFX")}
						>
							VFX
						</button>
					</li> */}
					{/* <li className="navitem">
						<button
							className={`navlinks ${
								activeLink === "Graphics" ? "active" : ""
							}`}
							onClick={() => handleLinkClick("Graphics")}
						>
							Graphics
						</button>
					</li> */}
				
					
					{/* <li className="navitem">
						<button
							className={`navlinks ${
								activeLink === "WebDesign" ? "active" : ""
							}`}
							onClick={() => handleLinkClick("WebDesign")}
						>
							Web Design
						</button>
					</li> */}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
