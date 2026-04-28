/**
 * Gallery - Masonry Variant
 * Pinterest-style masonry layout
 */

import React, { useState, useEffect } from 'react';

export default function GalleryMasonry({ config = {}, content = {}, globalConfig = {} }) {
  const { columns = 3, spacing = 'normal' } = config;
  const attributes = content?.attributes || {};
  const colorScheme = globalConfig?.colorScheme || {};

  const [responsiveColumns, setResponsiveColumns] = useState(columns);

  useEffect(() => {
    const updateColumns = () => {
      const w = window.innerWidth;
      if (w < 768) setResponsiveColumns(1);
      else if (w < 1024) setResponsiveColumns(2);
      else setResponsiveColumns(columns);
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [columns]);

  // Get images from config first, then content attributes, then placeholders
  const rawImages = config?.images || attributes?.gallery_images || [
    { src: 'https://picsum.photos/seed/m1/400/500', alt: 'Image 1' },
    { src: 'https://picsum.photos/seed/m2/400/300', alt: 'Image 2' },
    { src: 'https://picsum.photos/seed/m3/400/600', alt: 'Image 3' },
    { src: 'https://picsum.photos/seed/m4/400/400', alt: 'Image 4' },
    { src: 'https://picsum.photos/seed/m5/400/500', alt: 'Image 5' },
    { src: 'https://picsum.photos/seed/m6/400/350', alt: 'Image 6' },
  ];

  // Dedupe by URL — Unsplash fallback returns the same image 6× when API fails
  const seen = new Set();
  const images = rawImages.filter(img => {
    const url = typeof img === 'string' ? img : (img.url || img.src);
    if (!url || seen.has(url)) return false;
    seen.add(url);
    return true;
  });

  const spacingValues = {
    tight: '0.5rem',
    normal: '1rem',
    loose: '2rem',
  };

  const containerStyle = {
    padding: '4rem 2rem',
    backgroundColor: colorScheme.background || '#ffffff',
  };

  const masonryStyle = {
    columnCount: responsiveColumns,
    columnGap: spacingValues[spacing] || spacingValues.normal,
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const imageWrapperStyle = {
    breakInside: 'avoid',
    marginBottom: spacingValues[spacing] || spacingValues.normal,
    overflow: 'hidden',
    borderRadius: '0.5rem',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    display: 'block',
    transition: 'transform 0.3s',
  };

  return (
    <section style={containerStyle} className="gallery-masonry component-enter">
      {config?.heading && (
        <h2 style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 'bold',
          marginBottom: '2rem',
          textAlign: 'center',
          color: colorScheme.text || '#333',
          fontFamily: globalConfig?.typography?.headingFont || 'Poppins, sans-serif',
        }}>{config.heading}</h2>
      )}
      <div style={masonryStyle}>
        {images.map((image, index) => (
          <div 
            key={index} 
            style={imageWrapperStyle}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1)';
            }}
          >
            <img 
              src={typeof image === 'string' ? image : (image.url || image.src)} 
              alt={typeof image === 'object' ? (image.caption || `Gallery image ${index + 1}`) : `Image ${index + 1}`}
              style={imageStyle}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
