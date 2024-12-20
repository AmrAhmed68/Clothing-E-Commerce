import React from 'react'

function ContactUs() {
  return (
    <div className="contact-us">
    <h1>Contact Us</h1>
    <p>We would love to hear from you! Please use the form below to reach out to us.</p>
    <form>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Your Name" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Your Email" />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" placeholder="Your Message" rows="5"></textarea>
      </div>
      <button type="submit">Send Message</button>
    </form>
  </div>
  )
}

export default ContactUs
