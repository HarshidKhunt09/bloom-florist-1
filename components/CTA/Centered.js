/**
 * CTA - Centered Variant
 * Centered CTA with optional background
 */

import React from 'react';

export default function CTACentered({ config = {}, content = {}, globalConfig = {} }) {
  const attributes = content?.attributes || {};
  const { 
    showButton = true,
    buttonText = 'Contact Us',
    buttonLink = '#contact',
    title,
    heading,
    description,
    headingText,
    subtext,
    ctaText = buttonText,
    ctaHref = buttonLink,
  } = config;

  const colorScheme = globalConfig?.colorScheme || {};
  const customStyles = config?.style || {};

  // Use heading/title/headingText from config, fallback to default
  const titleText = heading || title || headingText || 'Get in Touch Today';
  const descriptionText = description || subtext || 'We\'re here to help with all your needs';

  const containerStyle = {
    padding: customStyles.padding || 'clamp(3rem, 6vw, 6rem) clamp(1rem, 3vw, 2rem)',
    textAlign: customStyles.textAlign || 'center',
    backgroundColor: customStyles.backgroundColor || colorScheme.background || '#f8f9fa',
    ...(customStyles.container || {}),
  };

  const contentWrapperStyle = {
    maxWidth: customStyles.maxWidth || 'min(700px, 90vw)',
    margin: '0 auto',
    ...(customStyles.contentWrapper || {}),
  };

  const headingStyle = {
    fontSize: customStyles.headingFontSize || 'clamp(2rem, 5vw, 3rem)',
    fontWeight: customStyles.headingFontWeight || 'bold',
    marginBottom: customStyles.headingMarginBottom || '1.5rem',
    color: customStyles.headingColor || customStyles.textColor || colorScheme.text || '#333333',
    fontFamily: globalConfig?.typography?.headingFont || 'Poppins, sans-serif',
    ...(customStyles.heading || {}),
  };

  const textStyle = {
    fontSize: customStyles.textFontSize || 'clamp(1rem, 2vw, 1.25rem)',
    marginBottom: customStyles.textMarginBottom || '2.5rem',
    color: customStyles.textColor || colorScheme.text || '#666666',
    lineHeight: customStyles.textLineHeight || '1.6',
    ...(customStyles.text || {}),
  };

  const buttonStyle = {
    display: 'inline-block',
    padding: customStyles.buttonPadding || 'clamp(0.875rem, 2vw, 1.25rem) clamp(1.5rem, 3vw, 3rem)',
    backgroundColor: customStyles.buttonBackgroundColor || colorScheme.primary || '#3498db',
    color: customStyles.buttonColor || '#ffffff',
    textDecoration: 'none',
    borderRadius: customStyles.buttonBorderRadius || '0.5rem',
    fontSize: customStyles.buttonFontSize || '1.125rem',
    fontWeight: customStyles.buttonFontWeight || '600',
    transition: 'all 0.2s',
    cursor: 'pointer',
    border: 'none',
    boxShadow: customStyles.buttonBoxShadow || '0 4px 12px rgba(52, 152, 219, 0.3)',
    ...(customStyles.button || {}),
  };

  return (
    <section style={containerStyle} className="cta-centered component-enter">
      <div style={contentWrapperStyle}>
        <h2 style={headingStyle}>{titleText}</h2>
        <p style={textStyle}>{descriptionText}</p>
        {showButton && (
          <a 
            href={ctaHref} 
            role="button"
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = customStyles.buttonBoxShadow || '0 6px 20px rgba(52, 152, 219, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = customStyles.buttonBoxShadow || '0 4px 12px rgba(52, 152, 219, 0.3)';
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
