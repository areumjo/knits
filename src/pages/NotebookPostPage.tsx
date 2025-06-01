
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { articlesData } from '../../data/articlesData'; 
import { NotFoundPage } from './NotFoundPage'; 
import { AREUM_ACCENT_COLOR } from '../../constants'; 
import { CalendarIcon, TagIcon, PencilIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button'; 
import { formatDate } from '../../utils/formatters'; 

export const NotebookPostPage: React.FC = () => {
  const { postSlug } = useParams<{ postSlug: string }>();
  const article = articlesData.find(a => a.slug === postSlug);

  if (!article) {
    return <NotFoundPage />;
  }

  const relatedArticles = articlesData
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto">
      <Button to="/notebook" variant="ghost" size="sm" leftIcon={ArrowLeftIcon} className="mb-6">
        Back to Notebook
      </Button>
      <article className="bg-bg-secondary p-6 sm:p-8 rounded-lg shadow-xl">
        <header className="mb-8 border-b border-border-light pb-6">
          <p className={`text-sm font-semibold uppercase text-${AREUM_ACCENT_COLOR} dark:text-${AREUM_ACCENT_COLOR} mb-2`}>
            {article.category} {article.series && `| ${article.series}`}
          </p>
          <h1 className="font-primary text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-3">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center text-xs sm:text-sm text-text-muted space-x-4">
            <span className="flex items-center">
              <PencilIcon className="h-4 w-4 mr-1.5" /> By Areum
            </span>
            <span className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1.5" /> Published: {formatDate(article.publishedDate)}
            </span>
          </div>
          {article.tags && article.tags.length > 0 && (
            <div className="mt-4">
              {article.tags.map(tag => (
                <span key={tag} className="inline-block bg-bg-accent rounded-full px-2.5 py-1 text-xs font-medium text-text-secondary mr-2 mb-1">
                  <TagIcon className="h-3.5 w-3.5 inline mr-1" />{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {article.imageUrl && (
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full rounded-lg shadow-md mb-8 max-h-96 object-cover" 
          />
        )}
        
        <div 
          className="prose dark:prose-invert max-w-none 
                     prose-headings:font-primary prose-headings:text-text-primary 
                     prose-p:text-text-secondary prose-li:text-text-secondary
                     prose-strong:text-text-primary
                     prose-a:text-accent-clay dark:prose-a:text-accent-clay hover:prose-a:underline
                     prose-code:text-accent-rust dark:prose-code:text-accent-rust
                     prose-blockquote:border-accent-clay prose-blockquote:text-text-muted"
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />
      </article>

      {relatedArticles.length > 0 && (
        <aside className="mt-12 pt-8 border-t border-border-light">
          <h2 className="font-primary text-2xl font-semibold text-text-primary mb-6">
            Explore More On This Topic
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedArticles.map(related => (
              <Link key={related.id} to={`/notebook/${related.slug}`} className={`block p-4 bg-bg-accent hover:bg-bg-soft rounded-lg shadow hover:shadow-md transition-shadow`}>
                <h3 className="font-primary text-lg font-medium text-text-primary mb-1">{related.title}</h3>
                <p className="text-xs text-text-muted">{related.category}</p>
              </Link>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
};
