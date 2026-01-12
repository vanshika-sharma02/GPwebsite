import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { VscGrabber, VscClose } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import { logotext, socialprofils } from "../content_option";

const Headermain = () => {
  const [isActive, setActive] = useState("false");
  const [isDark, setIsDark] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("ovhidden");
  };

  const handleClose = () => {
    setActive("false");
    document.body.classList.remove("ovhidden");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !isActive) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  // Detect if header is over a dark background
  useEffect(() => {
    const checkBackground = () => {
      const scrollY = window.scrollY;
      let isDarkBackground = false;

      // Check for dark sections based on page and scroll position
      if (location.pathname === '/') {
        // Home page - hero and process sections are dark
        const heroSection = document.querySelector('.hero-section');
        const processSection = document.querySelector('.process-section');
        
        if (heroSection) {
          const heroRect = heroSection.getBoundingClientRect();
          if (heroRect.top < 100 && heroRect.bottom > 0) {
            isDarkBackground = true;
          }
        }
        
        if (processSection && !isDarkBackground) {
          const processRect = processSection.getBoundingClientRect();
          if (processRect.top < 100 && processRect.bottom > 0) {
            isDarkBackground = true;
          }
        }
      } else if (location.pathname === '/contact') {
        // Contact page has dark background
        isDarkBackground = true;
      }

      setIsDark(isDarkBackground);
    };

    checkBackground();
    window.addEventListener('scroll', checkBackground);
    window.addEventListener('resize', checkBackground);
    
    // Small delay to ensure DOM is ready
    setTimeout(checkBackground, 100);

    return () => {
      window.removeEventListener('scroll', checkBackground);
      window.removeEventListener('resize', checkBackground);
    };
  }, [location]);

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className={`fixed-top site__header ${isDark ? 'header-on-dark' : 'header-on-light'}`}>
        <div className="header-content">
          <Link className="navbar-brand nav_ac" to="/">
            {logotext}
          </Link>
          
          {/* Desktop Navigation - Always visible */}
          <nav className="desktop-nav">
            <Link to="/" className={isActivePath("/") ? "active" : ""}>Home</Link>
            <Link to="/about" className={isActivePath("/about") || isActivePath("/resume") ? "active" : ""}>About</Link>
            <Link to="/contact" className={isActivePath("/contact") ? "active" : ""}>Contact</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="menu__button nav_ac" onClick={handleToggle}>
            {!isActive ? <VscClose /> : <VscGrabber />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`site__navigation ${!isActive ? "menu__opend" : ""}`} ref={menuRef}>
          <button className="menu__close" onClick={handleClose} aria-label="Close menu">
            <VscClose />
          </button>
          <div className="bg__menu h-100">
            <div className="menu__wrapper">
              <div className="menu__container p-3">
                <ul className="the_menu">
                  <li className="menu_item">
                    <Link onClick={handleClose} to="/" className="my-3">Home</Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleClose} to="/about" className="my-3">About</Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleClose} to="/contact" className="my-3">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="menu_footer d-flex flex-column flex-md-row justify-content-between align-items-md-center position-absolute w-100 p-3">
            <div className="d-flex">
              <a href={socialprofils.linkedin}>LinkedIn</a>
              <a href={socialprofils.youtube}>YouTube</a>
              <a href={socialprofils.instagram}>Instagram</a>
              <a href={socialprofils.whatsapp}>WhatsApp</a>
            </div>
            <p className="copyright m-0">{logotext}</p>
          </div>
        </div>
      </header>
      <div className="br-top"></div>
      <div className="br-bottom"></div>
      <div className="br-left"></div>
      <div className="br-right"></div>
    </>
  );
};

export default Headermain;
