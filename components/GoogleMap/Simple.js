/**
 * Google Map - Simple Variant
 * Clean Google Maps embed with optional title
 */

import React from 'react';
import SafeHTML from '../SafeHTML';

export default function GoogleMapSimple({ config = {}, content = {}, globalConfig = {} }) {
  const { 
    title = '',
    subtitle = '',
    embedCode,
    mapHeight = '450px'
  } = config;

  const attributes = content?.attributes || {};
  const colorScheme = globalConfig?.colorScheme || {};

  // Get embed code from config or content
  const mapEmbed = embedCode || attributes?.googleMapEmbed;

  if (!mapEmbed) {
    return null; // Don't render if no map provided
  }

  const containerStyle = {
    padding: '4rem 2rem',
    backgroundColor: colorScheme.background || '#ffffff',
  };

  const wrapperStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textAlign: 'center',
    color: colorScheme.text || '#333333',
    fontFamily: globalConfig?.typography?.headingFont || 'Poppins, sans-serif',
  };

  const subtitleStyle = {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    textAlign: 'center',
    color: colorScheme.text || '#666666',
  };

  const mapWrapperStyle = {
    width: '100%',
    height: mapHeight,
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  };

  // Ensure iframe has proper attributes
  const sanitizedEmbed = mapEmbed
    .replace(/width="[^"]*"/g, 'width="100%"')
    .replace(/height="[^"]*"/g, `height="${mapHeight}"`)
    .replace(/style="[^"]*"/g, 'style="border:0; width:100%; height:100%;"')
    .replace(/<iframe(?![^>]*title=)/g, '<iframe title="Google Map"');

  return (
    <section style={containerStyle} className="google-map-simple component-enter">
      <div style={wrapperStyle}>
        {title && <h2 style={headingStyle}>{title}</h2>}
        {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
        <div style={mapWrapperStyle}>
          <SafeHTML html={sanitizedEmbed} />
        </div>
      </div>
    </section>
  );
}
