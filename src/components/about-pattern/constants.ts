
import { Pattern, Stitch, StitchStyle } from './types';
export const GRID_ROWS = 16;
export const GRID_COLS = 28;

// Standard animation speeds (slowed down)
export const MIN_ANIMATION_DELAY = 40; // ms (was 10)
export const MAX_ANIMATION_DELAY = 150; // ms (was 60)
export const UPDATES_PER_TICK_START = 1; // (was 2)
export const UPDATES_PER_TICK_END = 3; // Max updates per animation frame when accelerating (was 5)
export const PAUSE_DURATION = 2500; // ms, pause between pattern transitions

// Boosted animation speeds (slowed down relative to previous boosted)
export const BOOSTED_MIN_ANIMATION_DELAY = 10;  // ms (was 1)
export const BOOSTED_MAX_ANIMATION_DELAY = 50; // ms (was 20)
export const BOOSTED_UPDATES_PER_TICK_START = 2; // (was 5)
export const BOOSTED_UPDATES_PER_TICK_END = 5;  // (was 10)

// Cursor behavior
export const CURSOR_LIFESPAN = 15; // Number of animation frames a cursor lives
export const CURSOR_MAX_MOVES = 3; // Max number of small random moves a cursor makes
export const MAX_ACTIVE_CURSORS = 5; // Maximum number of cursors active on the grid
export const MAX_ADJACENT_EDITS_PER_CURSOR = 2; // Max adjacent cells a cursor can edit

const createGrid = (rows: number, cols: number, filler: (r: number, c: number) => Stitch): Stitch[][] => {
  const grid: Stitch[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: Stitch[] = [];
    for (let c = 0; c < cols; c++) {
      row.push(filler(r, c));
    }
    grid.push(row);
  }
  return grid;
};

const setesdalStarPattern = [
  "00000000000000000000", // Row 0
  "00000000000000000000", // Row 1
  "01100100010001001100", // Row 2
  "11000110000011000110", // Row 3
  "10000111000111000011", // Row 4
  "00111011101110111001", // Row 5
  "00011101101101110001", // Row 6
  "10001110101011100011", // Row 7
  "11000111010111000110", // Row 8
  "01100000101000001100", // Row 9
  "11000111010111000110", // Row 10
  "10001110101011100011", // Row 11
  "00011101101101110001", // Row 12
  "00111011101110111001", // Row 13
  "10000111000111000011", // Row 14
  "11000110000011000110", // Row 15
  "01100100010001001100", // Row 16
  "00000000000000000000", // Row 17
  "00000000000000000000"  // Row 18
];
const STAR_PATTERN_ROWS = setesdalStarPattern.length; // is 19
const STAR_PATTERN_COLS = setesdalStarPattern[0].length; // is 20

export const PATTERNS_DATA: Pattern[] = [
  {
    name: "Aran Diamond",
    grid: createGrid(GRID_ROWS, GRID_COLS, (r, c) => {
      const colInRepeat = c % 8;
      const rowInRepeat = r % 8;
      if ((colInRepeat === 1 || colInRepeat === 6) && (rowInRepeat === 2 || rowInRepeat === 5)) return 'O';
      if ((colInRepeat === 2 || colInRepeat === 5) && (rowInRepeat === 1 || rowInRepeat === 3 || rowInRepeat === 4 || rowInRepeat === 6)) return 'O';
      if ((colInRepeat === 3 || colInRepeat === 4) && (rowInRepeat === 0 || rowInRepeat === 7)) return 'O';
      if ((colInRepeat === 0 || colInRepeat === 7) && (rowInRepeat === 3 || rowInRepeat === 4)) return 'X';
      return 'p';
    }),
  },
  {
    name: "Setesdal Star",
    grid: createGrid(GRID_ROWS, GRID_COLS, (r, c) => {
      const startRow = Math.floor((GRID_ROWS - STAR_PATTERN_ROWS) / 2);
      const patternR = r - startRow;

      if (patternR >= 0 && patternR < STAR_PATTERN_ROWS) {
        const patternC = c % STAR_PATTERN_COLS;
        return setesdalStarPattern[patternR][patternC] === '1' ? '*' : ' '; // Updated to # for black-like
      }
      return ' ';
    }),
  },
  {
    name: "Feather and Fan",
    grid: createGrid(GRID_ROWS, GRID_COLS, (r, c) => {
      // To make rows appear growing upwards, map grid row 'r' to pattern's conceptual row
      // The pattern repeats every 4 rows.
      // (GRID_ROWS - 1 - r) gives the visual row from bottom (0 to GRID_ROWS-1)
      // Then, % 4 gives the position within the 4-row pattern repeat, effectively 0,1,2,3 from bottom up
      const rowInPatternRepeat = (GRID_ROWS - 1 - r) % 4;
      const colInRepeat = c % 18;

      if (rowInPatternRepeat === 0) return 'k';
      if (rowInPatternRepeat === 1) return 'k';
      if (rowInPatternRepeat === 2) {
        if (colInRepeat < 3) {
          return 'dec';
        } else if (colInRepeat < 15) {
          // This is a 12-stitch section (indices 3 to 14)
          // (colInRepeat - 3) normalizes it to 0-11
          return (colInRepeat - 3) % 2 === 0 ? 'k' : 'yo';
        } else {
          return 'inc';
        }
      }
      return 'p';
    }),
  },
  {
    name: "Houndstooth",
    grid: createGrid(GRID_ROWS, GRID_COLS, (r, c) => {
      const pr = r % 8;
      const pc = c % 8;
      const pattern = [
        [1, 1, 1, 0, 1, 1, 0, 1],
        [0, 1, 1, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 1, 1],
        [1, 1, 1, 0, 0, 1, 1, 1],
      ];
      return pattern[pr][pc] ? '#' : '.';
    }),
  },
  {
    name: "Guernsey Diamond",
    grid: createGrid(GRID_ROWS, GRID_COLS, (r, c) => {
      const repeatSize = 12;
      const segR = r % repeatSize;
      const segC = c % repeatSize;
      const centerR = repeatSize / 2;
      const centerC = repeatSize / 2;
      const distance = Math.abs(segR - centerR) + Math.abs(segC - centerC);
      if (distance <= 4 && distance >= 2) return 'D';
      if (distance < 2) return 'p';
      return 'p';
    }),
  },
  {
    name: "Triple Tweed",
    grid: createGrid(GRID_ROWS, GRID_COLS, (r, c) => {
      const rowInRepeat = r % 12; // 12-row vertical repeat
      const colInRepeat = c % 4;  // 4-stitch horizontal repeat

      const colorA = 'e'; // Tweed base - orange
      const colorB = 't'; // Tweed texture 1 - yellow
      const colorC = 'w'; // Tweed texture 2 - green

      // Rows 0, 1 (Knitting Rows 1,2 with Color A, Slipped is Color C)
      if (rowInRepeat < 2) {
        return colInRepeat === 1 ? colorC : colorA;
      }
      // Rows 2, 3 (Knitting Rows 3,4 with Color B, Slipped is Color A)
      if (rowInRepeat < 4) {
        return colInRepeat === 3 ? colorA : colorB;
      }
      // Rows 4, 5 (Knitting Rows 5,6 with Color C, Slipped is Color B)
      if (rowInRepeat < 6) {
        return colInRepeat === 1 ? colorB : colorC;
      }
      // Rows 6, 7 (Knitting Rows 7,8 with Color A, Slipped is Color C)
      if (rowInRepeat < 8) {
        return colInRepeat === 3 ? colorC : colorA;
      }
      // Rows 8, 9 (Knitting Rows 9,10 with Color B, Slipped is Color A)
      if (rowInRepeat < 10) {
        return colInRepeat === 1 ? colorA : colorB;
      }
      // Rows 10, 11 (Knitting Rows 11,12 with Color C, Slipped is Color B)
      // if (rowInRepeat < 12)
      return colInRepeat === 3 ? colorB : colorC;
    }),
  },
  {
    name: "Chevron Zigzag",
    grid: createGrid(GRID_ROWS, GRID_COLS, (r, c) => {
      const chevronWidth = 8;
      const bandHeight = 3;
      const colInChevron = c % (chevronWidth * 2);
      let vOffset;
      if (colInChevron < chevronWidth) {
        vOffset = colInChevron;
      } else {
        vOffset = (chevronWidth * 2) - colInChevron - 1;
      }
      const adjustedRow = (r + vOffset) % (bandHeight * 2);
      const finalColorBand = Math.floor(adjustedRow / bandHeight);
      return finalColorBand === 0 ? 'Z' : 'z';
    }),
  },
  {
    name: "Damask Motif",
    grid: createGrid(GRID_ROWS, GRID_COLS, (r, c) => {
      const repeatSize = 14;
      const segR = r % repeatSize;
      const segC = c % repeatSize;
      const centerR = repeatSize / 2;
      const centerC = repeatSize / 2;
      if (Math.abs(segC - centerC) <= 1 && segR >= 4 && segR <= 10) return 'F';
      if (Math.abs(segR - centerR) <= 1 && segC >= 3 && segC <= 11) return 'F';
      const dist1 = Math.sqrt((segR - 3) ** 2 + (segC - centerC) ** 2);
      const dist2 = Math.sqrt((segR - 11) ** 2 + (segC - centerC) ** 2);
      if ((dist1 >= 2 && dist1 <= 3) || (dist2 >= 2 && dist2 <= 3)) return 'f';
      const dist3 = Math.sqrt((segR - centerR) ** 2 + (segC - 3) ** 2);
      const dist4 = Math.sqrt((segR - centerR) ** 2 + (segC - 11) ** 2);
      if ((dist3 >= 1.5 && dist3 <= 2.5) || (dist4 >= 1.5 && dist4 <= 2.5)) return 'f';
      return 'B';
    }),
  },
];

export const STITCH_STYLES: Record<Stitch, StitchStyle> = {
  ' ': { bgColor: 'bg-stone-100', textColor: 'text-stone-400', darkBgColor: 'dark:bg-stone-800', darkTextColor: 'dark:text-stone-500' }, // Space/background
  'k': { bgColor: 'bg-neutral-200', textColor: 'text-neutral-600', darkBgColor: 'dark:bg-neutral-700', darkTextColor: 'dark:text-neutral-300', symbol: '|' }, // Knit
  'p': { bgColor: 'bg-slate-200', textColor: 'text-slate-500', darkBgColor: 'dark:bg-slate-700', darkTextColor: 'dark:text-slate-300', symbol: '-' }, // Purl
  'X': { bgColor: 'bg-sky-200', textColor: 'text-sky-700', darkBgColor: 'dark:bg-sky-700', darkTextColor: 'dark:text-sky-200', symbol: 'x' }, // Cable X / Twist Stitch
  'O': { bgColor: 'bg-rose-200', textColor: 'text-rose-700', darkBgColor: 'dark:bg-rose-700', darkTextColor: 'dark:text-rose-200', symbol: 'o'}, // Bobble/Open O (symbol 'o' for bobble)
  '*': { bgColor: 'bg-cyan-300', textColor: 'text-cyan-800', darkBgColor: 'dark:bg-cyan-600', darkTextColor: 'dark:text-cyan-100', symbol: '*' }, // Star / Accent (Original Setesdal Star stitch)
  's': { bgColor: 'bg-red-200', textColor: 'text-red-700', darkBgColor: 'dark:bg-red-500', darkTextColor: 'dark:text-red-200', symbol: '.' }, // Star secondary / Lice Stitch (symbol '.' for small speckle)
  'yo': { bgColor: 'bg-lime-200', textColor: 'text-lime-700', darkBgColor: 'dark:bg-lime-700', darkTextColor: 'dark:text-lime-200', symbol: 'o' }, // Yarn over (often charted as 'o')
  'dec': { bgColor: 'bg-teal-300', textColor: 'text-teal-800', darkBgColor: 'dark:bg-teal-600', darkTextColor: 'dark:text-teal-100', symbol: '\\' }, // Decrease (e.g., k2tog, charted as '\')
  'inc': { bgColor: 'bg-teal-200', textColor: 'text-teal-700', darkBgColor: 'dark:bg-teal-500', darkTextColor: 'dark:text-teal-200', symbol: '/' }, // Increase / ssk (charted as '/')
  '#': { bgColor: 'bg-gray-700', textColor: 'text-gray-100', darkBgColor: 'dark:bg-gray-300', darkTextColor: 'dark:text-gray-800' }, // Houndstooth dark, Setesdal Star
  '.': { bgColor: 'bg-gray-100', textColor: 'text-gray-500', darkBgColor: 'dark:bg-gray-800', darkTextColor: 'dark:text-gray-400' }, // Houndstooth light
  'M': { bgColor: 'bg-indigo-300', textColor: 'text-indigo-800', darkBgColor: 'dark:bg-indigo-600', darkTextColor: 'dark:text-indigo-100' }, // Lopi motif 1
  'W': { bgColor: 'bg-purple-300', textColor: 'text-purple-800', darkBgColor: 'dark:bg-purple-600', darkTextColor: 'dark:text-purple-100' }, // Lopi motif 2
  'L': { bgColor: 'bg-pink-300', textColor: 'text-pink-800', darkBgColor: 'dark:bg-pink-600', darkTextColor: 'dark:text-pink-100' }, // Lopi motif 3 (now used in corrected Lopi)
  'b': { bgColor: 'bg-stone-50', textColor: 'text-stone-400', darkBgColor: 'dark:bg-stone-800', darkTextColor: 'dark:text-stone-500' }, // Lopi background
  't': { bgColor: 'bg-yellow-200', textColor: 'text-yellow-700', darkBgColor: 'dark:bg-yellow-700', darkTextColor: 'dark:text-yellow-200' }, // Tweed texture 1 (Color B in Triple Tweed, Color B in Three-and-One)
  'w': { bgColor: 'bg-green-200', textColor: 'text-green-700', darkBgColor: 'dark:bg-green-700', darkTextColor: 'dark:text-green-200' }, // Tweed texture 2 (Color C in Triple Tweed, Slipped in Three-and-One)
  'e': { bgColor: 'bg-orange-200', textColor: 'text-orange-700', darkBgColor: 'dark:bg-orange-700', darkTextColor: 'dark:text-orange-200' }, // Tweed base (Color A in Triple Tweed, Color A in Three-and-One)
  'A': { bgColor: 'bg-cyan-200', textColor: 'text-cyan-700', darkBgColor: 'dark:bg-cyan-700', darkTextColor: 'dark:text-cyan-200' }, // Bohus color A
  'B': { bgColor: 'bg-sky-300', textColor: 'text-sky-800', darkBgColor: 'dark:bg-sky-600', darkTextColor: 'dark:text-sky-100' }, // Bohus color B / Damask Background
  'C': { bgColor: 'bg-indigo-200', textColor: 'text-indigo-700', darkBgColor: 'dark:bg-indigo-700', darkTextColor: 'dark:text-indigo-200' }, // Bohus color C
  'D': { bgColor: 'bg-emerald-300', textColor: 'text-emerald-800', darkBgColor: 'dark:bg-emerald-600', darkTextColor: 'dark:text-emerald-100', symbol: '|' }, // Guernsey Diamond (knit stitch part, symbol for knit)
  'Z': { bgColor: 'bg-fuchsia-300', textColor: 'text-fuchsia-800', darkBgColor: 'dark:bg-fuchsia-600', darkTextColor: 'dark:text-fuchsia-100' }, // Chevron color 1
  'z': { bgColor: 'bg-violet-300', textColor: 'text-violet-800', darkBgColor: 'dark:bg-violet-600', darkTextColor: 'dark:text-violet-100' }, // Chevron color 2
  'F': { bgColor: 'bg-lime-400', textColor: 'text-lime-900', darkBgColor: 'dark:bg-lime-600', darkTextColor: 'dark:text-lime-100' }, // Damask Motif F (main structure)
  'f': { bgColor: 'bg-lime-300', textColor: 'text-lime-800', darkBgColor: 'dark:bg-lime-500', darkTextColor: 'dark:text-lime-200' }, // Damask Motif f (secondary detail)
  DEFAULT: { bgColor: 'bg-gray-400', textColor: 'text-gray-900', darkBgColor: 'dark:bg-gray-500', darkTextColor: 'dark:text-gray-100' },
};
