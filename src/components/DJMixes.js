import React from "react";
import "./styles/Standard.css";
import AudioPlayer from "./AudioPlayer";
import Contact from "./Contact";
import CadmiumRed from "./images/cadmium red 2026-01-22 0851.flac";

const DJMixes = ({ setNextSection, activeSection }) => {
	return (
		<>
			<div className="music-container">
				<div className="back-arrow-container">
				</div>
				<div className="player">
					<AudioPlayer 
						src={CadmiumRed}
						title="Verdigris"
						artist="ARIANA ROSEMAN"
					/>
				</div>
			</div>
			{/* <div className="special-bar-container">
				<div className="onerem-bar"></div>
			</div> */}
			{/* <div className="contact-parent">
				<Contact />
			</div> */}
		</>
	);
};

export default DJMixes;
