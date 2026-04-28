/**
 * Features Grid - Four Column Variant
 * Grid layout with 4 columns of features
 */

import React from 'react';

const ICON_MAP = {
  star: '⭐', shield: '🛡️', zap: '⚡', heart: '❤️', users: '👥',
  trophy: '🏆', clock: '🕐', check: '✅', award: '🏅', target: '🎯',
  briefcase: '💼', 'trending-up': '📈', home: '🏠', phone: '📞',
  mail: '📧', map: '📍', camera: '📷', smile: '😊', thumbs: '👍',
  leaf: '🌿', sun: '☀️', moon: '🌙', bolt: '⚡', fire: '🔥',
  diamond: '💎', crown: '👑', rocket: '🚀', globe: '🌍', lock: '🔒',
};

function FeatureIcon({ name, size = '2.5rem' }) {
  const emoji = ICON_MAP[name] || ICON_MAP[name?.toLowerCase()] || '✨';
  return <span style={{ fontSize: size, lineHeight: 1 }} role="img" aria-hidden="true">{emoji}</span>;
}

export default function FeaturesFourColumn({ config = {}, content = {}, globalConfig = {} }) {
  const attributes = content?.attributes || {};
  const { showIcons = true, cardStyle = 'elevated', heading } = config || {};
  const colorScheme = globalConfig?.colorScheme || {};

  // Get features from Strapi config (backend data)
  const features = config?.features || [];

  // Don't render if no features from backend
  if (!features || features.length === 0) {
    return null;
  }

  const containerStyle = {
    padding: 'clamp(2.5rem, 4vw, 4rem) clamp(1.5rem, 4vw, 3rem)',
    backgroundColor: colorScheme.background || '#ffffff',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    color: colorScheme.text || '#1A1A29',
    marginBottom: '3rem',
    fontFamily: globalConfig?.typography?.headingFont || 'Inter, sans-serif',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '2rem',
    alignItems: 'start',
    maxWidth: '1400px',
    margin: '0 auto',
  };

  const cardStyles = {
    elevated: {
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
    },
    flat: {
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
    },
    bordered: {
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      border: `2px solid ${colorScheme.primary || '#3498db'}`,
    },
  };

  const activeCardStyle = cardStyles[cardStyle] || cardStyles.elevated;

  const iconStyle = {
    fontSize: '3rem',
    marginBottom: '1rem',
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: colorScheme.text || '#333333',
    fontFamily: globalConfig?.typography?.headingFont || 'Poppins, sans-serif',
  };

  const descriptionStyle = {
    fontSize: '1rem',
    color: colorScheme.text || '#666666',
    lineHeight: '1.6',
  };

  return (
    <section style={containerStyle} className="features-grid-4col component-enter">
      {heading && (
        <header>
          <h2 style={headingStyle}>{heading}</h2>
        </header>
      )}
      <div style={gridStyle}>
        {features.map((feature, index) => (
          <div key={feature.title || feature.heading || index} style={activeCardStyle} className="feature-card">
            {showIcons && feature.icon && (
              <div style={iconStyle}><FeatureIcon name={feature.icon} size="2rem" /></div>
            )}
            {feature.title && <h3 style={titleStyle}>{feature.title}</h3>}
            {feature.description && <p style={descriptionStyle}>{feature.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
