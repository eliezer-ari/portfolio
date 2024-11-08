import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./styles/Standard.css";
import "./styles/PastProjects.css";
import Contact from "./Contact";
import { Link } from "react-router-dom";

// Import images for each project
import Image1 from "./images/popmstill3.jpg";
import Image2 from "./images/swdjstill.png";
import Image3 from "./images/laufeystill.png";
import Image4 from "./images/gentlemenstill.png";
import Image5 from "./images/futurestill.png";
import Image6 from "./images/tiulstill.png";

// Additional carousel images for a project
import CarouselImage1 from "./images/popmstill1.jpg";
import CarouselImage2 from "./images/popmstill2.jpg";
import CarouselImage3 from "./images/popmstill3.jpg";

const Lighting = ({ setNextSection }) => {
	const videoUrl =
		"https://portfolio-videos-current.s3.us-east-1.amazonaws.com/lightingloop.mp4";
	const mobileVideoUrl =
		"https://portfolio-videos-current.s3.us-east-1.amazonaws.com/lightingloopmobile.mp4";

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

	const handleBackToHome = () => {
		setNextSection("Home");
	};

	const [modalContent, setModalContent] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const openModal = (project) => {
		if (project.hasModal) {
			setModalContent(project);
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
			type: "large",
			medium: "Feature Film:",
			title: "Lloyd Kaufman’s The Power of Positive Murder",
			status: "",
			role: "Lighting Technician (Grip & Electric)",
			description:
				"Created lighting setups for a noir film under tight deadlines.",
			image: Image1,
			modalDescription: "Detailed description for Project 1 ...",
			videoUrl: "https://www.youtube.com/embed/example1",
			hasModal: true,
			isCarousel: true, // This project uses a carousel instead of a video
			carouselImages: [CarouselImage1, CarouselImage2, CarouselImage3],
		},
		{
			id: 2,
			type: "small",
			medium: "Event Space:",
			title: "Support Women DJs Studio",
			status: "In Progress",
			role: "Chief Lighting Technician",
			description: "",
			image: Image2,
			modalDescription: "Detailed description for Project 2.",
			videoUrl: "https://www.youtube.com/embed/example1",
			hasModal: false,
			isCarousel: false, // This project uses a video instead of a carousel
		},
		{
			id: 3,
			type: "small",
			medium: "TV Spot:",
			title: "Laufey - From The Start (Live) | Microsoft",
			status: "",
			role: "Lighting Technician (Grip)",
			description: "",
			image: Image3,
			modalDescription: "Detailed description for Project 3.",
			videoUrl: "https://www.youtube.com/embed/px-NdIt8QwM?si=EQa9OFY9egs2sAWJ",
			hasModal: true,
			isCarousel: false, // This project uses a video instead of a carousel
		},
		{
			id: 4,
			type: "small",
			medium: "Promotional Short:",
			title: "Professor McConaughey on THE GENTLEMEN",
			status: "",
			role: "Lighting Technician & Camera Operator",
			description: "",
			image: Image4,
			modalDescription: "Detailed description for Project 4.",
			videoUrl: "https://www.youtube.com/embed/rIlBoJhQvuY?si=KmEBDbDG9dNrpcJ5",
			hasModal: true,
			isCarousel: false, // This project uses a video instead of a carousel
		},
		{
			id: 5,
			type: "large",
			medium: "TV Spot:",
			title: "Introducing Future: Unlimited Personal Training",
			status: "",
			role: "Lighting Technician (Grip)",
			description: "",
			image: Image5,
			modalDescription: "Detailed description for Project 5.",
			videoUrl: "https://www.youtube.com/embed/1-KjUlL71NQ?si=SrfXoLvctuvw2Flk",
			hasModal: true,
			isCarousel: false, // This project uses a video instead of a carousel
		},
		{
			id: 6,
			type: "small",
			medium: "",
			title: "Other Projects",
			status: "",
			role: "",
			description: "",
			image: Image6,
			modalDescription: "Detailed description for Project 6.",
			videoUrl: "",
			hasModal: true, // Modal disabled for this project
			isCarousel: false, // This project uses a video instead of a carousel
			isList: true,
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
				{/* <div className="video-container-mobile">
					<video
						ref={mobileVideoRef}
						src={mobileVideoUrl}
						autoPlay
						loop
						muted
						playsInline
						className="video-background-mobile"
					/>
				</div> */}
			</div>
			<div className="pastprojects-container">
				<div className="past-projects-grid">
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
			<div className="standard-container">
				<Contact />
			</div>
		</>
	);
};

export default Lighting;
