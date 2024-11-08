import React, { useState, useEffect, useRef } from "react";
import "./styles/Standard.css";
import CinemaLoop from "./images/cinematographyloop.mp4";
import "./styles/PastProjects.css";
import { Link } from "react-router-dom";
import Contact from "./Contact";

// Import images for each project
import Image1 from "./images/tiulstill2.png";
import Image2 from "./images/cakepartystill.png";
import Image3 from "./images/moodycenterstill.png";
import Image4 from "./images/gentlemenstill.png";
import Image5 from "./images/balletstill.png";
import Image6 from "./images/chromastill.png";

// Additional carousel images for a project
import CarouselImage1 from "./images/popmstill1.jpg";
import CarouselImage2 from "./images/popmstill2.jpg";
import CarouselImage3 from "./images/popmstill3.jpg";

const Cinematography = ({ setNextSection }) => {
	const videoUrl =
		"https://portfolio-videos-current.s3.us-east-1.amazonaws.com/cinematographyloop.mp4";
	const mobileVideoUrl =
		"https://portfolio-videos-current.s3.us-east-1.amazonaws.com/cinematographyreelmobile.mp4";

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

	// Function to handle back to home navigation
	const handleBackToHome = () => {
		setNextSection("Home");
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
			type: "large",
			medium: "[Test Shoot]",
			title: "Cracked: The Nutcracker with a Twist",
			status: "In Post Production",
			role: "Camera Operator",
			description: "",
			image: Image5,
			modalDescription: "Detailed description for Project 5.",
			videoUrl: "https://www.youtube.com/embed/1-KjUlL71NQ?si=SrfXoLvctuvw2Flk",
			hasModal: false,
			isCarousel: false, // This project uses a video instead of a carousel
		},
		{
			id: 2,
			type: "small",
			medium: "[Short Film]",
			title: "Tiul",
			status: "",
			role: "Director & Camera Operator",
			description: "...",
			image: Image1,
			modalDescription: "Detailed description for Project 1.",
			videoUrl:
				"https://player.vimeo.com/video/1007909906?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
			hasModal: true,
			isCarousel: false, // This project uses a carousel instead of a video
		},
		{
			id: 3,
			type: "small",
			medium: "[Live Event]",
			title: "McConaughey on the Moody Center",
			status: "",
			role: "Camera Operator & Lighting Technician",
			description: "",
			image: Image3,
			modalDescription: "Detailed description for Project 3.",
			videoUrl: "https://www.youtube.com/embed/2rADPqh3Mkg?si=kDQepyL6GUAHp8Uv",
			hasModal: true,
			isCarousel: false, // This project uses a video instead of a carousel
		},

		{
			id: 4,
			type: "small",
			medium: "[Live Event]",
			title: "McConaughey on THE GENTLEMEN",
			status: "",
			role: "Camera Operator & Lighting Technician",
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
			medium: "[Live Event]",
			title: "Hotplate x Butter & Crumble Cake Picnic",
			status: "In Post Production",
			role: "Camera Operator",
			description: "",
			image: Image2,
			modalDescription: "Detailed description for Project 2.",
			videoUrl: "https://www.youtube.com/embed/example1",
			hasModal: false,
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
			</div>
			<div className="standard-container">
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
														<h1>
															Live Event: "Hotplate x Butter & Crumble Cake
															Picnic"
														</h1>
														<h2></h2>
													</div>
													<h3>Camera Operator</h3>
													<p>Operated camera in a run & gun style.</p>
													<span>In Post Production.</span>

													{/* <span>
														<Link
															className="list-link"
															to="https://www.youtube.com/watch?v=rIlBoJhQvuY"
														>
															Link here
														</Link>
													</span> */}
												</div>
											</li>
											<li>
												{/* <div className="thumbnail-container"></div> */}
												<div className="content">
													<div className="project-header">
														<h1>
															Test Shoot: "Cracked, The Nutcracker with a Twist"
														</h1>
														<h2></h2>
													</div>
													<h3>Camera Operator</h3>
													<p>Operated camera in a run & gun style.</p>
													<span>In Post Production.</span>

													{/* <span>
														<Link
															className="list-link"
															to="https://www.youtube.com/watch?v=rIlBoJhQvuY"
														>
															Link here
														</Link>
													</span> */}
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
													<h3>Camera Operator & Lighting Technician</h3>
													<p>
														Operated camera and rigged high-key lighting setups
														in a documentary style.
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
													<h3>Camera Operator & Lighting Technician</h3>
													<p>
														Operated camera and rigged high-key lighting setups
														in a documentary style.
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
											<li>
												{/* <div className="thumbnail-container"></div> */}
												<div className="content">
													<div className="project-header">
														<h1>Short Film "What's Better than Matzah"</h1>
														<h2></h2>
													</div>
													<h3>Director and Camera Operator</h3>
													<p>Operated a Bolex 16mm Film Camera.</p>
													<span>Link pending.</span>

													{/* <span>
														<Link
															className="list-link"
															to="https://www.youtube.com/watch?v=rIlBoJhQvuY"
														>
															Link here
														</Link>
													</span> */}
												</div>
											</li>
											<li>
												{/* <div className="thumbnail-container"></div> */}
												<div className="content">
													<div className="project-header">
														<h1>Short Film: "Chroma"</h1>
														<h2></h2>
													</div>
													<h3>Director & Camera Operator</h3>
													<p>
														Operated camera in a run & gun style. Awarded
														Honorable Mention in the Scholastic Art and Writing
														Competitio.
													</p>
													<span>Link pending.</span>

													{/* <span>
														<Link
															className="list-link"
															to="https://www.youtube.com/watch?v=rIlBoJhQvuY"
														>
															Link here
														</Link>
													</span> */}
												</div>
											</li>
											<li>
												{/* <div className="thumbnail-container"></div> */}
												<div className="content">
													<div className="project-header">
														<h1>Short Film: "For the Record"</h1>
														<h2></h2>
													</div>
													<h3>Director & Writer</h3>
													<p>
														Awarded First Place in the ATPI Big 72 Film
														Festival.
													</p>
													<span>Link pending.</span>

													{/* <span>
														<Link
															className="list-link"
															to="https://www.youtube.com/watch?v=rIlBoJhQvuY"
														>
															Link here
														</Link>
													</span> */}
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

export default Cinematography;
