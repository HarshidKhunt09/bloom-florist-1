import React from 'react';

export default function IndustryExpertiseGrid({ config = {}, content = {}, globalConfig = {} }) {
  const componentData = config?.__component ? config : config;
  const {
    heading,
    subtitle,
    description,
    showLearnMore = true
  } = componentData || {};
  const colorScheme = globalConfig?.colorScheme || {};
  const customStyles = componentData?.style || {};
  const expertise = componentData?.expertise || [];

  if (!expertise || expertise.length === 0) {
    return (
      <section style={{ padding: '4rem 1.25rem', textAlign: 'center' }} className="industry-expertise-grid component-enter">
        <p style={{ color: '#6B7280', fontSize: '1.125rem' }}>No expertise items available</p>
      </section>
    );
  }

  const containerStyle = {
    padding: 'clamp(2.5rem, 4vw, 4rem) clamp(1rem, 3vw, 2rem)',
    textAlign: 'center',
    backgroundColor: customStyles.backgroundColor || colorScheme.background || '#f9fafb',
    ...(customStyles.container || {})
  };


  const subtitleStyle = {
    fontSize: '1rem',
    fontWeight: '600',
    color: customStyles.subtitleColor || '#4F46E5',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    ...(customStyles.subtitle || {})
  };

  const headingStyle = {
    fontSize: '2.25rem',
    fontWeight: '800',
    color: customStyles.headingColor || '#111827',
    marginBottom: '1rem',
    lineHeight: '1.2',
    letterSpacing: '-0.025em',
    ...(customStyles.heading || {})
  };

  const descriptionStyle = {
    fontSize: '1.25rem',
    color: customStyles.descriptionColor || '#6B7280',
    maxWidth: '36rem',
    margin: '0 auto 3rem',
    lineHeight: '1.6',
    ...(customStyles.description || {})
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    padding: '0',
    maxWidth: '1200px',
    margin: '0 auto',
    ...(customStyles.grid || {})
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #F3F4F6',
    borderRadius: '0.75rem',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    transform: 'translateY(0)',
    height: '100%',
    boxSizing: 'border-box',
    ...(customStyles.card || {})
  };

  const iconContainerStyle = {
    marginBottom: customStyles.iconContainer?.marginBottom || '1.5rem',
    ...(customStyles.iconContainer || {})
  };

  const iconStyle = {
    fontSize: '2rem',
    ...(customStyles.icon || {})
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: customStyles.titleColor || '#111827',
    marginBottom: '0.75rem',
    ...(customStyles.title || {})
  };

  const descriptionTextStyle = {
    fontSize: '1rem',
    color: customStyles.textColor || '#6B7280',
    lineHeight: '1.6',
    marginBottom: '2rem',
    flex: '1',
    ...(customStyles.text || {})
  };

  const learnMoreStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    color: customStyles.learnMoreColor || '#4F46E5',
    fontWeight: '500',
    fontSize: '0.875rem',
    textDecoration: 'none',
    transition: 'color 0.15s ease',
    marginTop: '1rem',
    ...(customStyles.learnMore || {})
  };

  // Default icons for different industries
  const getDefaultIcon = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('fintech') || titleLower.includes('banking') || titleLower.includes('finance')) return '🏦';
    if (titleLower.includes('ecommerce') || titleLower.includes('retail') || titleLower.includes('shopping')) return '🛒';
    if (titleLower.includes('healthcare') || titleLower.includes('medical') || titleLower.includes('health')) return '🏥';
    if (titleLower.includes('manufacturing') || titleLower.includes('industrial') || titleLower.includes('factory')) return '🏭';
    if (titleLower.includes('media') || titleLower.includes('entertainment') || titleLower.includes('streaming')) return '🎬';
    if (titleLower.includes('education') || titleLower.includes('edtech') || titleLower.includes('learning')) return '🎓';
    if (titleLower.includes('technology') || titleLower.includes('software') || titleLower.includes('saas')) return '💻';
    if (titleLower.includes('logistics') || titleLower.includes('supply') || titleLower.includes('shipping')) return '📦';
    if (titleLower.includes('real estate') || titleLower.includes('property') || titleLower.includes('proptech')) return '🏠';
    if (titleLower.includes('consulting') || titleLower.includes('advisory') || titleLower.includes('strategy')) return '💼';
    return '⭐'; // Default icon
  };

  return (
    <section style={containerStyle} className="industry-expertise-grid component-enter">
      {(subtitle || heading || description) && (
        <header>
          {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
          {heading && <h2 style={headingStyle}>{heading}</h2>}
          {description && <p style={descriptionStyle}>{description}</p>}
        </header>
      )}

      <div style={gridStyle}>
        {expertise.map((item, index) => (
          <div
            key={index}
            style={cardStyle}
            className="expertise-card"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
          >
            {/* Icon */}
            <div style={iconContainerStyle}>
              <span style={iconStyle}>
                {item.icon || getDefaultIcon(item.title)}
              </span>
            </div>

            {/* Title */}
            <h3 style={titleStyle}>{item.title}</h3>

            {/* Description */}
            {item.description && (
              <p style={descriptionTextStyle}>{item.description}</p>
            )}

            {/* Learn More Link */}
            {showLearnMore && item.learnMoreLink && (
              <a
                href={item.learnMoreLink}
                style={learnMoreStyle}
                {...(item.learnMoreLink.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                Learn More →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
