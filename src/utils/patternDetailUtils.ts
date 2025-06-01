// src/utils/patternDetailUtils.ts
import { PatternContent } from '../../types';

export const FONT_SIZES_CONFIG = { min: 14, max: 20, step: 1, default: 16 };
export const DEFAULT_SIZE = 'L';
export const DEFAULT_UNIT = 'in';
export const INCH_TO_CM = 2.54;
export const MOBILE_BREAKPOINT = 600; // px

const LS_PREFIX = 'areumPattern_';
const DETAIL_PAGE_VERSION = 'v1.1_'; // Increment to bust old LS keys if structure changes

export const LS_KEYS_GENERATOR = (patternId?: string) => {
  if (!patternId) { // Provide default keys if patternId is not yet available
    const placeholderId = 'unknownPattern';
    return {
      instructionPrefix: `${LS_PREFIX}${DETAIL_PAGE_VERSION}instr_${placeholderId}_`,
      imageVisible: `${LS_PREFIX}${DETAIL_PAGE_VERSION}imgVisible_${placeholderId}`,
      fontSize: `${LS_PREFIX}${DETAIL_PAGE_VERSION}fontSize_${placeholderId}`,
      selectedSize: `${LS_PREFIX}${DETAIL_PAGE_VERSION}selSize_${placeholderId}`,
      unit: `${LS_PREFIX}${DETAIL_PAGE_VERSION}unit_${placeholderId}`,
      sectionTogglePrefix: `${LS_PREFIX}${DETAIL_PAGE_VERSION}secToggle_${placeholderId}_`,
      theme: `${LS_PREFIX}${DETAIL_PAGE_VERSION}theme_${placeholderId}`,
    };
  }
  return {
    instructionPrefix: `${LS_PREFIX}${DETAIL_PAGE_VERSION}instr_${patternId}_`,
    imageVisible: `${LS_PREFIX}${DETAIL_PAGE_VERSION}imgVisible_${patternId}`,
    fontSize: `${LS_PREFIX}${DETAIL_PAGE_VERSION}fontSize_${patternId}`,
    selectedSize: `${LS_PREFIX}${DETAIL_PAGE_VERSION}selSize_${patternId}`,
    unit: `${LS_PREFIX}${DETAIL_PAGE_VERSION}unit_${patternId}`,
    sectionTogglePrefix: `${LS_PREFIX}${DETAIL_PAGE_VERSION}secToggle_${patternId}_`,
    theme: `${LS_PREFIX}${DETAIL_PAGE_VERSION}theme_${patternId}`,
  };
};


export const formatUnitDynamic = (
  baseValueStr: string | number | undefined,
  unitType: string,
  currentUnit: 'in' | 'cm',
  sizesData?: PatternContent['sizesData'],
  currentSize?: string,
  sizeKey?: string
): string => {
  let actualBaseValue = baseValueStr;

  if (sizeKey && sizesData && currentSize && sizesData[currentSize]?.[sizeKey] !== undefined) {
    actualBaseValue = String(sizesData[currentSize]?.[sizeKey]);
  }
  
  if (actualBaseValue === undefined || actualBaseValue === null) return '';

  const valStr = String(actualBaseValue);
  const isCm = currentUnit === 'cm';
  let displayValue = valStr;
  let unitSuffix = isCm ? "cm" : '"';

  if (unitType === 'length_range_text') {
    const parts = valStr.split(/[-–]/);
    if (parts.length === 2) {
      const part1 = parseFloat(parts[0]);
      const part2 = parseFloat(parts[1]);
      if (!isNaN(part1) && !isNaN(part2)) {
        displayValue = isCm ? `${(part1 * INCH_TO_CM).toFixed(1)}–${(part2 * INCH_TO_CM).toFixed(1)}` : `${part1.toFixed(1)}–${part2.toFixed(1)}`;
      }
    } else {
      const baseValueNum = parseFloat(valStr);
      if (!isNaN(baseValueNum)) displayValue = isCm ? (baseValueNum * INCH_TO_CM).toFixed(1) : baseValueNum.toFixed(1);
    }
    return `${displayValue} ${isCm ? "cm" : (valStr.toLowerCase().includes("inch") ? "" : '"')}`;
  }

  const baseValueNum = parseFloat(valStr);
  if (isNaN(baseValueNum)) return valStr;

  switch (unitType) {
    case 'length':
      displayValue = isCm ? (baseValueNum * INCH_TO_CM).toFixed(1) : baseValueNum.toFixed(1);
      unitSuffix = isCm ? " cm" : '"';
      break;
    case 'length_plain':
      displayValue = isCm ? (baseValueNum * INCH_TO_CM).toFixed(1) : baseValueNum.toFixed(1);
      unitSuffix = isCm ? " cm" : (baseValueNum === 1 ? " inch" : " inches");
      break;
    case 'mm_needle':
      displayValue = baseValueNum.toFixed(1);
      unitSuffix = "mm";
      break;
    case 'cm_cord': // Assuming base value is already in cm for cords, or needs conversion logic if it's inches
      displayValue = baseValueNum.toFixed(1); // If base is inches: isCm ? (baseValueNum * INCH_TO_CM).toFixed(1) : baseValueNum.toFixed(1);
      unitSuffix = "cm";
      break;
    case 'yarn_yards': // Special handling if we want to convert yards to meters
        if (isCm) { // Treat "cm" unit selection as metric for yarn too
            displayValue = (baseValueNum * 0.9144).toFixed(0); // Yards to meters
            unitSuffix = "m";
        } else {
            displayValue = baseValueNum.toFixed(0);
            unitSuffix = "yds";
        }
        break;
    case 'yarn_meters':
        if (!isCm) { // Treat "in" unit selection as imperial for yarn too
            displayValue = (baseValueNum / 0.9144).toFixed(0); // Meters to yards
            unitSuffix = "yds";
        } else {
            displayValue = baseValueNum.toFixed(0);
            unitSuffix = "m";
        }
        break;
    default: // For simple numbers like stitch counts, no unit conversion.
      displayValue = baseValueNum.toString();
      unitSuffix = '';
  }
  return `${displayValue}${unitType.includes('needle') || unitType.includes('cord') || unitType.includes('yarn') ? ' ' : ''}${unitSuffix}`;
};

export const getPatternDetailCSS = (): string => {
  const styleElement = document.getElementById('pattern-detail-page-styles');
  return styleElement ? styleElement.innerHTML : "/* CSS styles not found for download */";
};
