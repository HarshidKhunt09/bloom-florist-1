/**
 * FAQ - Accordion Variant
 * Collapsible FAQ items
 */

import React, { useState } from 'react';

export default function FAQAccordion({ config = {}, content = {}, globalConfig = {} }) {
  const { defaultOpen = 0 } = config;
  const attributes = content?.attributes || {};
  const colorScheme = globalConfig?.colorScheme || {};
  const customStyle = config?.style || {};

  // Get FAQ items from config first, then content attributes, then defaults
  const faqItems = config?.faqs || attributes?.faq_items || [
    { question: 'What services do you offer?', answer: 'We offer a comprehensive range of services tailored to your needs.' },
    { question: 'How long does it take?', answer: 'Timeline varies depending on the project scope and requirements.' },
    { question: 'What are your rates?', answer: 'Our rates are competitive and transparent. Contact us for a custom quote.' },
    { question: 'Do you offer warranties?', answer: 'Yes, all our work comes with a comprehensive warranty for your peace of mind.' },
  ];

  const [openIndex, setOpenIndex] = useState(defaultOpen);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const containerStyle = {
    padding: '4rem 2rem',
    backgroundColor: colorScheme.background || '#ffffff',
    ...customStyle,
    ...(customStyle.backgroundGradient ? { background: customStyle.backgroundGradient } : {}),
  };

  const wrapperStyle = {
    maxWidth: '800px',
    margin: '0 auto',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textAlign: 'center',
    color: colorScheme.text || '#333333',
    fontFamily: globalConfig?.typography?.headingFont || 'Poppins, sans-serif',
  };

  const itemStyle = {
    marginBottom: '1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '0.5rem',
    overflow: 'hidden',
  };

  const questionStyle = {
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    cursor: 'pointer',
    fontWeight: '600',
    color: colorScheme.text || '#333333',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background-color 0.2s',
  };

  const answerStyle = (isOpen) => ({
    padding: isOpen ? '1.5rem' : '0 1.5rem',
    maxHeight: isOpen ? '2000px' : '0',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    color: colorScheme.text || '#666666',
    lineHeight: '1.6',
  });

  const iconStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(index);
    }
  };

  return (
    <section style={containerStyle} className="faq-accordion component-enter">
      <div style={wrapperStyle}>
        <h2 style={headingStyle}>{config?.heading || 'Frequently Asked Questions'}</h2>
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} style={itemStyle}>
              <div 
                style={questionStyle} 
                onClick={() => toggleItem(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <span style={iconStyle}>{isOpen ? '−' : '+'}</span>
              </div>
              <div style={answerStyle(isOpen)}>
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
