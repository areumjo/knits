
// src/components/pattern-detail/PatternViewHeader.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { usePatternDetailContext } from '../../contexts/PatternDetailContext';

export const PatternViewHeader: React.FC = () => {
  const {
    pattern,
    pContent,
    showImage,
    setShowImageState,
    // Fix: Access dynamicSizeValues from context
    dynamicSizeValues, 
    formatUnitDynamic, 
  } = usePatternDetailContext();

  if (!pattern || !pContent) return null;

  // Process overview text for dynamic values, abbreviations etc.
  const processedOverview = pContent.overview
    .replace(/<abbr title='(.*?)'>(.*?)<\/abbr>/g, `<abbr title='$1' data-original-title='$1' tabindex='0'>$2</abbr>`);

  const estimatedTimeKey = 'approxTime';
  const estimatedTimeFallback = pContent.estimatedTime || "N/A";
  const currentEstimatedTime = dynamicSizeValues?.[estimatedTimeKey] !== undefined ? String(dynamicSizeValues[estimatedTimeKey]) : estimatedTimeFallback;


  return (
    <>
      <div id="live-back-to-patterns-link-container" className="mb-20 pdiv-no-print"> {/* Changed mb-16 to mb-20 */}
        <Link to="/patterns" className="pdiv-back-to-patterns-link">
          <ArrowUturnLeftIcon className="inline h-4 w-4 mr-2" /> Back to All Patterns
        </Link>
      </div>
      <header className="pdiv-pattern-header">
        <h1 className="pdiv-pattern-title">{pattern.title}</h1>
        {pattern.subtitle && <h2 className="pdiv-pattern-subtitle">{pattern.subtitle}</h2>}
        <div className="pdiv-pattern-overview">
          {pContent.overview && <p dangerouslySetInnerHTML={{ __html: processedOverview }} />}
          <p>
            <strong>Skill Level:</strong> {pContent.skillLevelText} |{' '}
            <strong>Estimated Time:</strong>{' '}
            <span className="size-dynamic" data-size-key={estimatedTimeKey} data-fallback={estimatedTimeFallback}>
               {/* The actual value will be rendered by formatUnitDynamic if it's numeric, or just displayed. No unit conversion for 'hours'. */}
              <strong style={{color: 'var(--color-accent-val)', fontWeight: 700}}>{currentEstimatedTime}</strong>
            </span> hours
          </p>
        </div>

        {pattern.imageUrl && (
          <div className={`pdiv-pattern-image-wrapper ${showImage ? '' : 'image-hidden'}`}>
            <img src={pattern.imageUrl} alt={`Styled photo of the finished ${pattern.title}`} className="pdiv-pattern-image" loading="lazy" />
            <button
              id="pdiv-toggle-image-btn"
              className="pdiv-tool-button icon-only pdiv-no-print"
              aria-label={showImage ? "Hide pattern image" : "Show pattern image"}
              aria-pressed={showImage}
              onClick={() => setShowImageState(!showImage)}
            >
              {showImage ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>
        )}
      </header>
    </>
  );
};
