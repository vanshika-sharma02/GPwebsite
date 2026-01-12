import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { introdata, meta, studioOfferings } from "../../content_option";
import { Link } from "react-router-dom";

// Image placeholders for feature cards
const featureImages = [
  "https://vczctsjopkmmumlbmuzy.supabase.co/storage/v1/object/public/website/1.png",
  "https://vczctsjopkmmumlbmuzy.supabase.co/storage/v1/object/public/website/2.png",
  "https://vczctsjopkmmumlbmuzy.supabase.co/storage/v1/object/public/website/3.png",
  "https://vczctsjopkmmumlbmuzy.supabase.co/storage/v1/object/public/website/4.png"
];

export const Home = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollToDirection = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 340; // 320px card + 20px gap
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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

    // Check scroll position on mount and scroll
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
    }

    return () => {
      observer.disconnect();
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
      }
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
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(https://vczctsjopkmmumlbmuzy.supabase.co/storage/v1/object/public/website/COTS%20POSTER%20IMAGE.jpeg)`
          }}
        >
          <div className="hero-content">
            <h1 className="hero-title animate-on-scroll">{introdata.title}</h1>
            <p className="hero-tagline animate-on-scroll">{introdata.animated.first}</p>
          </div>
        </div>

        {/* Horizontal Scroll Feature Cards */}
        <div className="features-section">
          <div className="features-header animate-on-scroll">
            <span className="features-label">WHAT WE DO</span>
            <p className="features-description">{introdata.description}</p>
          </div>
          
          <div className="features-wrapper">
            <div className="features-scroll-container" ref={scrollRef}>
              <div className="features-scroll-track">
                {studioOfferings.map((offering, index) => (
                  <div key={index} className="feature-card animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="feature-image-container">
                      <img 
                        src={featureImages[index] || featureImages[0]} 
                        alt={offering.title}
                        className="feature-image"
                      />
                    </div>
                    <div className="feature-content">
                      <h3 className="feature-title">{offering.title}</h3>
                      <p className="feature-description">{offering.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mission-section">
          <div className="mission-content animate-on-scroll">
            <h2 className="mission-title">Our Mission</h2>
            <p className="mission-text">
              Gitanjali Productions is dedicated to creating films that explore the ephemeral nature of existence, 
              seeking to capture the essence of life in ways that inspire reflection and growth. Through our work, 
              we aim to bridge the gap between art and humanity, making cinema that resonates on a deeply personal level.
            </p>
          </div>
          
          <div className="mission-pillars">
            <div className="pillar-card animate-on-scroll">
              <h3>Authentic Storytelling</h3>
              <p>We believe in stories that reflect genuine human experiences and emotions</p>
            </div>
            <div className="pillar-card animate-on-scroll">
              <h3>Cultural Bridge</h3>
              <p>Blending global cinematic craft with deep-rooted Indian storytelling traditions</p>
            </div>
            <div className="pillar-card animate-on-scroll">
              <h3>Education First</h3>
              <p>Nurturing the next generation of filmmakers through accessible education</p>
            </div>
          </div>
        </div>

        {/* Process Media Section with Background */}
        <div 
          className="process-media-section"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(https://vczctsjopkmmumlbmuzy.supabase.co/storage/v1/object/public/website/immortal.png)`
          }}
        >
          <div className="process-media-content animate-on-scroll">
            <h2>From Script to Screen</h2>
            <p>Every frame tells a story. Every story leaves a mark.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-content animate-on-scroll">
            <h2 className="cta-title">Ready to tell your story?</h2>
            <div className="cta-buttons">
              <Link to="/about" className="btn-primary">
                Meet the Founder
              </Link>
              <Link to="/contact" className="btn-secondary">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
