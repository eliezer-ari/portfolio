import React from "react";
import "./styles/Standard.css";
import CinemaLoop from "./images/cinematographyloop.mp4";

export default function Cinematography() {
	return (
		<>
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
				<div className="overlay-content">{/* <h1>Section 1</h1> */}</div>
			</div>
			<div className="standard-container">
				<div className="overlay-content">
					<h1>Section 2</h1>
				</div>
			</div>

			{/* Add additional sections as needed */}
		</>
	);
}
