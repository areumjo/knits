
import React, { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { patternsData } from '../data/patternsData';
import { Pattern as PatternType, PatternContent } from '../types';
import { NotFoundPage } from './NotFoundPage';
import { useTheme as useGlobalTheme } from '../contexts/ThemeContext';
import { Footer } from '../components/layout/Footer';
import { AREUM_KNITS_LIVE_URL, SITE_NAME } from '../constants';
import { PatternDetailProvider, usePatternDetailContext } from '../src/contexts/PatternDetailContext';
import { PatternViewToolbar } from '../src/components/pattern-detail/PatternViewToolbar';
import { PatternViewHeader } from '../src/components/pattern-detail/PatternViewHeader';
import { PatternViewMainContent } from '../src/components/pattern-detail/PatternViewMainContent';
import { FONT_SIZES_CONFIG, DEFAULT_UNIT, DEFAULT_SIZE, MOBILE_BREAKPOINT, getPatternDetailCSS, INCH_TO_CM, LS_KEYS_GENERATOR } from '../src/utils/patternDetailUtils';

// SVG icons for static HTML download
const sunIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591" /></svg>`;
const moonIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21c1.603 0 3.113-.337 4.5-1.002h4.5z" /></svg>`;
const eyeIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`;
const eyeSlashIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.575M2.25 12.999A5.402 5.402 0 0012 17.25a5.402 5.402 0 009.75-4.251M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`;
const checkIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="pdiv-check-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>`;


interface DownloadHtmlParams {
  patternData: PatternType;
  patternContentData: PatternContent | null;
  currentPageTheme: 'light' | 'dark';
  currentFontSize: number;
  currentUnitVal: 'in' | 'cm';
  currentSizeVal: string;
  isImageShown: boolean;
  announceFn: (message: string) => void;
  siteTheme: 'light' | 'dark';
  initialCompletedSteps: Record<string, boolean>;
  initialSectionToggles: Record<string, boolean>;
}

const downloadHtmlFile = (params: DownloadHtmlParams) => {
  const {
    patternData,
    patternContentData,
    currentPageTheme,
    currentFontSize,
    currentUnitVal,
    currentSizeVal,
    isImageShown,
    announceFn, 
    siteTheme,
    initialCompletedSteps,
    initialSectionToggles
  } = params;

  if (!patternData || !patternContentData) {
    console.error("Error: Pattern data not found for download.");
    return;
  }

  const patternContainerElement = document.querySelector('.pdiv-container');
  const patternToolsNavElement = document.querySelector('.pdiv-tools-nav');

  if (!patternContainerElement || !patternToolsNavElement) {
    console.error("Error: Pattern content or toolbar not found for download.");
    return;
  }
  
  const clonedPatternContainer = patternContainerElement.cloneNode(true) as HTMLElement;
  clonedPatternContainer.querySelectorAll('.pdiv-no-download, #live-back-to-patterns-link-container').forEach(el => el.remove());
  
  const tempToolbarDiv = document.createElement('div');
  tempToolbarDiv.innerHTML = patternToolsNavElement.innerHTML;
  tempToolbarDiv.querySelectorAll('.pdiv-no-download, #pdiv-html-download-button, [role="status"]').forEach(el => el.remove());
  const homeButtonInToolbar = tempToolbarDiv.querySelector('.pdiv-tool-group:first-child .pdiv-tool-button') as HTMLAnchorElement;
  if (homeButtonInToolbar) {
      homeButtonInToolbar.href = AREUM_KNITS_LIVE_URL;
      homeButtonInToolbar.target = '_blank';
      homeButtonInToolbar.rel = 'noopener noreferrer';
  }
  tempToolbarDiv.querySelectorAll('#pdiv-print-button').forEach(btn => {
      btn.classList.remove('hidden', 'md:inline-flex');
      btn.classList.add('inline-flex');
  });
  const toolbarHTML = tempToolbarDiv.innerHTML;

  const patternHTML = clonedPatternContainer.innerHTML;
  const cssContent = getPatternDetailCSS();
  const pageTitle = patternData.title || "Knitting Pattern";
  
  const currentHtmlClasses = document.documentElement.className;
  const currentBodyClasses = document.body.className;
  const currentRawFontSize = document.documentElement.style.fontSize || `${FONT_SIZES_CONFIG.default}px`;
  
  const currentToolbarHeight = patternToolsNavElement ? `${(patternToolsNavElement as HTMLElement).offsetHeight}px` : '60px';

  const savedUnit = currentUnitVal;
  const savedSize = currentSizeVal; 
  const defaultSizeKey = DEFAULT_SIZE; 
  const savedPageTheme = currentPageTheme;
  const savedFontSize = currentFontSize;
  const savedShowImage = isImageShown;

  const embeddedJS = `
<script>
document.addEventListener('DOMContentLoaded', function() {
  const FONT_CFG_STATIC = ${JSON.stringify(FONT_SIZES_CONFIG)};
  const SIZES_DATA_STATIC = ${JSON.stringify(patternContentData.sizesData || {})};
  const INCH_TO_CM_STATIC = ${INCH_TO_CM};
  const INITIAL_GLOBAL_THEME_STATIC = '${siteTheme}';
  const DEFAULT_UNIT_STATIC = '${DEFAULT_UNIT}';
  const DEFAULT_SIZE_ABBR_STATIC = SIZES_DATA_STATIC['${defaultSizeKey}']?.abbr || '${defaultSizeKey}';
  const DEFAULT_SIZE_KEY_STATIC = '${defaultSizeKey}';
  const CHECK_ICON_SVG_STATIC = \`${checkIconSVG}\`;

  let currentFontSizeGlobal = ${savedFontSize};
  let currentPageThemeGlobal = '${savedPageTheme}';
  let currentUnitGlobalStatic = '${savedUnit}';
  let currentSelectedSizeGlobalStatic = '${savedSize}';
  let imageVisibleGlobalStatic = ${savedShowImage};
  let completedStepsGlobalStatic = ${JSON.stringify(initialCompletedSteps)};
  let sectionStatesGlobalStatic = ${JSON.stringify(initialSectionToggles)}; 


  const bodyEl = document.body;
  const htmlEl = document.documentElement;
  const mainPatternContainer = document.querySelector('.pdiv-container'); 
  const statusMessageEl = document.getElementById('pdiv-static-status-message');
  let statusTimeoutStatic;

  function announceStatusStatic(message) {
    if (statusMessageEl) {
        statusMessageEl.textContent = message;
        statusMessageEl.classList.add('visible');
        clearTimeout(statusTimeoutStatic);
        statusTimeoutStatic = setTimeout(() => {
            statusMessageEl.classList.remove('visible');
        }, 3000);
    } else {
        console.log("Status:", message); 
    }
  }

  function formatUnitDynamicStatic(baseValueStr, unitType, currentUnit, inchToCm) {
    if (baseValueStr === undefined || baseValueStr === null) return '';
    const valStr = String(baseValueStr);
    const isCm = currentUnit === 'cm';
    let displayValue = valStr;
    let unitSuffix = isCm ? "cm" : '"';

    if (unitType === 'length_range_text') {
        const parts = valStr.split(/[-–]/);
        if (parts.length === 2) {
            const part1 = parseFloat(parts[0]);
            const part2 = parseFloat(parts[1]);
            if (!isNaN(part1) && !isNaN(part2)) {
                 displayValue = isCm ? \`\${(part1 * inchToCm).toFixed(1)}–\${(part2 * inchToCm).toFixed(1)}\` : \`\${part1.toFixed(1)}–\${part2.toFixed(1)}\`;
            }
        } else {
             const baseValueNum = parseFloat(valStr);
             if(!isNaN(baseValueNum)) displayValue = isCm ? (baseValueNum * inchToCm).toFixed(1) : baseValueNum.toFixed(1);
        }
        return \`\${displayValue} \${isCm ? "cm" : (valStr.toLowerCase().includes("inch") ? "" : '"')}\`;
    }
    
    const baseValueNum = parseFloat(valStr);
    if (isNaN(baseValueNum)) return valStr; 

    switch (unitType) {
        case 'length': displayValue = isCm ? (baseValueNum * inchToCm).toFixed(1) : baseValueNum.toFixed(1); unitSuffix = isCm ? " cm" : '"'; break;
        case 'length_plain': displayValue = isCm ? (baseValueNum * inchToCm).toFixed(1) : baseValueNum.toFixed(1); unitSuffix = isCm ? " cm" : (baseValueNum === 1 ? " inch" : " inches"); break;
        case 'mm_needle': displayValue = baseValueNum.toFixed(1); unitSuffix = "mm"; break;
        case 'cm_cord': displayValue = baseValueNum.toFixed(1); unitSuffix = "cm"; break;
        case 'yarn_yards': displayValue = isCm ? (baseValueNum * 0.9144).toFixed(0) : baseValueNum.toFixed(0); unitSuffix = isCm ? "m" : "yds"; break;
        case 'yarn_meters': displayValue = !isCm ? (baseValueNum / 0.9144).toFixed(0) : baseValueNum.toFixed(0); unitSuffix = !isCm ? "yds" : "m"; break;
        default: displayValue = baseValueNum.toString(); unitSuffix = ''; 
    }
    return \`\${displayValue}\${unitType.includes('needle') || unitType.includes('cord') || unitType.includes('yarn') ? ' ' : ''}\${unitSuffix}\`;
  }

  function updateDynamicContentStatic() {
    if (!mainPatternContainer) return;
    const currentSizeData = SIZES_DATA_STATIC[currentSelectedSizeGlobalStatic] || {};
    
    mainPatternContainer.querySelectorAll('.size-dynamic').forEach(el => {
      const key = el.dataset.sizeKey;
      const fallback = el.dataset.fallback || el.innerHTML; 
      let valueToSet = fallback;
      if (key && currentSizeData[key] !== undefined) valueToSet = String(currentSizeData[key]);
      
      let parentUnitDynamic = false;
      let currentParent = el.parentElement;
      while(currentParent) {
        if (currentParent.classList && currentParent.classList.contains('unit-dynamic')) {
          parentUnitDynamic = true;
          break;
        }
        currentParent = currentParent.parentElement;
      }
      if (!parentUnitDynamic) {
        el.innerHTML = \`<strong style="color: var(--color-accent-val); font-weight: 700;">\${valueToSet}</strong>\`;
      }
    });

    mainPatternContainer.querySelectorAll('.unit-dynamic').forEach(el => {
      const baseValAttr = el.dataset.baseValue;
      const unitType = el.dataset.unitType;
      const sizeKeyForUnit = el.dataset.sizeKey;
      let currentBaseValueToConvert = baseValAttr;

      if (sizeKeyForUnit && currentSizeData[sizeKeyForUnit] !== undefined) {
        currentBaseValueToConvert = String(currentSizeData[sizeKeyForUnit]);
      }
      
      if (currentBaseValueToConvert !== undefined && unitType) {
        const formattedValue = formatUnitDynamicStatic(currentBaseValueToConvert, unitType, currentUnitGlobalStatic, INCH_TO_CM_STATIC);
        el.innerHTML = \`<strong style="color: var(--color-accent-val); font-weight: 700;">\${formattedValue}</strong>\`;
      }
    });

     mainPatternContainer.querySelectorAll('.pdiv-stitch-count').forEach(el => {
        const sizeKey = el.dataset.sizeKey;
        const fallback = el.dataset.fallback || el.textContent;
        let valueToSet = fallback;
        if (sizeKey && currentSizeData[sizeKey] !== undefined) valueToSet = String(currentSizeData[sizeKey]);
        el.textContent = valueToSet; 
    });

    mainPatternContainer.querySelectorAll('.pdiv-size-table tbody tr').forEach(row => {
        row.classList.toggle('active-size-row', row.dataset.sizeRow === currentSelectedSizeGlobalStatic);
    });
  }

  function updateButtonStatesStatic() {
    const themeToggleBtn = document.getElementById('pdiv-theme-toggle');
    if (themeToggleBtn) {
      const sunIcon = themeToggleBtn.querySelector('.theme-icon-sun');
      const moonIcon = themeToggleBtn.querySelector('.theme-icon-moon');
      if (sunIcon && moonIcon) {
          sunIcon.style.display = currentPageThemeGlobal === 'dark' ? 'inline-block' : 'none';
          moonIcon.style.display = currentPageThemeGlobal === 'light' ? 'inline-block' : 'none';
      } else { 
          themeToggleBtn.innerHTML = currentPageThemeGlobal === 'dark' ? \`${sunIconSVG}\` : \`${moonIconSVG}\`;
      }
    }
    document.getElementById('pdiv-font-size-increase').disabled = currentFontSizeGlobal >= FONT_CFG_STATIC.max;
    document.getElementById('pdiv-font-size-decrease').disabled = currentFontSizeGlobal <= FONT_CFG_STATIC.min;
    
    const unitToggleBtn = document.getElementById('pdiv-unit-toggle');
    if (unitToggleBtn) {
      const unitTextEl = unitToggleBtn.querySelector('.pdiv-unit-text');
      if(unitTextEl) unitTextEl.textContent = currentUnitGlobalStatic === 'in' ? 'Show cm' : 'Show inches';
      const unitDisplayMobileEl = unitToggleBtn.querySelector('#pdiv-unit-toggle-current-unit-display');
      if(unitDisplayMobileEl) unitDisplayMobileEl.textContent = currentUnitGlobalStatic.toUpperCase();
    }

    const currentSizeDispMobile = document.getElementById('pdiv-current-size-display-mobile');
    if(currentSizeDispMobile && SIZES_DATA_STATIC[currentSelectedSizeGlobalStatic]) {
        currentSizeDispMobile.textContent = SIZES_DATA_STATIC[currentSelectedSizeGlobalStatic].abbr || currentSelectedSizeGlobalStatic;
    }

    document.querySelectorAll('.pdiv-size-buttons-wrapper .pdiv-size-button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.sizeValue === currentSelectedSizeGlobalStatic);
        btn.setAttribute('aria-checked', btn.dataset.sizeValue === currentSelectedSizeGlobalStatic ? 'true' : 'false');
    });

    const toggleImageBtnStatic = document.getElementById('pdiv-toggle-image-btn');
    if (toggleImageBtnStatic) {
        toggleImageBtnStatic.innerHTML = imageVisibleGlobalStatic ? \`${eyeSlashIconSVG}\` : \`${eyeIconSVG}\`;
    }
  }
  
  function initializeStaticInteractivity() {
    document.getElementById('pdiv-theme-toggle')?.addEventListener('click', function() {
      currentPageThemeGlobal = currentPageThemeGlobal === 'light' ? 'dark' : 'light';
      bodyEl.classList.toggle('dark-theme', currentPageThemeGlobal === 'dark');
      htmlEl.classList.toggle('dark-theme-pattern-active', currentPageThemeGlobal === 'dark');
      htmlEl.classList.toggle('dark', currentPageThemeGlobal === 'dark'); 
      updateButtonStatesStatic();
      announceStatusStatic(\`Theme set to \${currentPageThemeGlobal}\`);
    });

    document.getElementById('pdiv-font-size-increase')?.addEventListener('click', () => {
      currentFontSizeGlobal = Math.min(FONT_CFG_STATIC.max, currentFontSizeGlobal + FONT_CFG_STATIC.step);
      htmlEl.style.fontSize = currentFontSizeGlobal + 'px'; 
      updateButtonStatesStatic();
      announceStatusStatic(\`Font size increased to \${currentFontSizeGlobal}px\`);
    });
    document.getElementById('pdiv-font-size-decrease')?.addEventListener('click', () => {
      currentFontSizeGlobal = Math.max(FONT_CFG_STATIC.min, currentFontSizeGlobal - FONT_CFG_STATIC.step);
      htmlEl.style.fontSize = currentFontSizeGlobal + 'px'; 
      updateButtonStatesStatic();
      announceStatusStatic(\`Font size decreased to \${currentFontSizeGlobal}px\`);
    });

    document.getElementById('pdiv-unit-toggle')?.addEventListener('click', function() {
      currentUnitGlobalStatic = currentUnitGlobalStatic === 'in' ? 'cm' : 'in';
      updateButtonStatesStatic(); 
      updateDynamicContentStatic();
      announceStatusStatic(\`Units set to \${currentUnitGlobalStatic}\`);
    });

    const sizeDropdownToggle = document.getElementById('pdiv-size-dropdown-toggle');
    const sizeButtonsWrapper = document.querySelector('.pdiv-size-buttons-wrapper');
    if (sizeDropdownToggle && sizeButtonsWrapper) {
      sizeDropdownToggle.addEventListener('click', () => {
        const isOpen = sizeButtonsWrapper.classList.toggle('is-open');
        sizeDropdownToggle.setAttribute('aria-expanded', isOpen.toString());
      });
    }
    document.querySelectorAll('.pdiv-size-buttons-wrapper .pdiv-size-button').forEach(button => {
      button.addEventListener('click', function() {
        currentSelectedSizeGlobalStatic = this.dataset.sizeValue;
        updateButtonStatesStatic(); 
        updateDynamicContentStatic();
        if (sizeButtonsWrapper) sizeButtonsWrapper.classList.remove('is-open');
        if (sizeDropdownToggle) sizeDropdownToggle.setAttribute('aria-expanded', 'false');
        const sizeName = SIZES_DATA_STATIC[currentSelectedSizeGlobalStatic]?.name || currentSelectedSizeGlobalStatic;
        announceStatusStatic(\`Size set to \${sizeName}\`);
      });
    });
    
    if (mainPatternContainer) {
        mainPatternContainer.querySelectorAll('.pdiv-size-table tbody tr[data-size-row]').forEach(row => {
            row.addEventListener('click', function() {
                const newSize = this.dataset.sizeRow;
                if (newSize && newSize !== currentSelectedSizeGlobalStatic) {
                    currentSelectedSizeGlobalStatic = newSize;
                    updateButtonStatesStatic(); 
                    updateDynamicContentStatic(); 
                    const sizeName = SIZES_DATA_STATIC[currentSelectedSizeGlobalStatic]?.name || currentSelectedSizeGlobalStatic;
                    announceStatusStatic(\`Size set to \${sizeName}\`);
                }
            });
            row.addEventListener('keydown', function(e) {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
              }
            });
        });
    }

    const toggleImageBtnStatic = document.getElementById('pdiv-toggle-image-btn');
    const patternImageWrapperStatic = document.querySelector('.pdiv-pattern-image-wrapper');
    if (toggleImageBtnStatic && patternImageWrapperStatic) {
        toggleImageBtnStatic.addEventListener('click', () => {
            imageVisibleGlobalStatic = !imageVisibleGlobalStatic;
            patternImageWrapperStatic.classList.toggle('image-hidden', !imageVisibleGlobalStatic);
            updateButtonStatesStatic();
            announceStatusStatic(imageVisibleGlobalStatic ? 'Image shown' : 'Image hidden');
        });
    }

    document.getElementById('pdiv-print-button')?.addEventListener('click', () => window.print());

    document.getElementById('pdiv-reset-settings-button')?.addEventListener('click', () => {
      currentPageThemeGlobal = INITIAL_GLOBAL_THEME_STATIC;
      currentFontSizeGlobal = FONT_CFG_STATIC.default;
      currentUnitGlobalStatic = DEFAULT_UNIT_STATIC;
      currentSelectedSizeGlobalStatic = DEFAULT_SIZE_KEY_STATIC; 
      imageVisibleGlobalStatic = true;
      
      completedStepsGlobalStatic = {};
      if(mainPatternContainer) {
        mainPatternContainer.querySelectorAll('.pdiv-instructions-article li[data-instr-id]').forEach(li => {
            li.classList.remove('instr-completed');
            const marker = li.querySelector('.pdiv-instruction-marker');
            if (marker) marker.setAttribute('aria-checked', 'false');
            const checkIcon = marker ? marker.querySelector('.pdiv-check-icon') : null;
            if (checkIcon) checkIcon.style.opacity = '0';
        });
      }
      
      sectionStatesGlobalStatic = {};
      if(mainPatternContainer) {
        mainPatternContainer.querySelectorAll('.pdiv-toggleable-section').forEach(section => {
            const sectionId = section.id;
            sectionStatesGlobalStatic[sectionId] = false; 
            const title = section.querySelector('.pdiv-section-title');
            const content = section.querySelector('.pdiv-section-content');
            if (title) {
              title.classList.remove('is-collapsed');
              title.setAttribute('aria-expanded', 'true');
              const indicator = title.querySelector('.pdiv-toggle-indicator');
              if(indicator) indicator.textContent = '−';
            }
            if (content) content.classList.remove('is-collapsed');
        });
      }

      htmlEl.style.fontSize = currentFontSizeGlobal + 'px';
      bodyEl.classList.toggle('dark-theme', currentPageThemeGlobal === 'dark');
      htmlEl.classList.toggle('dark-theme-pattern-active', currentPageThemeGlobal === 'dark');
      htmlEl.classList.toggle('dark', currentPageThemeGlobal === 'dark');
      if (patternImageWrapperStatic) patternImageWrapperStatic.classList.remove('image-hidden');
      
      updateButtonStatesStatic(); 
      updateDynamicContentStatic();
      announceStatusStatic('All settings and progress reset to defaults.');
    });

    if (mainPatternContainer) {
        mainPatternContainer.querySelectorAll('.pdiv-instructions-article li[data-instr-id]').forEach(li => {
            const stepId = li.dataset.instrId;
            const marker = li.querySelector('.pdiv-instruction-marker');
            
            if (completedStepsGlobalStatic[stepId]) {
                li.classList.add('instr-completed');
                if (marker) marker.setAttribute('aria-checked', 'true');
                const checkIcon = marker ? marker.querySelector('.pdiv-check-icon') : null;
                if (checkIcon) checkIcon.style.opacity = '1'; else if (marker) marker.innerHTML = CHECK_ICON_SVG_STATIC;
            } else {
                if (marker && !marker.querySelector('.pdiv-check-icon')) marker.innerHTML = CHECK_ICON_SVG_STATIC; 
            }

            const stepClickHandler = function() {
                const currentStepId = this.dataset.instrId;
                const olParent = this.closest('ol');
                if (!olParent) return;

                const allLisInOl = Array.from(olParent.children).filter(child => child.tagName === 'LI' && child.dataset.instrId);
                const clickedLiIndex = allLisInOl.findIndex(item => item.dataset.instrId === currentStepId);
                
                const newCompletedState = !completedStepsGlobalStatic[currentStepId];

                if (newCompletedState) {
                    for (let i = 0; i <= clickedLiIndex; i++) {
                        const id = allLisInOl[i].dataset.instrId;
                        if (id) {
                            completedStepsGlobalStatic[id] = true;
                            allLisInOl[i].classList.add('instr-completed');
                            const m = allLisInOl[i].querySelector('.pdiv-instruction-marker');
                            if (m) m.setAttribute('aria-checked', 'true');
                            const ci = m ? m.querySelector('.pdiv-check-icon') : null;
                            if (ci) ci.style.opacity = '1';
                        }
                    }
                     announceStatusStatic(\`Steps 1 through \${clickedLiIndex + 1} marked complete.\`);
                } else { 
                    for (let i = clickedLiIndex; i < allLisInOl.length; i++) {
                        const id = allLisInOl[i].dataset.instrId;
                        if (id) {
                            completedStepsGlobalStatic[id] = false;
                            allLisInOl[i].classList.remove('instr-completed');
                            const m = allLisInOl[i].querySelector('.pdiv-instruction-marker');
                            if (m) m.setAttribute('aria-checked', 'false');
                            const ci = m ? m.querySelector('.pdiv-check-icon') : null;
                            if (ci) ci.style.opacity = '0';
                        }
                    }
                    announceStatusStatic(\`Steps \${clickedLiIndex + 1} through \${allLisInOl.length} marked incomplete.\`);
                }
            };
            li.addEventListener('click', stepClickHandler);
            if (marker) {
              marker.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation(); 
                  li.click();
                }
              });
            }
        });
    }
    
    if (mainPatternContainer) {
        mainPatternContainer.querySelectorAll('.pdiv-section-title').forEach(titleEl => {
            const sectionEl = titleEl.closest('.pdiv-toggleable-section');
            const contentEl = sectionEl ? sectionEl.querySelector('.pdiv-section-content') : null;
            const sectionId = sectionEl ? sectionEl.id : null;
            const indicator = titleEl.querySelector('.pdiv-toggle-indicator');

            if (sectionEl && contentEl && sectionId) {
                const isInitiallyCollapsed = sectionStatesGlobalStatic[sectionId] === true;
                titleEl.classList.toggle('is-collapsed', isInitiallyCollapsed);
                titleEl.setAttribute('aria-expanded', !isInitiallyCollapsed);
                if(indicator) indicator.textContent = isInitiallyCollapsed ? '+' : '−';
                contentEl.classList.toggle('is-collapsed', isInitiallyCollapsed);

                titleEl.addEventListener('click', function() {
                    const currentlyCollapsed = sectionStatesGlobalStatic[sectionId];
                    const newCollapsedState = !currentlyCollapsed;
                    sectionStatesGlobalStatic[sectionId] = newCollapsedState;
                    
                    this.classList.toggle('is-collapsed', newCollapsedState);
                    this.setAttribute('aria-expanded', !newCollapsedState);
                    if(indicator) indicator.textContent = newCollapsedState ? '+' : '−';
                    contentEl.classList.toggle('is-collapsed', newCollapsedState);
                    announceStatusStatic(\`\${this.querySelector('.pdiv-section-title-text').textContent} \${newCollapsedState ? 'collapsed' : 'expanded'}.\`);
                });
            }
        });
    }
    
    if (mainPatternContainer) {
        const abbrTooltipEl = document.getElementById('pdiv-abbr-tooltip-static');
        if (abbrTooltipEl) {
            mainPatternContainer.querySelectorAll('abbr[data-original-title]').forEach(abbr => {
                abbr.addEventListener('mouseenter', function() {
                    abbrTooltipEl.textContent = this.dataset.originalTitle;
                    abbrTooltipEl.classList.add('visible');
                    const rect = this.getBoundingClientRect();
                    abbrTooltipEl.style.top = \`\${rect.bottom + window.scrollY + 5}px\`;
                    abbrTooltipEl.style.left = \`\${rect.left + window.scrollX}px\`;
                });
                abbr.addEventListener('mouseleave', () => {
                    abbrTooltipEl.classList.remove('visible');
                });
                abbr.addEventListener('focus', function() { 
                     abbrTooltipEl.textContent = this.dataset.originalTitle;
                    abbrTooltipEl.classList.add('visible');
                    const rect = this.getBoundingClientRect();
                    abbrTooltipEl.style.top = \`\${rect.bottom + window.scrollY + 5}px\`;
                    abbrTooltipEl.style.left = \`\${rect.left + window.scrollX}px\`;
                });
                abbr.addEventListener('blur', () => {
                     abbrTooltipEl.classList.remove('visible');
                });
            });
        }
    }

    htmlEl.style.fontSize = currentFontSizeGlobal + 'px';
    bodyEl.classList.toggle('dark-theme', currentPageThemeGlobal === 'dark');
    htmlEl.classList.toggle('dark-theme-pattern-active', currentPageThemeGlobal === 'dark');
    htmlEl.classList.toggle('dark', currentPageThemeGlobal === 'dark');
    if (patternImageWrapperStatic) patternImageWrapperStatic.classList.toggle('image-hidden', !imageVisibleGlobalStatic);

    const themeBtn = document.getElementById('pdiv-theme-toggle');
    if(themeBtn && !themeBtn.querySelector('.theme-icon-sun') && !themeBtn.querySelector('.theme-icon-moon')) { 
        themeBtn.innerHTML = \`<span class="theme-icon-sun" style="display: \${currentPageThemeGlobal === 'dark' ? 'inline-block' : 'none'}">\${sunIconSVG}</span><span class="theme-icon-moon" style="display: \${currentPageThemeGlobal === 'light' ? 'inline-block' : 'none'}">\${moonIconSVG}</span>\`;
    }
    
    updateButtonStatesStatic();
    updateDynamicContentStatic();
  }

  initializeStaticInteractivity();
});
<\/script>
    `;

    const fullHtml = `
    <!DOCTYPE html>
    <html lang="en" class="${currentHtmlClasses}" style="font-size: ${currentRawFontSize};">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${pageTitle} - Areum Knits (Interactive Download)</title>
      <style>
        body { 
          margin: 0; padding: 0; box-sizing: border-box;
        }
        ${cssContent}
        body { padding-top: ${currentToolbarHeight} !important; }
        .pdiv-tools-nav { position: fixed !important; top: 0; left: 0; right: 0; z-index: 1000 !important; }
        .pdiv-no-download { display: none !important; } 
        .pdiv-tool-button svg { height: 1.25em; width: 1.25em; display: inline-block; vertical-align: middle; }
        .pdiv-tool-button.icon-only svg { margin-right: 0; }
        #pdiv-theme-toggle .theme-icon-sun svg, #pdiv-theme-toggle .theme-icon-moon svg {
            height: 1em; width: 1em; 
        }
        .pdiv-instruction-marker[aria-checked="true"] svg.pdiv-check-icon { opacity: 1 !important; }
        svg.pdiv-check-icon { font-size: 0.7rem; color: var(--color-surface-val); opacity: 0; transition: opacity var(--animation-duration-val) var(--easing-val); width: 0.9em; height: 0.9em;}
        .dark-theme .pdiv-instruction-marker[aria-checked="true"] svg.pdiv-check-icon { color: var(--color-background-val); }

        #pdiv-abbr-tooltip-static { 
          position: absolute; background-color: var(--color-heading-val); color: var(--color-surface-val); 
          padding: calc(var(--spacing-unit-val)*0.75) calc(var(--spacing-unit-val)*1.25); 
          border-radius: 4px; box-shadow: var(--shadow-medium-val); z-index: 10005; 
          font-size: 0.85rem; line-height: 1.4; max-width: 250px; text-align: left; 
          display: none; pointer-events: none; 
        }
        #pdiv-abbr-tooltip-static.visible { display: block; }
        .dark-theme #pdiv-abbr-tooltip-static { background-color: var(--color-surface-val); color: var(--color-heading-val); }

      </style>
    </head>
    <body class="${currentBodyClasses.replace(/pattern-detail-interactive-view\s*/,'').trim()} pattern-detail-interactive-view">
      <nav class="pdiv-tools-nav" aria-label="Pattern Tools">
        ${toolbarHTML}
      </nav>
      <div class="pdiv-container">
        ${patternHTML}
      </div>
      <div id="pdiv-abbr-tooltip-static" class="pdiv-abbr-tooltip" role="tooltip" aria-hidden="true"></div>
      <div id="pdiv-static-status-message" class="pdiv-status-message" role="status" aria-live="polite" aria-atomic="true"></div>
      ${embeddedJS}
    </body>
    </html>
    `;

    const blob = new Blob([fullHtml.trim()], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${patternData.slug || 'pattern'}_interactive.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log("Interactive pattern HTML download started."); 
};


const PatternDetailViewLogic: React.FC = () => {
  const { 
    pageTheme, 
    fontSize, 
    pattern, 
    pContent, 
    globalSiteTheme, 
    announceStatus,
    currentUnit,
    currentSize,
    showImage,
    LS_KEYS,
    completedSteps, 
    sectionToggleStates 
  } = usePatternDetailContext();
  
  const bodyRef = useRef(document.body);
  const htmlRef = useRef(document.documentElement);
  const abbrTooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    htmlRef.current.style.fontSize = `${fontSize}px`;
    bodyRef.current.classList.add('pattern-detail-interactive-view');

    if (pageTheme === 'dark') {
      bodyRef.current.classList.add('dark-theme');
      htmlRef.current.classList.add('dark-theme-pattern-active', 'dark');
    } else {
      bodyRef.current.classList.remove('dark-theme');
      htmlRef.current.classList.remove('dark-theme-pattern-active', 'dark');
    }
    
    return () => {
      htmlRef.current.style.fontSize = '';
      bodyRef.current.classList.remove('pattern-detail-interactive-view', 'dark-theme');
      htmlRef.current.classList.remove('dark-theme-pattern-active');
      if (globalSiteTheme === 'dark') {
        htmlRef.current.classList.add('dark');
      } else {
        htmlRef.current.classList.remove('dark');
      }
      bodyRef.current.style.paddingTop = '';
    };
  }, [fontSize, pageTheme, globalSiteTheme]);


  useEffect(() => {
    if (!pattern) return;

    if (!document.getElementById('pdiv-abbr-tooltip-static')) { 
        const newAbbrTooltip = document.createElement('div');
        newAbbrTooltip.id = 'pdiv-abbr-tooltip'; 
        newAbbrTooltip.className = 'pdiv-abbr-tooltip pdiv-no-print';
        newAbbrTooltip.setAttribute('role', 'tooltip');
        newAbbrTooltip.setAttribute('aria-hidden', 'true');
        document.body.appendChild(newAbbrTooltip);
        abbrTooltipRef.current = newAbbrTooltip;
    } else {
        abbrTooltipRef.current = document.getElementById('pdiv-abbr-tooltip-static') as HTMLDivElement;
    }


    const showTooltip = (abbrElem: HTMLElement) => {
      const originalTitle = abbrElem.dataset.originalTitle;
      if (!originalTitle || !abbrTooltipRef.current) return;
      abbrTooltipRef.current.textContent = originalTitle;
      abbrTooltipRef.current.classList.add('visible');
      abbrTooltipRef.current.setAttribute('aria-hidden', 'false');
      const abbrRect = abbrElem.getBoundingClientRect();
      abbrTooltipRef.current.style.top = `${abbrRect.bottom + window.scrollY + 5}px`;
      abbrTooltipRef.current.style.left = `${abbrRect.left + window.scrollX}px`;
    };
    const hideTooltip = () => {
      if (abbrTooltipRef.current) {
        abbrTooltipRef.current.classList.remove('visible');
        abbrTooltipRef.current.setAttribute('aria-hidden', 'true');
      }
    };

    const pdivContainer = document.querySelector('.pdiv-container');
    if (!pdivContainer) return;

    const setupAbbrListeners = (container: Element) => {
        const abbrElements = container.querySelectorAll('abbr[data-original-title]');
        abbrElements.forEach(el => { 
            const abbrEl = el as HTMLElement;
            if ((abbrEl as any)._listenersAttachedLive) return; 

            const enterHandler = () => { if (window.innerWidth > MOBILE_BREAKPOINT) showTooltip(abbrEl); };
            const leaveHandler = () => { if (window.innerWidth > MOBILE_BREAKPOINT) hideTooltip(); };
            const focusHandler = () => showTooltip(abbrEl);
            const blurHandler = () => setTimeout(hideTooltip, 150); 
            const clickHandler = (e: Event) => { 
                e.preventDefault(); 
                showTooltip(abbrEl); 
            };
            const keydownHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') hideTooltip(); };

            abbrEl.addEventListener('mouseenter', enterHandler);
            abbrEl.addEventListener('mouseleave', leaveHandler);
            abbrEl.addEventListener('focus', focusHandler);
            abbrEl.addEventListener('blur', blurHandler);
            abbrEl.addEventListener('click', clickHandler);
            abbrEl.addEventListener('keydown', keydownHandler as EventListener);
            (abbrEl as any)._listenersAttachedLive = true;
        });
    };
    
    const observer = new MutationObserver((mutationsList) => {
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                 mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        setupAbbrListeners(node as Element);
                        if ((node as Element).querySelectorAll) {
                             (node as Element).querySelectorAll('abbr[data-original-title]').forEach(childAbbr => setupAbbrListeners(childAbbr.parentElement || childAbbr));
                        }
                    }
                });
            }
        }
    });
    observer.observe(pdivContainer, { childList: true, subtree: true });
    setupAbbrListeners(pdivContainer);

    const globalHide = (e: Event) => {
      if (abbrTooltipRef.current?.classList.contains('visible')) {
        const target = e.target as HTMLElement;
        if (!target.closest('abbr[data-original-title]') && !target.closest('#pdiv-abbr-tooltip')) {
          hideTooltip();
        }
      }
    };
    document.addEventListener('click', globalHide, true); 
    const globalKeydown = (e: KeyboardEvent) => { if (e.key === 'Escape') hideTooltip(); };
    document.addEventListener('keydown', globalKeydown);

    return () => {
      observer.disconnect();
      if (abbrTooltipRef.current && abbrTooltipRef.current.id === 'pdiv-abbr-tooltip' && abbrTooltipRef.current.parentNode === document.body) { 
        document.body.removeChild(abbrTooltipRef.current);
      }
      abbrTooltipRef.current = null;
      document.removeEventListener('click', globalHide, true);
      document.removeEventListener('keydown', globalKeydown);
    };
  }, [pattern, pageTheme]); 


  const handleActualDownload = () => {
    if (!pattern || !pContent) {
      announceStatus("Cannot download, pattern data not fully loaded.");
      return;
    }
    downloadHtmlFile({
      patternData: pattern,
      patternContentData: pContent,
      currentPageTheme: pageTheme,
      currentFontSize: fontSize,
      currentUnitVal: currentUnit,
      currentSizeVal: currentSize,
      isImageShown: showImage,
      announceFn: announceStatus,
      siteTheme: globalSiteTheme,
      initialCompletedSteps: completedSteps,
      initialSectionToggles: sectionToggleStates
    });
  };

  return (
    <div className="pattern-detail-page-wrapper flex flex-col min-h-screen">
      <div className="flex-grow">
        <PatternViewToolbar onDownloadHtml={handleActualDownload} bodyRef={bodyRef} htmlRef={htmlRef} />
        <div className="pdiv-container">
          <PatternViewHeader />
          <PatternViewMainContent onDownloadHtml={handleActualDownload} />
        </div>
      </div>
      <div ref={usePatternDetailContext().statusMessageRef} className="pdiv-status-message pdiv-no-print" role="status" aria-live="polite" aria-atomic="true"></div>
      <Footer /> {/* Main site footer, hidden on print by .pdiv-no-print in pattern styles or specific print style rule for Footer component itself */}
    </div>
  );
};


export const PatternDetailPage: React.FC = () => {
  const { patternSlug } = useParams<{ patternSlug: string }>();
  const { theme: globalSiteTheme } = useGlobalTheme();
  
  const statusMessageRef = useRef<HTMLDivElement>(null);
  const statusTimeoutRef = useRef<number | undefined>(undefined);

  const pattern = useMemo(() => {
    if (!patternSlug) return undefined;
    return patternsData.find(p => p.slug === patternSlug);
  }, [patternSlug]);

  if (!patternSlug || !pattern) {
    return <NotFoundPage message={patternSlug ? `Pattern "${patternSlug}" not found.` : "No pattern specified."} />;
  }
  if (!pattern.patternContent) {
     return <NotFoundPage message={`Pattern content is missing for ${pattern.title}.`} />;
  }

  return (
    <PatternDetailProvider 
        patternData={pattern} 
        initialGlobalSiteTheme={globalSiteTheme}
        statusMessageRef={statusMessageRef}
        statusTimeoutRef={statusTimeoutRef}
    >
      <PatternDetailViewLogic />
    </PatternDetailProvider>
  );
};
