import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Link } from "react-router-dom";

export const Resume = () => {
  return (
    <HelmetProvider>
      <div className="resume-page">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Resume | {meta.title}</title>
          <meta name="description" content="Aryan Wangchuk's professional resume" />
        </Helmet>

        {/* Header */}
        <div className="resume-header">
          <div className="resume-header-content">
            <h1 className="resume-name">Aryan Wangchuk</h1>
            <p className="resume-contact">
              +1 (646) 957-6086 | aryanwangchuk@gmail.com
            </p>
            <Link to="/about" className="btn-back">← Back to About</Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="resume-content">
          
          {/* Education */}
          <section className="resume-section">
            <h2 className="section-heading">Education</h2>
            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">New York University, New York</h3>
                <span className="item-date">September 2020 - May 2024</span>
              </div>
              <p className="item-subtitle">BFA, Collaborative Arts [Tisch] & BA. Philosophy</p>
            </div>
            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">The Doon School, Dehradun</h3>
                <span className="item-date">February 2015 - May 2020</span>
              </div>
              <p className="item-subtitle">IB Diploma Program, SAT 1510</p>
            </div>
          </section>

          {/* Certifications */}
          <section className="resume-section">
            <h2 className="section-heading">Certifications</h2>
            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">Corporate Financial Institute (CFI)</h3>
                <span className="item-date">April 2024 - Present</span>
              </div>
              <p className="item-subtitle">Financial Valuation and Modelling Analyst</p>
            </div>
            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">Trinity College, London</h3>
                <span className="item-date">January 2015 - May 2019</span>
              </div>
              <p className="item-subtitle">Drama and Communication, Grade 8 (Distinction)</p>
            </div>
          </section>

          {/* Teaching and Research */}
          <section className="resume-section">
            <h2 className="section-heading">Teaching and Research</h2>
            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">Visiting Professor, Himalayan Institute of Alternatives, Ladakh</h3>
                <span className="item-date">July 2023</span>
              </div>
            </div>
            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">Teaching Assistant, Filmmaking and Screenwriting, NYU</h3>
                <span className="item-date">September 2023 - December 2023</span>
              </div>
              <ul className="item-list">
                <li>Conducted recitation sessions on filmmaking and screenwriting.</li>
                <li>Used relatable examples, such as comparing cinematic rhythm to musical phrasing, to make abstract principles like narrative pacing and visual storytelling accessible.</li>
                <li>Fostered a collaborative learning environment where students felt encouraged to ask questions and actively participate.</li>
              </ul>
            </div>
          </section>

          {/* Experience */}
          <section className="resume-section">
            <h2 className="section-heading">Experience</h2>
            
            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">Gitanjali Productions, New York - Founder & Creative Director</h3>
                <span className="item-date">January 2021 - Present</span>
              </div>
              <ul className="item-list">
                <li>Founded and led a production house focused on social awareness through art.</li>
                <li>Managed a team of 12+, developed strategy, project management, fundraising, and marketing.</li>
                <li>Produced 2 award-winning films and 4 internationally featured plays, hosted events, and partnered with various changemakers.</li>
              </ul>
            </div>

            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">Light, Inc., New York - Founder & CEO</h3>
                <span className="item-date">October 2025 - Present</span>
              </div>
              <ul className="item-list">
                <li>Building a professional workflow OS for AI film that orchestrates production tasks across modern creative pipelines.</li>
                <li>Currently being piloted at Warner Bros (Los Angeles).</li>
              </ul>
            </div>

            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">Relay Stories., New York - Founder & CEO</h3>
                <span className="item-date">January 2025 - October 2025</span>
              </div>
              <ul className="item-list">
                <li>Built and scaled a film discovery/storytelling platform to 3,000 monthly users.</li>
                <li>Hosted 120+ films, including Oscar and Emmy nominated work.</li>
              </ul>
            </div>

            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">Edinburgh Fringe Festival, Edinburgh - Co-Director & Producer</h3>
                <span className="item-date">January 2023 - August 2023</span>
              </div>
              <ul className="item-list">
                <li>Developed, produced, successfully crowdfunded, and marketed an original play, 'Midnight Building,' for a monthlong run at Greenside Theatre.</li>
              </ul>
            </div>

            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">William Tunnicliffe Productions, New York - Associate Producer</h3>
                <span className="item-date">February 2023 - June 2023</span>
              </div>
              <ul className="item-list">
                <li>Assisted the Academy Award-nominated director with post-production, editing, accessibility, captioning, and distribution strategy on a feature documentary.</li>
              </ul>
            </div>
          </section>

          {/* Projects */}
          <section className="resume-section">
            <h2 className="section-heading">Projects</h2>
            
            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">Snow, Animated Short Film (AI Powered), New York - Founder & Creative Director</h3>
                <span className="item-date">January 2025 - Present</span>
              </div>
              <ul className="item-list">
                <li>Wrote and directed an animated short film powered entirely by AI (end-to-end AI-assisted pipeline).</li>
                <li>Currently in the festival circuit.</li>
              </ul>
            </div>

            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">One Wayward Honk, Narrative Short Film, New York - Writer, Director & Editor</h3>
                <span className="item-date">February 2023 - May 2023</span>
              </div>
              <ul className="item-list">
                <li>A disgruntled elderly poet coping with the loss of his beloved granddaughter searches for a reason to live.</li>
              </ul>
            </div>

            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">Look Over Your Shoulder, Pop-Single, New York - Singer, Songwriter & Producer</h3>
                <span className="item-date">September 2021 - December 2021</span>
              </div>
              <ul className="item-list">
                <li>Composed and produced the song. Distributed it on major music streaming platforms (Spotify, iTunes, YouTube Music).</li>
                <li>Promoted the single to 13 million streams on social media.</li>
              </ul>
            </div>

            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">Immortal, Narrative Short Film, New York - Writer, Director & Editor</h3>
                <span className="item-date">September 2021 - December 2021</span>
              </div>
              <ul className="item-list">
                <li>In a gruelling exposition of love, loss, and music, a young pianist explores his voice through the echoes of his mother's recent death.</li>
              </ul>
            </div>

            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">Children of the Sea, Narrative Short Film, Kolkata - Writer & Director</h3>
                <span className="item-date">September 2021 - December 2021</span>
              </div>
              <ul className="item-list">
                <li>Chronicling the plight of small fishermen and marine health in Eastern India, two fathers and their children cross paths, leading their lives to a bittersweet conclusion.</li>
              </ul>
            </div>
          </section>

          {/* Awards */}
          <section className="resume-section">
            <h2 className="section-heading">Awards</h2>
            <div className="awards-grid">
              <div className="award-item">
                <span className="award-title">Best Student Film 'Immortal'</span>
                <span className="award-festival">World Film Carnival, Singapore</span>
              </div>
              <div className="award-item">
                <span className="award-title">Best Short Film 'Immortal'</span>
                <span className="award-festival">Art Blocks Film Festival, Denmark</span>
              </div>
              <div className="award-item">
                <span className="award-title">Best Short Film 'Children of the Sea'</span>
                <span className="award-festival">Smyrna International Film Festival, Turkey</span>
              </div>
              <div className="award-item">
                <span className="award-title">Honourable Mention 'Children of the Sea'</span>
                <span className="award-festival">Tokyo Film Festival, Japan</span>
              </div>
              <div className="award-item">
                <span className="award-title">Best Short Film 'Immortal'</span>
                <span className="award-festival">Gangtok International Film Festival, India</span>
              </div>
              <div className="award-item">
                <span className="award-title">Finalist 'Children of the Sea'</span>
                <span className="award-festival">4theatre Selection, USA</span>
              </div>
              <div className="award-item">
                <span className="award-title">Official Selection 'Children of the Sea'</span>
                <span className="award-festival">Paradise Film Festival, Hungary</span>
              </div>
              <div className="award-item">
                <span className="award-title">Official Selection 'Children of the Sea'</span>
                <span className="award-festival">CKF International Film Festival, England</span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </HelmetProvider>
  );
};
