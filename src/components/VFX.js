import React, { useState, useEffect, useRef } from "react";
import "./styles/Standard.css";
import CinemaLoop from "./images/cinematographyloop.mp4";
import "./styles/PastProjects.css";
import { Link } from "react-router-dom";
import Contact from "./Contact";

// Import images for each project
import Image1 from "./images/screenrepstill.png";
import Image2 from "./images/finishedvfxstill.png";
import Image3 from "./images/imagetemplate.jpg";
import Image4 from "./images/imagetemplate.jpg";
import Image5 from "./images/imagetemplate.jpg";
import Image6 from "./images/imagetemplate.jpg";

// Additional carousel images for a project
import CarouselImage1 from "./images/popmstill1.jpg";
import CarouselImage2 from "./images/popmstill2.jpg";
import CarouselImage3 from "./images/popmstill3.jpg";

const VFX = ({ setNextSection }) => {
	const videoUrl =
		"https://portfolio-videos-current.s3.us-east-1.amazonaws.com/vfxreeldesktop.mp4";
	const mobileVideoUrl =
		"https://portfolio-videos-current.s3.us-east-1.amazonaws.com/vfxreelmobile.mp4";

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

	// Function to handle back to home navigation with animation
	const handleBackToHome = () => {
		setNextSection("Home"); // Set nextSection to "Home" to trigger the animation
	};

	const [modalContent, setModalContent] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const openModal = (project) => {
		if (project.hasModal) {
			setModalContent(project);
			setCurrentImageIndex(0); // Reset to first image if it's a carousel
			setIsModalOpen(true);
		}
	};

	const closeModal = () => {
		setModalContent(null);
		setIsModalOpen(false);
	};

	// Carousel navigation functions
	const nextImage = () => {
		setCurrentImageIndex(
			(prevIndex) => (prevIndex + 1) % modalContent.carouselImages.length
		);
	};

	const prevImage = () => {
		setCurrentImageIndex(
			(prevIndex) =>
				(prevIndex - 1 + modalContent.carouselImages.length) %
				modalContent.carouselImages.length
		);
	};

	const projects = [
		{
			id: 1,
			type: "small",
			medium: "",
			title: "Seamless Visual Effects in Adobe After Effects",
			status: "",
			role: "Motion tracking, text replacement, object removals, and everything else.",
			description: "",
			image: Image1,
			modalDescription: "Detailed description for Project 1.",
			videoUrl: "https://www.youtube.com/embed/example1",
			hasModal: false,
			isCarousel: false, // This project uses a carousel instead of a video
			carouselImages: [CarouselImage1, CarouselImage2, CarouselImage3],
		},
	];

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
				<div className="past-projects-grid-single">
					{projects.map((project) => (
						<div
							key={project.id}
							className={`grid-item ${project.type} ${
								!project.hasModal ? "no-hover" : ""
							}`}
							onClick={() => openModal(project)}
						>
							<img src={project.image} alt={project.title} />
							<div className="project-content">
								<div className="project-header">
									<h1>{project.title}</h1>
									<h4>{project.medium}</h4>
									{project.status && <h2>{project.status}</h2>}
								</div>
								<h3>{project.role}</h3>
							</div>
						</div>
					))}

					{isModalOpen && modalContent && (
						<div className="modal-overlay" onClick={closeModal}>
							<div
								className="modal-content"
								onClick={(e) => e.stopPropagation()}
							>
								{modalContent.isList ? (
									<div className="scrollable-container">
										<ul>
											<li>
												{/* <div className="thumbnail-container"></div> */}
												<div className="content">
													<div className="project-header">
														<h1>Event Space: Support Women DJs Studio</h1>
														<h2>In Progress</h2>
													</div>
													<h3>Chief Lighting Technician</h3>
													<p>
														Designed a permanent lighting setup for boiler room
														sets.
													</p>
													<span>Installation pending.</span>
												</div>
											</li>
											<li>
												{/* <div className="thumbnail-container"></div> */}
												<div className="content">
													<div className="project-header">
														<h1>
															Feature Film: Lloyd Kaufman’s The Power of
															Positive Murder
														</h1>
														<h2></h2>
													</div>
													<h3>Lighting Technician (Grip & Electric)</h3>
													<p>
														Created precise lighting setups for a noir camp
														horror film.
													</p>
													<span>Currently in post-production.</span>
												</div>
											</li>
											<li>
												{/* <div className="thumbnail-container"></div> */}
												<div className="content">
													<div className="project-header">
														<h1>Live Event: 626 Night Market Music Festival</h1>
														<h2></h2>
													</div>
													<h3>Lighting Technician (Rigger & Stagehand)</h3>
													<p>
														Rigged lights and constructed a stage platform using
														steel decks.
													</p>
												</div>
											</li>
											<li>
												{/* <div className="thumbnail-container"></div> */}
												<div className="content">
													<div className="project-header">
														<h1>
															TV Spot: "Laufey - From The Start (Live) |
															Microsoft"
														</h1>
														<h2></h2>
													</div>

													<h3>Lighting Technician (Grip)</h3>
													<p>Rigged lights for a live performance.</p>
													<span>
														<Link
															className="list-link"
															to="https://www.youtube.com/watch?v=px-NdIt8QwM"
														>
															Link here
														</Link>
													</span>
												</div>
											</li>
											<li>
												{/* <div className="thumbnail-container"></div> */}
												<div className="content">
													<div className="project-header">
														<h1>
															TV Spot: "Ranger Design: Leading the Charge in
															EV-Ready Upfit Solutions"
														</h1>
														<h2></h2>
													</div>
													<h3>Lighting Technician (Grip)</h3>
													<p>
														Rigged high-key lighting setups in a cinematic
														style.
													</p>
													<span>
														<Link
															className="list-link"
															to="https://www.youtube.com/watch?v=1uIU0kaHvN8"
														>
															Link here
														</Link>
													</span>
												</div>
											</li>
											<li>
												{/* <div className="thumbnail-container"></div> */}
												<div className="content">
													<div className="project-header">
														<h1>
															TV Spot: "Introducing Future: Unlimited Personal
															Training"
														</h1>
														<h2></h2>
													</div>
													<h3>Lighting Technician (Grip)</h3>
													<p>
														Rigged high-key lighting setups in a cinematic
														style.
													</p>
													<span>
														<Link
															className="list-link"
															to="https://www.youtube.com/watch?v=1-KjUlL71NQ&authuser=2"
														>
															Link here
														</Link>
													</span>
												</div>
											</li>
											<li>
												{/* <div className="thumbnail-container"></div> */}
												<div className="content">
													<div className="project-header">
														<h1>
															TV Spot: "Reverse Zoom: Work From Home | Perfect
															Bar"
														</h1>
														<h2></h2>
													</div>
													<h3>Lighting Technician (Grip)</h3>
													<p>
														Rigged high-key lighting setups in a cinematic
														style.
													</p>
													<span>
														<Link
															className="list-link"
															to="https://www.youtube.com/watch?v=EdyD4kYcwOw"
														>
															Link here
														</Link>
													</span>
												</div>
											</li>
											<li>
												{/* <div className="thumbnail-container"></div> */}
												<div className="content">
													<div className="project-header">
														<h1>
															TV Spot: "Perfectly Censored: Snacksplosion |
															Perfect Bar"
														</h1>
														<h2></h2>
													</div>
													<h3>Lighting Technician (Grip)</h3>
													<p>
														Rigged high-key lighting setups in a cinematic
														style.
													</p>
													<span>
														<Link
															className="list-link"
															to="https://www.youtube.com/watch?v=ei2_wkY1lYY"
														>
															Link here
														</Link>
													</span>
												</div>
											</li>
											<li>
												{/* <div className="thumbnail-container"></div> */}
												<div className="content">
													<div className="project-header">
														<h1>TV Spot: "Reverse Zoom: Zen | Perfect Bar"</h1>
														<h2></h2>
													</div>
													<h3>Lighting Technician (Grip)</h3>
													<p>
														Rigged high-key lighting setups in a cinematic
														style.
													</p>
													<span>
														<Link
															className="list-link"
															to="https://www.youtube.com/watch?v=LN00uVGhgqw"
														>
															Link here
														</Link>
													</span>
												</div>
											</li>
											<li>
												{/* <div className="thumbnail-container"></div> */}
												<div className="content">
													<div className="project-header">
														<h1>
															TV Spot: "Reverse Zoom: On-The-Go | Perfect Bar"
														</h1>
														<h2></h2>
													</div>
													<h3>Lighting Technician (Grip)</h3>
													<p>
														Rigged high-key lighting setups in a cinematic
														style.
													</p>
													<span>
														<Link
															className="list-link"
															to="https://www.youtube.com/watch?v=KoZ1jwBooug"
														>
															Link here
														</Link>
													</span>
												</div>
											</li>
											<li>
												{/* <div className="thumbnail-container"></div> */}
												<div className="content">
													<div className="project-header">
														<h1>
															TV Spot: "Perfectly Censored: Magic Eraser |
															Perfect Bar"
														</h1>
														<h2></h2>
													</div>
													<h3>Lighting Technician (Grip)</h3>
													<p>
														Rigged high-key lighting setups in a cinematic
														style.
													</p>
													<span>
														<Link
															className="list-link"
															to="https://www.youtube.com/watch?v=WnXbg9vHsNo"
														>
															Link here
														</Link>
													</span>
												</div>
											</li>
											<li>
												{/* <div className="thumbnail-container"></div> */}
												<div className="content">
													<div className="project-header">
														<h1>
															TV Spot: "Perfectly Censored: Fridge Hack |
															Perfect Bar"
														</h1>
														<h2></h2>
													</div>
													<h3>Lighting Technician (Grip)</h3>
													<p>
														Rigged high-key lighting setups in a cinematic
														style.
													</p>
													<span>
														<Link
															className="list-link"
															to="https://www.youtube.com/watch?v=Fryv4XYr_dE"
														>
															Link here
														</Link>
													</span>
												</div>
											</li>
											<li>
												{/* <div className="thumbnail-container"></div> */}
												<div className="content">
													<div className="project-header">
														<h1>
															Promotional Short: "Professor McConaughey on THE
															GENTLEMEN"
														</h1>
														<h2></h2>
													</div>
													<h3>Lighting Technician & Camera Operator</h3>
													<p>
														Rigged high-key lighting setups in a documentary
														style.
													</p>
													<span>
														<Link
															className="list-link"
															to="https://www.youtube.com/watch?v=rIlBoJhQvuY"
														>
															Link here
														</Link>
													</span>
												</div>
											</li>
											<li>
												{/* <div className="thumbnail-container"></div> */}
												<div className="content">
													<div className="project-header">
														<h1>
															Promotional Short: "McConaughey on the Moody
															Center"
														</h1>
														<h2></h2>
													</div>
													<h3>Lighting Technician & Camera Operator</h3>
													<p>
														Rigged high-key lighting setups in a documentary
														style.
													</p>
													<span>
														<Link
															className="list-link"
															to="https://www.youtube.com/watch?v=2rADPqh3Mkg"
														>
															Link here
														</Link>
													</span>
												</div>
											</li>
											<li>
												{/* <div className="thumbnail-container"></div> */}
												<div className="content">
													<div className="project-header">
														<h1>Short Film: "Tiul"</h1>
														<h2></h2>
													</div>
													<h3>
														Director, Lighting Technician, & Camera Operator
													</h3>
													<p>
														Produced a short film for UT Austin's film program
														and rigged high-key lighting setups in a cinematic
														style.
													</p>
													<span>
														<Link
															className="list-link"
															to="https://vimeo.com/1007909906"
														>
															Link here
														</Link>
													</span>
												</div>
											</li>
										</ul>
									</div>
								) : modalContent.isCarousel ? (
									<div className="carousel-container">
										<img
											src={modalContent.carouselImages[currentImageIndex]}
											alt={`Slide ${currentImageIndex + 1}`}
											className="carousel-image"
										/>
										<button onClick={prevImage} className="carousel-nav prev">
											◀
										</button>
										<button onClick={nextImage} className="carousel-nav next">
											▶
										</button>
									</div>
								) : (
									<div className="video-wrapper">
										<iframe
											width="100%"
											height="100%"
											src={modalContent.videoUrl}
											title="YouTube video player"
											frameBorder="0"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
											referrerPolicy="strict-origin-when-cross-origin"
											allowFullScreen
										></iframe>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
			<div className="contact-parent">
				<Contact />
			</div>
		</>
	);
};

export default VFX;
