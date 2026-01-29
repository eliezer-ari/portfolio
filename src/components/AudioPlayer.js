// AudioPlayer.js
import React, { useEffect, useRef } from "react";
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

const PlaylistPlayer = ({ 
	src, 
	title = "Unknown", 
	artist = "ARIANA ROSEMAN", 
	albumArt = defaultAlbumArt,
	duration = 0 // Duration in seconds
}) => {
	const playerRef = useRef(null);

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
						src={src}
						onPlay={(e) => console.log("onPlay")}
						onPause={(e) => console.log("onPause")}
						onError={(e) => {
							console.error("Audio playback error:", e);
						}}
						showJumpControls={false}
						layout="stacked-reverse"
						showFilledProgress={true}
						showDownloadProgress={false}
						customProgressBarSection={[
							"PROGRESS_BAR",
							<div
								key="total-time"
								className="rhap_time"
								style={{
									color: "rgba(255, 255, 255, 0.8)",
									fontFamily: "Sen, sans-serif",
									fontSize: "0.9rem",
									marginLeft: "0.2rem"
								}}
							>
								{formatTime(duration)}
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
