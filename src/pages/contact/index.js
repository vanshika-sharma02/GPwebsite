import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import Typewriter from "typewriter-effect";

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const mailtoLink = `mailto:sharma.vanshika1604@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <HelmetProvider>
      <div 
        className="contact-page"
        style={{
          backgroundImage: `url(https://vczctsjopkmmumlbmuzy.supabase.co/storage/v1/object/public/website/2.png)`
        }}
      >
        <Helmet>
          <meta charSet="utf-8" />
          <title>Contact | {meta.title}</title>
          <meta name="description" content="Get in touch with Gitanjali Productions" />
        </Helmet>

        <div className="contact-container">
          <div className="contact-content fade-in-section">
            <h1 className="contact-title split-text text-fade-in">
              {'Get in Touch'.split('').map((char, index) => (
                <span 
                  key={index} 
                  className="char"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>
            <div className="contact-typewriter text-fade-in">
              <Typewriter
                options={{
                  strings: [
                    "Have a question?",
                    "Want to work together?",
                    "Let's create something amazing",
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 20,
                  delay: 60,
                }}
              />
            </div>

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
                  placeholder="Your name"
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
                  placeholder="your@email.com"
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
                  rows="6"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button type="submit" className="btn-submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};