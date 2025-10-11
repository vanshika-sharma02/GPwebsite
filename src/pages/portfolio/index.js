import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { curriculum, schedule, workshopIntro, workshopCurriculumDescription, faqs, contactConfig, enrollmentLink, meta } from "../../content_option";
import { supabase } from "../../supabaseClient";
import { countryCodes } from "../../countryCodes";

export const Portfolio = () => {
  useEffect(() => {
    // No need for scroll-based header color changes anymore
    // Header will always be transparent with black text
    return () => {
      // Cleanup if needed
    };
  }, []);
  const [expandedDay, setExpandedDay] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+1",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  
  const enrollmentFormRef = useRef(null);

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

  const scrollToEnrollment = (e) => {
    e.preventDefault();
    enrollmentFormRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const toggleDay = (index) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Save to Supabase first
      const enrollmentData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: `${formData.countryCode}${formData.phone}`.replace(/\s+/g, ''),
        countryCode: formData.countryCode,
        message: formData.message ? formData.message.trim() : null,
        workshop_title: workshopIntro.title,
        created_at: new Date().toISOString()
      };

      console.log('📤 Saving to Supabase:', enrollmentData);

      const { data, error } = await supabase
        .from('enrollments')
        .insert([enrollmentData])
        .select();

      if (error) {
        console.error('❌ Supabase error:', error);
        throw new Error(`Database error: ${error.message}`);
      }

      console.log('✅ Saved to Supabase:', data);

      // Show success message
      setSubmitMessage("✅ Enrollment saved successfully! Redirecting to payment...");

      // Save to localStorage as backup
      const localData = {
        ...enrollmentData,
        supabase_id: data[0]?.id
      };
      const existingEnrollments = JSON.parse(localStorage.getItem('workshopEnrollments') || '[]');
      existingEnrollments.push(localData);
      localStorage.setItem('workshopEnrollments', JSON.stringify(existingEnrollments));

      // Reset form
      setFormData({ name: "", email: "", countryCode: "+1", phone: "", message: "" });
      
      // Redirect to Razorpay payment page after delay
      setTimeout(() => {
        window.location.href = enrollmentLink;
      }, 1500);

    } catch (error) {
      console.error('❌ Unexpected error:', error);
      setSubmitMessage(`❌ Something went wrong. Please contact us directly.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <HelmetProvider>
      <div className="curriculum-page">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Scriptwriting Workshop | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        {/* Hero Section */}
        <div 
          className="curriculum-hero fade-in-section"
          style={{
            backgroundImage: `url(https://vczctsjopkmmumlbmuzy.supabase.co/storage/v1/object/public/website/piano.png)`
          }}
        >
          <div className="curriculum-hero-content">
            <h1 className="curriculum-title split-text">
              {workshopIntro.title.split('').map((char, index) => (
                <span 
                  key={index} 
                  className="char"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>
            <div className="curriculum-typewriter">
              <Typewriter
                options={{
                  strings: [
                    workshopIntro.animated.first,
                    workshopIntro.animated.second,
                    workshopIntro.animated.third,
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 20,
                  delay: 60,
                }}
              />
            </div>
            <p className="curriculum-details-text">{workshopIntro.details}</p>
            <div className="curriculum-cta">
              <button 
                onClick={scrollToEnrollment} 
                className="btn-primary"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>

        {/* Compressed Overview Section */}
        <div className="overview-section fade-in-section">
          <div className="overview-content">
            <div className="overview-grid">
              <div className="overview-item">
                <h3 className="overview-title">Essence</h3>
                <ul className="overview-list">
                  {workshopIntro.essence.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="overview-item">
                <h3 className="overview-title">{workshopIntro.aiSection.title}</h3>
                <ul className="overview-list">
                  {workshopIntro.aiSection.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="overview-item">
                <h3 className="overview-title">Outcomes</h3>
                <ul className="overview-list">
                  {workshopIntro.outcomes.slice(0, 3).map((outcome, index) => (
                    <li key={index}>{outcome}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Enrollment Form Section */}
        <div 
          className="enrollment-form-section fade-in-section" 
          ref={enrollmentFormRef} 
          id="enrollment-form"
          style={{
            backgroundImage: `url(https://vczctsjopkmmumlbmuzy.supabase.co/storage/v1/object/public/website/1.png)`
          }}
        >
          <div className="enrollment-form-content">
            <h2 className="section-title text-fade-in">Enroll Now</h2>
            <p className="enrollment-intro text-fade-in">Fill out the form below and proceed to payment</p>
            
            <form onSubmit={handleFormSubmit} className="enrollment-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <div className="phone-input-group">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="country-code-select"
                    disabled={isSubmitting}
                  >
                    {countryCodes.map((country, index) => (
                      <option key={index} value={country.code}>
                        {country.code} {country.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="123 456 7890"
                    disabled={isSubmitting}
                    className="phone-number-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Tell us about yourself (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Share a bit about your background and interest in the acting intensive..."
                  disabled={isSubmitting}
                ></textarea>
              </div>

              {submitMessage && (
                <div className={`submit-message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
                  {submitMessage}
                </div>
              )}

              <button type="submit" className="btn-primary large" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Submit Enrollment'}
              </button>
            </form>

            <p className="enrollment-note">
              After submitting, you'll be redirected to complete payment via Razorpay. 
              You'll receive confirmation within 12 hours via WhatsApp or email.
            </p>
          </div>
        </div>

        {/* Curriculum Section */}
        <div className="curriculum-content fade-in-section">
          <h2 className="section-title text-fade-in">Curriculum</h2>
          <p className="curriculum-description text-fade-in">{workshopCurriculumDescription}</p>
          
          <ul className="curriculum-list">
            {curriculum.map((day, index) => (
              <li 
                key={index} 
                className="curriculum-item"
                onClick={() => toggleDay(index)}
                style={{
                  '--bg-image': `url(https://vczctsjopkmmumlbmuzy.supabase.co/storage/v1/object/public/website/cots.png)`,
                  '--bg-position-y': `${(index / (curriculum.length - 1)) * 100}%`
                }}
              >
                <div className="curriculum-header">
                  <div className="curriculum-info">
                    <h3 className="curriculum-day">{day.day}</h3>
                    <h4 className="curriculum-title-item">{day.title}</h4>
                  </div>
                  <button className="expand-toggle" aria-label="Expand curriculum details">
                    {expandedDay === index ? '−' : '+'}
                  </button>
                </div>
                
                {expandedDay === index && (
                  <div className="curriculum-details">
                    <ul className="topics-list">
                      {day.topics.map((topic, i) => (
                        <li key={i}>{topic}</li>
                      ))}
                    </ul>
                    <p className="deliverable"><strong>Deliverable:</strong> {day.deliverable}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Schedule Section */}
        <div className="schedule-section fade-in-section">
          <div className="schedule-content">
            <h2 className="section-title text-fade-in">Schedule</h2>
            <ul className="schedule-list">
              <li><strong>Dates:</strong> {schedule.dates}</li>
              <li><strong>Time:</strong> {schedule.time}</li>
              <li><strong>Platform:</strong> {schedule.platform}</li>
              <li><strong>Language:</strong> {schedule.language}</li>
              <li><strong>Class Size:</strong> {schedule.classSize}</li>
            </ul>
          </div>
        </div>

        {/* FAQs Section */}
        <div 
          className="faqs-section fade-in-section"
          style={{
            backgroundImage: `url(https://vczctsjopkmmumlbmuzy.supabase.co/storage/v1/object/public/website/3.png)`
          }}
        >
          <div className="faqs-content">
            <h2 className="section-title text-fade-in">FAQs</h2>
            <ul className="faqs-list">
              {faqs.map((faq, index) => (
                <li 
                  key={index}
                  className="faq-item"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="faq-question">
                    <h3 className="faq-question-text">{faq.question}</h3>
                    <button className="faq-toggle" aria-label="Expand FAQ answer">
                      {expandedFaq === index ? '−' : '+'}
                    </button>
                  </div>
                  {expandedFaq === index && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Refund Policy */}
        <div className="refund-section fade-in-section">
          <div className="refund-content">
            <h2 className="section-title text-fade-in">Refund Policy</h2>
            <p className="refund-text text-fade-in">{contactConfig.refundPolicy}</p>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};