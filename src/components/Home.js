import React, { useState, useEffect, useRef } from "react";
import "./styles/Standard.css";
import "./styles/Navbar.css";

const Home = () => {
	const videoUrl =
		"https://portfolio-videos-current.s3.us-east-1.amazonaws.com/homereeldesktop.mp4";
	const mobileVideoUrl =
		"https://portfolio-videos-current.s3.us-east-1.amazonaws.com/homereelmobile.mp4";

	const desktopVideoRef = useRef(null);
	const [isMobile, setIsMobile] = useState(false);
	const videoRef = useRef(null);

	// Check if it's mobile or desktop
	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 960px)");
		setIsMobile(mediaQuery.matches);

		const handleMediaChange = (e) => {
			setIsMobile(e.matches);
			console.log("Media change detected:", e.matches);
		};

		mediaQuery.addEventListener("change", handleMediaChange);
		return () => mediaQuery.removeEventListener("change", handleMediaChange);
	}, []);

	// Attempt to play video when mounted or when `isMobile` changes
	useEffect(() => {
		const video = videoRef.current;
		if (video) {
			console.log("Attempting to play video directly on mount/change.");

			video
				.play()
				.then(() => {
					console.log("Video playback successful.");
					// Check dimensions and visibility
					const rect = video.getBoundingClientRect();
					console.log("Video dimensions:", rect.width, "x", rect.height);
					console.log(
						"Video is visible:",
						rect.width > 0 &&
							rect.height > 0 &&
							rect.top >= 0 &&
							rect.bottom <= window.innerHeight
					);
				})
				.catch((error) => {
					console.error("Video playback failed:", error);
				});
		} else {
			console.log("Video ref is not available.");
		}
	}, [isMobile]);

	return (
		<div className="standard-container">
			<video
				ref={desktopVideoRef}
				src={isMobile ? mobileVideoUrl : videoUrl}
				autoPlay
				loop
				muted
				playsInline
				preload="auto"
				className={isMobile ? "video-background-mobile" : "video-background"}
				onCanPlay={() => console.log("Video can play")}
				onLoadedData={() => console.log("Video data loaded")}
				onPlay={() => console.log("Video is playing")}
				onError={(e) => console.error("Video error:", e)}
			/>
		</div>
	);
};

export default Home;
