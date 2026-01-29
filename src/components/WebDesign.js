import React, { useEffect } from "react";
import "./styles/Standard.css";
import "./styles/WebDesign.css";
import Contact from "./Contact.js";
import { Link } from "react-router-dom";
import Still1 from "./images/framestill.png";
import Still2 from "./images/inputcapsitestill.png";
import Still3 from "./images/portfoliostill.png";

const WebDesign = ({ setNextSection }) => {
	const site1 =
		"https://portfolio-videos-current.s3.us-east-1.amazonaws.com/frameloop.mp4";
	const site2 =
		"https://portfolio-videos-current.s3.us-east-1.amazonaws.com/inputcaploop.mp4";
	const site3 =
		"https://portfolio-videos-current.s3.us-east-1.amazonaws.com/portfoliositeloop.mp4";

	const handleBackToHome = () => {
		setNextSection("Home");
	};

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
				<div className="website-parent">
					<div className="sites-container">
						<Link to="https://www.discoverframe.com/troma">
							<img src={Still1} alt="" className="sitevideo" />
						</Link>
						<Link to="https://www.inputcap.com">
							<img src={Still2} alt="" className="sitevideo" />
						</Link>
						<Link to="https://www.ariroseman.com">
							<img src={Still3} alt="" className="sitevideo" />
						</Link>
					</div>
					<div className="website-copy"></div>
				</div>
			</div>
			<div className="special-bar-container">
				<div className="onerem-bar"></div>
			</div>
			{/* <div className="contact-parent">
				<Contact />
			</div> */}
		</>
	);
};

export default WebDesign;
