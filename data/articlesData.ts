
import { Article } from '../types';
import { ARTICLE_PLACEHOLDER_IMAGE } from '../constants';

export const articlesData: Article[] = [
  {
    id: "yarn-substitution-guide",
    slug: "yarn-substitution-guide",
    title: "The Art of Yarn Substitution: A Comprehensive Guide",
    teaser: "Unlock the secrets to confidently substituting yarns in your knitting projects. Learn about fiber content, weight, ply, and more...",
    imageUrl: ARTICLE_PLACEHOLDER_IMAGE.replace('{seed}', 'yarnsub'),
    category: "Yarn Deep Dives",
    tags: ["yarn", "substitution", "fiber", "techniques"],
    publishedDate: "2023-09-01T10:00:00Z",
    content: "<p>Full article content about yarn substitution goes here. It can be extensive and include headings, lists, and images.</p><p>Understanding fiber properties is key...</p><h2>Fiber Types</h2><ul><li>Wool</li><li>Cotton</li><li>Silk</li><li>Alpaca</li></ul>",
    isEditorsPick: true,
    series: "Swatch Science",
  },
  {
    id: "mastering-tension",
    slug: "mastering-tension",
    title: "Mastering Your Tension: Tips for Consistent Knitting",
    teaser: "Achieve even, beautiful stitches by understanding and controlling your knitting tension. Explore common issues and solutions.",
    imageUrl: ARTICLE_PLACEHOLDER_IMAGE.replace('{seed}', 'tension'),
    category: "Techniques",
    tags: ["tension", "gauge", "knitting skills"],
    publishedDate: "2023-07-15T10:00:00Z",
    content: "<p>Detailed article on knitting tension. This could include diagrams or photos embedded if using HTML.</p>",
  },
  {
    id: "design-process-cardigan",
    slug: "design-process-cardigan",
    title: "From Sketch to Stitches: Designing the Olsen Cardigan",
    teaser: "A behind-the-scenes look at my design process for the Olsen Cardigan, from initial inspiration to final pattern.",
    imageUrl: ARTICLE_PLACEHOLDER_IMAGE.replace('{seed}', 'designprocess'),
    category: "Design Process",
    tags: ["design", "cardigan", "inspiration", "process"],
    publishedDate: "2023-08-25T10:00:00Z",
    content: "<p>Follow along the journey of designing a knitted garment.</p>",
    series: "Studio Log",
  },
  {
    id: "favorite-knitting-tools",
    slug: "favorite-knitting-tools",
    title: "My Favorite Knitting Tools & Resources",
    teaser: "A curated list of essential and beloved tools that make my knitting life easier and more enjoyable.",
    imageUrl: ARTICLE_PLACEHOLDER_IMAGE.replace('{seed}', 'tools'),
    category: "Knitting Tools & Resources",
    tags: ["tools", "needles", "notions", "resources"],
    publishedDate: "2024-03-01T10:00:00Z",
    content: "<p>Explore the best tools for knitters.</p>",
    isEditorsPick: true,
  }
];
    