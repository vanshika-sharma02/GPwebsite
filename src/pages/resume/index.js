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
          <meta name="description" content="Aryan Bhattacharjee's professional resume" />
        </Helmet>

        {/* Header */}
        <div className="resume-header">
          <div className="resume-header-content">
            <h1 className="resume-name">Aryan Bhattacharjee</h1>
            <p className="resume-contact">
              +1 (646) 400-4636 | aryanb1304@gmail.com
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
              <p className="item-subtitle">BFA, Collaborative Arts (Tisch) & BA Philosophy</p>
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
              <p className="item-subtitle">Financial Valuation and Modelling Analyst (in progress)</p>
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
              <ul className="item-list">
                <li>Led a four-week seminar on "Aesthetics and the Grotesque" vis-à-vis indigenous and tribal forms of theatre and mimesis with over forty students.</li>
                <li>The students chose and acquainted themselves with various tribal performance traditions they were familiar with to analyse the ways in which geography plays a role in our conception of beauty.</li>
              </ul>
            </div>
            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">"Indian Art and the Future" - Sri Aurobindo's Action</h3>
                <span className="item-date">December 2024</span>
              </div>
              <ul className="item-list">
                <li>Published a paper titled "Indian Art and the Future" in Sri Aurobindo's Action on South Asian artistic traditions, particularly those rooted in Sanatana Dharma, offer a teleological vision for art as a path to self-realisation and spiritual transformation.</li>
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
                <li>Founded and led a production house focused on social awareness through art, bringing theatre and live performance to remote audiences in the Himalayan regions, emphasising education as a tool for social transformation.</li>
                <li>Managed a team of 12+, developed strategy, project management, fundraising, and marketing.</li>
                <li>Produced two award-winning films and four internationally featured plays, hosted events, and partnered with various notable changemakers.</li>
              </ul>
            </div>

            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">Stag and Lion Theatre Company, New York - Creative Marketer</h3>
                <span className="item-date">February 2024 - May 2024</span>
              </div>
              <ul className="item-list">
                <li>Recruited and led a team of 4 interns to develop, produce, and distribute 19 advertisements via a publicity campaign for an off-off-Broadway Classical Theatre.</li>
                <li>Doubled the theatre's box office revenue over 4 months to bring classical theatre to contemporary audiences.</li>
              </ul>
            </div>

            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">Edinburgh Fringe Festival, Edinburgh - Co-Director & Producer</h3>
                <span className="item-date">January 2023 - August 2023</span>
              </div>
              <ul className="item-list">
                <li>Developed, produced, successfully crowdfunded, and marketed an original play, 'Midnight Building' (focused on themes of substance abuse and adolescence), for presentation at Greenside Theatre.</li>
              </ul>
            </div>

            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">William Tunnicliffe Productions, New York - Associate Producer</h3>
                <span className="item-date">February 2023 - June 2023</span>
              </div>
              <ul className="item-list">
                <li>Assisted the Academy Award-nominated director with post-production, editing, accessibility, captioning, and distribution strategy on a feature documentary about a Himalayan orphanage and school in North-Eastern India.</li>
              </ul>
            </div>
          </section>

          {/* Projects */}
          <section className="resume-section">
            <h2 className="section-heading">Projects</h2>
            
            <div className="resume-item">
              <div className="item-header">
                <h3 className="item-title">Helios, Media Application, New York - Founder & Creative Director</h3>
                <span className="item-date">January 2024 - Present</span>
              </div>
              <ul className="item-list">
                <li>Conceptualised and designed an MVP for an app offering a mini-web series with 10–12-minute episodes.</li>
                <li>Curated supplementary content centred around larger themes, including interviews, fiction, non-fiction, and music.</li>
                <li>The app is live on the iOS App Store and Google Play Store.</li>
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

        </div>
      </div>
    </HelmetProvider>
  );
};
