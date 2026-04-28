/**
 * Hero Section - Minimal Variant
 * Simple, clean header with centered text
 */

import React from 'react';

export default function HeroMinimal({ config = {}, content = {}, globalConfig = {} }) {
  const {
    height = 'medium',
    textAlign = 'center',
  } = config;

  const attributes = content?.attributes || {};
  const colorScheme = globalConfig?.colorScheme || {};
  const customStyles = config?.style || {};

  const heights = {
    small: '300px',
    medium: '400px',
    large: '500px',
  };

  const containerStyle = {
    minHeight: heights[height] || heights.medium,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign,
    padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)',
    backgroundColor: colorScheme.background || '#f8f9fa',
    ...(customStyles.container || {}),
  };

  const contentStyle = {
    maxWidth: 'min(700px, 90vw)',
    ...(customStyles.contentWrapper || {}),
  };

  const h1Style = {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: colorScheme.text || '#333333',
    fontFamily: globalConfig?.typography?.headingFont || 'Poppins, sans-serif',
    lineHeight: 1.2,
    ...(customStyles.title || {}),
  };

  const h3Style = {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    marginBottom: '1rem',
    color: colorScheme.text || '#666666',
    lineHeight: 1.4,
    ...(customStyles.subtitle || {}),
  };

  const paragraphStyle = {
    fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
    color: colorScheme.text || '#666666',
    lineHeight: '1.6',
    ...(customStyles.paragraph || {}),
  };

  return (
    <section style={containerStyle} className="hero-minimal component-enter">
      <div style={contentStyle}>
        {attributes.H1 && <h1 style={h1Style}>{attributes.H1}</h1>}
        {attributes.Title && !attributes.Title.includes('|') && <h3 style={h3Style}>{attributes.Title}</h3>}
        {attributes.Paragraph && (
          <p style={paragraphStyle}>{attributes.Paragraph}</p>
        )}
      </div>
    </section>
  );
}
