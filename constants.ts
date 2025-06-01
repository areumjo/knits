
import { NavItem } from './types';
import { MagnifyingGlassIcon, HomeIcon, BookOpenIcon, AcademicCapIcon, UserIcon, EnvelopeIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export const SITE_NAME = "Areum Knits";
export const CURRENT_YEAR = new Date().getFullYear().toString();
export const AREUM_ACCENT_COLOR = "accent-clay"; // Updated to new primary accent

export const AREUM_KNITS_LIVE_URL = "https://areumknits.com";
export const INCH_TO_CM = 2.54;
export const MOBILE_BREAKPOINT = 600; // px, for JS logic if needed outside CSS

export const TOP_NAVIGATION: NavItem[] = [
  { name: "Patterns", path: "/patterns" },
  { name: "Notebook", path: "/notebook" },
  { name: "About", path: "/about" },
];

export const FOOTER_MAIN_LINKS: NavItem[] = [
  { name: "Patterns", path: "/patterns" },
  { name: "Notebook", path: "/notebook" },
  { name: "About", path: "/about" },
  { name: "Learning Paths", path: "/learning-paths" },
  { name: "Say Hello", path: "/contact" },
];

export const FOOTER_LEGAL_LINKS: NavItem[] = [
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms of Use", path: "/terms-of-use" },
];

// Example icon mapping - you might want a more robust system
export const PAGE_ICONS: { [key: string]: React.ElementType } = {
  home: HomeIcon,
  patterns: BookOpenIcon, // Using BookOpen as a metaphor for pattern library
  notebook: DocumentTextIcon, // Or PencilIcon
  learningPaths: AcademicCapIcon,
  about: UserIcon,
  contact: EnvelopeIcon,
  search: MagnifyingGlassIcon,
};

export const PATTERN_PLACEHOLDER_IMAGE = "https://picsum.photos/seed/{seed}/600/400";
export const ARTICLE_PLACEHOLDER_IMAGE = "https://picsum.photos/seed/{seed}/400/300";

export const PATTERN_DETAIL_TOOLBAR_HEIGHT = '60px'; // Approximate height of the toolbar
