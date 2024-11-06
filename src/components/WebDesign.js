import React from "react";
import "./styles/Standard.css";
import "./styles/WebDesign.css";

export default function WebDesign() {
	return (
		<div className="standard-container">
			<div className="leftcontainer">
				<iframe
					id="site1"
					title="frame"
					className="site1"
					src="https://www.discoverframe.com/troma/"
				></iframe>
				<iframe
					id="site2"
					title="inputcap"
					className="site2"
					src="http://www.inputcap.com/"
				></iframe>
				<iframe
					id="site3"
					title="thiswebsite"
					className="site3"
					src="http://localhost:3000/"
				></iframe>
			</div>
			<div className="rightcontainer">
				<div className="rightsubcontainer1">description</div>
				<div className="rightsubcontainer2">???</div>
			</div>
		</div>

		// <div id="projects" className="projectscontainer">
		// 	{" "}
		// 	<iframe
		// 		id="site1"
		// 		title="frame"
		// 		className="site1"
		// 		src="https://www.discoverframe.com/troma/"
		// 	></iframe>
		// 	<iframe
		// 		id="site2"
		// 		title="inputcap"
		// 		className="site2"
		// 		src="http://www.inputcap.com/"
		// 	></iframe>
		// 	<iframe
		// 		id="site3"
		// 		title="thiswebsite"
		// 		className="site3"
		// 		src="http://localhost:3000/"
		// 	></iframe>
		// 	{/* <button onClick={focusOne}>button1</button>
		// 	<button onClick={focusTwo}>button2</button>
		// 	<button onClick={focusThree}>button3</button> */}
		// </div>
	);
}
