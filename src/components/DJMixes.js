import React, { useState, useEffect, useRef, useMemo } from "react";
import "./styles/Standard.css";
import AudioPlayer from "./AudioPlayer";
import Contact from "./Contact";
import DesktopFallbackImage from "./images/janebdaydesktopfallback.png";  // **NEED TO ADD DJ MIXES IMAGES**
import MobileFallbackImage from "./images/janebdaymobilefallback.png";  // **NEED TO ADD DJ MIXES IMAGES**

const janebdayFLAC = "https://portfoliomusic.s3.us-east-1.amazonaws.com/Ariana+Roseman+DJ+Mix%3A+Jane's+Birthday+Orgy.flac";
const janebdayMP3 = "https://portfoliomusic.s3.us-east-1.amazonaws.com/Ariana+Roseman+DJ+Mix+-+Jane's+Birthday+Orgy.wav";

// Video URLs - replace these with your actual video URLs
const desktopVideoUrl = "https://portfoliomusic.s3.us-east-1.amazonaws.com/janebdaydesktopbg.mov"; // Add your desktop video URL here
const mobileVideoUrl = "https://portfoliomusic.s3.us-east-1.amazonaws.com/janebdmobilebg.mov"; // Add your mobile video URL here

// Fallback image URLs - replace these with your actual fallback image URLs
const desktopFallbackImage = DesktopFallbackImage; // Add your desktop fallback image URL here
const mobileFallbackImage = MobileFallbackImage; // Add your mobile fallback image URL here

const getFormatLabel = (url) => {
	if (!url) return "AUDIO";
	const cleanUrl = url.split("?")[0].toLowerCase();
	if (cleanUrl.endsWith(".flac")) return "FLAC";
	if (cleanUrl.endsWith(".m4a")) return "M4A";
	if (cleanUrl.endsWith(".wav")) return "WAV";
	if (cleanUrl.endsWith(".mp3")) return "MP3";
	if (cleanUrl.endsWith(".aiff") || cleanUrl.endsWith(".aif")) return "AIFF";
	return "AUDIO";
};

const getFileNameFromUrl = (url, fallbackName = "download") => {
	if (!url) return fallbackName;
	const cleanUrl = url.split("?")[0];
	const lastSegment = cleanUrl.split("/").pop();
	if (!lastSegment) return fallbackName;
	return decodeURIComponent(lastSegment).replace(/\+/g, " ");
};

const formatFileSize = (bytes) => {
	if (bytes == null || Number.isNaN(bytes)) return null;
	const num = Number(bytes);
	if (num >= 1e9) return `${(num / 1e9).toFixed(2)} GB`;
	return `${(num / 1e6).toFixed(1)} MB`;
};

const getContentLengthFromRange = (contentRange) => {
	if (!contentRange || typeof contentRange !== "string") return null;
	const match = contentRange.match(/bytes\s+\d+-\d+\/(\d+)/);
	return match ? parseInt(match[1], 10) : null;
};

const fetchFileSize = (url) => {
	const safeUrl = url.replace(/'/g, "%27");
	const tryRange = () =>
		fetch(safeUrl, { method: "GET", headers: { Range: "bytes=0-0" } })
			.then((res) => {
				const range = res.headers.get("Content-Range");
				return getContentLengthFromRange(range);
			})
			.catch(() => null);
	const tryHead = () =>
		fetch(safeUrl, { method: "HEAD" })
			.then((res) => {
				const len = res.headers.get("Content-Length");
				return len ? parseInt(len, 10) : null;
			})
			.catch(() => null);
	return tryRange().then((bytes) => (bytes != null ? bytes : tryHead()));
};



const DJMixes = ({ setNextSection, activeSection }) => {
	const desktopVideoRef = useRef(null);
	const downloadMenuRef = useRef(null);
	const [isMobile, setIsMobile] = useState(false);
	const [useFallback, setUseFallback] = useState(false);
	const [videoPlayAttempted, setVideoPlayAttempted] = useState(false);
	const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [sizesByUrl, setSizesByUrl] = useState({});

	const currentVideoUrl = isMobile ? mobileVideoUrl : desktopVideoUrl;
	const currentFallbackImage = isMobile ? mobileFallbackImage : desktopFallbackImage;
	const downloadOptions = useMemo(
		() =>
			[
				{ url: janebdayFLAC, label: getFormatLabel(janebdayFLAC), sizeOverride: "1.75 GB" },
				{ url: janebdayMP3, label: getFormatLabel(janebdayMP3) },
			].filter((option, index, arr) => option.url && arr.findIndex((item) => item.url === option.url) === index),
		[janebdayFLAC, janebdayMP3]
	);

	useEffect(() => {
		downloadOptions.forEach(({ url }) => {
			fetchFileSize(url)
				.then((bytes) => {
					const sizeLabel = formatFileSize(bytes);
					if (sizeLabel) setSizesByUrl((prev) => ({ ...prev, [url]: sizeLabel }));
				})
				.catch(() => {});
		});
	}, [downloadOptions]);

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

	const startCloseMenu = () => setIsClosing(true);

	const handleDownload = (url) => {
		const fallbackName = `janebday-${getFormatLabel(url).toLowerCase()}`;
		const fileName = getFileNameFromUrl(url, fallbackName);
		const tempLink = document.createElement("a");
		tempLink.href = url;
		tempLink.download = fileName;
		tempLink.target = "_self";
		tempLink.rel = "noopener noreferrer";
		document.body.appendChild(tempLink);
		tempLink.click();
		document.body.removeChild(tempLink);
		startCloseMenu();
	};

	useEffect(() => {
		if (!isClosing) return;
		const t = setTimeout(() => {
			setIsDownloadMenuOpen(false);
			setIsClosing(false);
		}, 200);
		return () => clearTimeout(t);
	}, [isClosing]);

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target) && isDownloadMenuOpen) {
				startCloseMenu();
			}
		};

		const handleEscape = (event) => {
			if (event.key === "Escape" && isDownloadMenuOpen) {
				startCloseMenu();
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);
		document.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isDownloadMenuOpen]);

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
					<div className="dj-download-menu" ref={downloadMenuRef}>
						<button
							type="button"
							className={`dj-download-trigger${isDownloadMenuOpen ? " dj-download-trigger--open" : ""}`}
							onClick={() => (isDownloadMenuOpen ? startCloseMenu() : setIsDownloadMenuOpen(true))}
							aria-label="Download track"
							aria-haspopup="menu"
							aria-expanded={isDownloadMenuOpen}
						>
							<svg viewBox="0 0 24 24" aria-hidden="true">
								<path d="M12 3a1 1 0 0 1 1 1v8.59l2.3-2.29a1 1 0 1 1 1.4 1.42l-4 3.98a1 1 0 0 1-1.4 0l-4-3.98a1 1 0 0 1 1.4-1.42L11 12.59V4a1 1 0 0 1 1-1Z" />
								<path d="M5 16a1 1 0 0 1 1 1v2h12v-2a1 1 0 1 1 2 0v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z" />
							</svg>
						</button>
						{isDownloadMenuOpen && (
							<div
								className={`dj-download-dropdown${isClosing ? " dj-download-dropdown--closing" : ""}`}
								role="menu"
								aria-label="Download options"
							>
								{downloadOptions.map((option) => (
									<button
										key={option.url}
										type="button"
										className="dj-download-option"
										role="menuitem"
										onClick={() => handleDownload(option.url)}
									>
										Download {option.label}
										{(sizesByUrl[option.url] ?? option.sizeOverride) ? ` (${sizesByUrl[option.url] ?? option.sizeOverride})` : ""}
									</button>
								))}
							</div>
						)}
					</div>
					<div className="dj-mixes-player-shell">
						<AudioPlayer
							src={janebdayFLAC}
							fallbackSrc={janebdayMP3}
							title="Jane's Birthday Play Party"
							titleBadge="LOSSLESS"
							artist="Ariana Roseman"
						/>
					</div>
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
