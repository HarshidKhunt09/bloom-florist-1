const config = {
  HARDCODED_DOMAIN:
    process.env.NEXT_PUBLIC_HARDCODED_DOMAIN || "simplylivinghomes.com.au",
  API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL || "0",
  API_TOKEN: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || "0",
  STRAPI_MENU_API: process.env.NEXT_PUBLIC_STRAPI_MENU_API || "0",
  UNSPLASH_ACCESS_KEY: "pY7pDFTWeGhSBKdP_qcSMX-8KtBIZ5lTevogbJj-o8I",

  // New API endpoints for component system
  PAGE_COMPONENTS_API:
    process.env.NEXT_PUBLIC_STRAPI_PAGE_COMPONENTS_API || "0",
  DOMAIN_CONFIG_API: process.env.NEXT_PUBLIC_STRAPI_DOMAIN_CONFIG_API || "0",
  LAYOUT_PRESETS_API: process.env.NEXT_PUBLIC_STRAPI_LAYOUT_PRESETS_API || "0",
};

export default config;
