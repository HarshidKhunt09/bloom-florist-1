/**
 * Footer - Enhanced Variant
 * Flexible footer with 1-4 columns, responsive widths, and Strapi data
 * Uses existing APIs: Articles API, Menu API, Domain Config API
 */

import React from "react";
import Link from "next/link";

export default function FooterEnhanced({
  config = {},
  content = {},
  globalConfig = {},
  allArticles = [],
  menuItems = {},
}) {
  const componentData = config?.__component ? config : config;
  const {
    width = "1200px",
    showLogo = true,
    showSiteDescription = true,
    showMenuLinks = true,
    showLatestPages = true,
    showContactInfo = true,
    columnOrder = [],
    contactEmail = null,
    contactPhone = null,
    contactAddress = null,
    description = null,
  } = componentData || {};

  const colorScheme = globalConfig?.colorScheme || {};
  const customStyles = componentData?.style || {};

  const currentYear = new Date().getFullYear();
  const siteName =
    content?.attributes?.SiteName ||
    globalConfig?.siteName ||
    content?.SiteName ||
    "Site Name";

  const siteDescription =
    description ||
    content?.attributes?.Paragraph ||
    content?.attributes?.Description ||
    content?.Paragraph ||
    content?.Description ||
    globalConfig?.description ||
    "Your site description here";

  const logoUrl =
    content?.attributes?.imageUrl ||
    globalConfig?.logoUrl ||
    content?.imageUrl ||
    null;

  const domain =
    globalConfig?.domain ||
    content?.attributes?.Domain ||
    content?.Domain ||
    "example.com";

  const menuLinks =
    menuItems && typeof menuItems === "object"
      ? Object.entries(menuItems)
          .filter(([text, url]) => text && url)
          .map(([text, url]) => ({
            text: String(text).trim(),
            url: String(url).startsWith("/")
              ? String(url).trim()
              : `/${String(url).trim()}`,
          }))
      : [];

  const latestPages = Array.isArray(allArticles)
    ? allArticles
        .filter((article) => {
          const articleDomain = article?.attributes?.Domain || article?.Domain;
          const contentDomain = content?.attributes?.Domain || content?.Domain;
          const urlSlug = article?.attributes?.urlSlug || article?.urlSlug;
          return (
            articleDomain &&
            urlSlug &&
            urlSlug !== "/" &&
            (!contentDomain || articleDomain === contentDomain)
          );
        })
        .slice(0, 5)
        .map((article) => ({
          title:
            article?.attributes?.Title ||
            article?.attributes?.H1 ||
            article?.Title ||
            article?.H1 ||
            "Page",
          url: article?.attributes?.urlSlug || article?.urlSlug || "#",
        }))
    : [];

  const getContactEmail = () => {
    if (contactEmail) return contactEmail;
    const baseDomain = domain.replace(/^www\./, "");
    const emailType = customStyles.contactEmailType || "contact";
    return `${emailType}@${baseDomain}`;
  };

  const linkStyle = {
    color: customStyles.linkColor || "#ffffff",
    textDecoration: "none",
    opacity:
      customStyles.linkOpacity !== undefined ? customStyles.linkOpacity : 0.9,
    fontSize: customStyles.linkFontSize || "0.95rem",
    fontFamily: globalConfig?.typography?.bodyFont || "Inter, sans-serif",
    transition: "all 0.25s ease",
    marginBottom: "0.625rem",
    display: "block",
    lineHeight: "1.6",
    ...(customStyles.link || {}),
  };

  const columnTypes = {
    logo: {
      title: null,
      content: (
        <div>
          <h1
            style={{
              margin: 0,
              marginBottom: showSiteDescription ? "1rem" : "0",
              fontSize: customStyles.logoFontSize || "1.5rem",
              fontWeight: 700,
              lineHeight: "1.2",
              paddingTop: "0",
              ...(customStyles.logo || {}),
            }}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color:
                  customStyles.logoColor || customStyles.textColor || "#ffffff",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = "1";
              }}
            >
              {siteName}
            </Link>
          </h1>
          {showSiteDescription && (
            <p
              style={{
                fontSize: customStyles.descriptionFontSize || "0.95rem",
                lineHeight: "1.65",
                opacity: 0.9,
                margin: 0,
                marginTop: "1rem",
                maxWidth: "100%",
                color:
                  customStyles.descriptionColor ||
                  customStyles.textColor ||
                  "#ffffff",
                fontFamily: globalConfig?.typography?.bodyFont || "Inter, sans-serif",
                ...(customStyles.description || {}),
              }}
            >
              {siteDescription}
            </p>
          )}
        </div>
      ),
    },
    siteDescription: {
      title: null,
      content: (
        <div>
          <p
            style={{
              fontSize: customStyles.descriptionFontSize || "0.95rem",
              lineHeight: "1.65",
              opacity: 0.9,
              margin: 0,
              maxWidth: "100%",
              color:
                customStyles.descriptionColor ||
                customStyles.textColor ||
                "#ffffff",
              fontFamily: globalConfig?.typography?.bodyFont || "Inter, sans-serif",
              ...(customStyles.description || {}),
            }}
          >
            {siteDescription}
          </p>
        </div>
      ),
    },
    menuLinks: {
      title: "Quick Links",
      content: (
        <div>
          {menuLinks.length > 0 ? (
            menuLinks?.map((link, index) => (
              <Link key={index} href={link.url} style={linkStyle}>
                {link.text}
              </Link>
            ))
          ) : (
            <div>
              <Link href="/about" style={linkStyle}>
                About
              </Link>
              <Link href="/services" style={linkStyle}>
                Services
              </Link>
              <Link href="/contact" style={linkStyle}>
                Contact
              </Link>
            </div>
          )}
        </div>
      ),
    },
    latestPages: {
      title: "Latest Pages",
      content: (
        <div>
          {latestPages.length > 0 ? (
            latestPages?.map((page, index) => (
              <Link key={index} href={page.url} style={linkStyle}>
                {page.title}
              </Link>
            ))
          ) : (
            <div>
              <span
                style={{
                  fontSize: customStyles.linkFontSize || "0.95rem",
                  opacity: 0.75,
                  color: customStyles.textColor || "#ffffff",
                  fontFamily: globalConfig?.typography?.bodyFont || "Inter, sans-serif",
                  lineHeight: "1.6",
                }}
              >
                No pages available
              </span>
            </div>
          )}
        </div>
      ),
    },
    contactInfo: {
      title: "Contact",
      content: (
        <div>
          <div style={{ marginBottom: contactPhone || contactAddress ? "0.75rem" : "0" }}>
            <a href={`mailto:${getContactEmail()}`} style={linkStyle}>
              {getContactEmail()}
            </a>
          </div>
          {contactPhone && (
            <div style={{ marginBottom: contactAddress ? "0.75rem" : "0" }}>
              <a href={`tel:${contactPhone}`} style={linkStyle}>
                {contactPhone}
              </a>
            </div>
          )}
          {contactAddress && (
            <div>
              <span
                style={{
                  fontSize: customStyles.linkFontSize || "0.95rem",
                  opacity: 0.9,
                  lineHeight: "1.65",
                  color: customStyles.textColor || "#ffffff",
                  display: "block",
                  fontFamily: globalConfig?.typography?.bodyFont || "Inter, sans-serif",
                }}
              >
                {contactAddress}
              </span>
            </div>
          )}
        </div>
      ),
    },
  };

  const displayColumns =
    columnOrder && columnOrder.length > 0
      ? columnOrder.filter((col) => col !== "siteDescription")
      : [];

  const columnCount = displayColumns.length || 1;

  const getContainerWidth = () => {
    switch (width) {
      case "full":
        return "100%";
      case "1200px":
        return "1200px";
      case "1000px":
        return "1000px";
      case "900px":
        return "900px";
      default:
        return width;
    }
  };

  const hasColumns = displayColumns.length > 0;

  const containerStyle = {
    padding: customStyles.container?.padding || (hasColumns ? "3.5rem 2rem 2.5rem" : "1.5rem 2rem"),
    paddingLeft: customStyles.container?.paddingLeft || "2rem",
    paddingRight: customStyles.container?.paddingRight || "2rem",
    backgroundColor:
      customStyles.backgroundColor || colorScheme.primary || "#1a1a1a",
    color: customStyles.textColor || "#ffffff",
    width: "100%",
    boxSizing: customStyles.container?.boxSizing || "border-box",
    ...(customStyles.container || {}),
  };

  const baseGridStyle = {
    maxWidth: customStyles.grid?.maxWidth || getContainerWidth(),
    margin: customStyles.grid?.margin || "0 auto",
    paddingLeft: customStyles.grid?.paddingLeft || "0",
    paddingRight: customStyles.grid?.paddingRight || "0",
    display: "grid",
    gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
    gap: customStyles.columnGap || customStyles.grid?.gap || "2rem",
    marginBottom: customStyles.grid?.marginBottom || "2rem",
    width: "100%",
    boxSizing: customStyles.grid?.boxSizing || "border-box",
    alignItems: customStyles.grid?.alignItems || "flex-start",
    ...(customStyles.grid || {}),
  };

  const columnStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  const columnTitleStyle = {
    fontSize: customStyles.titleFontSize || "1.2rem",
    fontWeight: 600,
    marginBottom: "1.25rem",
    marginTop: "0",
    fontFamily: globalConfig?.typography?.headingFont || "Poppins, sans-serif",
    color: customStyles.titleColor || customStyles.textColor || "#ffffff",
    letterSpacing: "0.01em",
    ...(customStyles.title || {}),
  };

  const copyrightStyle = {
    textAlign: "center",
    paddingTop: hasColumns ? "2rem" : "0",
    borderTop: hasColumns
      ? customStyles.borderTop || "1px solid rgba(255, 255, 255, 0.15)"
      : "none",
    fontSize: customStyles.copyrightFontSize || "0.9rem",
    opacity: 0.75,
    color: customStyles.copyrightColor || customStyles.textColor || "#ffffff",
    maxWidth: getContainerWidth(),
    margin: "0 auto",
    paddingLeft: "0",
    paddingRight: "0",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: globalConfig?.typography?.bodyFont || "Inter, sans-serif",
    lineHeight: "1.6",
    ...(customStyles.copyright || {}),
  };

  return (
    <>
      <style>{`
        .footer-enhanced {
          ${hasColumns ? "padding-left: 2rem !important;" : ""}
          ${hasColumns ? "padding-right: 2rem !important;" : ""}
          box-sizing: border-box !important;
        }
        .footer-enhanced-grid {
          display: grid;
          grid-template-columns: repeat(${displayColumns.length || 1}, 1fr);
          gap: ${customStyles.columnGap || "2rem"};
          margin-bottom: 2rem;
          width: 100%;
          box-sizing: border-box;
        }
        .footer-enhanced-grid a:hover {
          opacity: 1 !important;
          color: ${
            customStyles.linkHoverColor || customStyles.linkColor || "#ffffff"
          } !important;
          transform: translateX(2px);
        }
        .footer-enhanced-grid a {
          transition: all 0.25s ease;
        }
        @media (max-width: 992px) {
          .footer-enhanced-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 768px) {
          .footer-enhanced {
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
          }
          .footer-enhanced-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 480px) {
          .footer-enhanced {
            padding: ${
              customStyles.paddingMobile || "2.5rem 1rem 2rem"
            } !important;
          }
          .footer-enhanced-grid {
            gap: 1.25rem !important;
          }
        }
      `}</style>
      <footer style={containerStyle} className="footer-enhanced">
        {displayColumns.length > 0 && (
          <div className="footer-enhanced-grid" style={baseGridStyle}>
            {displayColumns?.map((columnKey, index) => {
              const column = columnTypes[columnKey];
              if (!column) {
                console.warn(`Footer column type "${columnKey}" not found`);
                return null;
              }

              const isLogoColumn = columnKey === "logo";
              const currentColumnStyle = isLogoColumn
                ? { ...columnStyle, flexDirection: "initial" }
                : columnStyle;

              return (
                <div key={`footer-col-${index}`} style={currentColumnStyle}>
                  {column.title ? (
                    <h3 style={columnTitleStyle}>{column.title}</h3>
                  ) : (
                    <div
                      style={{
                        height: "0",
                        minHeight: `calc(${
                          customStyles.titleFontSize || "1.125rem"
                        } + 1rem)`,
                        visibility: "hidden",
                      }}
                    />
                  )}
                  {column.content}
                </div>
              );
            })}
          </div>
        )}

        <div style={copyrightStyle}>
          <p>
            Copyright © {currentYear} {siteName}. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
