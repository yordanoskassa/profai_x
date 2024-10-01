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
      question: 'How does your language school work?',
      answer: 'Our language school connects students with experienced teachers from their home country, providing personalized, one-on-one or group lessons through an online platform.'
    },
    {
      question: 'What age groups do you cater to?',
      answer: 'We offer language lessons for children aged 5 to 18, ensuring that our teaching methods are tailored to each age group.'
    },
    {
      question: 'Do you offer lessons for complete beginners?',
      answer: 'Yes, we welcome students of all levels, including complete beginners, and our teachers are experienced in guiding students through the basics of the language.'
    },
    {
      question: 'How do I choose a teacher for my child?',
      answer: 'You can browse through our list of teachers, read their profiles, and select the one that best matches your child\'s learning style and goals.'
    },
    {
      question: 'Are your teachers native speakers?',
      answer: 'Yes, all our teachers are native speakers who are experienced in teaching their language to children of all proficiency levels.'
    },
    {
      question: 'What is the duration of each lesson?',
      answer: 'Each lesson typically lasts 30 to 60 minutes, but this can be adjusted based on your child\'s needs and preferences.'
    },
    {
      question: 'Do you offer one-on-one lessons or group classes?',
      answer: 'We offer both one-on-one lessons for personalized learning and group classes for an interactive learning experience with peers.'
    },
    {
      question: 'What teaching methods do you use?',
      answer: 'Our teachers use a variety of interactive methods, including storytelling, games, songs, and cultural activities to make learning engaging and effective.'
    },
    {
      question: 'Can I request a customized curriculum for my child?',
      answer: 'Yes, our teachers are flexible and can adapt the curriculum to focus on specific areas, such as reading, writing, speaking, or cultural knowledge.'
    },
    {
      question: 'Will my child receive homework or practice assignments?',
      answer: 'Yes, to reinforce learning, teachers may provide homework and additional practice exercises between lessons.'
    },
    {
      question: 'How often are lessons scheduled?',
      answer: 'You can choose a lesson schedule that works for you, whether it\'s once a week, multiple times a week, or more infrequent sessions.'
    },
    {
      question: 'Can we reschedule or cancel a lesson?',
      answer: 'Yes, you can reschedule or cancel a lesson as long as you provide at least 24 hours\' notice.'
    },
    {
      question: 'What happens if we miss a lesson?',
      answer: 'If you miss a lesson without prior notice, the session may be forfeited. However, we do our best to accommodate unexpected situations.'
    },
    {
      question: 'What equipment do we need for online lessons?',
      answer: 'You’ll need a computer, tablet, or smartphone with a stable internet connection, a webcam, and a microphone.'
    },
    {
      question: 'Do you have a dedicated platform for lessons?',
      answer: 'Yes, we use a secure, user-friendly platform that allows for video calls, screen sharing, and interactive learning tools.'
    },
    {
      question: 'Is there technical support available if we face issues during a lesson?',
      answer: 'Yes, our support team is available to help you with any technical issues you may encounter before or during a lesson.'
    },
    {
      question: 'How much do the lessons cost?',
      answer: 'Our lesson prices vary depending on the teacher and lesson type. Please visit our pricing page for detailed information.'
    },
    {
      question: 'Do you offer discounts for siblings or multiple lessons?',
      answer: 'Yes, we offer discounts for siblings and packages for multiple lessons. Contact us for more details.'
    },
    {
      question: 'How do I make payments for lessons?',
      answer: 'Payments can be made securely through our website using credit/debit cards or PayPal.'
    },
    {
      question: 'Are there any free trial lessons available?',
      answer: 'Yes, we offer a free trial lesson so you can experience our teaching methods before committing to a package.'
    },
    {
      question: 'How will I track my child\'s progress?',
      answer: 'You’ll receive regular updates from the teacher, including feedback on your child\'s progress and areas for improvement.'
    },
    {
      question: 'How long will it take for my child to become fluent?',
      answer: 'Language fluency varies for each child, depending on factors like lesson frequency, practice, and motivation. Our teachers will work with you to set achievable goals.'
    },
    {
      question: 'Can my child learn more than one language at a time?',
      answer: 'Yes, if your child is interested, we can arrange lessons for multiple languages with different teachers.'
    },
    {
      question: 'What if we’re not satisfied with the teacher?',
      answer: 'Your satisfaction is important to us. If you’re not satisfied with a teacher, you can request to switch to a different one.'
    },
    {
      question: 'Do you offer language lessons for adults too?',
      answer: 'Our primary focus is on children, but we do offer adult language lessons upon request.'
    },
    {
      question: 'Is there a certificate of completion at the end of the course?',
      answer: 'Yes, we provide a certificate of completion once your child finishes a course or reaches a specific milestone.'
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
