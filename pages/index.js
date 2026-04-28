// imports
import axios from "axios";
import Head from "next/head";
import config from "../config";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import Link from "next/link";
import ComponentRenderer from "../components/ComponentRenderer";
import { getCanonicalUrl, usesComponentSystem } from "../lib/utils";
import FooterEnhanced from "../components/Footer/Enhanced";
import {
  fallbackHomeArticle,
  fallbackOtherArticles,
  fallbackPageComponents,
  fallbackGlobalConfig,
  fallbackMenuItems,
  getAllFallbackArticles,
} from "../lib/fallbackData";

// Function to process Markdown content
async function processMarkdown(content) {
  let unescapedContent = content.replace(/\\n/g, "\n");
  unescapedContent = unescapedContent.replace(/^(#{1,6})/gm, "$1 ");

  const processedContent = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .process(unescapedContent);

  return processedContent.toString();
}

// Function to parse styles
function parseStyles(styles) {
  // Return empty object for null/undefined (common when using component system)
  if (styles === null || styles === undefined) {
    return {};
  }

  if (typeof styles === "string") {
    try {
      return JSON.parse(styles);
    } catch (error) {
      console.error("Error parsing styles string:", error);
      return {};
    }
  } else if (typeof styles === "object") {
    return styles;
  } else {
    console.warn("Unexpected styles format:", typeof styles);
    return {};
  }
}

// Function to fetch image data from Unsplash
async function fetchImageData(keywords) {
  const accessKey = config.UNSPLASH_ACCESS_KEY;
  const query = encodeURIComponent(keywords.replace(/,/g, " "));
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=1`;

  try {
    const res = await axios.get(url);
    const results = res.data.results;
    if (results.length > 0) {
      const photo = results[0];
      const imageUrl = photo.urls.regular;
      const photographerName = photo.user.name;
      const photographerProfileUrl = photo.user.links.html;
      return { imageUrl, photographerName, photographerProfileUrl };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
    return null;
  }
}

// Main component
export default function HomePage({
  homeArticle,
  otherArticles,
  pageComponents,
  globalConfig,
  allArticles,
  menuItems,
}) {
  if (!homeArticle) return <div>Home page content not found</div>;

  const { attributes } = homeArticle;

  // Check if domain uses new component system
  const useNewSystem = usesComponentSystem(globalConfig);

  // Parse old styles for legacy layout
  const containerStyles = parseStyles(attributes.containerStyles);
  const headerStyles = parseStyles(attributes.headerStyles);
  const bodyStyles = parseStyles(attributes.bodyStyles);
  const paragraphStyles = parseStyles(attributes.paragraphStyles);

  return (
    <div className={useNewSystem ? "page-wrapper" : "container"} style={useNewSystem ? undefined : containerStyles}>
      <Head>
        <title>{attributes.MetaTitle}</title>
        <meta name="description" content={attributes.MetaDescription} />
        {getCanonicalUrl(attributes) && (
          <link rel="canonical" href={getCanonicalUrl(attributes)} />
        )}
        {attributes.Schema && (
          <script type="application/ld+json">
            {JSON.stringify(attributes.Schema)}
          </script>
        )}
      </Head>

      {useNewSystem && pageComponents ? (
        // NEW: Use component system
        // Filter out Footer components - footer comes from Domain Config only
        <ComponentRenderer
          components={pageComponents.filter(comp => {
            const compType = comp.__component || comp.type || '';
            return !compType.toLowerCase().includes('footer');
          })}
          content={homeArticle}
          globalConfig={globalConfig}
          allArticles={allArticles}
          menuItems={menuItems}
        />
      ) : (
        // OLD: Fallback to hardcoded layout for legacy sites
        <>
          <header className="header" style={headerStyles}>
            <h2>{attributes.H1}</h2>
            <h3>{attributes.Title}</h3>
            {attributes.imageUrl && (
              <div>
                <img src={attributes.imageUrl} alt={attributes.Title} />
              </div>
            )}
          </header>

          <main className="content" style={bodyStyles}>
            <p style={paragraphStyles}>{attributes.Paragraph}</p>
            {attributes.ProcessedMarkdown && (
              <div
                dangerouslySetInnerHTML={{
                  __html: attributes.ProcessedMarkdown,
                }}
              />
            )}
          </main>

          <section className="article-selection">
            <div className="article-grid">
              {otherArticles.map((article) => (
                <Link
                  href={article.attributes.urlSlug}
                  key={article.id}
                  className="article-card"
                >
                  {article.attributes.imageUrl && (
                    <div className="image-container">
                      <img
                        src={article.attributes.imageUrl}
                        alt={article.attributes.Title}
                        width={"650px"}
                        className="artimg"
                      />
                    </div>
                  )}
                  <h3>{article.attributes.Title}</h3>
                  <p>
                    {(article.attributes.Paragraph || "").substring(0, 100)}
                    ...
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
      {/* Global Footer from Domain Config (for legacy layout too) */}
      {globalConfig?.footer && (
        <FooterEnhanced
          config={globalConfig.footer}
          content={homeArticle}
          globalConfig={globalConfig}
          allArticles={allArticles}
          menuItems={menuItems}
        />
      )}
    </div>
  );
}

// getStaticProps function
export async function getStaticProps() {
  try {
    // Fetch article content (existing code)
    const res = await axios.get(config.API_URL, {
      headers: {
        Authorization: `Bearer ${config.API_TOKEN}`,
      },
    });
    const allArticles = res.data.data;
    const homeArticle = allArticles.find(
      (article) =>
        article.attributes.Domain === config.HARDCODED_DOMAIN &&
        article.attributes.urlSlug === "/"
    );

    const otherArticles = allArticles.filter(
      (article) =>
        article.attributes.Domain === config.HARDCODED_DOMAIN &&
        article.attributes.urlSlug !== "/"
    );

    if (!homeArticle) {
      return { notFound: true };
    }

    // Process markdown (existing code)
    if (homeArticle.attributes.Markdown) {
      homeArticle.attributes.ProcessedMarkdown = await processMarkdown(
        homeArticle.attributes.Markdown
      );
    }

    // Fetch image data for the homeArticle (existing code)
    if (homeArticle.attributes.imgkeywords) {
      const imageData = await fetchImageData(
        homeArticle.attributes.imgkeywords
      );
      if (imageData) {
        homeArticle.attributes.imageUrl = imageData.imageUrl;
        homeArticle.attributes.photographerName = imageData.photographerName;
        homeArticle.attributes.photographerProfileUrl =
          imageData.photographerProfileUrl;
      }
    }

    // Fetch image data for otherArticles (existing code)
    await Promise.all(
      otherArticles.map(async (article) => {
        if (article.attributes.imgkeywords) {
          const imageData = await fetchImageData(
            article.attributes.imgkeywords
          );
          if (imageData) {
            article.attributes.imageUrl = imageData.imageUrl;
            article.attributes.photographerName = imageData.photographerName;
            article.attributes.photographerProfileUrl =
              imageData.photographerProfileUrl;
          }
        }
      })
    );

    // NEW: Fetch page components configuration
    let pageComponents = null;
    let globalConfig = null;

    try {
      if (config.PAGE_COMPONENTS_API && config.PAGE_COMPONENTS_API !== "0") {
        const componentsRes = await axios.get(
          `${config.PAGE_COMPONENTS_API}&filters[page][$eq]=home`,
          { headers: { Authorization: `Bearer ${config.API_TOKEN}` } }
        );
        if (componentsRes.data.data.length > 0) {
          pageComponents = componentsRes.data.data[0].attributes.components;
        }
      }
    } catch (error) {
      console.log("No page components found, using legacy layout");
    }

    // NEW: Fetch domain configuration
    try {
      if (config.DOMAIN_CONFIG_API && config.DOMAIN_CONFIG_API !== "0") {
        const configRes = await axios.get(config.DOMAIN_CONFIG_API, {
          headers: { Authorization: `Bearer ${config.API_TOKEN}` },
        });
        if (configRes.data.data.length > 0) {
          globalConfig = configRes.data.data[0].attributes;
        }
      }
    } catch (error) {
      console.log("No domain config found");
    }

    // Fetch menu items for footer
    let menuItems = {};
    try {
      if (config.STRAPI_MENU_API && config.STRAPI_MENU_API !== "0") {
        const menuRes = await axios.get(config.STRAPI_MENU_API, {
          headers: { Authorization: `Bearer ${config.API_TOKEN}` },
        });
        const m = menuRes?.data?.data?.[0]?.attributes || {};
        if (m.link1anchor && m.link1url) menuItems[m.link1anchor] = m.link1url;
        if (m.link2anchor && m.link2url) menuItems[m.link2anchor] = m.link2url;
        if (m.link3anchor && m.link3url) menuItems[m.link3anchor] = m.link3url;
        if (m.link4anchor && m.link4url) menuItems[m.link4anchor] = m.link4url;
        if (m.link5anchor && m.link5url) menuItems[m.link5anchor] = m.link5url;
        if (m.link6anchor && m.link6url) menuItems[m.link6anchor] = m.link6url;
      }
    } catch (error) {
      console.log("No menu found, using defaults");
    }

    // Filter allArticles by domain for footer
    const domainArticles = allArticles.filter(
      (article) => article.attributes.Domain === config.HARDCODED_DOMAIN
    );

    return {
      props: {
        homeArticle,
        otherArticles,
        pageComponents,
        globalConfig,
        allArticles: domainArticles,
        menuItems,
      },
    };
  } catch (error) {
    console.error("Error in getStaticProps, using fallback data:", error?.message || error);
    return {
      props: {
        homeArticle: fallbackHomeArticle,
        otherArticles: fallbackOtherArticles,
        pageComponents: fallbackPageComponents,
        globalConfig: fallbackGlobalConfig,
        allArticles: getAllFallbackArticles(),
        menuItems: fallbackMenuItems,
      },
    };
  }
}
