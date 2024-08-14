import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer mt-auto py-4 bg-black text-white">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <h5>About Us</h5>
            <p>
              We are a leading company in our field, dedicated to providing the best services to our customers. Our goal is to always exceed your expectations.
            </p>
          </div>
          <div className="col-md-3 col-sm-6">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/home" className="text-white">Home</a></li>
              <li><a href="/about" className="text-white">About</a></li>
              <li><a href="/services" className="text-white">Services</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li><i className="fas fa-map-marker-alt"></i> 123 Main Street, Anytown</li>
              <li><i className="fas fa-phone"></i> +1 234 567 890</li>
              <li><i className="fas fa-envelope"></i> info@example.com</li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6">
            <h5>Follow Us</h5>
            <ul className="list-unstyled social-icons">
              <li><a href="https://facebook.com" className="text-white"><i className="fab fa-facebook-f"></i> Facebook</a></li>
              <li><a href="https://twitter.com" className="text-white"><i className="fab fa-twitter"></i> Twitter</a></li>
              <li><a href="https://linkedin.com" className="text-white"><i className="fab fa-linkedin"></i> LinkedIn</a></li>
              <li><a href="https://instagram.com" className="text-white"><i className="fab fa-instagram"></i> Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>&copy; 2024 Exclusive. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
