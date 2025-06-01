
import React from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle } from '../../components/ui/SectionTitle'; 
import { Button } from '../../components/ui/Button'; 
import { Card } from '../../components/ui/Card'; 
import { PatternCard } from '../../components/patterns/PatternCard'; 
import { ArticleCard } from '../../components/notebook/ArticleCard'; 
import { patternsData } from '../../data/patternsData'; 
import { articlesData } from '../../data/articlesData'; 
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { AREUM_ACCENT_COLOR } from '../../constants'; // This is 'accent-clay'


export const HomePage: React.FC = () => {
  const favoritePatterns = patternsData.slice(0, 3); 
  const featuredArticles = articlesData.filter(a => a.isEditorsPick).slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 bg-bg-accent rounded-lg shadow-inner">
        <div className="container mx-auto px-4">
          <img 
            src="https://picsum.photos/seed/areum-profile/200/200" 
            alt="Areum" 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-6 shadow-lg border-4 border-bg-secondary dark:border-border-medium" // Changed dark border for better contrast
          />
          <h1 className="font-primary text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Hi, I’m Areum.
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-6 max-w-3xl mx-auto">
            I believe every skein of yarn holds a story. Let’s explore them together. Here, I share my designs, my notes from countless hours of swatching and material experiments, and the quiet engineering that goes into making knitwear that feels just right.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button to="/patterns" variant="primary" size="lg" rightIcon={ArrowRightIcon}>
              See My Patterns
            </Button>
            <Button to="/notebook" variant="outline" size="lg" rightIcon={ArrowRightIcon}>
              Read My Notebook
            </Button>
          </div>
        </div>
      </section>

      {/* From My Studio Desk */}
      <section>
        <SectionTitle title="From My Studio Desk" subtitle="Currently on My Needles..." alignment="left" />
        <Card className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <img 
            src="https://picsum.photos/seed/studio-desk/400/300" 
            alt="Yarn, swatches, and notebook on a desk" 
            className="w-full md:w-1/3 h-auto rounded-lg shadow-md object-cover"
          />
          <div className="md:w-2/3">
            <p className="text-text-secondary mb-4">
              This week, I’ve been completely lost in the way this high-twist Bluefaced Leicester is plumping up in a 2x2 rib. I’m aiming for a cardigan that feels structured yet incredibly soft – a tricky balance! I'm documenting every swatch and tweak in my notebook...
            </p>
            <Button to="/notebook/design-process-cardigan" variant="primary" rightIcon={ArrowRightIcon}> 
              Read the full design note
            </Button>
          </div>
        </Card>
      </section>

      {/* A Few Favorite Designs */}
      <section>
        <SectionTitle title="A Few Favorite Designs" subtitle="Patterns That Let the Yarn Speak" alignment="left" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoritePatterns.map((pattern) => (
            <PatternCard key={pattern.id} pattern={pattern} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button to="/patterns" variant="outline" size="lg" rightIcon={ArrowRightIcon}>
            Browse All My Patterns
          </Button>
        </div>
      </section>

      {/* Fresh from My Notebook */}
      <section>
        <SectionTitle title="Fresh from My Notebook" subtitle="Notes & Musings on Yarn & Knitting" alignment="left" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
             <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button to="/notebook" variant="outline" size="lg" rightIcon={ArrowRightIcon}>
            Explore My Full Notebook
          </Button>
        </div>
      </section>
    </div>
  );
};
