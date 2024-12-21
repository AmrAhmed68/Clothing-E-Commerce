import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./ContactUs.css";

function ContactUs() {
  const contactDetails = [
    {
      icon: faPhone,
      title: "Call Us",
      description: "+1 (555) 123-4567",
    },
    {
      icon: faEnvelope,
      title: "Email Us",
      description: "support@yourcompany.com",
    },
    {
      icon: faMapMarkerAlt,
      title: "Visit Us",
      description: "1234 Market Street, Suite 567, San Francisco, CA",
    },
  ];

  return (
    <div className="contact-us">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-description">
        We'd love to hear from you! Reach out to us via any of the following methods:
      </p>
      <div className="contact-cards">
        {contactDetails.map((detail, index) => (
          <div className="contact-card" key={index}>
            <FontAwesomeIcon icon={detail.icon} size="2x" className="contact-icon" />
            <h2 className="contact-card-title">{detail.title}</h2>
            <p className="contact-card-description">{detail.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactUs;
