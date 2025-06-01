
import React from 'react';
// AREUM_ACCENT_COLOR (now 'accent-clay') will be used by Tailwind class bg-accent-clay

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, alignment = 'left', className = '' }) => {
  const textAlignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[alignment];

  return (
    <div className={`mb-8 ${textAlignClass} ${className}`}>
      <h2 className={`font-primary text-3xl md:text-4xl font-bold text-text-primary mb-2`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg text-text-secondary max-w-2xl ${alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ml-auto' : 'mr-auto'}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-3 w-20 h-1 bg-accent-clay ${alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ml-auto' : ''}`}></div>
    </div>
  );
};
