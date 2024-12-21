import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and About Section */}
        <div className="footer-section about">
          <h3>BAZARO</h3>
          <p>
          BAZARO is your one-stop shop for the latest trends and best deals. 
            Discover quality products and enjoy a seamless shopping experience.
          </p>
        </div>

        {/* Categories Section */}
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li>Men's Clothing</li>
            <li>Women's Clothing</li>
            <li>Electronics</li>
            <li>Home & Kitchen</li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section contact">
          <h4>Contact</h4>
          <p>
            <strong>Address:</strong> 123 Market Street, Cityville, 56789
          </p>
          <p>
            <strong>Email:</strong> support@shopease.com
          </p>
          <p>
            <strong>Phone:</strong> +1 234 567 8900
          </p>
          <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-linkedin"></i>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2024 ShopEase. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
