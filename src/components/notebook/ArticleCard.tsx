
// src/components/notebook/ArticleCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../types';
import { Card } from '../ui/Card'; 
import { Button } from '../ui/Button';
import { ARTICLE_PLACEHOLDER_IMAGE, AREUM_ACCENT_COLOR } from '../../constants'; 
import { formatDate } from '../../utils/formatters';
import { TagIcon } from '@heroicons/react/24/outline';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card hoverEffect className="flex flex-col h-full">
      <Link to={`/notebook/${article.slug}`} className="flex flex-col flex-grow">
        {article.imageUrl && 
          <img 
            src={article.imageUrl || ARTICLE_PLACEHOLDER_IMAGE.replace('{seed}', article.slug)} 
            alt={article.title} 
            className="w-full h-56 object-cover"
          />
        }
        <div className="p-6 flex flex-col flex-grow">
          <span className={`text-xs text-${AREUM_ACCENT_COLOR} dark:text-${AREUM_ACCENT_COLOR} uppercase font-semibold`}>{article.category}</span>
          <h3 className="font-primary text-xl font-semibold text-text-primary mt-1 mb-2 flex-grow">{article.title}</h3>
          <p className="text-sm text-text-secondary line-clamp-3 mb-3">{article.teaser}</p>
          <div className="text-xs text-text-muted mb-3">
              Published: {formatDate(article.publishedDate)}
          </div>
          {article.tags && article.tags.length > 0 && (
              <div className="mb-3">
                  {article.tags.slice(0,3).map(tag => (
                      <span 
                        key={tag} 
                        className="inline-block bg-bg-accent rounded-full px-2 py-0.5 text-xs font-medium text-text-secondary mr-1 mb-1"
                      >
                          <TagIcon className="h-3 w-3 inline mr-1" />{tag}
                      </span>
                  ))}
              </div>
          )}
          <Button variant="ghost" size="sm" className="mt-auto self-start">Read More</Button>
        </div>
      </Link>
    </Card>
  );
};
