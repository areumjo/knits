// src/components/pattern-detail/InstructionStep.tsx
import React, { useMemo, useCallback, useRef } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { usePatternDetailContext } from '../../contexts/PatternDetailContext';

interface InstructionStepProps {
  stepData: {
    id: string;
    text: string;
    subtext?: string;
    sizeSpecific?: string; // Rules like "S_hide M_show L_hide"
  };
  partOlRef: React.RefObject<HTMLOListElement>; // Pass ref for context in toggle
}

export const InstructionStep: React.FC<InstructionStepProps> = ({ stepData, partOlRef }) => {
  const {
    currentSize,
    completedSteps,
    toggleStepCompletion,
    pContent,
    formatUnitDynamic,
  } = usePatternDetailContext();

  const { id, text, subtext, sizeSpecific } = stepData;
  const isCompleted = completedSteps[id] || false;
  const dynamicValues = useMemo(() => {
    if (pContent?.sizesData && pContent.sizesData[currentSize]) {
      return pContent.sizesData[currentSize];
    }
    return {};
  }, [pContent, currentSize]);

  const shouldDisplay = useMemo(() => {
    if (!sizeSpecific) return true;
    const rules = sizeSpecific.split(' ');
    if (rules.includes(`${currentSize}_hide`)) return false;
    if (rules.includes(`${currentSize}_show`)) return true;
    // Add more complex logic here if needed, e.g., ranges or default visibility
    return true; // Default to display if no specific rule matches and it's not explicitly hidden
  }, [sizeSpecific, currentSize]);

  const processTextForDisplay = useCallback((inputText: string): string => {
    if (!inputText) return "";
    let processed = inputText;
    
    // Bolding
    processed = processed.replace(/<strong>(.*?)<\/strong>/g, `<strong style="color: var(--color-accent-val); font-weight: 700;">$1</strong>`);
    
    // Size-dynamic values
    processed = processed.replace(/<span class='size-dynamic' data-size-key='(.*?)'>(.*?)<\/span>/g, (match, key, fallback) => {
      const val = dynamicValues[key] !== undefined ? String(dynamicValues[key]) : fallback;
      return `<strong style="color: var(--color-accent-val); font-weight: 700;">${val}</strong>`;
    });

    // Unit-dynamic values
    processed = processed.replace(/<span class='unit-dynamic(?:\s+size-dynamic)?' data-base-value='(.*?)' data-unit-type='(.*?)'(?:\s+data-size-key='(.*?)')?>(.*?)<\/span>/g, (match, baseValAttr, unitType, sizeKeyAttr, fallback) => {
        const formattedValue = formatUnitDynamic(baseValAttr, unitType, sizeKeyAttr);
        return `<strong style="color: var(--color-accent-val); font-weight: 700;">${formattedValue}</strong>`;
    });
    
    // Abbreviations (ensure they get data-original-title for tooltip handling)
    processed = processed.replace(/<abbr title='(.*?)'>(.*?)<\/abbr>/g, `<abbr title='$1' data-original-title='$1' tabindex='0'>$2</abbr>`);
    
    // Stitch counts (special class from example, ensure they are dynamic)
    processed = processed.replace(/<span class='stitch-count size-dynamic' data-size-key='(.*?)'>(.*?)<\/span>/g, (match, key, fallback) => {
        const val = dynamicValues[key] !== undefined ? String(dynamicValues[key]) : fallback;
        // Stitch counts are usually plain numbers, not necessarily bolded by default unless specified in original HTML
        return `<span class='pdiv-stitch-count'>${val}</span>`; 
    });

    return processed;
  }, [dynamicValues, formatUnitDynamic]);


  if (!shouldDisplay) return null;

  return (
    <li 
      data-instr-id={id} 
      className={isCompleted ? 'instr-completed' : ''} 
      onClick={() => toggleStepCompletion(id, partOlRef)} 
      style={{cursor: 'pointer'}}
      role="listitem"
    >
      <span 
        className="pdiv-instruction-marker" 
        role="checkbox" 
        aria-checked={isCompleted} 
        tabIndex={0} 
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleStepCompletion(id, partOlRef)}
      >
        <CheckIcon className="pdiv-check-icon" />
      </span>
      <span className="pdiv-instruction-text">
        <span dangerouslySetInnerHTML={{ __html: processTextForDisplay(text) }} />
        {subtext && <span className="block text-xs text-gray-500 dark:text-gray-400 italic" dangerouslySetInnerHTML={{ __html: processTextForDisplay(subtext) }} />}
      </span>
    </li>
  );
};
