// import React from "react";
// import "./styles/Standard.css";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// // Validation schema for the form
// const ContactSchema = Yup.object().shape({
// 	name: Yup.string().required("Name is required"),
// 	email: Yup.string().email("Invalid email").required("Email is required"),
// 	message: Yup.string().required("Message is required"),
// });

// const Contact = () => {
// 	return (
// 		<Formik
// 			initialValues={{ name: "", email: "", message: "" }}
// 			validationSchema={ContactSchema}
// 			onSubmit={(values, { resetForm }) => {
// 				console.log("Form data:", values);
// 				resetForm();
// 			}}
// 		>
// 			{({ isSubmitting }) => (
// 				<Form className="contact-form">
// 					<div className="form-group">
// 						<label htmlFor="name">Name</label>
// 						<Field type="text" name="name" placeholder="Your Name" />
// 						<ErrorMessage name="name" component="div" className="error" />
// 					</div>

// 					<div className="form-group">
// 						<label htmlFor="email">Email</label>
// 						<Field type="email" name="email" placeholder="Your Email" />
// 						<ErrorMessage name="email" component="div" className="error" />
// 					</div>

// 					<div className="form-group">
// 						<label htmlFor="message">Message</label>
// 						<Field
// 							as="textarea"
// 							name="message"
// 							placeholder="Your Message"
// 							rows="4"
// 						/>
// 						<ErrorMessage name="message" component="div" className="error" />
// 					</div>

// 					<button type="submit" disabled={isSubmitting}>
// 						{isSubmitting ? "Sending..." : "Send Message"}
// 					</button>
// 				</Form>
// 			)}
// 		</Formik>
// 	);
// };

// export default Contact;
