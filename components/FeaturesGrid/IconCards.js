/**
 * Features Grid - Icon Cards Variant
 * Large icons with card-based layout
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

export default function FeaturesIconCards({ config = {}, content = {}, globalConfig = {} }) {
  const attributes = content?.attributes || {};
  const { columns = 3, heading } = config || {};
  const colorScheme = globalConfig?.colorScheme || {};
  const customStyles = config?.style || {};

  // Get features from Strapi config (backend data)
  const features = config?.features || [];

  // Don't render if no features from backend
  if (!features || features.length === 0) {
    return null;
  }

  const containerStyle = {
    padding: customStyles.padding || 'clamp(2.5rem, 4vw, 4rem) clamp(1.5rem, 4vw, 3rem)',
    backgroundColor: customStyles.backgroundColor || colorScheme.background || '#f8f9fa',
    textAlign: customStyles.textAlign || 'center',
    ...(customStyles.container || {}),
  };

  const headingStyle = {
    fontSize: customStyles.headingFontSize || '2rem',
    fontWeight: customStyles.headingFontWeight || '700',
    color: customStyles.headingColor || colorScheme.text || '#1A1A29',
    marginBottom: customStyles.headingMarginBottom || '3rem',
    fontFamily: globalConfig?.typography?.headingFont || 'Inter, sans-serif',
    ...(customStyles.heading || {}),
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: customStyles.cardMinWidth
      ? `repeat(auto-fit, minmax(${customStyles.cardMinWidth}, 1fr))`
      : `repeat(auto-fit, minmax(280px, 1fr))`,
    gap: customStyles.gridGap || '2rem',
    maxWidth: customStyles.maxWidth || '1200px',
    margin: '0 auto',
    alignItems: 'start',
    ...(customStyles.grid || {}),
  };

  const activeCardStyle = {
    padding: customStyles.cardPadding || '3rem 2rem',
    backgroundColor: customStyles.cardBackgroundColor || '#ffffff',
    borderRadius: customStyles.cardBorderRadius || '1rem',
    boxShadow: customStyles.cardBoxShadow || '0 10px 30px rgba(0, 0, 0, 0.1)',
    textAlign: customStyles.cardTextAlign || 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    ...(customStyles.card || {}),
  };

  const iconWrapperStyle = {
    width: customStyles.iconSize || '80px',
    height: customStyles.iconSize || '80px',
    margin: customStyles.iconMargin || '0 auto 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: customStyles.iconBackgroundColor || colorScheme.primary || '#3498db',
    borderRadius: '50%',
    fontSize: customStyles.iconFontSize || '2.5rem',
    ...(customStyles.iconWrapper || {}),
  };

  const titleStyle = {
    fontSize: customStyles.titleFontSize || '1.5rem',
    fontWeight: customStyles.titleFontWeight || 'bold',
    marginBottom: customStyles.titleMarginBottom || '1rem',
    color: customStyles.titleColor || colorScheme.text || '#333333',
    fontFamily: globalConfig?.typography?.headingFont || 'Poppins, sans-serif',
    ...(customStyles.title || {}),
  };

  const descriptionStyle = {
    fontSize: customStyles.descriptionFontSize || '1rem',
    color: customStyles.descriptionColor || colorScheme.text || '#666666',
    lineHeight: customStyles.descriptionLineHeight || '1.6',
    ...(customStyles.description || {}),
  };

  return (
    <section style={containerStyle} className="features-icon-cards component-enter">
      {heading && (
        <header>
          <h2 style={headingStyle}>{heading}</h2>
        </header>
      )}
      <div style={gridStyle}>
        {features.map((feature, index) => (
          <div 
            key={feature.title || feature.heading || index} 
            style={activeCardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }}
          >
            {feature.icon && <div style={iconWrapperStyle}><FeatureIcon name={feature.icon} size={customStyles.iconFontSize || '2rem'} /></div>}
            {feature.title && <h3 style={titleStyle}>{feature.title}</h3>}
            {feature.description && <p style={descriptionStyle}>{feature.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
