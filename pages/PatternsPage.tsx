
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { patternsData } from '../data/patternsData';
import { Pattern, GarmentType, ConstructionType, SkillLevel, YarnWeight, FilterCategory, FilterOption, SortOption } from '../types';
import { AREUM_ACCENT_COLOR, PATTERN_PLACEHOLDER_IMAGE } from '../constants';
import { AdjustmentsHorizontalIcon, ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline';

const initialFilters: Record<string, string[]> = {
  garmentType: [],
  construction: [],
  skillLevel: [],
  yarnWeight: [],
};

const filterCategories: FilterCategory[] = [
  { id: 'garmentType', name: 'Garment Type', options: Object.values(GarmentType).map(v => ({ label: v, value: v })), type: 'checkbox' },
  { id: 'construction', name: 'Construction', options: Object.values(ConstructionType).map(v => ({ label: v, value: v })), type: 'checkbox' },
  { id: 'skillLevel', name: 'Skill Level', options: Object.values(SkillLevel).map(v => ({ label: v, value: v })), type: 'checkbox' },
  { id: 'yarnWeight', name: 'Yarn Weight', options: Object.values(YarnWeight).map(v => ({ label: v, value: v })), type: 'checkbox' },
];

const sortOptions: SortOption[] = [
  { label: "Newest", value: "newest" },
  { label: "A-Z", value: "a-z" },
  { label: "Skill Level (Asc)", value: "skill-asc" },
  { label: "Skill Level (Desc)", value: "skill-desc" },
];

const skillLevelOrder = Object.values(SkillLevel);


export const PatternsPage: React.FC = () => {
  const [filters, setFilters] = useState<Record<string, string[]>>(initialFilters);
  const [currentSort, setCurrentSort] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (categoryId: string, value: string) => {
    setFilters(prev => {
      const currentCategoryFilters = prev[categoryId] || [];
      const newCategoryFilters = currentCategoryFilters.includes(value)
        ? currentCategoryFilters.filter(item => item !== value)
        : [...currentCategoryFilters, value];
      return { ...prev, [categoryId]: newCategoryFilters };
    });
  };

  const filteredAndSortedPatterns = useMemo(() => {
    let processedPatterns = patternsData.filter(pattern => {
      return Object.entries(filters).every(([key, selectedValues]) => {
        if (selectedValues.length === 0) return true;
        const patternValue = pattern[key as keyof Pattern];
        if (Array.isArray(patternValue)) { // For skillTags
          return selectedValues.some(sv => (patternValue as string[]).includes(sv));
        }
        return selectedValues.includes(patternValue as string);
      });
    });

    switch (currentSort) {
      case "a-z":
        processedPatterns.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "skill-asc":
        processedPatterns.sort((a, b) => skillLevelOrder.indexOf(a.skillLevel) - skillLevelOrder.indexOf(b.skillLevel));
        break;
      case "skill-desc":
        processedPatterns.sort((a, b) => skillLevelOrder.indexOf(b.skillLevel) - skillLevelOrder.indexOf(a.skillLevel));
        break;
      case "newest":
      default:
        processedPatterns.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
        break;
    }
    return processedPatterns;
  }, [filters, currentSort]);

  const spotlightPattern = patternsData.find(p => p.isSpotlight);

  return (
    <div className="space-y-12">
      <SectionTitle title="My Pattern Library" subtitle="Each design here starts with a love for a particular yarn or a curiosity about a specific technique. I hope you find something that sparks your own creativity." />

      {spotlightPattern && (
        <section className="mb-12 p-6 bg-bg-accent dark:bg-bg-accent rounded-lg shadow-lg">
          <h3 className={`font-primary text-2xl text-text-primary mb-3`}>Pattern Spotlight</h3>
          <div className="flex flex-col md:flex-row gap-6">
            <img src={spotlightPattern.imageUrl} alt={spotlightPattern.title} className="w-full md:w-1/3 h-auto object-cover rounded-md" />
            <div>
              <h4 className={`font-primary text-xl font-semibold text-${AREUM_ACCENT_COLOR} dark:text-${AREUM_ACCENT_COLOR} mb-2`}>{spotlightPattern.title}</h4>
              <p className="text-sm text-text-secondary mb-3">{spotlightPattern.areumNote || "A special featured pattern."}</p>
              <Button to={`/patterns/${spotlightPattern.slug}`} variant="primary">View Pattern</Button>
            </div>
          </div>
        </section>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={`md:w-1/4 ${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="sticky top-24 space-y-6 p-4 bg-bg-secondary dark:bg-bg-secondary rounded-lg shadow">
            <h3 className={`font-primary text-lg font-semibold text-text-primary flex items-center justify-between`}>
              Find Your Next Project
              <button onClick={() => setShowFilters(false)} className="md:hidden text-text-muted hover:text-text-primary dark:hover:text-text-primary">
                <ChevronDownIcon className="h-5 w-5" />
              </button>
            </h3>
            {filterCategories.map(category => (
              <div key={category.id}>
                <h4 className="font-semibold text-text-secondary mb-2">{category.name}</h4>
                <ul className="space-y-1">
                  {category.options.map(option => (
                    <li key={option.value}>
                      <label className="flex items-center space-x-2 text-sm text-text-secondary cursor-pointer">
                        <input
                          type="checkbox"
                          className={`form-checkbox h-4 w-4 text-${AREUM_ACCENT_COLOR} rounded border-border-medium dark:border-border-medium bg-bg-primary dark:bg-bg-primary focus:ring-${AREUM_ACCENT_COLOR} dark:focus:ring-${AREUM_ACCENT_COLOR} dark:checked:bg-${AREUM_ACCENT_COLOR} dark:checked:border-${AREUM_ACCENT_COLOR}`}
                          checked={filters[category.id]?.includes(option.value) || false}
                          onChange={() => handleFilterChange(category.id, option.value)}
                        />
                        <span>{option.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
             <Button onClick={() => setFilters(initialFilters)} variant="outline" className="w-full text-sm">
                Clear Filters
            </Button>
          </div>
        </aside>

        {/* Main Content - Patterns Grid */}
        <main className="md:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <button 
              onClick={() => setShowFilters(!showFilters)} 
              className={`md:hidden flex items-center space-x-2 px-4 py-2 border border-border-medium dark:border-border-medium rounded-md text-text-secondary hover:bg-bg-accent dark:hover:bg-bg-accent`}
            >
              <FunnelIcon className="h-5 w-5" />
              <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
            </button>
            <div className="flex items-center space-x-2">
              <label htmlFor="sort-patterns" className="text-sm text-text-secondary">Sort by:</label>
              <select
                id="sort-patterns"
                value={currentSort}
                onChange={(e) => setCurrentSort(e.target.value)}
                className={`block w-full sm:w-auto pl-3 pr-10 py-2 text-base bg-bg-primary border-border-medium dark:bg-bg-primary dark:text-text-primary dark:border-border-medium focus:outline-none focus:ring-${AREUM_ACCENT_COLOR} dark:focus:ring-${AREUM_ACCENT_COLOR} focus:border-${AREUM_ACCENT_COLOR} dark:focus:border-${AREUM_ACCENT_COLOR} rounded-md`}
              >
                {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
          </div>

          {filteredAndSortedPatterns.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedPatterns.map((pattern) => (
                <Card key={pattern.id} hoverEffect={true}>
                  <Link to={`/patterns/${pattern.slug}`}>
                    <img src={pattern.imageUrl || PATTERN_PLACEHOLDER_IMAGE.replace('{seed}', pattern.slug)} alt={pattern.title} className="w-full h-72 object-cover" />
                    <div className="p-4">
                      <h3 className={`font-primary text-lg font-semibold text-text-primary mb-1`}>{pattern.title}</h3>
                      <p className="text-xs text-text-muted mb-2">{pattern.garmentType} &bull; {pattern.skillLevel}</p>
                      <p className="text-sm text-text-secondary line-clamp-2 mb-2">{pattern.areumNote || "A lovely pattern by Areum."}</p>
                      <div className="text-xs space-x-1">
                        {pattern.skillTags.slice(0,2).map(tag => <span key={tag} className="bg-bg-accent dark:bg-bg-accent px-2 py-0.5 rounded-full text-text-secondary">{tag}</span>)}
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <AdjustmentsHorizontalIcon className="h-16 w-16 text-text-light mx-auto mb-4" />
              <p className="text-xl text-text-secondary">No patterns match your current filters.</p>
              <p className="text-sm text-text-muted mt-2">Try adjusting your search or clearing filters.</p>
            </div>
          )}
        </main>
      </div>
       <div className="mt-12 text-center p-6 bg-bg-accent dark:bg-bg-accent rounded-lg">
          <h3 className={`font-primary text-xl text-text-primary mb-2`}>Looking for a guided experience?</h3>
          <p className="text-text-secondary mb-4">Explore Learning Paths to deepen your skills and understanding with curated patterns and articles.</p>
          <Button to="/learning-paths" variant="primary">Explore Learning Paths</Button>
        </div>
    </div>
  );
};
