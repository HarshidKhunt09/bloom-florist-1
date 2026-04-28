/**
 * Component Renderer
 * Dynamically renders components based on Strapi configuration
 */

import React from "react";
import { getComponent } from "../lib/componentMap";
import LayoutRow from "./LayoutRow";
import ErrorBoundary from "./ErrorBoundary";

export default function ComponentRenderer({
  components = [],
  content = {},
  globalConfig = {},
  allArticles = null,
  menuItems = null,
}) {
  if (!components || components.length === 0) {
    console.warn("No components provided to ComponentRenderer");
    return null;
  }

  return (
    <>
      {components.map((componentConfig, index) => {
        // Handle LayoutRow (split sections)
        if (componentConfig.type === "LayoutRow") {
          return (
            <LayoutRow
              key={`layout-row-${index}`}
              config={componentConfig}
              content={content}
              globalConfig={globalConfig}
            />
          );
        }

        // Regular component rendering
        // Handle Strapi component format (__component field)
        const componentType =
          componentConfig.__component || componentConfig.type;
        const componentVariant = componentConfig.variant || "default";

        // Map Strapi component names to our component map
        let mappedType = componentType;
        let mappedVariant = componentVariant;

        if (componentType === "components.hero-section") {
          mappedType = "HeroSection";
          mappedVariant = componentConfig.variant || componentConfig.config?.variant || "fullscreen";
        } else if (componentType === "components.features-grid") {
          mappedType = "FeaturesGrid";
          // Support variant from config: "3col", "4col", or "iconCards"
          mappedVariant =
            componentConfig.variant ||
            componentConfig.config?.variant ||
            "3col";
        } else if (componentType === "components.cta-section") {
          mappedType = "CTA";
          mappedVariant = componentConfig.variant || componentConfig.config?.variant || "centered";
        } else if (componentType === "components.testimonials-grid") {
          mappedType = "Testimonials";
          mappedVariant = "grid";
        } else if (componentType === "components.industry-expertise-grid") {
          mappedType = "IndustryExpertise";
          mappedVariant = "grid";
        } else if (
          componentType === "components.footer"
        ) {
          mappedType = "Footer";
          mappedVariant = "enhanced";
        } else if (componentType === "components.content-section") {
          mappedType = "ContentSection";
          mappedVariant = componentConfig.variant || componentConfig.config?.variant || "oneColumn";
        } else if (componentType === "components.faq") {
          mappedType = "FAQ";
          mappedVariant = componentConfig.variant || componentConfig.config?.variant || "accordion";
        } else if (componentType === "components.about-section") {
          mappedType = "AboutSection";
          mappedVariant = componentConfig.variant || componentConfig.config?.variant || "story";
        } else if (componentType === "components.gallery") {
          mappedType = "Gallery";
          mappedVariant = componentConfig.variant || componentConfig.config?.variant || "grid";
        } else if (componentType === "components.contact-form") {
          mappedType = "ContactForm";
          mappedVariant = componentConfig.variant || componentConfig.config?.variant || "simple";
        } else if (componentType === "components.google-map") {
          mappedType = "GoogleMap";
          mappedVariant = componentConfig.variant || componentConfig.config?.variant || "simple";
        } else if (componentType === "components.blog-grid") {
          mappedType = "Blog";
          mappedVariant = componentConfig.variant || componentConfig.config?.variant || "grid";
        }

        const Component = getComponent(mappedType, mappedVariant);

        if (!Component) {
          console.warn(
            `Component ${mappedType}.${mappedVariant} not found. Skipping.`
          );
          return null;
        }

        // Merge top-level fields (title, features, testimonials, etc.) into config
        // so components can access them via config.features, config.title, etc.
        const mergedConfig = {
          ...(componentConfig.config || {}),
          ...Object.fromEntries(
            Object.entries(componentConfig).filter(
              ([k]) => !['type', 'variant', 'config', 'layout', '__component'].includes(k)
            )
          ),
        };

        return (
          <ErrorBoundary
            key={`${mappedType}-${mappedVariant}-${index}`}
            componentName={`${mappedType}.${mappedVariant}`}
          >
            <Component
              config={mergedConfig}
              layout={componentConfig.layout || {}}
              content={content}
              globalConfig={globalConfig}
              allArticles={allArticles}
              menuItems={menuItems}
            />
          </ErrorBoundary>
        );
      })}
    </>
  );
}
