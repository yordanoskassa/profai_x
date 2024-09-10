import React from 'react';
import './HeroSection.css';
import { useNavigate } from 'react-router';
const HeroSection = () => {
    return (
        <div className="hero-section">
            <h1>
                Create AI Avatar videos from <span className="highlight">Prompt</span>
            </h1>
            <p>
                ProfAI’s video editor generates script, visuals, music transitions, captions, automatically in minutes. No video editing skills required.
            </p>
            <div className="cta-buttons">
                <a 
                    href="/dashboard"
                >
                    TRY IT FOR FREE
                </a>
                <a href="#demo">PRODUCT DEMO</a>
            </div>
        </div>
    );
};

export default HeroSection;
