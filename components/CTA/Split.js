/**
 * CTA - Split Variant
 * Text on one side, CTA button on the other
 */

import React from 'react';

export default function CTASplit({ config = {}, content = {}, globalConfig = {} }) {
  const attributes = content?.attributes || {};
  const { 
    buttonText = 'Get Started',
    buttonLink = '#contact',
    heading,
    description,
    headingText = heading || 'Ready to Begin?',
    subtext = description || 'Let\'s make it happen together',
    ctaText = buttonText,
    ctaHref = buttonLink,
  } = config;

  const colorScheme = globalConfig?.colorScheme || {};
  const customStyle = config?.style || {};

  const containerStyle = {
    padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)',
    backgroundColor: colorScheme.primary || '#3498db',
    color: '#ffffff',
    ...customStyle,
    ...(customStyle.backgroundGradient ? { background: customStyle.backgroundGradient } : {}),
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '3rem',
    maxWidth: '1200px',
    margin: '0 auto',
    alignItems: 'center',
  };

  const textContainerStyle = {
    textAlign: 'left',
  };

  const buttonContainerStyle = {
    textAlign: 'right',
  };

  const headingStyle = {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: 'bold',
    marginBottom: '1rem',
    fontFamily: globalConfig?.typography?.headingFont || 'Poppins, sans-serif',
  };

  const textStyle = {
    fontSize: 'clamp(1rem, 2vw, 1.125rem)',
    opacity: 0.9,
    lineHeight: '1.6',
  };

  const buttonStyle = {
    display: 'inline-block',
    padding: 'clamp(0.875rem, 2vw, 1.25rem) clamp(1.5rem, 3vw, 3rem)',
    backgroundColor: '#ffffff',
    color: colorScheme.primary || '#3498db',
    textDecoration: 'none',
    borderRadius: '0.5rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    transition: 'all 0.2s',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  return (
    <section style={containerStyle} className="cta-split component-enter">
      <div style={gridStyle} className="responsive-grid">
        <div style={textContainerStyle}>
          <h2 style={headingStyle}>{headingText}</h2>
          <p style={textStyle}>{subtext}</p>
        </div>
        <div style={buttonContainerStyle}>
          <a 
            href={ctaHref} 
            role="button"
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
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
        </div>
      </div>
    </section>
  );
}
