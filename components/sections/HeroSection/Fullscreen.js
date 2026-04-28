/**
 * Hero Section - Fullscreen Variant
 * Full-height hero with centered content
 */

import React from 'react';

export default function HeroFullscreen({ config = {}, content = {}, globalConfig = {} }) {
  const {
    height = 'screen',
    textAlign = 'center',
    backgroundType = 'gradient',
    showCTA = true,
  } = config;
  const ctaText = config.ctaText || config.buttonText || 'Get Started';
  const ctaHref = config.ctaHref || config.buttonLink || '/contact';

  const attributes = content?.attributes || {};
  const colorScheme = globalConfig?.colorScheme || {};
  const customStyles = config?.style || {};

  const heights = {
    screen: '80vh',
    large: '70vh',
    medium: '60vh',
  };

  const getBackgroundStyle = () => {
    if (customStyles.container?.background) {
      return {
        background: customStyles.container.background,
        backgroundSize: customStyles.container.backgroundSize || 'cover',
        backgroundPosition: customStyles.container.backgroundPosition || 'center',
      };
    }
    if (backgroundType === 'gradient') {
      return {
        background: `linear-gradient(135deg, ${colorScheme.primary || '#3498db'}, ${colorScheme.secondary || '#2ecc71'})`,
      };
    }
    if (backgroundType === 'image' && attributes.imageUrl) {
      return {
        backgroundImage: `url(${attributes.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    return {
      backgroundColor: customStyles.backgroundColor || colorScheme.primary || '#3498db',
    };
  };

  const containerStyle = {
    minHeight: heights[height] || heights.screen,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign,
    padding: customStyles.padding || 'clamp(1.5rem, 4vw, 4rem)',
    color: customStyles.color || '#ffffff',
    width: '100%',
    maxWidth: '100vw',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    margin: 0,
    ...getBackgroundStyle(),
    ...(customStyles.container || {}),
  };

  const contentStyle = {
    maxWidth: 'min(800px, 90vw)',
    width: '100%',
    zIndex: 1,
    boxSizing: 'border-box',
    padding: '0 1rem',
    ...(customStyles.contentWrapper || {}),
  };

  const h1Style = {
    fontSize: customStyles.titleFontSize || 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: customStyles.titleFontWeight || 'bold',
    marginBottom: customStyles.titleMarginBottom || '1rem',
    color: customStyles.titleColor || '#ffffff',
    fontFamily: globalConfig?.typography?.headingFont || 'Poppins, sans-serif',
    lineHeight: 1.2,
    ...(customStyles.title || {}),
  };

  const h3Style = {
    fontSize: customStyles.subtitleFontSize || 'clamp(1.1rem, 2.5vw, 1.5rem)',
    marginBottom: customStyles.subtitleMarginBottom || '1rem',
    opacity: customStyles.subtitleOpacity !== undefined ? customStyles.subtitleOpacity : 0.9,
    color: customStyles.subtitleColor || '#ffffff',
    lineHeight: 1.4,
    ...(customStyles.subtitle || {}),
  };

  const paragraphStyle = {
    fontSize: customStyles.paragraphFontSize || 'clamp(1rem, 1.5vw, 1.125rem)',
    marginBottom: customStyles.paragraphMarginBottom || '2rem',
    opacity: customStyles.paragraphOpacity !== undefined ? customStyles.paragraphOpacity : 0.9,
    lineHeight: customStyles.paragraphLineHeight || '1.6',
    color: customStyles.paragraphColor || '#ffffff',
    ...(customStyles.paragraph || {}),
  };

  const ctaStyle = {
    display: 'inline-block',
    padding: customStyles.buttonPadding || 'clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
    backgroundColor: customStyles.buttonBackgroundColor || colorScheme.accent || '#e74c3c',
    color: customStyles.buttonColor || '#ffffff',
    textDecoration: 'none',
    borderRadius: customStyles.buttonBorderRadius || '0.5rem',
    fontSize: customStyles.buttonFontSize || '1.125rem',
    fontWeight: customStyles.buttonFontWeight || '600',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    border: 'none',
    ...(customStyles.button || {}),
  };

  return (
    <section style={containerStyle} className="hero-fullscreen component-enter">
      <div style={contentStyle}>
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
    </section>
  );
}
