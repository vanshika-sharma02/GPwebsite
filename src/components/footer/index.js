import React from "react";
import "./style.css";
import { FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { socialprofils } from "../../content_option";

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-left">
          <p className="footer-text">
            © 2025 by Aryan Bhattacharjee | aryanb1304@gmail.com | +1(646)400-4636
          </p>
        </div>
        <div className="footer-right">
          <div className="footer-socials">
            <a 
              href={socialprofils.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a 
              href={socialprofils.twitter || "https://x.com/gitanjalifilms"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="X (Twitter)"
            >
              <FaXTwitter />
            </a>
            <a 
              href={socialprofils.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a 
              href={socialprofils.youtube} 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
