import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { dataabout, accolades, filmography, meta } from "../../content_option";
import { Link } from "react-router-dom";

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

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Auto-scroll filmography every 4 seconds
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setCurrentFilmIndex((prevIndex) => 
        prevIndex === filmography.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

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

        {/* Hero Section - Split Layout */}
        <div className="about-hero-split">
          <div className="about-hero-image-side">
            <img 
              src="https://vczctsjopkmmumlbmuzy.supabase.co/storage/v1/object/public/website/Headshot.jpeg" 
              alt="Aryan Wangchuk" 
              className="about-hero-image"
            />
          </div>
          <div className="about-hero-content-side">
            <div className="about-hero-content animate-on-scroll">
              <h1 className="about-title">{dataabout.title}</h1>
              <p className="about-credentials">{dataabout.credentials}</p>
            </div>
          </div>
        </div>

        {/* Bio Sections */}
        <div className="about-bio-section">
          <div className="about-bio-content">
            <div className="bio-block animate-on-scroll">
              <h2>Background</h2>
              <p>{dataabout.aboutme}</p>
            </div>

            <div className="bio-block animate-on-scroll">
              <h2>Recognition & Impact</h2>
              <p>{dataabout.experience}</p>
            </div>

            <div className="bio-block animate-on-scroll">
              <h2>Teaching Philosophy</h2>
              <p>{dataabout.philosophy}</p>
            </div>
          </div>
        </div>

        {/* Filmography Section */}
        <div className="filmography-section">
          <div className="filmography-header animate-on-scroll">
            <h2>Filmography</h2>
          </div>
          
          <div className="filmography-carousel-wrapper">
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
                    <div className="film-video-container">
                      <iframe
                        src={film.videoUrl}
                        title={film.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="film-info">
                      <h3 className="film-title">{film.title}</h3>
                      <p className="film-role">{film.role}</p>
                      <p className="film-description">{film.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              className="carousel-arrow carousel-arrow-next"
              onClick={handleNextFilm}
              aria-label="Next film"
            >
              ›
            </button>
          </div>

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

        {/* Accolades Section */}
        <div className="accolades-section">
          <div className="accolades-header animate-on-scroll">
            <h2>Accolades</h2>
          </div>
          <div className="accolades-grid">
            {accolades.map((accolade, index) => (
              <div key={index} className="accolade-card animate-on-scroll" style={{ animationDelay: `${index * 0.05}s` }}>
                <span className="accolade-award">{accolade.award}</span>
                <span className="accolade-festival">{accolade.festival}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="about-cta-section">
          <div className="about-cta-content animate-on-scroll">
            <Link to="/resume" className="btn-primary">
              See Resume
            </Link>
            <a 
              href="https://www.linkedin.com/in/aryanwangchuk/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View LinkedIn
            </a>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};
