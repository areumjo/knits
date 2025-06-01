
// src/components/patterns/PatternCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Pattern } from '../../types';
import { Card } from '../ui/Card'; 
import { PATTERN_PLACEHOLDER_IMAGE } from '../../constants';

interface PatternCardProps {
  pattern: Pattern;
}

export const PatternCard: React.FC<PatternCardProps> = ({ pattern }) => {
  return (
    <Card hoverEffect={true} className="flex flex-col h-full">
      <Link to={`/patterns/${pattern.slug}`} className="flex flex-col flex-grow">
        <img 
          src={pattern.imageUrl || PATTERN_PLACEHOLDER_IMAGE.replace('{seed}', pattern.slug)} 
          alt={pattern.title} 
          className="w-full h-72 object-cover" 
        />
        <div className="p-4 flex flex-col flex-grow">
          <h3 className={`font-primary text-xl font-semibold text-text-primary mb-1`}>{pattern.title}</h3>
          <p className="text-xs text-text-muted mb-2">
            {pattern.garmentType} &bull; {pattern.skillLevel}
          </p>
          <p className="text-sm text-text-secondary line-clamp-2 mb-2 flex-grow">
            {pattern.areumNote || "A lovely pattern by Areum."}
          </p>
          {pattern.skillTags && pattern.skillTags.length > 0 && (
            <div className="text-xs space-x-1 mt-auto pt-2">
              {pattern.skillTags.slice(0, 2).map(tag => (
                <span 
                  key={tag} 
                  className="bg-bg-accent px-2 py-0.5 rounded-full text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
};
