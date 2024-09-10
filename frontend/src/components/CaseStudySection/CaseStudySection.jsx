import React from 'react';
import './CaseStudySection.css';
import { FaChartLine, FaUniversity, FaHandsHelping } from 'react-icons/fa'; // Import icons

function CaseStudySection() {
  return (
      <section className="case-study-section">
        <h2>Case Studies</h2>
        <div className="case-studies-container">
          <div className="case-study">
            <div className="case-study-icon">
              <FaChartLine size={48} color="#00bfff" /> {/* Icon instead of image */}
            </div>
            <div className="case-study-content">
              <h3>Case Study 1</h3>
              <p>Learn how Company A increased their engagement by 300% using ProfAI's tools.</p>
              <a href="#" className="case-study-link">Read More</a>
            </div>
          </div>
          <div className="case-study">
            <div className="case-study-icon">
              <FaUniversity size={48} color="#00bfff" /> {/* Icon instead of image */}
            </div>
            <div className="case-study-content">
              <h3>Case Study 2</h3>
              <p>Discover how University B improved their online courses with AI-generated content.</p>
              <a href="#" className="case-study-link">Read More</a>
            </div>
          </div>
          <div className="case-study">
            <div className="case-study-icon">
              <FaHandsHelping size={48} color="#00bfff" /> {/* Icon instead of image */}
            </div>
            <div className="case-study-content">
              <h3>Case Study 3</h3>
              <p>See how Non-Profit C reached a broader audience through innovative AI video strategies.</p>
              <a href="#" className="case-study-link">Read More</a>
            </div>
          </div>
        </div>
      </section>
  );
}

export default CaseStudySection;
