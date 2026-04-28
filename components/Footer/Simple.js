/**
 * Footer - Simple Variant
 * Single row footer with links and copyright
 */

import React from "react";

export default function FooterSimple({ config = {}, content = {}, globalConfig = {} }) {
  const {
    showSocial = false,
    footerText = "All Rights Reserved",
    links = [],
  } = config;

  const colorScheme = globalConfig?.colorScheme || {};
  const currentYear = new Date().getFullYear();

  const containerStyle = {
    padding: "2rem",
    backgroundColor: colorScheme.primary || "#333333",
    color: colorScheme.textLight || "#ffffff",
    textAlign: "center",
  };

  const linksContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    marginBottom: "1rem",
    flexWrap: "wrap",
  };

  const linkStyle = {
    color: colorScheme.textLight || "#ffffff",
    textDecoration: "none",
    opacity: 0.8,
    transition: "opacity 0.2s",
  };

  const copyrightStyle = {
    fontSize: "0.875rem",
    opacity: 0.7,
  };

  const defaultLinks = [
    { text: "Privacy Policy", url: "/privacy" },
    { text: "Terms of Service", url: "/terms" },
    { text: "Contact", url: "/contact" },
  ];

  const footerLinks = links.length > 0 ? links : defaultLinks;

  return (
    <footer style={containerStyle} className="footer-simple">
      <div style={linksContainerStyle}>
        {footerLinks?.map((link, index) => (
          <a
            key={index}
            href={link.url}
            style={linkStyle}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
          >
            {link.text}
          </a>
        ))}
      </div>
      <p style={copyrightStyle}>
        © {currentYear} {footerText}
      </p>
    </footer>
  );
}
