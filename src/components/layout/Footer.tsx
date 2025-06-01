
import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_NAME, CURRENT_YEAR, FOOTER_MAIN_LINKS, FOOTER_LEGAL_LINKS, AREUM_ACCENT_COLOR } from '../../constants';
import { HeartIcon } from '@heroicons/react/24/solid'; 

export const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-secondary border-t border-border-light text-sm text-text-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h5 className={`font-primary text-lg font-semibold text-text-primary mb-3`}>{SITE_NAME}</h5>
            <p className="text-xs">Exploring the art and engineering of knitwear. Designs, notes, and learning paths for the curious knitter.</p>
          </div>
          <div>
            <h5 className={`font-primary text-md font-semibold text-text-primary mb-3`}>Explore</h5>
            <ul className="space-y-2">
              {FOOTER_MAIN_LINKS.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className={`hover:text-${AREUM_ACCENT_COLOR} dark:hover:text-${AREUM_ACCENT_COLOR} transition-colors`}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className={`font-primary text-md font-semibold text-text-primary mb-3`}>Connect</h5>
            <div className="flex space-x-3">
              {/* Placeholder icons, assuming HeartIcon for example */}
              <a href="#" aria-label="Instagram" className={`text-text-muted hover:text-${AREUM_ACCENT_COLOR} dark:hover:text-${AREUM_ACCENT_COLOR}`}><HeartIcon className="h-5 w-5" /></a>
              <a href="#" aria-label="Pinterest" className={`text-text-muted hover:text-${AREUM_ACCENT_COLOR} dark:hover:text-${AREUM_ACCENT_COLOR}`}><HeartIcon className="h-5 w-5" /></a>
              <a href="#" aria-label="Ravelry" className={`text-text-muted hover:text-${AREUM_ACCENT_COLOR} dark:hover:text-${AREUM_ACCENT_COLOR}`}><HeartIcon className="h-5 w-5" /></a>
            </div>
             <h5 className={`font-primary text-md font-semibold text-text-primary mt-4 mb-3`}>Legal</h5>
            <ul className="space-y-2 text-xs">
              {FOOTER_LEGAL_LINKS.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className={`hover:text-${AREUM_ACCENT_COLOR} dark:hover:text-${AREUM_ACCENT_COLOR} transition-colors`}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border-light pt-6 text-center text-xs">
          <p>&copy; {CURRENT_YEAR} {SITE_NAME}. All rights reserved.</p>
          <p className="mt-1">Crafted with <HeartIcon className={`inline h-3 w-3 text-${AREUM_ACCENT_COLOR} dark:text-${AREUM_ACCENT_COLOR}`} /> and code.</p>
        </div>
      </div>
    </footer>
  );
};
