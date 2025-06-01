
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle } from '../../components/ui/SectionTitle'; 
import { Card } from '../../components/ui/Card'; 
import { Button } from '../../components/ui/Button'; 
import { ArticleCard } from '../../components/notebook/ArticleCard'; 
import { articlesData } from '../../data/articlesData'; 
import { Article, SortOption } from '../../types'; 
import { AREUM_ACCENT_COLOR } from '../../constants'; // This is 'accent-clay'
import { TagIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';


const sortOptions: SortOption[] = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Title A-Z", value: "a-z" },
];

export const NotebookPage: React.FC = () => {
  const [currentSort, setCurrentSort] = useState<string>("newest");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => Array.from(new Set(articlesData.map(a => a.category))), []);

  const filteredAndSortedArticles = useMemo(() => {
    let processedArticles = articlesData;

    if (selectedCategory) {
      processedArticles = processedArticles.filter(a => a.category === selectedCategory);
    }

    switch (currentSort) {
      case "oldest":
        processedArticles.sort((a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime());
        break;
      case "a-z":
        processedArticles.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "newest":
      default:
        processedArticles.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
        break;
    }
    return processedArticles;
  }, [selectedCategory, currentSort]);

  const editorsPicks = articlesData.filter(a => a.isEditorsPick).slice(0, 3);
  const readingSeries = useMemo(() => {
    const seriesMap: Record<string, Article[]> = {};
    articlesData.forEach(article => {
      if (article.series) {
        if (!seriesMap[article.series]) seriesMap[article.series] = [];
        seriesMap[article.series].push(article);
      }
    });
    return Object.entries(seriesMap);
  }, []);


  return (
    <div className="space-y-12">
      <SectionTitle 
        title="My Knitting Journal & Discoveries" 
        subtitle="This is where I jot down my thoughts, experiments, and the little discoveries I make about knitting, yarn, design, and the tools that help bring ideas to life. Think of it as my open journal – I hope you find something useful or inspiring here!" 
      />

      {editorsPicks.length > 0 && (
        <section>
          <h3 className={`font-primary text-2xl text-text-primary mb-4`}>Editor's Picks / Start Here</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {editorsPicks.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {readingSeries.length > 0 && (
        <section>
          <h3 className={`font-primary text-2xl text-text-primary mb-4`}>Reading Series / Collections</h3>
          {readingSeries.map(([seriesName, articlesInSeries]) => (
            <div key={seriesName} className="mb-8 p-4 bg-bg-accent rounded-lg">
              <h4 className={`font-primary text-xl font-semibold text-${AREUM_ACCENT_COLOR} dark:text-${AREUM_ACCENT_COLOR} mb-3`}>{seriesName}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {articlesInSeries.slice(0,4).map(article => ( 
                  <Card key={article.id} hoverEffect className="text-sm">
                    <Link to={`/notebook/${article.slug}`}>
                      <div className="p-3">
                        <h5 className="font-semibold text-text-primary mb-1 line-clamp-2">{article.title}</h5>
                        <p className="text-xs text-text-muted line-clamp-2">{article.teaser}</p>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
      
      <section>
        <h3 className={`font-primary text-2xl text-text-primary mb-6`}>All Journal Entries</h3>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                <Button 
                    onClick={() => setSelectedCategory(null)} 
                    variant={!selectedCategory ? 'primary' : 'outline'} 
                    size="sm"
                    className="flex-shrink-0"
                >
                    All
                </Button>
                {categories.map(cat => (
                    <Button 
                        key={cat} 
                        onClick={() => setSelectedCategory(cat)}
                        variant={selectedCategory === cat ? 'primary' : 'outline'}
                        size="sm"
                        className="flex-shrink-0"
                    >
                        {cat}
                    </Button>
                ))}
            </div>
            <div className="flex items-center space-x-2 self-end sm:self-center">
              <label htmlFor="sort-articles" className="text-sm text-text-secondary">Sort by:</label>
              <select
                id="sort-articles"
                value={currentSort}
                onChange={(e) => setCurrentSort(e.target.value)}
                className={`block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-border-medium bg-bg-primary text-text-primary focus:outline-none focus:ring-${AREUM_ACCENT_COLOR} focus:border-${AREUM_ACCENT_COLOR} rounded-md`}
              >
                {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
        </div>

        {filteredAndSortedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <AdjustmentsHorizontalIcon className="h-16 w-16 text-text-light mx-auto mb-4" />
            <p className="text-xl text-text-secondary">No articles match your current selection.</p>
            {selectedCategory && <p className="text-sm text-text-muted mt-2">Try a different category or view all articles.</p>}
          </div>
        )}
      </section>
    </div>
  );
};
