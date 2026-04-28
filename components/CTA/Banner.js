/**
 * CTA - Banner Variant
 * Full-width call-to-action banner
 */

import React from 'react';

export default function CTABanner({ config = {}, content = {}, globalConfig = {} }) {
  const attributes = content?.attributes || {};
  const { 
    style = 'bold', 
    textAlign = 'center',
    showButton = true,
    buttonText = 'Get Started',
    buttonLink = '#contact',
    heading,
    description,
    headingText = heading || 'Ready to Get Started?',
    subtext = description || 'Join thousands of satisfied customers today',
    ctaText = buttonText,
    ctaHref = buttonLink,
  } = config;

  const colorScheme = globalConfig?.colorScheme || {};
  const customStyle = config?.style || {};

  const containerStyle = {
    padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)',
    textAlign: textAlign,
    background: style === 'gradient'
      ? `linear-gradient(135deg, ${colorScheme.primary || '#3498db'}, ${colorScheme.secondary || '#2ecc71'})`
      : colorScheme.primary || '#3498db',
    color: '#ffffff',
    ...customStyle,
    ...(customStyle.backgroundGradient ? { background: customStyle.backgroundGradient } : {}),
  };

  const contentWrapperStyle = {
    maxWidth: 'min(800px, 90vw)',
    margin: '0 auto',
  };

  const headingStyle = {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: 'bold',
    marginBottom: '1rem',
    fontFamily: globalConfig?.typography?.headingFont || 'Poppins, sans-serif',
  };

  const textStyle = {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    marginBottom: '2rem',
    opacity: 0.9,
  };

  const buttonStyle = {
    display: 'inline-block',
    padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2.5rem)',
    backgroundColor: colorScheme.accent || '#e74c3c',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '0.5rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  };

  return (
    <section style={containerStyle} className="cta-banner component-enter">
      <div style={contentWrapperStyle}>
        <h2 style={headingStyle}>{headingText}</h2>
        <p style={textStyle}>{subtext}</p>
        {showButton && (
          <a 
            href={ctaHref} 
            role="button"
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = '2px solid currentColor';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
