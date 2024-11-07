import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import "./styles/Contact.css";

export default function Contact() {
	const [state, handleSubmit] = useForm("xqakqebl");
	if (state.succeeded) {
		return <p>Thanks for joining!</p>;
	}
	return (
		<div className="contact-container">
			<h1>Reach out now:</h1>
			<form onSubmit={handleSubmit}>
				<div className="email-section">
					<input
						id="email"
						type="email"
						name="email"
						placeholder="Email Address"
					/>
				</div>
				<div className="message-section">
					<textarea id="message" name="message" placeholder="Message" />
				</div>
				<ValidationError
					prefix="Message"
					field="message"
					errors={state.errors}
				/>
				<button type="submit" disabled={state.submitting}>
					Submit
				</button>
			</form>
		</div>
	);
}
