import React from "react";
import "./styles/Standard.css";
import AudioPlayer from "./AudioPlayer";

// Append new tracks to the end — they stack above older ones.
const TRACKS = [
	{
		id: "devotional",
		src: "https://portfoliomusic.s3.us-east-1.amazonaws.com/devotional+track+(rough+mix).flac",
		fallbackSrc: "https://portfoliomusic.s3.us-east-1.amazonaws.com/devotional+track+(rough+mix).wav",
		title: "Devotional Track (Rough Mix)",
		titleBadge: "LOSSLESS",
		artist: "Ariana Roseman",
	},
	{
		id: "devotionaldark",
		src: "https://portfoliomusic.s3.us-east-1.amazonaws.com/devotional+track+(dark+mix).flac",
		fallbackSrc: "https://portfoliomusic.s3.us-east-1.amazonaws.com/devotional+track+(dark+mix).wav",
		title: "Devotional Track (Dark Mix)",
		titleBadge: "LOSSLESS",
		artist: "Ariana Roseman",
	},
];

const Unreleased = () => {
	return (
		<div
			className="music-container"
			style={{ backgroundColor: "#000" }}
		>
			<div className="player unreleased-players">
				{TRACKS.map(({ id, ...track }) => (
					<AudioPlayer key={id} {...track} />
				))}
			</div>
		</div>
	);
};

export default Unreleased;
