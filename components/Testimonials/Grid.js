import React, { useState } from 'react';

export default function TestimonialsGrid({ config = {}, content = {}, globalConfig = {} }) {
  const componentData = config?.__component ? config : config;
  const {
    showRatings = true,
    heading,
    subtitle
  } = componentData || {};
  const colorScheme = globalConfig?.colorScheme || {};
  const customStyles = componentData?.style || {};
  const testimonials = componentData?.testimonials || [];

  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const containerStyle = {
    padding: 'clamp(2.5rem, 4vw, 4rem) clamp(1rem, 3vw, 2rem)',
    textAlign: 'center',
    backgroundColor: customStyles.backgroundColor || colorScheme.background || '#ffffff',
    ...(customStyles.container || {})
  };

  const subtitleStyle = {
    fontSize: '1rem',
    fontWeight: '600',
    color: customStyles.subtitleColor || '#6C757D',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    ...(customStyles.subtitle || {})
  };

  const headingStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    color: customStyles.headingColor || colorScheme.text || '#1A1A29',
    marginBottom: '3rem',
    fontFamily: globalConfig?.typography?.headingFont || 'Inter, sans-serif',
    ...(customStyles.heading || {})
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
    backgroundColor: '#F8F9FA',
    border: '1px solid #E9ECEF',
    borderRadius: '12px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.03)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    height: '100%',
    boxSizing: 'border-box',
    ...(customStyles.card || {})
  };

  const imageStyle = {
    width: '5rem',
    height: '5rem',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '1rem',
    border: '3px solid #ffffff',
    ...(customStyles.image || {})
  };

  const imageFallbackStyle = {
    width: '5rem',
    height: '5rem',
    borderRadius: '50%',
    backgroundColor: '#D9E2EF',
    color: '#495057',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '1rem',
    border: '3px solid #ffffff',
    ...(customStyles.imageFallback || {})
  };

  const nameStyle = {
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '0.25rem',
    color: customStyles.nameColor || '#1A1A29',
    ...(customStyles.name || {})
  };

  const roleStyle = {
    fontSize: '0.9rem',
    color: customStyles.roleColor || colorScheme.primary || '#7958F8',
    marginBottom: '1rem',
    ...(customStyles.role || {})
  };

  const ratingStyle = {
    color: customStyles.rating?.color || '#FFC107',
    fontSize: customStyles.rating?.fontSize || '1.2rem',
    marginBottom: customStyles.rating?.marginBottom || '20px',
    letterSpacing: customStyles.rating?.letterSpacing || '2px',
    ...(customStyles.rating || {})
  };

  const quoteStyle = {
    fontSize: '1rem',
    color: customStyles.quoteColor || '#495057',
    lineHeight: '1.5',
    margin: '0',
    ...(customStyles.quote || {})
  };

  const renderStars = (rating) => {
    const value = rating || 5;
    return (
      <span role="img" aria-label={`${value} out of 5 stars`}>
        {'★'.repeat(value)}
      </span>
    );
  };

  return (
    <section style={containerStyle} className="testimonials-grid component-enter">
      {(subtitle || heading) && (
        <header>
          {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
          {heading && <h2 style={headingStyle}>{heading}</h2>}
        </header>
      )}

      <div style={gridStyle}>
        {testimonials.map((testimonial, index) => {
          const hasImageError = imageErrors[index];
          const initials = testimonial.name
            ? testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
            : '?';

          return (
            <div
              key={index}
              style={cardStyle}
              className="testimonial-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.03)';
              }}
            >
              {/* Profile Image */}
              {testimonial.image && !hasImageError ? (
                <img
                  src={testimonial.image}
                  alt={testimonial.name || 'Testimonial'}
                  style={imageStyle}
                  onError={() => handleImageError(index)}
                  loading="lazy"
                />
              ) : (
                <div style={imageFallbackStyle}>
                  {initials}
                </div>
              )}

              {/* Name */}
              <div style={nameStyle}>{testimonial.name}</div>

              {/* Role/Position */}
              {testimonial.position && (
                <div style={roleStyle}>{testimonial.position}</div>
              )}

              {/* Star Rating */}
              {showRatings && testimonial.rating && (
                <div style={ratingStyle}>
                  {renderStars(testimonial.rating)}
                </div>
              )}

              {/* Quote/Content */}
              <p style={quoteStyle}>{testimonial.content}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
