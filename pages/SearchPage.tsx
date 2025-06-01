
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Card } from '../components/ui/Card';
import { patternsData } from '../data/patternsData';
import { articlesData } from '../data/articlesData';
import { learningPathsData } from '../data/learningPathsData';
import { Pattern, Article, LearningPath } from '../types';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, ArrowRightIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { Button } from '../components/ui/Button';
import { AREUM_ACCENT_COLOR, PATTERN_PLACEHOLDER_IMAGE, ARTICLE_PLACEHOLDER_IMAGE } from '../constants';

type SearchResultItem = 
  | ({ type: 'pattern' } & Pattern)
  | ({ type: 'article' } & Article)
  | ({ type: 'learningPath' } & LearningPath);

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || "";
  const [searchTerm, setSearchTerm] = useState<string>(query);
  const [filterByType, setFilterByType] = useState<string>("all"); 

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const lowerSearchTerm = searchTerm.toLowerCase();
    const results: SearchResultItem[] = [];

    if (filterByType === "all" || filterByType === "patterns") {
        patternsData.forEach(p => {
        if (
            p.title.toLowerCase().includes(lowerSearchTerm) ||
            p.areumNote?.toLowerCase().includes(lowerSearchTerm) ||
            p.skillTags.some(tag => tag.toLowerCase().includes(lowerSearchTerm)) ||
            p.garmentType.toLowerCase().includes(lowerSearchTerm)
        ) {
            results.push({ ...p, type: 'pattern' });
        }
        });
    }
    
    if (filterByType === "all" || filterByType === "articles") {
        articlesData.forEach(a => {
        if (
            a.title.toLowerCase().includes(lowerSearchTerm) ||
            a.teaser.toLowerCase().includes(lowerSearchTerm) ||
            a.category.toLowerCase().includes(lowerSearchTerm) ||
            a.tags?.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
        ) {
            results.push({ ...a, type: 'article' });
        }
        });
    }

    if (filterByType === "all" || filterByType === "learningPaths") {
        learningPathsData.forEach(lp => {
        if (
            lp.title.toLowerCase().includes(lowerSearchTerm) ||
            lp.intro.toLowerCase().includes(lowerSearchTerm) ||
            lp.focusAndLevel.toLowerCase().includes(lowerSearchTerm)
        ) {
            results.push({ ...lp, type: 'learningPath' });
        }
        });
    }
    
    results.sort((a, b) => {
        const aTitleMatch = a.title.toLowerCase().includes(lowerSearchTerm);
        const bTitleMatch = b.title.toLowerCase().includes(lowerSearchTerm);
        if (aTitleMatch && !bTitleMatch) return -1;
        if (!aTitleMatch && bTitleMatch) return 1;
        return 0;
    });

    return results;
  }, [searchTerm, filterByType]);
  
  useEffect(() => {
    setSearchTerm(query); 
  }, [query]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };


  return (
    <div>
      <SectionTitle title={searchTerm ? `Search Results for "${searchTerm}"` : "Search Areum Knits"} />
      
      <form onSubmit={handleSearchSubmit} className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearchInputChange}
            placeholder="Find something specific..."
            className={`w-full pl-10 pr-4 py-3 border border-border-medium dark:border-border-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-${AREUM_ACCENT_COLOR} dark:focus:ring-${AREUM_ACCENT_COLOR} focus:border-transparent bg-bg-primary dark:bg-bg-secondary text-text-primary`}
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-text-muted absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </form>

      <div className="flex justify-center space-x-2 mb-8">
        {(['all', 'patterns', 'articles', 'learningPaths'] as const).map(type => (
            <Button
                key={type}
                onClick={() => setFilterByType(type)}
                variant={filterByType === type ? 'primary' : 'outline'}
                size="sm"
            >
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
        ))}
      </div>

      {searchTerm.trim() && searchResults.length === 0 && (
        <div className="text-center py-12">
          <AdjustmentsHorizontalIcon className="h-16 w-16 text-text-light mx-auto mb-4" />
          <p className="text-xl text-text-secondary">Sorry, no results found for "{searchTerm}".</p>
          <p className="text-sm text-text-muted mt-2">Try a different search term, or explore popular sections:</p>
          <div className="mt-6 flex justify-center space-x-3">
            <Button to="/patterns" variant="primary" size="sm">Browse Patterns</Button>
            <Button to="/notebook" variant="primary" size="sm">Explore Notebook</Button>
          </div>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="space-y-6">
          {searchResults.map((item) => (
            <Card key={`${item.type}-${item.id}`} className="p-4 sm:p-6">
              <Link to={
                  item.type === 'pattern' ? `/patterns/${item.slug}` :
                  item.type === 'article' ? `/notebook/${item.slug}` :
                  item.type === 'learningPath' ? `/learning-paths#${item.slug}` : '#'
              }>
                <div className="flex flex-col sm:flex-row gap-4">
                    {item.type === 'pattern' && item.imageUrl && (
                         <img src={item.imageUrl || PATTERN_PLACEHOLDER_IMAGE.replace('{seed}', item.slug)} alt={item.title} className="w-full sm:w-32 h-32 object-cover rounded-md flex-shrink-0" />
                    )}
                    {item.type === 'article' && item.imageUrl && (
                         <img src={item.imageUrl || ARTICLE_PLACEHOLDER_IMAGE.replace('{seed}', item.slug)} alt={item.title} className="w-full sm:w-32 h-32 object-cover rounded-md flex-shrink-0" />
                    )}
                     {item.type === 'learningPath' && ( 
                         <div className={`w-full sm:w-32 h-32 bg-${AREUM_ACCENT_COLOR}/10 dark:bg-${AREUM_ACCENT_COLOR}/20 flex items-center justify-center rounded-md flex-shrink-0`}>
                            <AcademicCapIcon className={`h-12 w-12 text-${AREUM_ACCENT_COLOR} dark:text-${AREUM_ACCENT_COLOR}`} />
                         </div>
                    )}
                  <div>
                    <span className={`text-xs font-semibold uppercase text-${AREUM_ACCENT_COLOR} dark:text-${AREUM_ACCENT_COLOR}`}>{item.type}</span>
                    <h3 className="font-primary text-xl font-semibold text-text-primary mt-1 mb-1 hover:underline">{item.title}</h3>
                    <p className="text-sm text-text-secondary line-clamp-2">
                      {item.type === 'pattern' && item.areumNote}
                      {item.type === 'article' && item.teaser}
                      {item.type === 'learningPath' && item.intro}
                    </p>
                     <span className={`inline-flex items-center text-sm text-${AREUM_ACCENT_COLOR} dark:text-${AREUM_ACCENT_COLOR} mt-2 group`}>
                        View Details <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
