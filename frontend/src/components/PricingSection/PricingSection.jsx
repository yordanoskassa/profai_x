import React from 'react';
import './PricingSection.css';

function PricingSection() {
  return (
    <section className="pricing-section" id="pricing">
      <h2>Pricing Plans</h2>
      <div className="pricing-cards-container">
        <div className="pricing-card basic-plan">
          <h3>Basic Plan</h3>
          <p className="price">$9.99<span>/mo</span></p>
          <ul>
            <li>Feature 1</li>
            <li>Femnature 2</li>
            <li>Feature 3</li>
          </ul>
          <a href="#" className="choose-plan">Choose Plan</a>
        </div>
        <div className="pricing-card pro-plan">
          <h3>Pro Plan</h3>
          <p className="price">$19.99<span>/mo</span></p>
          <ul>
            <li>Everything in Basic</li>
            <li>Advanced Feature 1</li>
            <li>Advanced Feature 2</li>
          </ul>
          <a href="#" className="choose-plan">Choose Plan</a>
        </div>
        <div className="pricing-card enterprise-plan">
          <h3>Enterprise Plan</h3>
          <p className="price">$49.99<span>/mo</span></p>
          <ul>
            <li className="price1">Everything in Pro</li>
            <li className="price2">Enterprise Feature 1</li>
            <li className="price3">Enterprise Feature 2</li>
          </ul>
          <a href="#" className="choose-plan">Choose Plan</a>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
