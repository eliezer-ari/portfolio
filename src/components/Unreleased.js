import React from "react";
import "./styles/Standard.css";
import AudioPlayer from "./AudioPlayer";
import CadmiumRedFLAC from "./images/cadmium red 2026-01-22 0851.flac";

// Swap these for S3 URLs once uploaded (same pattern as Music.js).
const DevotionalTrackSrc = "https://portfoliomusic.s3.us-east-1.amazonaws.com/devotional+track+(rough+mix).flac";
const DevotionalTrackFallback = "https://portfoliomusic.s3.us-east-1.amazonaws.com/devotional+track+(rough+mix).wav"; // Add a WAV/MP3 for Safari/iOS when available

const Unreleased = () => {
	return (
		<div
			className="music-container"
			style={{ backgroundColor: "#000" }}
		>
			<div className="player">
				<AudioPlayer
					src={DevotionalTrackSrc}
					fallbackSrc={DevotionalTrackFallback}
					title="Devotional Track (Rough Mix)"
					titleBadge="LOSSLESS"
					artist="Ariana Roseman"
				/>
			</div>
		</div>
	);
};

export default Unreleased;
