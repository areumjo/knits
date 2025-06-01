
import React from 'react';
import { Link } from 'react-router-dom';
import { AREUM_ACCENT_COLOR } from '../../constants'; // This is 'accent-clay'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ElementType;
  rightIcon?: React.ElementType;
  children: React.ReactNode;
  className?: string; // Allow additional custom classes
}

export const Button: React.FC<ButtonProps> = ({
  to,
  variant = 'primary',
  size = 'md',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-bg-secondary transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantStyles = {
    primary: `bg-${AREUM_ACCENT_COLOR} text-white hover:bg-${AREUM_ACCENT_COLOR}-hover focus:ring-${AREUM_ACCENT_COLOR} dark:text-bg-primary`, // dark:text-bg-primary for high contrast on dark accent
    secondary: "bg-bg-accent text-text-secondary hover:bg-border-light dark:hover:bg-border-medium focus:ring-text-muted", // border-light for light hover, border-medium for dark hover
    outline: `border border-${AREUM_ACCENT_COLOR} text-${AREUM_ACCENT_COLOR} hover:bg-${AREUM_ACCENT_COLOR} hover:text-white focus:ring-${AREUM_ACCENT_COLOR} dark:hover:text-bg-primary`, // dark:hover:text-bg-primary for high contrast
    ghost: `text-${AREUM_ACCENT_COLOR} hover:bg-${AREUM_ACCENT_COLOR}/10 focus:ring-${AREUM_ACCENT_COLOR} dark:hover:bg-${AREUM_ACCENT_COLOR}/20`, // Using opacity with the accent color
  };

  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {LeftIcon && <LeftIcon className={`h-5 w-5 ${children ? 'mr-2' : ''}`} />}
      {children}
      {RightIcon && <RightIcon className={`h-5 w-5 ${children ? 'ml-2' : ''}`} />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={combinedClassName} {...props}>
      {content}
    </button>
  );
};
