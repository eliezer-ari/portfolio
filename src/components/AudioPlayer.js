// AudioPlayer.js
import React, { useEffect, useRef, useState, useCallback } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./styles/AudioPlayer.css";
import defaultAlbumArt from "./images/tiulstill.png";

// Format duration in seconds to MM:SS
const formatTime = (seconds) => {
	if (!seconds || isNaN(seconds)) return "00:00";
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Browser detection utilities
const isSafari = () => {
	return /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
		/iPad|iPhone|iPod/.test(navigator.userAgent);
};

const isIOS = () => {
	return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

// Check if browser supports FLAC format
const supportsFLAC = () => {
	// Safari and iOS don't support FLAC
	if (isSafari() || isIOS()) {
		return false;
	}
	
	// Check if audio element can play FLAC
	const audio = document.createElement('audio');
	const canPlay = audio.canPlayType('audio/flac') || audio.canPlayType('audio/x-flac');
	return canPlay === 'probably' || canPlay === 'maybe';
};

// Check if browser supports a specific audio format
const supportsFormat = (url) => {
	if (typeof url !== 'string') return true; // Assume imported modules are supported
	
	const audio = document.createElement('audio');
	const urlLower = url.toLowerCase();
	
	if (urlLower.endsWith('.mp3')) {
		return audio.canPlayType('audio/mpeg') !== '';
	} else if (urlLower.endsWith('.wav')) {
		return audio.canPlayType('audio/wav') !== '' || audio.canPlayType('audio/wave') !== '';
	} else if (urlLower.endsWith('.flac')) {
		return supportsFLAC();
	} else if (urlLower.endsWith('.ogg')) {
		return audio.canPlayType('audio/ogg') !== '';
	} else if (urlLower.endsWith('.m4a') || urlLower.endsWith('.mp4')) {
		return audio.canPlayType('audio/mp4') !== '';
	}
	
	// Unknown format, assume it might work
	return true;
};

// Get the best audio source based on browser support
const getBestAudioSource = (src, fallbackSrc = null) => {
	// If src is already a string URL, check if it's FLAC
	if (typeof src === 'string') {
		const isFLAC = src.toLowerCase().endsWith('.flac');
		
		// If it's FLAC and browser doesn't support it, use fallback
		if (isFLAC && !supportsFLAC()) {
			// If fallback is provided, use it
			if (fallbackSrc) {
				return fallbackSrc;
			}
			// Otherwise, return the FLAC source anyway (let browser handle it)
			return src;
		}
		return src;
	}
	
	// If src is not a string (e.g., imported module), check browser support
	if (!supportsFLAC() && fallbackSrc) {
		return fallbackSrc;
	}
	
	return src;
};

const PlaylistPlayer = ({ 
	src, 
	fallbackSrc = null, // Fallback audio source (e.g., MP3 version)
	title = "Unknown", 
	artist = "ARIANA ROSEMAN", 
	albumArt = defaultAlbumArt,
	duration = 0 // Duration in seconds
}) => {
	const playerRef = useRef(null);
	const [currentSrc, setCurrentSrc] = useState(() => getBestAudioSource(src, fallbackSrc));
	const [attemptedSources, setAttemptedSources] = useState(new Set());
	const audioRef = useRef(null);
	const [currentTime, setCurrentTime] = useState(0);
	const [audioDuration, setAudioDuration] = useState(duration || 0);

	// Handle audio source changes
	useEffect(() => {
		const newSrc = getBestAudioSource(src, fallbackSrc);
		setCurrentSrc(newSrc);
		setAttemptedSources(new Set([newSrc]));
		setCurrentTime(0);
		setAudioDuration(duration || 0);
	}, [src, fallbackSrc, duration]);

	// Set up MediaSession API for better iOS lock screen support
	useEffect(() => {
		if ('mediaSession' in navigator) {
			navigator.mediaSession.metadata = new MediaMetadata({
				title: title,
				artist: artist,
				album: '',
				artwork: [
					{ src: albumArt, sizes: '512x512', type: 'image/png' }
				]
			});

			// Handle play/pause actions from lock screen
			navigator.mediaSession.setActionHandler('play', () => {
				const audio = playerRef.current?.querySelector('audio');
				if (audio) audio.play();
			});

			navigator.mediaSession.setActionHandler('pause', () => {
				const audio = playerRef.current?.querySelector('audio');
				if (audio) audio.pause();
			});
		}
	}, [title, artist, albumArt]);

	// Test if a URL is accessible (for debugging)
	const testUrlAccessibility = useCallback(async (url) => {
		try {
			const response = await fetch(url, { method: 'HEAD', mode: 'cors' });
			console.log(`URL accessibility test for ${url}:`, {
				status: response.status,
				statusText: response.statusText,
				contentType: response.headers.get('content-type'),
				contentLength: response.headers.get('content-length'),
				accessControlAllowOrigin: response.headers.get('access-control-allow-origin'),
				corsEnabled: response.headers.get('access-control-allow-origin') !== null
			});
			return response.ok;
		} catch (err) {
			console.error(`URL accessibility test failed for ${url}:`, err);
			return false;
		}
	}, []);

	// Handle audio errors with fallback
	const handleError = useCallback((e) => {
		const audioElement = e.target;
		const error = audioElement?.error;
		const actualSrc = audioElement?.src || currentSrc;
		
		if (error) {
			let errorMessage = "Unknown error";
			switch (error.code) {
				case error.MEDIA_ERR_ABORTED:
					errorMessage = "Media playback was aborted";
					break;
				case error.MEDIA_ERR_NETWORK:
					errorMessage = "Network error while loading media";
					break;
				case error.MEDIA_ERR_DECODE:
					errorMessage = "Media decoding error (format may not be supported)";
					break;
				case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
					errorMessage = "Media source not supported (format/codec issue)";
					break;
				default:
					errorMessage = `Error code: ${error.code}`;
			}
			
			console.error("Audio playback error:", errorMessage, {
				code: error.code,
				message: error.message,
				actualSrc: actualSrc,
				currentSrc: currentSrc,
				networkState: audioElement?.networkState,
				readyState: audioElement?.readyState
			});

			// Test URL accessibility for debugging
			if (typeof actualSrc === 'string' && actualSrc.startsWith('http')) {
				testUrlAccessibility(actualSrc);
			}

			// Try explicit fallback if available and we haven't already tried it
			if (!attemptedSources.has(fallbackSrc) && fallbackSrc && currentSrc !== fallbackSrc) {
				console.log("Attempting fallback audio source:", fallbackSrc);
				setCurrentSrc(fallbackSrc);
				setAttemptedSources(prev => new Set([...prev, fallbackSrc]));
			} else if (error.code === error.MEDIA_ERR_SRC_NOT_SUPPORTED || error.code === error.MEDIA_ERR_DECODE) {
				// Format/codec error - provide detailed diagnostics
				const diagnostics = {
					issue: "Format/codec error - possible causes:",
					possibleCauses: [
						"CORS not properly configured (check S3 bucket CORS settings)",
						"Incorrect Content-Type header on S3 file (should be audio/flac for FLAC, audio/wav for WAV)",
						"File encoding not supported by browser",
						"File corrupted or incomplete upload"
					],
					checklist: [
						"Verify CORS is configured in S3 bucket",
						"Check file metadata in S3 - Content-Type should match file format",
						"Test file URL directly in browser",
						"Check browser console for CORS errors"
					],
					src: actualSrc
				};
				console.warn("Audio format error diagnostics:", diagnostics);
			}
		} else {
			console.error("Audio playback error:", e);
		}
	}, [currentSrc, fallbackSrc, attemptedSources, testUrlAccessibility]);

	return (
		<div className="audioplayercontainer">
		

			<div 
				className="audio-player-wrapper"
				style={{
					position: "relative",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					minWidth: 0,
				}}
			>
				{/* Audio Player */}
				<div style={{ width: "100%" }} ref={playerRef}>
					<AudioPlayer
						src={currentSrc}
						onPlay={(e) => {
							console.log("onPlay");
							audioRef.current = e.target;
						}}
						onPause={(e) => {
							console.log("onPause");
							audioRef.current = e.target;
						}}
						onListen={(e) => {
							const audio = e.target;
							if (audio && audio.currentTime !== undefined) {
								setCurrentTime(audio.currentTime);
							}
							if (audio && audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
								setAudioDuration(audio.duration);
							}
						}}
						onLoadedData={(e) => {
							const audio = e.target;
							if (audio && audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
								setAudioDuration(audio.duration);
							}
						}}
						onCanPlay={(e) => {
							const audio = e.target;
							if (audio && audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
								setAudioDuration(audio.duration);
							}
						}}
						onError={handleError}
						listenInterval={100}
						showJumpControls={false}
						layout="stacked-reverse"
						showFilledProgress={true}
						showDownloadProgress={false}
						customProgressBarSection={[
							"PROGRESS_BAR",
							<div
								key="current-time"
								className="rhap_time"
								style={{
									color: "rgba(255, 255, 255, 0.8)",
									fontFamily: "Sen, sans-serif",
									fontSize: "0.9rem",
									marginLeft: "0.5rem",
									flexShrink: 0,
								}}
							>
								{formatTime(currentTime)}
							</div>,
							<div
								key="time-separator"
								className="rhap_time"
								style={{
									color: "rgba(255, 255, 255, 0.8)",
									fontFamily: "Sen, sans-serif",
									fontSize: "0.9rem",
									margin: "0 0.5rem",
									flexShrink: 0,
								}}
							>
								|
							</div>,
							<div
								key="total-time"
								className="rhap_time"
								style={{
									color: "rgba(255, 255, 255, 0.8)",
									fontFamily: "Sen, sans-serif",
									fontSize: "0.9rem",
									marginRight: "0.2rem",
									flexShrink: 0,
								}}
							>
								{formatTime(audioDuration)}
							</div>
						]}
						customControlsSection={[
							"MAIN_CONTROLS",
							<div
								key="track-info"
								className="track-info-inline fade-in"
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									flex: 1,
									padding: "0 1rem",
									color: "#ffffff",
									fontFamily: "Sen, sans-serif",
								}}
							>
								<div
									className="track-title"
									style={{
										fontSize: "1rem",
										fontWeight: "600",
										letterSpacing: "0.05rem",
										marginBottom: "0.25rem",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "ellipsis",
										lineHeight: "1.3",
									}}
								>
									{title}
								</div>
								<div
									className="track-artist"
									style={{
										fontSize: "0.85rem",
										opacity: 0.8,
										letterSpacing: "0.05rem",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "ellipsis",
										lineHeight: "1.3",
									}}
								>
									{artist}
								</div>
							</div>,
						]}
					/>
				</div>
			</div>
		</div>
	);
};

export default PlaylistPlayer;
