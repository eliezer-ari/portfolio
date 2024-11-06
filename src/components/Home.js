import React from "react";
import "./styles/Standard.css";
import CinemaLoop from "./images/cinematographyloop.mp4";
import { Storage } from "aws-amplify";

export default function Home() {
	const [videoUrl, setVideoUrl] = useState(null);

	useEffect(() => {
		// Fetch the secure URL from S3
		Storage.get("portfolio-videos-current/lightingloop.mp4", {
			level: "protected",
		}) // 'protected' if it's user-specific, or 'public' if accessible to all authenticated users
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
