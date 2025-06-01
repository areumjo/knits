
import { LearningPath } from '../types';

export const learningPathsData: LearningPath[] = [
  {
    id: "seamless-sweaters-101",
    slug: "seamless-sweaters-101",
    title: "Mastering Seamless Sweaters",
    intro: "Want to grow your knitting skills with a bit more intention? This path guides you through creating beautiful seamless sweaters.",
    focusAndLevel: "Focus: Top-Down Sweater Construction | Best for: Adventurous Beginners comfortable with knit/purl stitches.",
    areumLetter: "I designed this path for those of you who love the idea of seamless sweaters but want a bit more guidance on achieving a perfect fit and finish. We'll break it down step-by-step!",
    learningObjectives: [
      "Understanding raglan shaping",
      "Choosing the right cast-on for top-down garments",
      "Knitting sleeves in the round",
      "Basic sweater fit adjustments",
    ],
    whatYoullCreate: {
      projects: [{ patternId: "city-stroll-sweater", name: "City Stroll Sweater" }],
      achievements: [
        "A beautiful, well-fitting seamless sweater",
        "A deeper understanding of top-down construction",
        "The confidence to tackle more complex sweater patterns",
      ],
    },
    helpfulReads: [
      { articleId: "mastering-tension", name: "Mastering Your Tension", note: "Essential for even fabric in your sweater." },
      { articleId: "yarn-substitution-guide", name: "The Art of Yarn Substitution", note: "Helps you choose the perfect yarn for your sweater project." },
    ],
  },
  {
    id: "lace-knitting-essentials",
    slug: "lace-knitting-essentials",
    title: "The Art of the Perfect Shawl Drape",
    intro: "Dive into the beautiful world of lace knitting and create shawls with stunning drape and detail.",
    focusAndLevel: "Focus: Lace Stitches & Shawl Construction | Best for: Intermediate knitters looking to explore lace.",
    areumLetter: "Lace knitting can seem daunting, but with the right guidance, it's incredibly rewarding. This path will help you read charts, understand lace structure, and block your shawls to perfection.",
    learningObjectives: [
      "Reading lace charts confidently",
      "Understanding common lace stitches (yo, k2tog, ssk)",
      "Techniques for achieving good stitch definition in lace",
      "Blocking lace effectively for optimal drape",
      "Choosing appropriate yarns for lace projects",
    ],
    whatYoullCreate: {
      projects: [{ patternId: "meadowsweet-shawl", name: "Meadowsweet Shawl" }],
      achievements: [
        "A stunning lace shawl",
        "Proficiency in reading and working from lace charts",
        "The ability to block lace like a pro",
      ],
    },
    helpfulReads: [
      { articleId: "yarn-substitution-guide", name: "The Art of Yarn Substitution", note: "Crucial for selecting yarns that enhance lace." },
      // Add another relevant article if available, e.g., "Blocking 101"
    ],
  },
];
    