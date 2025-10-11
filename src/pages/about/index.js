import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { dataabout, accolades, filmography, meta } from "../../content_option";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

export const About = () => {
  const [currentFilmIndex, setCurrentFilmIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const filmScrollRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Auto-scroll filmography every 1.75 seconds
  useEffect(() => {
    if (isHovering) return; // Don't auto-scroll when hovering

    const interval = setInterval(() => {
      setCurrentFilmIndex((prevIndex) => 
        prevIndex === filmography.length - 1 ? 0 : prevIndex + 1
      );
    }, 1750);

    return () => clearInterval(interval);
  }, [isHovering]);

  // Scroll to current film
  useEffect(() => {
    if (filmScrollRef.current) {
      const filmWidth = filmScrollRef.current.scrollWidth / filmography.length;
      filmScrollRef.current.scrollTo({
        left: filmWidth * currentFilmIndex,
        behavior: 'smooth'
      });
    }
  }, [currentFilmIndex]);

  const handleFilmClick = (index) => {
    setCurrentFilmIndex(index);
  };

  const handlePrevFilm = () => {
    setCurrentFilmIndex((prevIndex) => 
      prevIndex === 0 ? filmography.length - 1 : prevIndex - 1
    );
  };

  const handleNextFilm = () => {
    setCurrentFilmIndex((prevIndex) => 
      prevIndex === filmography.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <HelmetProvider>
      <div className="about-page">
        <Helmet>
          <meta charSet="utf-8" />
          <title>About the Founder | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        {/* Hero Section */}
        <div className="about-hero fade-in-section">
          <div className="about-hero-content">
            <div className="about-image-container image-animate">
              <img 
                src="https://vczctsjopkmmumlbmuzy.supabase.co/storage/v1/object/public/website/Headshot.jpeg" 
                alt="Aryan Bhattacharjee" 
                className="about-profile-image"
              />
            </div>
            <div className="about-text-container">
              <h1 className="about-title split-text text-fade-in">
                {dataabout.title.split('').map((char, index) => (
                  <span 
                    key={index} 
                    className="char"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </h1>
              <div className="about-typewriter">
                <Typewriter
                  options={{
                    strings: [
                      dataabout.credentials,
                      "NYU Tisch & LAMDA",
                      "International Award-Winning Filmmaker",
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 20,
                    delay: 60,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="about-content">
          <div className="about-section fade-in-section">
            <h2 className="about-section-title text-fade-in">Background</h2>
            <p className="about-text text-fade-in">{dataabout.aboutme}</p>
          </div>

          <div className="about-section fade-in-section">
            <h2 className="about-section-title text-fade-in">Recognition & Impact</h2>
            <p className="about-text text-fade-in">{dataabout.experience}</p>
          </div>

          <div className="about-section fade-in-section">
            <h2 className="about-section-title text-fade-in">Teaching Philosophy</h2>
            <p className="about-text text-fade-in">{dataabout.philosophy}</p>
          </div>
        </div>

        {/* Filmography Section - Horizontal Scrolling */}
        <div className="filmography-section">
          <div className="filmography-content">
            <h2 className="section-title fade-in-section text-fade-in">Filmography</h2>
            
            <div className="filmography-carousel-wrapper">
              {/* Previous Arrow */}
              <button 
                className="carousel-arrow carousel-arrow-prev"
                onClick={handlePrevFilm}
                aria-label="Previous film"
              >
                ‹
              </button>

              <div 
                className="filmography-carousel"
                ref={filmScrollRef}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="filmography-track">
                  {filmography.map((film, index) => (
                    <div key={index} className="film-slide">
                      <div className="film-details">
                        <h3 className="film-title">{film.title}</h3>
                        <p className="film-role">{film.role}</p>
                        <p className="film-description">{film.description}</p>
                      </div>
                      <div className="film-video">
                        <iframe
                          src={film.videoUrl}
                          title={film.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Arrow */}
              <button 
                className="carousel-arrow carousel-arrow-next"
                onClick={handleNextFilm}
                aria-label="Next film"
              >
                ›
              </button>
            </div>

            {/* Navigation Dots */}
            <div className="filmography-dots">
              {filmography.map((_, index) => (
                <button
                  key={index}
                  className={`film-dot ${index === currentFilmIndex ? 'active' : ''}`}
                  onClick={() => handleFilmClick(index)}
                  aria-label={`View film ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Accolades Section */}
        <div 
          className="accolades-section"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)), url(https://vczctsjopkmmumlbmuzy.supabase.co/storage/v1/object/public/website/afar.png)`
          }}
        >
          <div className="accolades-content">
            <h2 className="section-title fade-in-section text-fade-in">Accolades</h2>
            <ul className="accolades-list">
              {accolades.map((accolade, index) => (
                <li key={index} className="accolade-item fade-in-section card-animate">
                  <span className="accolade-award">{accolade.award}</span>
                  <span className="accolade-festival">{accolade.festival}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="about-cta fade-in-section">
          <Link to="/resume" className="btn-primary btn-animate">
            See Resume
          </Link>
          <a 
            href="https://www.linkedin.com/in/aryan-bhattacharjee/details/education/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary btn-animate"
          >
            View LinkedIn
          </a>
        </div>
      </div>
    </HelmetProvider>
  );
};