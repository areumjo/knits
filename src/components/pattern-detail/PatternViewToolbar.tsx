
// src/components/pattern-detail/PatternViewToolbar.tsx
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  SunIcon, MoonIcon, MinusIcon, PlusIcon, PrinterIcon, ArrowPathIcon, ScaleIcon,
  ArrowDownTrayIcon, HomeIcon, ChevronDownIcon
} from '@heroicons/react/24/outline';
import { usePatternDetailContext } from '../../contexts/PatternDetailContext';
import { FONT_SIZES_CONFIG } from '../../utils/patternDetailUtils';
// Fix: Correct import syntax for SITE_NAME
import { SITE_NAME } from '../../constants';

interface PatternViewToolbarProps {
  onDownloadHtml: () => void;
  // bodyRef and htmlRef are for adjusting padding based on toolbar height; consider a ResizeObserver hook for this.
  bodyRef: React.RefObject<HTMLElement>; 
  htmlRef: React.RefObject<HTMLElement>;
}

export const PatternViewToolbar: React.FC<PatternViewToolbarProps> = ({ onDownloadHtml, bodyRef, htmlRef }) => {
  const {
    pageTheme, setPageThemeState,
    fontSize, setFontSizeState,
    currentUnit, setCurrentUnitState,
    availableSizes, currentSize, setCurrentSizeState,
    resetAllPatternSettings,
    pContent, // For size abbreviations
  } = usePatternDetailContext();

  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = React.useState(false);
  const toolbarNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateBodyPadding = () => {
      if (toolbarNavRef.current && bodyRef.current) {
        bodyRef.current.style.paddingTop = `${toolbarNavRef.current.offsetHeight}px`;
      }
    };

    updateBodyPadding(); // Initial call
    const resizeObserver = new ResizeObserver(updateBodyPadding);
    if (toolbarNavRef.current) {
      resizeObserver.observe(toolbarNavRef.current);
    }
    
    // Also listen to window resize for broader compatibility
    window.addEventListener('resize', updateBodyPadding);

    return () => {
      if (toolbarNavRef.current) {
        resizeObserver.unobserve(toolbarNavRef.current);
      }
      window.removeEventListener('resize', updateBodyPadding);
      if (bodyRef.current) { // Reset padding on unmount
          bodyRef.current.style.paddingTop = '';
      }
    };
  }, [bodyRef, htmlRef]); // Rerun if refs change (should not happen often)


  const handleSizeChange = (newSize: string) => {
    setCurrentSizeState(newSize);
    setIsSizeDropdownOpen(false);
  };

  return (
    <nav id="pdiv-center" className="pdiv-tools-nav pdiv-no-print" aria-label="Pattern Tools" ref={toolbarNavRef}>
      <div className="pdiv-tools-nav-content-wrapper">
        <div className="pdiv-tool-group">
          <Link to="/" className="pdiv-tool-button icon-only" aria-label={`Go to ${SITE_NAME} homepage`}>
            <HomeIcon />
          </Link>
        </div>
        <div className="pdiv-tool-group pdiv-size-selector-group">
          <span className="pdiv-tool-label pdiv-sr-only" id="pdiv-size-selector-label">Size:</span>
          <button
            id="pdiv-size-dropdown-toggle"
            className="pdiv-tool-button"
            aria-haspopup="true"
            aria-expanded={isSizeDropdownOpen}
            aria-controls="pdiv-size-buttons-list"
            onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
          >
            Size: <span className="pdiv-current-size-display" id="pdiv-current-size-display-mobile">{String(pContent?.sizesData?.[currentSize]?.abbr || currentSize)}</span>
            <ChevronDownIcon className="pdiv-caret-down" />
          </button>
          <div role="radiogroup" aria-labelledby="pdiv-size-selector-label" className={`pdiv-size-buttons-wrapper ${isSizeDropdownOpen ? 'is-open' : ''}`} id="pdiv-size-buttons-list">
            {availableSizes.map(sizeKey => (
              <button
                key={sizeKey}
                className={`pdiv-tool-button pdiv-size-button ${currentSize === sizeKey ? 'active' : ''}`}
                data-size-value={sizeKey}
                role="radio"
                aria-checked={currentSize === sizeKey}
                onClick={() => handleSizeChange(sizeKey)}
              >
                {String(pContent?.sizesData?.[sizeKey]?.abbr || sizeKey)}
              </button>
            ))}
          </div>
        </div>
        <div className="pdiv-tool-group">
          <button id="pdiv-theme-toggle" className="pdiv-tool-button icon-only" aria-label="Toggle color theme" onClick={() => setPageThemeState(pageTheme === 'light' ? 'dark' : 'light')}>
            {pageTheme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
        <div className="pdiv-tool-group font-size-controls">
          <span className="pdiv-tool-label pdiv-sr-only" id="pdiv-font-size-label">Font Size Adjust:</span>
          <button id="pdiv-font-size-decrease" className="pdiv-tool-button icon-only" aria-label="Decrease font size" onClick={() => setFontSizeState(fontSize - FONT_SIZES_CONFIG.step)} disabled={fontSize <= FONT_SIZES_CONFIG.min}><MinusIcon /></button>
          <button id="pdiv-font-size-increase" className="pdiv-tool-button icon-only" aria-label="Increase font size" onClick={() => setFontSizeState(fontSize + FONT_SIZES_CONFIG.step)} disabled={fontSize >= FONT_SIZES_CONFIG.max}><PlusIcon /></button>
        </div>
        <div className="pdiv-tool-group">
          <button id="pdiv-unit-toggle" className="pdiv-tool-button" data-current-unit={currentUnit} aria-label="Toggle measurement units" onClick={() => setCurrentUnitState(currentUnit === 'in' ? 'cm' : 'in')}>
            <ScaleIcon className="hidden md:inline" />
            <span id="pdiv-unit-toggle-current-unit-display" aria-hidden="true" className="md:hidden">{currentUnit.toUpperCase()}</span>
            <span className="pdiv-unit-text hidden md:inline">{currentUnit === 'in' ? 'Show cm' : 'Show inches'}</span>
          </button>
        </div>
        <div className="pdiv-tool-group">
          <button id="pdiv-html-download-button" className="pdiv-tool-button icon-only hidden md:inline-flex" aria-label="Download Interactive Pattern HTML" onClick={onDownloadHtml}>
            <ArrowDownTrayIcon />
          </button>
        </div>
        <div className="pdiv-tool-group">
          <button id="pdiv-print-button" className="pdiv-tool-button icon-only hidden md:inline-flex" aria-label="Print Pattern" onClick={() => window.print()}><PrinterIcon /></button>
        </div>
        <div className="pdiv-tool-group">
          <button id="pdiv-reset-settings-button" className="pdiv-tool-button icon-only" aria-label="Reset all settings and progress" onClick={resetAllPatternSettings}>
            <ArrowPathIcon />
          </button>
        </div>
      </div>
    </nav>
  );
};
