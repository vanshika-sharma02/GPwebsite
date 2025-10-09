import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta, studioOfferings } from "../../content_option";
import { Link } from "react-router-dom";

export const Home = () => {
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
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

    // Mouse move parallax effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        
        {/* Hero Section with Background Image */}
                <div 
                  className="hero-section" 
                  ref={heroRef}
                  style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url(https://vczctsjopkmmumlbmuzy.supabase.co/storage/v1/object/public/website/COTS%20POSTER%20IMAGE.jpeg)`
                  }}
                >
          <div 
            className="hero-background-layer"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
            }}
          ></div>
          <div className="hero-content fade-in-section">
            <h1 className="hero-title split-text">
              {introdata.title.split('').map((char, index) => (
                <span 
                  key={index} 
                  className="char"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>
            <div className="hero-animated">
              <Typewriter
                options={{
                  strings: [
                    introdata.animated.first,
                    introdata.animated.second,
                    introdata.animated.third,
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 20,
                  delay: 60,
                }}
              />
            </div>
            <p className="hero-description">{introdata.description}</p>
          </div>
        </div>

        {/* Mission Statement Section */}
        <div className="mission-section fade-in-section">
          <div className="mission-content">
            <h2 className="section-title text-fade-in">Our Mission</h2>
            <p className="mission-text text-fade-in">
              Gitanjali Productions is dedicated to creating films that explore the ephemeral nature of existence, 
              seeking to capture the essence of life in ways that inspire reflection and growth. Through our work, 
              we aim to bridge the gap between art and humanity, making cinema that resonates on a deeply personal level.
            </p>
            <div className="mission-pillars">
              <div className="pillar-item card-animate">
                <h3 className="pillar-title">Authentic Storytelling</h3>
                <p className="pillar-text">We believe in stories that reflect genuine human experiences and emotions</p>
              </div>
              <div className="pillar-item card-animate">
                <h3 className="pillar-title">Cultural Bridge</h3>
                <p className="pillar-text">Blending global cinematic craft with deep-rooted Indian storytelling traditions</p>
              </div>
              <div className="pillar-item card-animate">
                <h3 className="pillar-title">Education First</h3>
                <p className="pillar-text">Nurturing the next generation of filmmakers through accessible education</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Process Section with Integrated Offerings */}
        <div 
          className="process-section fade-in-section"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)), url(https://vczctsjopkmmumlbmuzy.supabase.co/storage/v1/object/public/website/immortal.png)`
          }}
        >
          <div className="process-content">
            <h2 className="section-title text-fade-in">Our Process</h2>
            <div className="process-timeline">
              {studioOfferings.map((offering, index) => (
                <div key={index} className="process-step card-animate" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="step-marker"></div>
                  <div className="step-content">
                    <div className="step-number">{String(index + 1).padStart(2, '0')}</div>
                    <h3 className="step-title">{offering.title}</h3>
                    <p className="step-description">{offering.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section fade-in-section">
          <div className="cta-content">
            <h2 className="cta-title text-fade-in">Ready to tell your story?</h2>
            <div className="cta-buttons">
              <Link to="/portfolio" className="btn-primary btn-animate">
                Explore Workshop
              </Link>
              <Link to="/about" className="btn-secondary btn-animate">
                Meet the Founder
              </Link>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};