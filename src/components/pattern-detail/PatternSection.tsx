// src/components/pattern-detail/PatternSection.tsx
import React from 'react';
import { LightBulbIcon } from '@heroicons/react/24/outline'; // Default icon
import { usePatternDetailContext } from '../../contexts/PatternDetailContext';

interface PatternSectionProps {
  sectionId: string; // Used for state management (e.g., pattern.id + '_materials')
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  // isCollapsed and onToggle will come from context based on sectionId
}

export const PatternSection: React.FC<PatternSectionProps> = ({ sectionId, title, icon: IconComponent, children }) => {
  const { sectionToggleStates, setSectionToggleState, announceStatus } = usePatternDetailContext();
  const isCollapsed = sectionToggleStates[sectionId] || false; // Default to expanded if not in state

  const TitleIcon = IconComponent || LightBulbIcon;

  const handleToggle = () => {
    const newCollapsedState = !isCollapsed;
    setSectionToggleState(sectionId, newCollapsedState);
    announceStatus(`${title} ${newCollapsedState ? 'collapsed' : 'expanded'}.`);
  };

  return (
    <section className={`pdiv-toggleable-section section ${isCollapsed ? 'section-is-collapsed' : ''}`} id={sectionId}>
      <h3
        className={`pdiv-section-title ${isCollapsed ? 'is-collapsed' : ''}`}
        role="button"
        tabIndex={0}
        aria-expanded={!isCollapsed}
        aria-controls={`content-${sectionId}`}
        onClick={handleToggle}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleToggle()}
      >
        <span className="pdiv-toggle-indicator" aria-hidden="true">{isCollapsed ? '+' : '−'}</span>
        <TitleIcon className="pdiv-section-icon" aria-hidden="true" />
        <span className="pdiv-section-title-text">{title}</span>
      </h3>
      <div className={`pdiv-section-content ${isCollapsed ? 'is-collapsed' : ''}`} id={`content-${sectionId}`}>
        {children}
      </div>
    </section>
  );
};
