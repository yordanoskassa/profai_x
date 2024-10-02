import React from 'react';
import './FeaturesSection.css';
import { FaBolt, FaRegSmileBeam, FaExpandArrowsAlt } from 'react-icons/fa';

function FeaturesSection() {
  return (
    <section className="features-section" id="features">
      <h2>Why Choose ProfAI?</h2>
      <div className="features-container">
        <div className="feature-box">
          <FaBolt className="feature-icon" />
          <h3 className="feature-title">Efficiency</h3>
          <p className="feature-description">
            Automate scriptwriting and video production while maintaining content control.
          </p>
        </div>
        <div className="feature-box">
          <FaRegSmileBeam className="feature-icon" />
          <h3 className="feature-title">Authenticity</h3>
          <p className="feature-description">
            Keep your unique teaching style with AI avatars that replicate your presence.
          </p>
        </div>
        <div className="feature-box">
          <FaExpandArrowsAlt className="feature-icon" />
          <h3 className="feature-title">Scalability</h3>
          <p className="feature-description">
            Easily create and scale content for courses of any size, in multiple languages.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
