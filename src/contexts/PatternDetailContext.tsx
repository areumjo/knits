
// src/contexts/PatternDetailContext.tsx
// Fix: Import useMemo from React
import React, { createContext, useContext, useState, ReactNode, useCallback, RefObject, useMemo } from 'react';
import { Pattern as PatternType, PatternContent } from '../types';
import { DEFAULT_SIZE, DEFAULT_UNIT, FONT_SIZES_CONFIG, formatUnitDynamic as formatUnitDynamicUtil, LS_KEYS_GENERATOR, MOBILE_BREAKPOINT } from '../utils/patternDetailUtils';

interface PatternDetailContextType {
  pattern: PatternType | null;
  pContent: PatternContent | null;
  pageTheme: 'light' | 'dark';
  setPageThemeState: (theme: 'light' | 'dark') => void;
  fontSize: number;
  setFontSizeState: (size: number) => void;
  currentUnit: 'in' | 'cm';
  setCurrentUnitState: (unit: 'in' | 'cm') => void;
  currentSize: string;
  setCurrentSizeState: (size: string) => void;
  availableSizes: string[];
  showImage: boolean;
  setShowImageState: (show: boolean) => void;
  completedSteps: Record<string, boolean>;
  toggleStepCompletion: (stepId: string, partOlRef: RefObject<HTMLOListElement>) => void;
  sectionToggleStates: Record<string, boolean>;
  setSectionToggleState: (sectionId: string, isCollapsed: boolean) => void;
  resetAllPatternSettings: () => void;
  announceStatus: (message: string) => void;
  formatUnitDynamic: (baseValueStr: string | number | undefined, unitType: string, sizeKey?: string) => string;
  statusMessageRef: RefObject<HTMLDivElement>;
  LS_KEYS: ReturnType<typeof LS_KEYS_GENERATOR>;
  globalSiteTheme: 'light' | 'dark';
  // Fix: Add dynamicSizeValues to the context type
  dynamicSizeValues?: Record<string, string | number>;
}

const PatternDetailContext = createContext<PatternDetailContextType | undefined>(undefined);

export const usePatternDetailContext = (): PatternDetailContextType => {
  const context = useContext(PatternDetailContext);
  if (!context) {
    throw new Error('usePatternDetailContext must be used within a PatternDetailProvider');
  }
  return context;
};

interface PatternDetailProviderProps {
  children: ReactNode;
  patternData: PatternType;
  initialGlobalSiteTheme: 'light' | 'dark';
  statusMessageRef: RefObject<HTMLDivElement>; // For status messages
  statusTimeoutRef: RefObject<number | undefined>; // For status message timeout
}

export const PatternDetailProvider: React.FC<PatternDetailProviderProps> = ({ children, patternData, initialGlobalSiteTheme, statusMessageRef, statusTimeoutRef }) => {
  const pattern = patternData;
  const pContent = patternData.patternContent || null;

  const LS_KEYS = LS_KEYS_GENERATOR(pattern.id);

  const [pageTheme, setPageTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem(LS_KEYS.theme) as 'light' | 'dark' | null;
    return saved || initialGlobalSiteTheme;
  });
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem(LS_KEYS.fontSize);
    return saved ? Math.max(FONT_SIZES_CONFIG.min, Math.min(FONT_SIZES_CONFIG.max, Number(saved))) : FONT_SIZES_CONFIG.default;
  });
  const [currentUnit, setCurrentUnit] = useState<'in' | 'cm'>(() => {
    const saved = localStorage.getItem(LS_KEYS.unit) as 'in' | 'cm' | null;
    return saved || DEFAULT_UNIT;
  });

  const availableSizes = useMemo(() => pContent ? Object.keys(pContent.sizesData || {}) : [DEFAULT_SIZE], [pContent]);

  const [currentSize, setCurrentSize] = useState<string>(() => {
    const saved = localStorage.getItem(LS_KEYS.selectedSize);
    if (saved && availableSizes.includes(saved)) return saved;
    return availableSizes.length > 0 ? availableSizes[0] : DEFAULT_SIZE;
  });

  // Fix: Define dynamicSizeValues based on pContent and currentSize
  const dynamicSizeValues = useMemo(() => {
    if (pContent?.sizesData && pContent.sizesData[currentSize]) {
      return pContent.sizesData[currentSize];
    }
    return undefined;
  }, [pContent, currentSize]);

  const [showImage, setShowImage] = useState<boolean>(() => {
    const saved = localStorage.getItem(LS_KEYS.imageVisible);
    return saved !== null ? saved === 'true' : true;
  });

  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    const loadedSteps: Record<string, boolean> = {};
    if (pContent?.instructions?.parts) {
      pContent.instructions.parts.forEach(part =>
        part.steps.forEach(step => {
          const saved = localStorage.getItem(LS_KEYS.instructionPrefix + step.id);
          if (saved === 'true') loadedSteps[step.id] = true;
        })
      );
    }
    return loadedSteps;
  });

  const [sectionToggleStates, setSectionToggleStates] = useState<Record<string, boolean>>(() => {
    const loadedStates: Record<string, boolean> = {};
    if (pContent) {
      // Initialize for top-level content keys that are objects (implying sections)
      Object.keys(pContent).forEach(key => {
        if (typeof (pContent as any)[key] === 'object' && (pContent as any)[key]?.title) {
            const sectionId = `${pattern.id}_${key}`;
            const saved = localStorage.getItem(LS_KEYS.sectionTogglePrefix + sectionId);
            loadedStates[sectionId] = saved === 'true'; // Default to false (expanded) if not saved
        }
      });
       // Special case for instructions main container if it exists
      if (pContent.instructions) {
        const mainInstructionsId = `${pattern.id}_instructions_main`;
        const savedMain = localStorage.getItem(LS_KEYS.sectionTogglePrefix + mainInstructionsId);
        loadedStates[mainInstructionsId] = savedMain === 'true';
      }
    }
    return loadedStates;
  });

  const announceStatus = useCallback((message: string) => {
    if (statusMessageRef.current) {
      if (typeof window !== 'undefined' && window.innerWidth >= MOBILE_BREAKPOINT) {
        statusMessageRef.current.textContent = message;
        statusMessageRef.current.classList.add('visible');
        clearTimeout(statusTimeoutRef.current);
        statusTimeoutRef.current = window.setTimeout(() => {
          statusMessageRef.current?.classList.remove('visible');
        }, 3000);
      } else {
        // console.log("Status (mobile):", message); // Optional: implement mobile-friendly toast later
      }
    }
  }, [statusMessageRef, statusTimeoutRef]);

  const setPageThemeState = (theme: 'light' | 'dark') => {
    setPageTheme(theme);
    localStorage.setItem(LS_KEYS.theme, theme);
    announceStatus(`Theme changed to ${theme} mode.`);
  };

  const setFontSizeState = (size: number) => {
    const newSize = Math.max(FONT_SIZES_CONFIG.min, Math.min(FONT_SIZES_CONFIG.max, size));
    setFontSize(newSize);
    localStorage.setItem(LS_KEYS.fontSize, String(newSize));
    announceStatus(`Font size set to ${newSize}px.`);
  };

  const setCurrentUnitState = (unit: 'in' | 'cm') => {
    setCurrentUnit(unit);
    localStorage.setItem(LS_KEYS.unit, unit);
    announceStatus(`Units changed to ${unit === 'cm' ? "centimeters" : "inches"}.`);
  };

  const setCurrentSizeState = (size: string) => {
    setCurrentSize(size);
    localStorage.setItem(LS_KEYS.selectedSize, size);
    const sizeName = pContent?.sizesData?.[size]?.name || size;
    announceStatus(`Pattern size changed to ${String(sizeName)}.`);
  };

  const setShowImageState = (show: boolean) => {
    setShowImage(show);
    localStorage.setItem(LS_KEYS.imageVisible, String(show));
    announceStatus(show ? 'Pattern image shown.' : 'Pattern image hidden.');
  };

  const toggleStepCompletion = (stepId: string, partOlRef: RefObject<HTMLOListElement>) => {
    if (!pContent || !partOlRef.current) return;

    const newCompletedState = !completedSteps[stepId];
    const allLisInOl = Array.from(partOlRef.current.children).filter(child => child.tagName === 'LI' && child.getAttribute('data-instr-id')) as HTMLLIElement[];
    const clickedLiIndex = allLisInOl.findIndex(li => li.getAttribute('data-instr-id') === stepId);

    if (clickedLiIndex === -1) return;

    const updatedSteps = {...completedSteps};

    if (newCompletedState) {
        for (let i = 0; i <= clickedLiIndex; i++) {
            const currentStepId = allLisInOl[i].getAttribute('data-instr-id');
            if (currentStepId) {
                 updatedSteps[currentStepId] = true;
                 localStorage.setItem(LS_KEYS.instructionPrefix + currentStepId, 'true');
            }
        }
        // Uncheck subsequent steps only if they were previously checked by this cascading logic
        // This part might need refinement based on desired UX for "unchecking" a middle step.
        // For now, keep it simple: checking a step checks all preceding, unchecking unchecks all subsequent.
        for (let i = clickedLiIndex + 1; i < allLisInOl.length; i++) {
            const currentStepId = allLisInOl[i].getAttribute('data-instr-id');
            // If a user explicitly unchecks a middle step, should it uncheck later steps?
            // Current logic: yes.
            if (currentStepId && updatedSteps[currentStepId]) { // only uncheck if it was true
                updatedSteps[currentStepId] = false;
                localStorage.setItem(LS_KEYS.instructionPrefix + currentStepId, 'false');
            }
        }
        announceStatus(`Steps 1 through ${clickedLiIndex + 1} in this section marked complete.`);
    } else { // Unchecking a step
        for (let i = clickedLiIndex; i < allLisInOl.length; i++) {
            const currentStepId = allLisInOl[i].getAttribute('data-instr-id');
            if (currentStepId) {
                updatedSteps[currentStepId] = false;
                localStorage.setItem(LS_KEYS.instructionPrefix + currentStepId, 'false');
            }
        }
        announceStatus(`Steps ${clickedLiIndex + 1} through ${allLisInOl.length} in this section marked incomplete.`);
    }
    setCompletedSteps(updatedSteps);
  };

  const setSectionToggleState = (sectionId: string, isCollapsed: boolean) => {
    setSectionToggleStates(prev => ({ ...prev, [sectionId]: isCollapsed }));
    localStorage.setItem(LS_KEYS.sectionTogglePrefix + sectionId, String(isCollapsed));
    // Announce status can be done in the component calling this, with section title
  };

  const resetAllPatternSettings = () => {
    setPageTheme(initialGlobalSiteTheme);
    localStorage.removeItem(LS_KEYS.theme);

    setFontSize(FONT_SIZES_CONFIG.default);
    localStorage.removeItem(LS_KEYS.fontSize);

    setCurrentUnit(DEFAULT_UNIT);
    localStorage.removeItem(LS_KEYS.unit);

    const initialSize = availableSizes.length > 0 ? availableSizes[0] : DEFAULT_SIZE;
    setCurrentSize(initialSize);
    localStorage.removeItem(LS_KEYS.selectedSize);

    setShowImage(true);
    localStorage.removeItem(LS_KEYS.imageVisible);

    const clearedSteps: Record<string, boolean> = {};
    Object.keys(completedSteps).forEach(key => { // Use current completedSteps keys
        localStorage.removeItem(LS_KEYS.instructionPrefix + key);
    });
    setCompletedSteps(clearedSteps);

    const clearedSectionStates: Record<string,boolean> = {};
    Object.keys(sectionToggleStates).forEach(key => { // Use current sectionToggleStates keys
        localStorage.removeItem(LS_KEYS.sectionTogglePrefix + key);
    });
    setSectionToggleStates(clearedSectionStates);

    announceStatus("All pattern-specific settings and progress reset to defaults.");
  };

  const formatUnitDynamic = useCallback(
    (baseValueStr: string | number | undefined, unitType: string, sizeKey?: string) => {
      return formatUnitDynamicUtil(baseValueStr, unitType, currentUnit, pContent?.sizesData, currentSize, sizeKey);
    },
    [currentUnit, pContent?.sizesData, currentSize]
  );


  return (
    <PatternDetailContext.Provider value={{
      pattern,
      pContent,
      pageTheme,
      setPageThemeState,
      fontSize,
      setFontSizeState,
      currentUnit,
      setCurrentUnitState,
      currentSize,
      setCurrentSizeState,
      availableSizes,
      showImage,
      setShowImageState,
      completedSteps,
      toggleStepCompletion,
      sectionToggleStates,
      setSectionToggleState,
      resetAllPatternSettings,
      announceStatus,
      formatUnitDynamic,
      statusMessageRef,
      LS_KEYS,
      globalSiteTheme: initialGlobalSiteTheme,
      // Fix: Provide dynamicSizeValues in the context
      dynamicSizeValues,
    }}>
      {children}
    </PatternDetailContext.Provider>
  );
};
