import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './styles/Footer.css';

export default function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    console.log('Newsletter signup submitted');
  }
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">About Us</h3>
          <p className="footer-text">We are dedicated to providing the best products and services to our customers.</p>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/products" className="footer-link">Products</Link></li>
            <li><Link to="/about" className="footer-link">About</Link></li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Newsletter</h3>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-button">Subscribe</button>
          </form>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Follow Us</h3>
          <div className="social-links">
            <a href="https://www.facebook.com/profile.php?id=61573859632266" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
              <Facebook size={24} />
            </a>
            <a href="https://twitter.com/gajraj_chak_12" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
              <Twitter size={24} />
            </a>
            <a href="https://www.instagram.com/amancomputer2023" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <Instagram size={24} />
            </a>
            <a href="https://linkedin.com/in/gajrajchakrawarti12" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="copyright">&copy; 2023 Aman Computer. All rights reserved.</p>
      </div>
    </footer>
  );
}
