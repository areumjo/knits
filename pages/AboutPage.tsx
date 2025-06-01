
import React from 'react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { AREUM_ACCENT_COLOR } from '../constants';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <SectionTitle title="About" />

      <section>
        <img 
            src="https://picsum.photos/seed/areum-hands-complex-pattern/800/500" 
            alt="Areum's hands shaping fabric for a complex knit pattern, with notebooks and swatches nearby"
            className="w-full rounded-lg shadow-xl mb-8 object-cover max-h-[500px]"
        />
        <div className={`prose dark:prose-invert max-w-none text-text-secondary space-y-4 
                        prose-headings:font-primary prose-headings:text-text-primary 
                        prose-p:text-text-secondary prose-li:text-text-secondary
                        prose-strong:text-text-primary
                        prose-a:text-${AREUM_ACCENT_COLOR} dark:prose-a:text-${AREUM_ACCENT_COLOR} hover:prose-a:underline`}>
          <p className="font-primary text-2xl text-text-primary">
            Hi, I'm Areum.
          </p>
          <p>
            I've been knitting since I was a kid. I used to be a neuroscientist, now I work in software. I think those experiences shaped how I approach design—I'm used to systems thinking, debugging problems, and figuring out why things work the way they do.
          </p>
          <p>
            When I design patterns, I document the process. Why I chose this construction method over another. How different yarns change the behavior of the same design. What happens when you modify traditional techniques.
          </p>
        </div>
      </section>

      <section>
        <h2 className={`font-primary text-2xl md:text-3xl font-semibold text-text-primary mb-4`}>What I Make</h2>
        <img 
            src="https://picsum.photos/seed/garment-construction-examples/800/400" 
            alt="Three finished knit garments showcasing different construction: seamless, seamed, and uniquely shaped"
            className="w-full rounded-lg shadow-xl mb-8 object-cover max-h-[400px]"
        />
        <div className={`prose dark:prose-invert max-w-none text-text-secondary space-y-4 
                        prose-headings:font-primary prose-headings:text-text-primary 
                        prose-p:text-text-secondary prose-li:text-text-secondary
                        prose-strong:text-text-primary
                        prose-a:text-${AREUM_ACCENT_COLOR} dark:prose-a:text-${AREUM_ACCENT_COLOR} hover:prose-a:underline`}>
          <p>
            The patterns I design focus on garments that solve real fitting problems. How to create structure without bulk. How to work with a yarn's natural drape instead of fighting it. How to use construction methods that actually improve the garment over time.
          </p>
          <p>
            Each pattern includes the reasoning behind my choices—not just what to do, but why each decision creates better fit and finish. When I hit problems during design, I document how I work through solutions. These aren't polished tutorials; they're real problem-solving in action.
          </p>
        </div>
        <img 
            src="https://picsum.photos/seed/swatch-progression-techniques/800/300" 
            alt="Progression of knit swatches: basic stitches, cables, and complex textures"
            className="w-full rounded-lg shadow-xl my-8 object-cover max-h-[300px]"
        />
        <div className={`prose dark:prose-invert max-w-none text-text-secondary space-y-4 
                        prose-headings:font-primary prose-headings:text-text-primary 
                        prose-p:text-text-secondary prose-li:text-text-secondary
                        prose-strong:text-text-primary
                        prose-a:text-${AREUM_ACCENT_COLOR} dark:prose-a:text-${AREUM_ACCENT_COLOR} hover:prose-a:underline`}>
          <p>
            I organize patterns into learning progressions that build understanding. Start with basic construction, understand why it works, then add complexity. The goal isn't just to finish a project—it's to understand something that applies to everything you make afterward.
          </p>
        </div>
      </section>
      
      <section>
        <h2 className={`font-primary text-2xl md:text-3xl font-semibold text-text-primary mb-4`}>Why This Approach</h2>
        <img 
            src="https://picsum.photos/seed/areum-notebook-design-process/800/450" 
            alt="Areum's open notebook with sketches, yarn samples, calculations, and a work-in-progress garment"
            className="w-full rounded-lg shadow-xl mb-8 object-cover max-h-[450px]"
        />
        <div className={`prose dark:prose-invert max-w-none text-text-secondary space-y-4
                        prose-headings:font-primary prose-headings:text-text-primary 
                        prose-p:text-text-secondary prose-li:text-text-secondary
                        prose-strong:text-text-primary
                        prose-a:text-${AREUM_ACCENT_COLOR} dark:prose-a:text-${AREUM_ACCENT_COLOR} hover:prose-a:underline`}>
            <p>
                Most knitting resources give you instructions without explaining the underlying principles. When something goes wrong—and it always does when you're working with natural materials—you're left guessing.
            </p>
            <p>
                This space exists for knitters who enjoy the problem-solving aspect of construction, who want to understand why techniques work, who get satisfaction from making something that fits exactly right because they understand how all the pieces work together.
            </p>
        </div>
      </section>
      <hr className="border-border-light dark:border-border-medium my-8" />
      <div className={`prose dark:prose-invert max-w-none text-text-secondary space-y-4 text-center
                        prose-p:font-primary prose-p:text-xl prose-p:text-text-primary`}>
        <p>
            <em>Making things that last, with intention.</em>
        </p>
      </div>
    </div>
  );
};
