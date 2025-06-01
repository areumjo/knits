
export interface NavItem {
  name: string;
  path: string;
  icon?: React.ElementType;
}

export enum GarmentType {
  Sweater = "Sweaters",
  Cardigan = "Cardigans",
  Shawl = "Shawls",
  Hat = "Hats",
  Accessory = "Accessories",
}

export enum ConstructionType {
  SeamlessTopDown = "Seamless Top-Down",
  Seamed = "Seamed",
  Modular = "Modular",
}

export enum SkillLevel {
  Beginner = "Beginner",
  AdventurousBeginner = "Adventurous Beginner",
  Intermediate = "Intermediate",
  Experienced = "Experienced",
}

export enum YarnWeight {
  Lace = "Lace",
  Fingering = "Fingering",
  Sport = "Sport",
  DK = "DK",
  Worsted = "Worsted",
  Bulky = "Bulky",
}

export interface Pattern {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  images?: { url: string; alt: string }[];
  areumIntro?: string; // Personal intro for detail page
  areumNote?: string; // Short note for card
  garmentType: GarmentType;
  construction: ConstructionType;
  skillLevel: SkillLevel;
  skillTags: string[];
  yarnWeight: YarnWeight;
  mainYarn?: string; // e.g., "Designed for: Fingering Weight Merino"
  yarnDetails?: { // For pattern detail page
    featuredYarn: string;
    thoughtsOnFiber: string;
    yardageForSample?: string;
    substitutions?: string;
  };
  designEngineeringNotes?: string;
  constructionAtAGlance?: string;
  specificSkillsRequired?: string[];
  materialsNeeded?: {
    yarn: string;
    needles: string;
    notions: string;
  };
  gaugeInfo?: {
    details: string;
    swatchingNotes?: string;
  };
  finishedMeasurements?: {
    chartUrl?: string; // If table is an image
    notes?: string; // e.g. "Shown in size X with Y ease"
    sizes: Record<string, Record<string, string>>; // e.g. { S: { bust: "34in", length: "22in" }, M: { ... } }
  };
  patternContent?: PatternContent; // For the interactive pattern viewer
  learningPathIds?: string[]; // IDs of related learning paths
  relatedNotebookArticleIds?: string[]; // IDs of related articles
  isSpotlight?: boolean;
  publishedDate: string; // ISO Date string
}

export interface PatternContent {
  // This structure mirrors the example HTML's JS SIZES_DATA and sections
  // Simplified for brevity
  overview: string;
  skillLevelText: string; // e.g. "Adventurous Beginner"
  estimatedTime: string; // e.g. "4-7 hours"
  sizesData: Record<string, Record<string, string | number>>; // e.g. SIZES_DATA from example JS
  introNotes: { title: string, content: string[] }; // HTML content as string array for paragraphs/lists
  sizingInfo: { title: string, content: string[], tableData?: Record<string, string>[] };
  materials: { title: string, list: { label: string, description: string, icon?: string }[] };
  instructions: {
    title: string;
    parts: {
      subtitle: string;
      steps: { id: string; text: string; subtext?: string, sizeSpecific?: string }[]; // text can contain HTML for bolding, etc.
      note?: string;
      proTip?: string;
      attention?: string;
    }[];
  };
  visualAids?: { title: string, items: { src: string, caption: string }[] };
  schematic?: { title: string, src: string, caption: string };
  finishing: { title: string, steps: string[], closingRemark?: string };
  requiredSkills: { title: string, skills: { term: string, definition: string }[] };
  abbreviations: { title: string, list: { term: string, definition: string }[] };
}


export interface Article {
  id: string;
  slug: string;
  title: string;
  teaser: string;
  imageUrl?: string;
  category: string; // e.g., "Techniques", "Yarn Deep Dives"
  tags?: string[];
  publishedDate: string; // ISO Date string
  content: string; // Markdown or HTML content
  isEditorsPick?: boolean;
  series?: string; // Name of reading series/collection
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  intro: string; // Main intro copy for the path
  focusAndLevel: string; // e.g., "Focus: Top-Down Sweater Construction | Best for: Adventurous Beginners"
  areumLetter: string; // Personal intro from Areum
  learningObjectives: string[]; // Bullet points
  whatYoullCreate: {
    projects: { patternId: string; name: string }[]; // Link to patterns
    achievements: string[];
  };
  helpfulReads: { articleId: string; name: string; note: string }[]; // Link to notebook articles
}

export interface FilterOption {
  label: string;
  value: string;
  icon?: React.ElementType;
}

export interface FilterCategory {
  id: string;
  name: string; // e.g., "What are you dreaming of making?"
  options: FilterOption[];
  type: 'radio' | 'checkbox'; // for UI rendering
}

export interface SortOption {
  label: string;
  value: string;
}
    