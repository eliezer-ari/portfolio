import React from "react";
import "./styles/Standard.css";
import CinemaLoop from "./images/cinematographyloop.mp4";

export default function Home() {
	return (
		<div className="standard-container">
			<div className="video-container">
				<video
					src={CinemaLoop}
					autoPlay
					loop
					muted
					playsInline
					className="video-background"
				/>
			</div>
		</div>
	);
}
