import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/Contact.css";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSuccessMessage(
      "Message Sent! We'll get back to you as soon as possible."
    );
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-grid">
          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>Send us a message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
            {successMessage && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                {successMessage}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="contact-info-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2>Contact Information</h2>
            <div className="contact-info">
              <div className="info-item">
                <MapPin />
                <div>
                  <h3>Address</h3>
                  <p>Binaika Tiraha Mandla</p>
                  <p>Madhya Pradesh 481661</p>
                </div>
              </div>
              <div className="info-item">
                <Phone />
                <div>
                  <h3>Phone</h3>
                  <Link to="callto:+919770277454">+91 9770277454</Link>
                </div>
              </div>
              <div className="info-item">
                <Mail />
                <div>
                  <h3>Email</h3>
                  <Link to="mailto:amankumarjhariya2005@gmail.com">amankumarjhariya2005@gmail.com</Link>
                </div>
              </div>
              <div className="info-item">
                <Clock />
                <div>
                  <h3>Business Hours</h3>
                  <p>Monday - Friday: 10:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="map-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2>Find Us</h2>
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3501.126800032078!2d80.383855!3d22.602380000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDM2JzA4LjYiTiA4MMKwMjMnMDEuOSJF!5e1!3m2!1sen!2sin!4v1740634251617!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="fast"
              title="Google Maps"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
