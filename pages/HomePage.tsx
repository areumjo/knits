import React from 'react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { patternsData } from '../data/patternsData';
import { articlesData } from '../data/articlesData';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { PATTERN_PLACEHOLDER_IMAGE } from '../constants';

export const HomePage: React.FC = () => {

  const meridianCardigan = patternsData.find(p => p.slug === "olsen-cardigan") || patternsData[0];
  const weekendPullover = patternsData.find(p => p.slug === "city-stroll-sweater") || patternsData[1];
  const coastalWrap = patternsData.find(p => p.slug === "meadowsweet-shawl") || patternsData[2];

  const yarnSubArticle = articlesData.find(a => a.slug === "yarn-substitution-guide") || articlesData[0];
  const gaugeSwatchArticle = articlesData.find(a => a.slug === "mastering-tension") || articlesData[1]; // Closest existing for "Reading Your Gauge Swatch"

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-16 bg-bg-accent dark:bg-bg-accent rounded-lg shadow-inner">
        <div className="container mx-auto px-4">
          <img
            src="https://picsum.photos/seed/areum-hands-knitting/1200/400"
            alt="Areum's hands working on a complex cable pattern, focused and absorbed"
            className="w-full h-56 sm:h-64 md:h-80 object-cover rounded-lg mx-auto mb-10 shadow-lg"
          />
          <h1 className="font-primary text-4xl md:text-5xl font-bold text-text-primary mb-2">
            Hi, I'm Areum.
          </h1>
          <h2 className="font-primary text-2xl md:text-3xl text-text-secondary mb-6">
            I design knitwear and think too much about yarn.
          </h2>
          <div className="text-lg text-text-secondary mb-6 max-w-3xl mx-auto space-y-4">
            <p>
              I design for knitters who like to know why things work—not just how to make them. This is part pattern shop, part design journal, part learning space. Alongside each pattern, I share the thought process behind it—how it's constructed, how it fits, how different yarns change the feel.
            </p>
            <p>
              Knitting is where creativity and engineering meet. That's the part I love most, and what I want to share with other knitters who enjoy digging a little deeper.
            </p>
          </div>
        </div>
      </section>

      {/* Current Focus Section */}
      <section>
        <SectionTitle title="Current Focus" alignment="left" />
        <Card className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
            <img
              src="https://picsum.photos/seed/current-project-sketches/400/300"
              alt="Close-up of current project with design sketches"
              className="w-full md:w-1/3 h-auto rounded-lg shadow-md object-cover"
            />
            <div className="md:w-2/3">
              <p className="text-text-secondary mb-2 italic">
                "Currently working through the mathematics of this sleeve cap. The decreases need to mirror the shoulder line perfectly, but the yarn has more memory than I accounted for."
              </p>
              <p className="text-xs text-text-muted mb-4">March 15, 2025</p>
              <h4 className="font-primary text-xl font-semibold text-text-primary mb-2">The Details</h4>
              <p className="text-text-secondary mb-3">
                I'm using a high-twist single from a local mill—gorgeous hand, but it springs back differently than the plied yarn I tested with. The original decrease rate creates puckering at the armpit seam. I'm documenting three different approaches: adjusting the rate, changing the decrease method, or switching to short rows for the cap shaping.
              </p>
              <p className="text-text-secondary mb-6">
                This is exactly the kind of problem-solving that fascinates me. Same pattern, different yarn behavior, completely different solutions needed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button to="/notebook/sleeve-cap-design-notes" variant="primary" rightIcon={ArrowRightIcon}>
                  Read the full process notes
                </Button>
                <Button to="/notebook/sleeve-cap-design-notes#mathematics" variant="outline" rightIcon={ArrowRightIcon}>
                  See the math
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Recent Work Section */}
      <section>
        <SectionTitle title="Recent Work" alignment="left" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 flex flex-col">
            <img src={meridianCardigan.imageUrl || PATTERN_PLACEHOLDER_IMAGE.replace('{seed}', 'meridian-cardigan')} alt="The Meridian Cardigan" className="w-full h-64 object-cover rounded-md mb-4"/>
            <h3 className="font-primary text-xl font-semibold text-text-primary mb-1">The Meridian Cardigan</h3>
            <p className="text-sm text-text-muted italic mb-2">Worsted weight merino. Seamless construction with engineered shoulder shaping.</p>
            <p className="text-sm text-text-secondary mb-3 flex-grow">"The challenge was creating structure without bulk. I developed a modified raglan that distributes ease differently across the back—the math took weeks to work out, but the fit is transformative."</p>
            <Button to={`/patterns/${meridianCardigan.slug}`} variant="ghost" size="sm" rightIcon={ArrowRightIcon} className="self-start mt-auto">Pattern + construction notes</Button>
          </Card>

          <Card className="p-6 flex flex-col">
            <img src={weekendPullover.imageUrl || PATTERN_PLACEHOLDER_IMAGE.replace('{seed}', 'weekend-pullover')} alt="Weekend Pullover" className="w-full h-64 object-cover rounded-md mb-4"/>
            <h3 className="font-primary text-xl font-semibold text-text-primary mb-1">Weekend Pullover</h3>
            <p className="text-sm text-text-muted italic mb-2">DK cotton blend. Designed around the yarn's drape characteristics.</p>
            <p className="text-sm text-text-secondary mb-3 flex-grow">"Cotton wants to hang straight down, so I worked with that instead of fighting it. The waist shaping uses strategically placed darts rather than traditional side shaping—much cleaner lines."</p>
            <Button to={`/patterns/${weekendPullover.slug}#shaping`} variant="ghost" size="sm" rightIcon={ArrowRightIcon} className="self-start mt-auto">See the shaping technique</Button>
          </Card>

          <Card className="p-6 flex flex-col">
            <img src={coastalWrap.imageUrl || PATTERN_PLACEHOLDER_IMAGE.replace('{seed}', 'coastal-wrap')} alt="Coastal Wrap" className="w-full h-64 object-cover rounded-md mb-4"/>
            <h3 className="font-primary text-xl font-semibold text-text-primary mb-1">Coastal Wrap</h3>
            <p className="text-sm text-text-muted italic mb-2">Fingering mohair silk. Structure that works with the fiber's halo.</p>
            <p className="text-sm text-text-secondary mb-3 flex-grow">"Mohair silk is tricky—too much structure kills the drape, too little and it's shapeless. This uses a modular construction that creates definition without rigid seaming."</p>
            <Button to={`/patterns/${coastalWrap.slug}#engineering`} variant="ghost" size="sm" rightIcon={ArrowRightIcon} className="self-start mt-auto">How I approached the engineering</Button>
          </Card>
        </div>
        <div className="mt-8 text-center">
          <Button to="/patterns" variant="outline" size="lg" rightIcon={ArrowRightIcon}>
            Browse All My Patterns
          </Button>
        </div>
      </section>

      {/* From My Notebook Section */}
      <section>
        <SectionTitle title="From My Notebook" alignment="left" />
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <img
              src="https://picsum.photos/seed/notebook-flatlay/400/500"
              alt="Open notebook with sketches, yarn samples, and calculations"
              className="w-full h-auto md:h-[480px] lg:h-[520px] object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-2/3 space-y-6">
            <div>
              <h3 className="font-primary text-xl font-semibold text-text-primary">On Yarn Substitution</h3>
              <p className="text-sm text-text-muted italic mb-1">Why fiber preparation matters more than weight</p>
              <p className="text-sm text-text-secondary mb-2">"Most knitters focus on yarn weight when substituting, but preparation method—how the fiber was spun—affects everything from stitch definition to finished drape. I break down woolen vs. worsted prep, singles vs. plied, and how each changes your fabric."</p>
              <Button to={`/notebook/${yarnSubArticle.slug}`} variant="ghost" size="sm" rightIcon={ArrowRightIcon} className="self-start">Read the full analysis</Button>
            </div>
            <div>
              <h3 className="font-primary text-xl font-semibold text-text-primary">Reading Your Gauge Swatch</h3>
              <p className="text-sm text-text-muted italic mb-1">What your sample is actually telling you</p>
              <p className="text-sm text-text-secondary mb-2">"Your swatch contains information about row gauge, fabric memory, blocking behavior, and yarn elasticity—not just stitch count. Here's how to decode what it's really saying about your finished garment."</p>
              <Button to={`/notebook/${gaugeSwatchArticle.slug}`} variant="ghost" size="sm" rightIcon={ArrowRightIcon} className="self-start">See the complete guide</Button>
            </div>
            <div>
              <h3 className="font-primary text-xl font-semibold text-text-primary">The Case for Seaming</h3>
              <p className="text-sm text-text-muted italic mb-1">When construction matters more than convenience</p>
              <p className="text-sm text-text-secondary mb-2">"Seamless isn't always better. Sometimes a seamed construction gives you better fit, longer-lasting shape, or more design possibilities. I walk through when to choose seaming and how to make it beautiful."</p>
              <Button to="/notebook/case-for-seaming" variant="ghost" size="sm" rightIcon={ArrowRightIcon} className="self-start">Explore the construction comparison</Button>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Button to="/notebook" variant="outline" size="lg" rightIcon={ArrowRightIcon}>
            Browse All Notebook Entries
          </Button>
        </div>
      </section>

      {/* Studio Space Section */}
      <section className="bg-bg-accent dark:bg-bg-accent rounded-lg shadow-inner py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <img
            src="https://picsum.photos/seed/areum-studio-wide/1000/400"
            alt="Areum's organized but lived-in workspace with beautiful yarns and tools"
            className="w-full md:w-3/4 lg:w-2/3 max-h-[350px] object-cover rounded-lg mx-auto mb-8 shadow-lg"
          />
          <p className="font-primary text-2xl md:text-3xl text-text-primary max-w-2xl mx-auto">
            "I keep detailed notes on everything I make. The successes, the failures, the 'what if I tried this instead' moments. Other knitters seem to find these useful."
          </p>
        </div>
      </section>

      {/* Learning Together Section */}
      <section>
        <SectionTitle title="Learning Together" subtitle="For knitters who want to understand the why behind the how." alignment="center" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <Card className="p-6 flex flex-col">
            <img src="https://picsum.photos/seed/swatch-progression/600/400" alt="Collection of swatches showing progression of a technique" className="w-full h-56 object-cover rounded-md mb-4"/>
            <h3 className="font-primary text-xl font-semibold text-text-primary mb-1">Seamless Sweater Construction</h3>
            <p className="text-sm text-text-secondary mb-3 flex-grow">"Start with a basic top-down pullover, progress to raglan shaping, finish with a complex cardigan. Each pattern includes detailed construction notes explaining not just what to do, but why each choice creates better fit and finish."</p>
            <Button to="/learning-paths/seamless-sweaters-101" variant="ghost" size="sm" rightIcon={ArrowRightIcon} className="self-start mt-auto">See the progression</Button>
          </Card>
          <Card className="p-6 flex flex-col">
            <img src="https://picsum.photos/seed/advanced-shaping-tech/600/400" alt="Examples of advanced shaping techniques in knitwear" className="w-full h-56 object-cover rounded-md mb-4"/>
            <h3 className="font-primary text-xl font-semibold text-text-primary mb-1">Advanced Shaping Techniques</h3>
            <p className="text-sm text-text-secondary mb-3 flex-grow">"Explore bust darts, waist shaping, short row shoulders, and German short rows. Two fitted patterns paired with technique deep-dives that show you how shaping creates the silhouette you want."</p>
            <Button to="/learning-paths/advanced-shaping-techniques" variant="ghost" size="sm" rightIcon={ArrowRightIcon} className="self-start mt-auto">Explore the techniques</Button>
          </Card>
        </div>
        <div className="mt-8 text-center">
          <Button to="/learning-paths" variant="outline" size="lg" rightIcon={ArrowRightIcon}>
            Browse All Learning Paths
          </Button>
        </div>
      </section>
    </div>
  );
};
