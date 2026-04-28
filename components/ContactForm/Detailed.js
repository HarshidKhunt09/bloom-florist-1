/**
 * Contact Form - Detailed Variant
 * Extended contact form with additional fields
 */

import React, { useState } from 'react';

export default function ContactFormDetailed({ config, content, globalConfig }) {
  const { submitUrl = '/api/contact', title = 'Get in Touch' } = config;
  const colorScheme = globalConfig?.colorScheme || {};
  const customStyle = config?.style || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
    backgroundColor: colorScheme.background || '#f8f9fa',
    ...customStyle,
    ...(customStyle.backgroundGradient ? { background: customStyle.backgroundGradient } : {}),
  };

  const formWrapperStyle = {
    maxWidth: '700px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '3rem',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textAlign: 'center',
    color: colorScheme.text || '#333333',
    fontFamily: globalConfig?.typography?.headingFont || 'Poppins, sans-serif',
  };

  const subtitleStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
    color: colorScheme.text || '#666666',
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
    padding: '0.875rem',
    fontSize: '1rem',
    border: '2px solid #e0e0e0',
    borderRadius: '0.375rem',
    fontFamily: globalConfig?.typography?.bodyFont || 'Inter, sans-serif',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '180px',
    resize: 'vertical',
  };

  const buttonStyle = {
    width: '100%',
    padding: '1.25rem',
    backgroundColor: colorScheme.primary || '#3498db',
    color: '#ffffff',
    fontSize: '1.125rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(52, 152, 219, 0.3)',
  };

  return (
    <section id="contact" style={containerStyle} className="contact-form-detailed">
      <div style={formWrapperStyle}>
        <h2 style={headingStyle}>{title}</h2>
        <p style={subtitleStyle}>Fill out the form below and we&apos;ll get back to you shortly</p>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label htmlFor="name" style={labelStyle}>Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={(e) => e.currentTarget.style.borderColor = colorScheme.primary || '#3498db'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={(e) => e.currentTarget.style.borderColor = colorScheme.primary || '#3498db'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="phone" style={labelStyle}>Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={inputStyle}
              onFocus={(e) => e.currentTarget.style.borderColor = colorScheme.primary || '#3498db'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="subject" style={labelStyle}>Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={(e) => e.currentTarget.style.borderColor = colorScheme.primary || '#3498db'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="message" style={labelStyle}>Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              style={textareaStyle}
              onFocus={(e) => e.currentTarget.style.borderColor = colorScheme.primary || '#3498db'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
            />
          </div>

          <button 
            type="submit" 
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(52, 152, 219, 0.3)';
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
