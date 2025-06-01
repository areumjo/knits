export type Stitch = string; // A single character representing a stitch or color

export interface Pattern {
  name: string;
  grid: Stitch[][];
}

export interface Cursor {
  id: number;
  r: number;
  c: number;
}

export interface StitchStyle {
  bgColor: string;
  textColor: string;
  darkBgColor: string;
  darkTextColor: string;
  symbol?: string; // Optional: if display symbol differs from data stitch char
}

export type Theme = 'light' | 'dark';
