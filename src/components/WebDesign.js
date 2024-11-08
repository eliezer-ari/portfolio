import React, { useEffect } from "react";
import "./styles/Standard.css";
import "./styles/WebDesign.css";
import Contact from "./Contact.js";

const WebDesign = ({ setNextSection }) => {
	const handleBackToHome = () => {
		setNextSection("Home");
	};

	const handleRedirect = (url) => {
		console.log(`Redirecting to: ${url}`);
		window.location.href = url;
	};

	useEffect(() => {
		const iframeOverlays = [
			{ id: "site1", url: "https://www.discoverframe.com/troma/" },
			{ id: "site2", url: "http://www.inputcap.com/" },
			{ id: "site3", url: "http://localhost:3000/#Lighting" },
		];

		iframeOverlays.forEach(({ id, url }) => {
			const iframe = document.getElementById(id);
			if (!iframe) {
				console.error(`Iframe with id ${id} not found`);
				return;
			}

			// Create an overlay div to capture scroll and clicks
			const overlay = document.createElement("div");
			overlay.className = "iframe-overlay";
			overlay.style.position = "absolute";
			overlay.style.top = "0";
			overlay.style.left = "0";
			overlay.style.width = "100%";
			overlay.style.height = "100%";
			overlay.style.zIndex = "9001"; // Ensure overlay is above iframe
			overlay.style.cursor = "pointer";
			overlay.style.backgroundColor = "rgba(255, 255, 255, 0)"; // Invisible overlay

			// Adjust overlay position on window resize
			const adjustOverlayPosition = () => {
				const rect = iframe.getBoundingClientRect();
				overlay.style.width = `${rect.width}px`;
				overlay.style.height = `${rect.height}px`;
				overlay.style.top = `${rect.top + window.scrollY}px`;
				overlay.style.left = `${rect.left + window.scrollX}px`;
			};

			adjustOverlayPosition();
			window.addEventListener("resize", adjustOverlayPosition);

			// Scroll handler for overlay to scroll iframe
			const handleOverlayScroll = (e) => {
				e.preventDefault();
				const iframeDocument =
					iframe.contentDocument || iframe.contentWindow.document;
				iframeDocument.documentElement.scrollTop += e.deltaY;
				iframeDocument.documentElement.scrollLeft += e.deltaX;
			};

			// Click handler to redirect on single click
			const handleClick = () => handleRedirect(url);

			// Attach event listeners to overlay
			overlay.addEventListener("wheel", handleOverlayScroll);
			overlay.addEventListener("click", handleClick);

			// Append overlay to the iframe's parent node
			iframe.parentNode.insertBefore(overlay, iframe);

			// Cleanup on component unmount
			return () => {
				window.removeEventListener("resize", adjustOverlayPosition);
				overlay.removeEventListener("wheel", handleOverlayScroll);
				overlay.removeEventListener("click", handleClick);
				overlay.remove();
			};
		});
	}, []);

	return (
		<>
			<div className="standard-container">
				<div className="back-arrow-container">
					<button
						style={{ transform: "rotate(270deg) translateX(-8px)" }}
						className="arrow-button"
						onClick={handleBackToHome}
					>
						&#x2303;
					</button>
				</div>
				<div className="website-copy">
					<h1>Responsive websites coded in React JS.</h1>
				</div>

				<iframe
					id="site1"
					title="frame"
					className="site1"
					src="https://www.discoverframe.com/troma/"
					allow="autoplay; encrypted-media"
				></iframe>
				<iframe
					id="site2"
					title="inputcap"
					className="site2"
					src="http://www.inputcap.com/"
					allow="autoplay; encrypted-media"
				></iframe>
				<iframe
					id="site3"
					title="thiswebsite"
					className="site3"
					src="http://localhost:3000/#Lighting"
					allow="autoplay; encrypted-media"
				></iframe>

				<div className="arrow-container">
					<div
						style={{
							transform: "rotate(180deg) translateY(-3px)",
						}}
						className="down-arrow"
					>
						&#x2303;
					</div>
				</div>
			</div>

			<div className="standard-container">
				<Contact />
			</div>
		</>
	);
};

export default WebDesign;
