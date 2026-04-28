/**
 * Footer - Multi Column Variant
 * Multiple columns with links and information
 */

import React from "react";

export default function FooterMultiColumn({ config = {}, content = {}, globalConfig = {} }) {
  const { footerText = "All Rights Reserved", columns = [] } = config;

  const colorScheme = globalConfig?.colorScheme || {};
  const currentYear = new Date().getFullYear();

  const defaultColumns = [
    {
      title: "Company",
      links: [
        { text: "About Us", url: "/about" },
        { text: "Services", url: "/services" },
        { text: "Contact", url: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { text: "Privacy Policy", url: "/privacy" },
        { text: "Terms of Service", url: "/terms" },
      ],
    },
    {
      title: "Connect",
      links: [
        { text: "Facebook", url: "#" },
        { text: "Instagram", url: "#" },
        { text: "LinkedIn", url: "#" },
      ],
    },
  ];

  const footerColumns = columns.length > 0 ? columns : defaultColumns;

  const containerStyle = {
    padding: "4rem 2rem 2rem",
    backgroundColor: colorScheme.primary || "#333333",
    color: colorScheme.textLight || "#ffffff",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "2rem",
    maxWidth: "1200px",
    margin: "0 auto 2rem",
  };

  const columnStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const columnTitleStyle = {
    fontSize: "1.125rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    fontFamily: globalConfig?.typography?.headingFont || "Poppins, sans-serif",
  };

  const linkStyle = {
    color: colorScheme.textLight || "#ffffff",
    textDecoration: "none",
    opacity: 0.8,
    transition: "opacity 0.2s",
    marginBottom: "0.5rem",
    display: "block",
  };

  const copyrightStyle = {
    textAlign: "center",
    paddingTop: "2rem",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    fontSize: "0.875rem",
    opacity: 0.7,
  };

  return (
    <footer style={containerStyle} className="footer-multi-column">
      <div style={gridStyle}>
        {footerColumns.map((column, index) => (
          <div key={index} style={columnStyle}>
            <h3 style={columnTitleStyle}>{column.title}</h3>
            {column.links?.map((link, linkIndex) => (
              <a
                key={linkIndex}
                href={link.url}
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
              >
                {link.text}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div style={copyrightStyle}>
        © {currentYear} {footerText}
      </div>
    </footer>
  );
}
