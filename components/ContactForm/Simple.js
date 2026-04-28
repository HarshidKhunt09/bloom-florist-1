/**
 * Contact Form - Simple Variant
 * Basic contact form with name, email, message
 */

import React, { useState } from 'react';

export default function ContactFormSimple({ config, content, globalConfig }) {
  const { submitUrl = '/api/contact', title, heading } = config;
  const formTitle = title || heading || 'Contact Us';
  const colorScheme = globalConfig?.colorScheme || {};
  const customStyle = config?.style || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const containerStyle = {
    padding: '4rem 2rem',
    backgroundColor: colorScheme.background || '#ffffff',
    ...customStyle,
    ...(customStyle.backgroundGradient ? { background: customStyle.backgroundGradient } : {}),
  };

  const formWrapperStyle = {
    maxWidth: '600px',
    margin: '0 auto',
  };

  const headingStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textAlign: 'center',
    color: colorScheme.text || '#333333',
    fontFamily: globalConfig?.typography?.headingFont || 'Poppins, sans-serif',
  };

  const formGroupStyle = {
    marginBottom: '1.5rem',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: colorScheme.text || '#333333',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '0.375rem',
    fontFamily: globalConfig?.typography?.bodyFont || 'Inter, sans-serif',
    boxSizing: 'border-box',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '150px',
    resize: 'vertical',
  };

  const buttonStyle = {
    width: '100%',
    padding: '1rem',
    backgroundColor: colorScheme.primary || '#3498db',
    color: '#ffffff',
    fontSize: '1.125rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  return (
    <section id="contact" style={containerStyle} className="contact-form-simple">
      <div style={formWrapperStyle}>
        <h2 style={headingStyle}>{formTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label htmlFor="name" style={labelStyle}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="message" style={labelStyle}>Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              style={textareaStyle}
            />
          </div>

          <button 
            type="submit" 
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colorScheme.secondary || '#2ecc71';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colorScheme.primary || '#3498db';
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
