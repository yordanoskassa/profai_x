import React from 'react';
import { FiUpload, FiFileText, FiCheckSquare, FiVideo, FiShare2 } from 'react-icons/fi'; // Import icons
import './HowItWorksSection.css';

function HowItWorksSection() {
  return (
      <section className="how-it-works-section">
        <h2>How ProfAI Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-icon">
              <FiUpload size={48} /> {/* Replace image with icon */}
            </div>
            <h3>Upload Your Content</h3>
            <p>Upload lesson plans, lecture notes, or other materials.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-icon">
              <FiFileText size={48} /> {/* Replace image with icon */}
            </div>
            <h3>AI Script Generation</h3>
            <p>ProfAI’s AI creates bite-sized video scripts.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-icon">
              <FiCheckSquare size={48} /> {/* Replace image with icon */}
            </div>
            <h3>Review & Approve</h3>
            <p>You control the process by editing and approving each stage.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-icon">
              <FiVideo size={48} /> {/* Replace image with icon */}
            </div>
            <h3>AI Video Production</h3>
            <p>Your AI avatar brings the content to life.</p>
          </div>
          <div className="step">
            <div className="step-number">5</div>
            <div className="step-icon">
              <FiShare2 size={48} /> {/* Replace image with icon */}
            </div>
            <h3>Publish & Share</h3>
            <p>Embed directly into your learning management system.</p>
          </div>
        </div>
      </section>
  );
}

export default HowItWorksSection;
