/**
 * FAQ - Grid Variant
 * Grid layout of FAQ items
 */

import React from 'react';

export default function FAQGrid({ config = {}, content = {}, globalConfig = {} }) {
  const { columns = 2 } = config;
  const attributes = content?.attributes || {};
  const colorScheme = globalConfig?.colorScheme || {};

  // Get FAQ items from content or use sample data
  const faqItems = config?.faqs || attributes?.faq_items || [
    { question: 'What services do you offer?', answer: 'We offer a comprehensive range of services tailored to your needs.' },
    { question: 'How long does it take?', answer: 'Timeline varies depending on the project scope and requirements.' },
    { question: 'What are your rates?', answer: 'Our rates are competitive and transparent. Contact us for a custom quote.' },
    { question: 'Do you offer warranties?', answer: 'Yes, all our work comes with a comprehensive warranty for your peace of mind.' },
    { question: 'Are you licensed?', answer: 'Yes, we are fully licensed and insured professionals.' },
    { question: 'Do you offer free quotes?', answer: 'Absolutely! Contact us for a free, no-obligation quote.' },
  ];

  const containerStyle = {
    padding: '4rem 2rem',
    backgroundColor: colorScheme.background || '#f8f9fa',
  };

  const wrapperStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '3rem',
    textAlign: 'center',
    color: colorScheme.text || '#333333',
    fontFamily: globalConfig?.typography?.headingFont || 'Poppins, sans-serif',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  };

  const cardStyle = {
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  };

  const questionStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: colorScheme.primary || '#3498db',
    fontFamily: globalConfig?.typography?.headingFont || 'Poppins, sans-serif',
  };

  const answerStyle = {
    fontSize: '1rem',
    color: colorScheme.text || '#666666',
    lineHeight: '1.6',
  };

  return (
    <section style={containerStyle} className="faq-grid component-enter">
      <div style={wrapperStyle}>
        <h2 style={headingStyle}>{config?.heading || 'Frequently Asked Questions'}</h2>
        <div style={gridStyle}>
          {faqItems.map((item, index) => (
            <div key={index} style={cardStyle}>
              <h3 style={questionStyle}>{item.question}</h3>
              <p style={answerStyle}>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
