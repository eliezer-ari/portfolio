import React, { useState, useEffect, useRef } from "react";
import "./styles/Standard.css";
import "./styles/Navbar.css";
import MainBG from "./images/portfoliohomebg.png";
import MainBGMobile from "./images/portfoliohomebgmobile.png";
import { ReactComponent as ArianaLogo } from "./images/ariana-roseman-logo.svg";

// Helper function to check if a file is an image
const isImageFile = (url) => {
	if (!url) return false;
	const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
	const urlLower = url.toLowerCase();
	return imageExtensions.some(ext => urlLower.includes(ext));
};

const Home = () => {
	const videoUrl = MainBG;
	const mobileVideoUrl = MainBGMobile;

	const desktopVideoRef = useRef(null);
	const [isMobile, setIsMobile] = useState(false);

	// Check if sources are images
	const isDesktopImage = isImageFile(videoUrl);
	const isMobileImage = isImageFile(mobileVideoUrl);
	const currentIsImage = isMobile ? isMobileImage : isDesktopImage;
	const currentSrc = isMobile ? mobileVideoUrl : videoUrl;

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

	// Attempt to play video when mounted or when `isMobile` changes (only for videos)
	useEffect(() => {
		if (currentIsImage) return; // Skip if it's an image
		
		const video = desktopVideoRef.current;
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
	}, [isMobile, currentIsImage]);

	const containerRef = useRef(null);

	return (
		<div className="standard-container">
			<div className="home-logo-container">
				<ArianaLogo className="home-logo-svg" />
				{/* <div className="subtitle-container">
					<span className="subtitle">Musician | Lighting Technician</span>
				</div> */}
			</div>
			{currentIsImage ? (
				<img
					src={currentSrc}
					alt="Background"
					className={isMobile ? "video-background-mobile" : "video-background"}
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover"
					}}
				/>
			) : (
				<video
					ref={desktopVideoRef}
					src={currentSrc}
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
			)}
		</div>
	);
};

export default Home;
