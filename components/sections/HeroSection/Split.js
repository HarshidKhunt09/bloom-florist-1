/**
 * Hero Section - Split Variant
 * Half text, half image layout
 */

import React from 'react';

export default function HeroSplit({ config = {}, content = {}, globalConfig = {} }) {
  const {
    imagePosition = 'right',
    textAlign = 'left',
    showCTA = true,
  } = config;
  const ctaText = config.ctaText || config.buttonText || 'Learn More';
  const ctaHref = config.ctaHref || config.buttonLink || '/contact';

  const attributes = content?.attributes || {};
  const colorScheme = globalConfig?.colorScheme || {};
  const customStyles = config?.style || {};

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    minHeight: 'min(600px, 80vh)',
    alignItems: 'center',
    gap: 'clamp(1.5rem, 4vw, 4rem)',
    padding: 'clamp(1.5rem, 4vw, 4rem) clamp(1rem, 3vw, 2rem)',
    backgroundColor: colorScheme.background || '#ffffff',
    ...(customStyles.container || {}),
  };

  const textContainerStyle = {
    order: imagePosition === 'right' ? 1 : 2,
    textAlign,
    ...(customStyles.textContainer || {}),
  };

  const imageContainerStyle = {
    order: imagePosition === 'right' ? 2 : 1,
    height: '100%',
    minHeight: '300px',
    ...(customStyles.imageContainer || {}),
  };

  const h1Style = {
    fontSize: 'clamp(1.75rem, 4vw, 3rem)',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: colorScheme.text || '#333333',
    fontFamily: globalConfig?.typography?.headingFont || 'Poppins, sans-serif',
    lineHeight: 1.2,
    ...(customStyles.title || {}),
  };

  const h3Style = {
    fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
    marginBottom: '1rem',
    color: colorScheme.text || '#333333',
    lineHeight: 1.4,
    ...(customStyles.subtitle || {}),
  };

  const paragraphStyle = {
    fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
    marginBottom: '2rem',
    color: colorScheme.text || '#666666',
    lineHeight: '1.6',
    ...(customStyles.paragraph || {}),
  };

  const ctaStyle = {
    display: 'inline-block',
    padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
    backgroundColor: colorScheme.primary || '#3498db',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '0.5rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    border: 'none',
    ...(customStyles.button || {}),
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '0.5rem',
  };

  return (
    <section style={containerStyle} className="hero-split responsive-grid component-enter">
      <div style={textContainerStyle}>
        {attributes.H1 && <h1 style={h1Style}>{attributes.H1}</h1>}
        {attributes.Title && !attributes.Title.includes('|') && <h3 style={h3Style}>{attributes.Title}</h3>}
        {attributes.Paragraph && (
          <p style={paragraphStyle}>{attributes.Paragraph}</p>
        )}
        {showCTA && (
          <a href={ctaHref} style={ctaStyle} role="button">
            {ctaText}
          </a>
        )}
      </div>
      <div style={imageContainerStyle}>
        {attributes.imageUrl ? (
          <img 
            src={attributes.imageUrl} 
            alt={attributes.Title || 'Hero image'} 
            style={imageStyle}
            loading="lazy"
          />
        ) : (
          <div style={{
            width: '100%', height: '100%', minHeight: '300px',
            borderRadius: '0.5rem',
            background: `linear-gradient(135deg, ${colorScheme.primary || '#3498db'}22, ${colorScheme.primary || '#3498db'}44)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', opacity: 0.15, fontWeight: 'bold', color: colorScheme.primary || '#3498db' }}>
              {(attributes.SiteName || 'Brand')[0]}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
