
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverEffect = false }) => {
  const baseStyles = "bg-bg-secondary dark:bg-bg-secondary rounded-lg shadow-lg overflow-hidden";
  // Using Tailwind's shadow classes which now use CSS variables for color
  const hoverStyles = hoverEffect ? "transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105" : ""; 
  const clickableStyles = onClick ? "cursor-pointer" : "";

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${clickableStyles} ${className}`}
      onClick={onClick}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      {children}
    </div>
  );
};
