import React, { useState, useEffect } from "react";
import "./styles/Standard.css";
import CinemaLoop from "./images/cinematographyloop.mp4";
import { getUrl } from "@aws-amplify/storage";

export default function Home() {
	const [videoUrl, setVideoUrl] = useState(null);

	useEffect(() => {
		// Fetch the secure URL from S3 using getUrl
		getUrl("portfolio-videos-current/lightingloop.mp4", { level: "protected" })
			.then((url) => setVideoUrl(url))
			.catch((err) => console.log("Error fetching video URL:", err));
	}, []);

	return (
		<div className="standard-container">
			<div className="video-container">
				<video
					src={videoUrl}
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
