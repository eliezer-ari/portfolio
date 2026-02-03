import React, { useState, useEffect, useRef } from "react";
import "./styles/Standard.css";
import AudioPlayer from "./AudioPlayer";
import Contact from "./Contact";
import DesktopFallbackImage from "./images/desktopfallback1.png";
import MobileFallbackImage from "./images/mobilefallback1.png";

const InTheMomentFLAC = "https://portfoliomusic.s3.us-east-1.amazonaws.com/in+the+moment+2026-02-03+0118.flac";
const InTheMomentMP3 = "https://portfoliomusic.s3.us-east-1.amazonaws.com/in+the+moment+2026-02-03+0118.wav";

// Video URLs - replace these with your actual video URLs
const desktopVideoUrl = "https://portfoliomusic.s3.us-east-1.amazonaws.com/inthemomentbgdesktop.mov"; // Add your desktop video URL here
const mobileVideoUrl = "https://portfoliomusic.s3.us-east-1.amazonaws.com/inthemomentbgmobile.mov"; // Add your mobile video URL here

// Fallback image URLs - replace these with your actual fallback image URLs
const desktopFallbackImage = DesktopFallbackImage; // Add your desktop fallback image URL here
const mobileFallbackImage = MobileFallbackImage; // Add your mobile fallback image URL here

const Music = ({ setNextSection, activeSection }) => {
	const desktopVideoRef = useRef(null);
	const [isMobile, setIsMobile] = useState(false);
	const [useFallback, setUseFallback] = useState(false);
	const [videoPlayAttempted, setVideoPlayAttempted] = useState(false);

	const currentVideoUrl = isMobile ? mobileVideoUrl : desktopVideoUrl;
	const currentFallbackImage = isMobile ? mobileFallbackImage : desktopFallbackImage;

	// Check if it's mobile or desktop
	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 960px)");
		setIsMobile(mediaQuery.matches);

		const handleMediaChange = (e) => {
			setIsMobile(e.matches);
		};

		mediaQuery.addEventListener("change", handleMediaChange);
		return () => mediaQuery.removeEventListener("change", handleMediaChange);
	}, []);

	// Reset video play attempt when mobile state or video URL changes
	useEffect(() => {
		if (!desktopVideoUrl && !mobileVideoUrl) {
			setUseFallback(true);
			return;
		}
		setVideoPlayAttempted(false);
		setUseFallback(false);
	}, [isMobile, currentVideoUrl]);

	// Attempt to play video after video element is ready
	useEffect(() => {
		if (!currentVideoUrl) {
			return;
		}

		const video = desktopVideoRef.current;
		if (video && !videoPlayAttempted) {
			setVideoPlayAttempted(true);
			
			const playPromise = video.play();
			
			if (playPromise !== undefined) {
				playPromise
					.then(() => {
						console.log("Music video playback successful.");
						setUseFallback(false);
					})
					.catch((error) => {
						console.error("Music video playback failed:", error);
						// Only fallback to image if fallback image exists
						if (currentFallbackImage) {
							setUseFallback(true);
						} else {
							// If no fallback, keep trying to show video
							setUseFallback(false);
						}
					});
			}
		}
	}, [videoPlayAttempted, currentVideoUrl, currentFallbackImage]);

	// Handle video errors
	const handleVideoError = (e) => {
		console.error("Music video error:", e);
		// Only use fallback if fallback image exists
		if (currentFallbackImage) {
			setUseFallback(true);
		}
	};

	return (
		<>
			<div className="music-container">
				{/* Background video or fallback image */}
				{useFallback && currentFallbackImage ? (
					<img
						src={currentFallbackImage}
						alt="Music background"
						className={isMobile ? "video-background-mobile" : "video-background"}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover"
						}}
					/>
				) : currentVideoUrl ? (
					<video
						ref={desktopVideoRef}
						src={currentVideoUrl}
						autoPlay
						loop
						muted
						playsInline
						preload="auto"
						className={isMobile ? "video-background-mobile" : "video-background"}
						onError={handleVideoError}
						onCanPlay={() => console.log("Music video can play")}
						onPlay={() => {
							console.log("Music video is playing");
							setUseFallback(false);
						}}
					/>
				) : null}

				<div className="player">
					<AudioPlayer 
						src={InTheMomentFLAC}
						fallbackSrc={InTheMomentMP3}
						title="In The Moment"
						artist="Ariana Roseman"
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
