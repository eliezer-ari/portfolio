import React, { useRef } from "react";
import "./styles/Navbar.css";

const NavbarMobile = ({ setActiveSection, activeSection }) => {
	const menuRef = useRef(null);

	const handleLinkClick = (section) => {
		setActiveSection(section);
	};

	return (
		<nav
			className={`navbar-lower ${
				activeSection === "Home" ? "slide-in" : "slide-out"
			}`}
		>
			{activeSection === "Home" && (
				// Menu for the Home section
				<div
					className={`navbarmobilecontainer open ${
						activeSection === "Home" ? "slide-in" : "slide-out"
					}`}
					ref={menuRef}
				>
					<ul className="navmenu slide-in">
						<li className="navitem">
							<button
								className="navlinks"
								onClick={() => handleLinkClick("Lighting")}
							>
								Lighting
							</button>
						</li>
						<li className="navitem">
							<button
								className="navlinks"
								onClick={() => handleLinkClick("Cinematography")}
							>
								Cinematography
							</button>
						</li>
						<li className="navitem">
							<button
								className="navlinks"
								onClick={() => handleLinkClick("VFX")}
							>
								VFX
							</button>
						</li>
						<li className="navitem">
							<button
								className="navlinks"
								onClick={() => handleLinkClick("Graphics")}
							>
								Graphics
							</button>
						</li>
						<li className="navitem">
							<button
								className="navlinks"
								onClick={() => handleLinkClick("WebDesign")}
							>
								Web Design
							</button>
						</li>
						<li className="navitem">
							<button
								className="navlinks"
								onClick={() => handleLinkClick("Music")}
							>
								Music
							</button>
						</li>
					</ul>
				</div>
			)}
		</nav>
	);
};

export default NavbarMobile;
