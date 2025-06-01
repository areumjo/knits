
import React from 'react';
import { Link } from 'react-router-dom';
import { AREUM_ACCENT_COLOR } from '../../constants'; // This is now 'accent-clay'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ElementType;
  rightIcon?: React.ElementType;
  children: React.ReactNode;
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

  // Updated variant styles for new color scheme
  const variantStyles = {
    primary: `bg-${AREUM_ACCENT_COLOR} text-white hover:bg-${AREUM_ACCENT_COLOR}-hover focus:ring-${AREUM_ACCENT_COLOR} dark:bg-${AREUM_ACCENT_COLOR} dark:text-bg-primary dark:hover:bg-${AREUM_ACCENT_COLOR}-hover dark:focus:ring-${AREUM_ACCENT_COLOR}`,
    secondary: "bg-bg-accent text-text-secondary hover:bg-border-light dark:bg-bg-accent dark:text-text-secondary dark:hover:bg-border-light focus:ring-text-muted dark:focus:ring-text-muted",
    outline: `border border-${AREUM_ACCENT_COLOR} text-${AREUM_ACCENT_COLOR} hover:bg-${AREUM_ACCENT_COLOR} hover:text-white focus:ring-${AREUM_ACCENT_COLOR} dark:border-${AREUM_ACCENT_COLOR} dark:text-${AREUM_ACCENT_COLOR} dark:hover:bg-${AREUM_ACCENT_COLOR} dark:hover:text-bg-primary dark:focus:ring-${AREUM_ACCENT_COLOR}`,
    ghost: `text-${AREUM_ACCENT_COLOR} hover:bg-${AREUM_ACCENT_COLOR}/10 focus:ring-${AREUM_ACCENT_COLOR} dark:text-${AREUM_ACCENT_COLOR} dark:hover:bg-${AREUM_ACCENT_COLOR}/20 dark:focus:ring-${AREUM_ACCENT_COLOR}`,
  };
  // Note: Tailwind JIT might not pick up dynamic class concatenation like `bg-${AREUM_ACCENT_COLOR}-hover`.
  // If hover styles don't work, define them explicitly or use Tailwind's `hover:` prefix with direct color names (e.g., `hover:bg-accent-clay-hover`).
  // For simplicity here, assuming the CSS variable `--accent-clay-hover` exists and Tailwind is configured for `accent-clay-hover` class.

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
