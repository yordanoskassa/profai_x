import React, { useState } from 'react';
import './FaqSection.css';

function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const faqData = [
    {
      question: 'What is the AI avatar video feature?',
      answer: 'The AI avatar video feature allows you to generate videos from text prompts. It uses advanced AI to create avatars that can speak and interact naturally.'
    },
    {
      question: 'How does the subscription work?',
      answer: 'Our subscription plans are billed monthly or annually, offering different levels of access to features. You can upgrade, downgrade, or cancel your subscription at any time.'
    },
    {
      question: 'Can I customize my AI avatars?',
      answer: 'Yes, you can fully customize your avatars, including their appearance, voice, and behavior. Our interface provides simple tools to make the process easy.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes, we offer a 7-day free trial for all new users. During this period, you have access to all premium features with no commitment.'
    }
  ];

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqData.map((item, index) => (
          <div
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            key={index}
            onClick={() => toggleFaq(index)}
          >
            <div className="faq-question">
              <h3>{item.question}</h3>
              <span className="faq-icon">{activeIndex === index ? '-' : '+'}</span>
            </div>
            {activeIndex === index && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FaqSection;
