import React, { useEffect } from "react";
import "./styles/Standard.css";
import "./styles/WebDesign.css";
import Contact from "./Contact.js";
import { Link } from "react-router-dom";
import Still from "./images/inputcapsitestill.png";

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
							<video
								className="sitevideo"
								src={site1}
								autoPlay
								loop
								muted
								playsInline
								preload="auto"
							/>
						</Link>
						<Link to="https://www.inputcap.com">
							<img src={Still} alt="" className="sitevideo" />
						</Link>
						<Link to="https://www.ariroseman.com">
							<video
								className="sitevideo"
								src={site3}
								autoPlay
								loop
								muted
								playsInline
								preload="auto"
							/>
						</Link>
					</div>
					<div className="website-copy">
						<h1>Responsive websites coded in React JS.</h1>
					</div>
				</div>
			</div>

			<div className="standard-container">
				<Contact />
			</div>
		</>
	);
};

export default WebDesign;
