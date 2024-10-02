import React from 'react';
import './TestimonialsSection.css';

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'John Doe',
      title: 'Professor at University X',
      image: 'images/image1.png',
      quote: 'ProfAI has revolutionized my course delivery. The AI avatar technology is a game changer!'
    },
    {
      name: 'Jonas Smith',
      title: 'Online Educator',
      image: 'images/image2.png',
      quote: 'Creating content has never been easier. ProfAI is now an integral part of my teaching workflow.'
    },
    {
      name: 'Michael Brown',
      title: 'Learning and Development Specialist',
      image: 'images/image3.png',
      quote: 'The scalability and personalization that ProfAI offers are unmatched. Highly recommend it!'
    }
  ];

  return (
    <section className="testimonials-section" id="testimonials">
      <h2>What Educators Are Saying</h2>
      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
            <div className="testimonial-content">
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <p className="testimonial-name">{testimonial.name}</p>
              <p className="testimonial-title">{testimonial.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TestimonialsSection;
