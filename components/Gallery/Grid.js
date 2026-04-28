/**
 * Gallery - Grid Variant
 * Regular grid layout of images
 */

import React from 'react';

export default function GalleryGrid({ config = {}, content = {}, globalConfig = {} }) {
  const { columns = 3, spacing = 'normal', showCaptions = true } = config;
  const attributes = content?.attributes || {};
  const colorScheme = globalConfig?.colorScheme || {};

  // Get images from config first, then content attributes, then placeholders
  const rawImages = config?.images || attributes?.gallery_images || [
    { src: attributes?.imageUrl || 'https://picsum.photos/seed/g1/400/300', alt: 'Image 1' },
    { src: 'https://picsum.photos/seed/g2/400/300', alt: 'Image 2' },
    { src: 'https://picsum.photos/seed/g3/400/300', alt: 'Image 3' },
    { src: 'https://picsum.photos/seed/g4/400/300', alt: 'Image 4' },
    { src: 'https://picsum.photos/seed/g5/400/300', alt: 'Image 5' },
    { src: 'https://picsum.photos/seed/g6/400/300', alt: 'Image 6' },
  ];

  // Dedupe so same URL never repeats
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

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: spacingValues[spacing] || spacingValues.normal,
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const imageWrapperStyle = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '0.5rem',
    aspectRatio: '4/3',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s',
  };

  const captionStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#ffffff',
    fontSize: '0.875rem',
  };

  return (
    <section style={containerStyle} className="gallery-grid component-enter">
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
      <div style={gridStyle}>
        {images.map((image, index) => (
          <div 
            key={index} 
            style={imageWrapperStyle}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1.1)';
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
            {showCaptions && typeof image === 'object' && image.caption && (
              <div style={captionStyle}>{image.caption}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
