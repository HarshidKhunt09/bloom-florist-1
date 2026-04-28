/**
 * Layout Row Component
 * Handles split layouts (1/2, 1/3, etc.)
 */

import React from 'react';
import { getComponent } from '../lib/componentMap';

export default function LayoutRow({ config, content, globalConfig }) {
  const { layout = {}, children = [] } = config;
  const { columns = 2, gap = 'medium', align = 'stretch' } = layout;

  if (!children || children.length === 0) {
    console.warn('LayoutRow has no children');
    return null;
  }

  // Gap sizes in rem
  const gapSizes = {
    tight: '1rem',
    medium: '2rem',
    loose: '4rem',
  };

  // Grid template columns based on number of columns
  const getGridColumns = () => {
    if (Array.isArray(columns)) {
      // Custom column sizes like [2, 1] for 2/3 + 1/3
      return columns.map(col => `${col}fr`).join(' ');
    }
    // Equal columns like 2 = "1fr 1fr"
    return `repeat(${columns}, 1fr)`;
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: getGridColumns(),
    gap: gapSizes[gap] || gapSizes.medium,
    alignItems: align,
    padding: '2rem 0',
  };

  return (
    <div style={containerStyle} className="layout-row">
      {children.map((childConfig, index) => {
        const ChildComponent = getComponent(
          childConfig.type,
          childConfig.variant
        );

        if (!ChildComponent) {
          console.warn(
            `Child component ${childConfig.type}.${childConfig.variant} not found`
          );
          return null;
        }

        return (
          <div key={`child-${index}`} className="layout-row-item">
            <ChildComponent
              config={childConfig.config || {}}
              layout={childConfig.layout || {}}
              content={content}
              globalConfig={globalConfig}
            />
          </div>
        );
      })}
    </div>
  );
}
