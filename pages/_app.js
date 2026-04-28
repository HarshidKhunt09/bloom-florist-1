import axios from "axios";
import App from "next/app";
import Head from "next/head";
import Link from "next/link";
import "../styles/globals.css";
import config from "../config";
import BackToTop from "../components/BackToTop";
import { fallbackMenuItems, fallbackHomeArticle } from "../lib/fallbackData";

// Convert fallback menu array to {title: url} object format used by Header
function convertFallbackMenu(menuArr) {
  if (!Array.isArray(menuArr)) return menuArr;
  const result = {};
  menuArr.forEach((item) => {
    const title = item.attributes?.title || item.title;
    const url = item.attributes?.url || item.url;
    if (title && url) result[title] = url;
  });
  return Object.keys(result).length ? result : { Home: '/' };
}

const Header = ({ siteName, menuItems, headerConfig }) => {
  // Only apply custom styles if headerConfig exists and has style property
  const hasCustomStyles = headerConfig?.style && Object.keys(headerConfig.style).length > 0;
  const customStyles = headerConfig?.style || {};

  // Only apply inline styles if custom styles exist, otherwise rely on CSS classes
  const headerStyle = hasCustomStyles ? {
    backgroundColor: customStyles.backgroundColor,
    color: customStyles.textColor,
    width: "100%",
    ...(customStyles.container || {}),
  } : undefined;

  const containerStyle = hasCustomStyles ? {
    maxWidth: customStyles.container?.maxWidth,
    margin: customStyles.container?.margin || "0 auto",
    padding: customStyles.container?.padding,
    display: customStyles.container?.display || "flex",
    justifyContent: customStyles.container?.justifyContent || "space-between",
    alignItems: customStyles.container?.alignItems || "center",
    ...(customStyles.container || {}),
  } : undefined;

  const titleStyle = hasCustomStyles ? {
    fontSize: customStyles.titleFontSize || customStyles.logo?.fontSize,
    fontWeight: customStyles.titleFontWeight || customStyles.logo?.fontWeight,
    color: customStyles.titleColor || customStyles.logo?.color || customStyles.textColor,
    margin: customStyles.logo?.margin || 0,
    ...(customStyles.logo || {}),
  } : undefined;

  const titleLinkStyle = hasCustomStyles ? {
    textDecoration: "none",
    color: customStyles.titleColor || customStyles.logo?.color || customStyles.textColor,
    transition: "all 0.3s ease",
  } : undefined;

  const navStyle = hasCustomStyles && customStyles.navigation ? {
    ...(customStyles.navigation || {}),
  } : undefined;

  const navListStyle = hasCustomStyles && customStyles.navList ? {
    ...(customStyles.navList || {}),
  } : undefined;

  const navItemStyle = hasCustomStyles && customStyles.navItem ? {
    ...(customStyles.navItem || {}),
  } : undefined;

  const navLinkStyle = hasCustomStyles ? {
    color: customStyles.navLinkColor || customStyles.linkColor || customStyles.textColor,
    fontSize: customStyles.navLinkFontSize || customStyles.link?.fontSize,
    fontWeight: customStyles.navLinkFontWeight || customStyles.link?.fontWeight,
    textDecoration: "none",
    padding: customStyles.link?.padding,
    borderRadius: customStyles.link?.borderRadius,
    transition: customStyles.link?.transition,
    ...(customStyles.link || {}),
  } : undefined;

  return (
    <header className="app-header" style={headerStyle}>
      <div className="header-container" style={containerStyle}>
        <h1 className="site-title" style={titleStyle}>
          <Link href="/" style={titleLinkStyle}>
            {siteName}
          </Link>
        </h1>
        <nav className="main-navigation" role="navigation" aria-label="Main navigation" style={navStyle}>
          <ul className="nav-list" style={navListStyle}>
            {Object.entries(menuItems).map(([name, url]) => (
              <li key={name} className="nav-item" style={navItemStyle}>
                <Link 
                  href={url} 
                  className="nav-link"
                  style={navLinkStyle}
                  onMouseEnter={hasCustomStyles ? (e) => {
                    e.currentTarget.style.color = customStyles.navLinkHoverColor || customStyles.linkHover?.color || customStyles.textColor;
                    e.currentTarget.style.backgroundColor = customStyles.navLinkHoverBackgroundColor || customStyles.linkHover?.backgroundColor || "transparent";
                    if (customStyles.linkHover?.transform) {
                      e.currentTarget.style.transform = customStyles.linkHover.transform;
                    }
                  } : undefined}
                  onMouseLeave={hasCustomStyles ? (e) => {
                    e.currentTarget.style.color = customStyles.navLinkColor || customStyles.linkColor || customStyles.textColor;
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.transform = "none";
                  } : undefined}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

// Footer is now rendered from Domain Config in individual pages (FooterEnhanced component)

// helper to turn { ".class": { prop: val, ... }, ... } into raw CSS
function cssObjectToString(cssObj = {}) {
  try {
    return Object.entries(cssObj)
      .map(([selector, rules]) => {
        const body = Object.entries(rules)
          .map(([prop, val]) => `${prop}: ${val};`)
          .join(" ");
        return `${selector} { ${body} }`;
      })
      .join(" ");
  } catch {
    return "";
  }
}

class MyApp extends App {
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);

    const domain = config.HARDCODED_DOMAIN;
    let domainStyles = "";
    let siteName = "Default Site Name";
    let menuItems = {};

    let headerConfig = null;

    try {
      // ---------- Domain Config (for styles/colors) ----------
      const configRes = await axios.get(config.DOMAIN_CONFIG_API, {
        headers: { Authorization: `Bearer ${config.API_TOKEN}` },
      });

      const domainConfigs = configRes?.data?.data || [];
      const domainConfig =
        domainConfigs.find((config) => config?.attributes?.domain === domain)
          ?.attributes || {};
      const colorScheme = domainConfig?.colorScheme || {};
      headerConfig = domainConfig?.header || null;

      // Convert color scheme to CSS
      if (colorScheme.primary) {
        domainStyles = `
          :root {
            --color-primary: ${colorScheme.primary};
            --color-secondary: ${colorScheme.secondary || "#64748b"};
          }
        `;
      }

      // ---------- Site Name (from Articles) ----------
      const articlesRes = await axios.get(config.API_URL, {
        headers: { Authorization: `Bearer ${config.API_TOKEN}` },
      });

      const articles = articlesRes?.data?.data || [];
      const home = articles.find((a) => a?.attributes?.urlSlug === "/");

      if (home?.attributes?.SiteName) {
        siteName = home.attributes.SiteName;
      }

      // ---------- Menu (Menu2) ----------
      const menuRes = await axios.get(config.STRAPI_MENU_API, {
        headers: { Authorization: `Bearer ${config.API_TOKEN}` },
      });

      const m = menuRes?.data?.data?.[0]?.attributes || {};
      const tmp = {};
      if (m.link1anchor && m.link1url) tmp[m.link1anchor] = m.link1url;
      if (m.link2anchor && m.link2url) tmp[m.link2anchor] = m.link2url;
      if (m.link3anchor && m.link3url) tmp[m.link3anchor] = m.link3url;
      if (m.link4anchor && m.link4url) tmp[m.link4anchor] = m.link4url;
      if (m.link5anchor && m.link5url) tmp[m.link5anchor] = m.link5url;
      if (m.link6anchor && m.link6url) tmp[m.link6anchor] = m.link6url;

      menuItems = Object.keys(tmp).length ? tmp : { Home: "/" };
    } catch (err) {
      console.error(
        "Failed to fetch global data, using fallbacks:",
        err?.response?.data || err?.message || err
      );
      menuItems = Object.keys(menuItems || {}).length ? menuItems : convertFallbackMenu(fallbackMenuItems);
      siteName = fallbackHomeArticle?.attributes?.SiteName || siteName;
    }

    return { ...appProps, domainStyles, siteName, menuItems, headerConfig };
  }

  render() {
    const { Component, pageProps, domainStyles, siteName, menuItems, headerConfig } =
      this.props;
    return (
      <>
        <Head>
          <style>{domainStyles}</style>
        </Head>
        <Header siteName={siteName} menuItems={menuItems} headerConfig={headerConfig} />
        <main>
          <Component {...pageProps} />
        </main>
        {/* Footer is now rendered from Domain Config in individual pages */}
        <BackToTop />
      </>
    );
  }
}

export default MyApp;
