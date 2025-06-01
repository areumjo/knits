
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SITE_NAME, TOP_NAVIGATION, AREUM_ACCENT_COLOR } from '../../constants';
import { MagnifyingGlassIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const activeClassName = `text-${AREUM_ACCENT_COLOR} dark:text-${AREUM_ACCENT_COLOR} font-semibold border-b-2 border-${AREUM_ACCENT_COLOR} dark:border-${AREUM_ACCENT_COLOR}`;
  const inactiveClassName = "text-text-secondary hover:text-accent-clay dark:hover:text-accent-clay transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-bg-secondary/80 dark:bg-bg-secondary/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className={`font-primary text-2xl font-bold text-text-primary hover:text-accent-clay dark:hover:text-accent-clay`}>
          {SITE_NAME}
        </Link>
        <nav className="flex items-center space-x-6">
          {TOP_NAVIGATION.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `${isActive ? activeClassName : inactiveClassName} pb-1`}
            >
              {item.name}
            </NavLink>
          ))}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
            className="text-text-secondary hover:text-accent-clay dark:hover:text-accent-clay transition-colors"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>
          <Link to="/search" aria-label="Search" className="text-text-secondary hover:text-accent-clay dark:hover:text-accent-clay transition-colors">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </Link>
        </nav>
      </div>
    </header>
  );
};
