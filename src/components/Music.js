import React from "react";
import "./styles/Standard.css";
import AudioPlayer from "./AudioPlayer";
import Contact from "./Contact";

const Variation22 = "https://portfoliomusic.s3.us-east-1.amazonaws.com/variation+2.2+2026-01-29+1707.flac";

const Music = ({ setNextSection, activeSection }) => {
	return (
		<>
			<div className="music-container">
				<div className="back-arrow-container">
				</div>
				<div className="player">
					<AudioPlayer 
						src={Variation22}
						title="Variation 2.2"
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

export default Music;
