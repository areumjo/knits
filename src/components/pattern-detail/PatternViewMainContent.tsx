
// src/components/pattern-detail/PatternViewMainContent.tsx
import React, { useRef } from 'react';
import { usePatternDetailContext } from '../../contexts/PatternDetailContext';
import { PatternSection } from './PatternSection';
import { InstructionStep } from './InstructionStep';
import {
  LightBulbIcon, UsersIcon, ShoppingBagIcon, PencilSquareIcon, SparklesIcon,
  WrenchScrewdriverIcon, ScaleIcon, BookOpenIcon, PhotoIcon, ClipboardDocumentCheckIcon, GiftIcon, AcademicCapIcon,
  ChatBubbleOvalLeftEllipsisIcon, LifebuoyIcon, ArrowDownTrayIcon, PrinterIcon
} from '@heroicons/react/24/outline';
import { PatternContent } from '../../types'; // For InstructionPartDisplayProps

const iconMap: Record<string, React.ElementType> = {
  introNotes: LightBulbIcon,
  sizingInfo: UsersIcon,
  materials: ShoppingBagIcon,
  instructions: BookOpenIcon,
  visualAids: PhotoIcon,
  schematic: ClipboardDocumentCheckIcon,
  finishing: GiftIcon,
  requiredSkills: AcademicCapIcon,
  abbreviations: ChatBubbleOvalLeftEllipsisIcon,
  support: LifebuoyIcon,
  FaPaintBrush: PencilSquareIcon,
  FaMagicWandSparkles: SparklesIcon,
  FaToolbox: WrenchScrewdriverIcon,
  FaRulerVertical: ScaleIcon,
};

interface PatternViewMainContentProps {
  onDownloadHtml: () => void; // For the support section link
}

// New component to handle each instruction part, allowing useRef at top level
interface InstructionPartDisplayProps {
  part: PatternContent['instructions']['parts'][0];
  partIdx: number;
  processGenericHtml: (htmlString: string) => string;
}

const InstructionPartDisplay: React.FC<InstructionPartDisplayProps> = ({ part, partIdx, processGenericHtml }) => {
  const partOlRef = useRef<HTMLOListElement>(null); // useRef is now at the top level of this component

  return (
    <div className="mb-6">
      <h4><span className="pdiv-instr-h4-number">{partIdx + 1}.</span> <span className="pdiv-instr-h4-title">{part.subtitle}</span></h4>
      {part.attention && <p className="attention" dangerouslySetInnerHTML={{ __html: processGenericHtml(part.attention) }} />}
      <ol ref={partOlRef}>
        {part.steps.map((step) => (
          <InstructionStep
            key={step.id}
            stepData={step}
            partOlRef={partOlRef}
          />
        ))}
      </ol>
      {part.note && <p className="note" dangerouslySetInnerHTML={{ __html: processGenericHtml(part.note) }} />}
      {part.proTip && <p className="pro-tip" dangerouslySetInnerHTML={{ __html: processGenericHtml(part.proTip) }} />}
    </div>
  );
};


export const PatternViewMainContent: React.FC<PatternViewMainContentProps> = ({ onDownloadHtml }) => {
  const { pattern, pContent, formatUnitDynamic, currentSize, setCurrentSizeState, announceStatus, 
  dynamicSizeValues } = usePatternDetailContext();

  if (!pattern || !pContent) return null;
  
  const processGenericHtml = (htmlString: string) => {
    if (!htmlString) return "";
    let processed = htmlString;
     // Bolding
    processed = processed.replace(/<strong>(.*?)<\/strong>/g, `<strong style="color: var(--color-accent-val); font-weight: 700;">$1</strong>`);
    // Size-dynamic
    processed = processed.replace(/<strong><span class='size-dynamic' data-size-key='(.*?)'>(.*?)<\/span><\/strong>/g, (match, key, val) => `<strong style="color: var(--color-accent-val); font-weight: 700;">${dynamicSizeValues?.[key] || val}</strong>`);
    // Unit-dynamic
    processed = processed.replace(/<span class='unit-dynamic'(.*?)data-base-value='(.*?)'(.*?)data-unit-type='(.*?)'(.*?)>(.*?)<\/span>/g, (match, preAttrs, baseVal, midAttrs, unitType, postAttrs, fallback) => {
        const sizeKeyMatch = match.match(/data-size-key='(.*?)'/);
        const sizeKey = sizeKeyMatch ? sizeKeyMatch[1] : undefined;
        return `<strong style="color: var(--color-accent-val); font-weight: 700;">${formatUnitDynamic(baseVal, unitType, sizeKey)}</strong>`;
    });
    // Abbreviations
    processed = processed.replace(/<abbr title='(.*?)'>(.*?)<\/abbr>/g, `<abbr title='$1' data-original-title='$1' tabindex='0'>$2</abbr>`);
    return processed;
  };

  const handleSizeRowClick = (sizeKey: string) => {
    if (sizeKey && sizeKey !== currentSize) {
        setCurrentSizeState(sizeKey);
        // AnnounceStatus is handled by setCurrentSizeState in context
    }
  };


  return (
    <main id="pdiv-main-content">
      {pContent.introNotes && (
        <PatternSection sectionId={`${pattern.id}_introNotes`} title={pContent.introNotes.title} icon={iconMap.introNotes}>
          {pContent.introNotes.content.map((text, i) => <div key={i} dangerouslySetInnerHTML={{ __html: processGenericHtml(text) }} />)}
        </PatternSection>
      )}

      {pContent.sizingInfo && pattern.finishedMeasurements && (
        <PatternSection sectionId={`${pattern.id}_sizingInfo`} title={pContent.sizingInfo.title} icon={iconMap.sizingInfo}>
          {pContent.sizingInfo.content.map((text, i) => <p key={i} dangerouslySetInnerHTML={{ __html: processGenericHtml(text) }} />)}
          <div className="pdiv-size-table-container">
            <table className="pdiv-size-table" aria-describedby="sizingTableDescription">
              <caption id="sizingTableDescription" className="pdiv-sr-only">Sizing chart. Click a row to select size.</caption>
              <thead>
                <tr>
                  <th scope="col">Size</th>
                  {Object.keys(Object.values(pattern.finishedMeasurements.sizes)[0] || {}).map(header => (
                    <th key={header} scope="col">{header.replace(/([A-Z])/g, ' $1').trim()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(pContent.sizesData).map((sizeKey) => {
                  const sizeDetailsValue = pContent.sizesData[sizeKey];
                  return (
                    <tr 
                        key={sizeKey} 
                        data-size-row={sizeKey} 
                        tabIndex={0} 
                        role="button" 
                        aria-label={`Select Size ${String(sizeDetailsValue.name)}`} 
                        className={currentSize === sizeKey ? 'active-size-row' : ''}
                        onClick={() => handleSizeRowClick(sizeKey)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSizeRowClick(sizeKey);}}}
                    >
                      <th scope="row"><strong>{String(sizeDetailsValue.name)}</strong></th>
                      {Object.keys(Object.values(pattern.finishedMeasurements!.sizes)[0] || {}).map(headerKey => {
                        const measurementValue = pattern.finishedMeasurements!.sizes[sizeKey]?.[headerKey] || '-';
                        const unitTypeRegex = /Circ|Height|Length|Width/i.test(headerKey) ? 'length_plain' : /Yarn|Yardage/i.test(headerKey) ? (measurementValue.toLowerCase().includes('yds') ? 'yarn_yards' : measurementValue.toLowerCase().includes('m') ? 'yarn_meters' : 'other') : 'other';
                        let formattedValue = measurementValue;
                        if (typeof measurementValue === 'string') {
                          const base = measurementValue.replace(/["“']|in(?:ches)?|cm|yds|m/gi, '').trim();
                           if (!isNaN(parseFloat(base))) { 
                              formattedValue = formatUnitDynamic(base, unitTypeRegex);
                          }
                        }
                        return <td key={headerKey} data-header={headerKey}>{formattedValue}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </PatternSection>
      )}

      {pContent.materials && (
        <PatternSection sectionId={`${pattern.id}_materials`} title={pContent.materials.title} icon={iconMap.materials}>
          <ul className="pdiv-materials-list">
            {pContent.materials.list.map((item, i) => {
              const ItemIcon = item.icon ? (iconMap[item.icon] || PencilSquareIcon) : PencilSquareIcon;
              return (
                <li key={i}>
                  <span className="pdiv-material-label"><ItemIcon />{item.label}:</span>
                  <span className="pdiv-material-content" dangerouslySetInnerHTML={{ __html: processGenericHtml(item.description) }} />
                </li>
              );
            })}
          </ul>
        </PatternSection>
      )}

      {pContent.instructions && (
         <PatternSection sectionId={`${pattern.id}_instructions_main`} title={pContent.instructions.title} icon={iconMap.instructions}>
          <article className="pdiv-instructions-article">
            {pContent.instructions.parts.map((part, partIdx) => (
              <InstructionPartDisplay 
                key={partIdx} 
                part={part} 
                partIdx={partIdx} 
                processGenericHtml={processGenericHtml} 
              />
            ))}
          </article>
        </PatternSection>
      )}
      
      {pContent.visualAids && pContent.visualAids.items.length > 0 && (
        <PatternSection sectionId={`${pattern.id}_visualAids`} title={pContent.visualAids.title || "Visual Aids"} icon={iconMap.visualAids}>
          {pContent.visualAids.items.map((item, i) => (
            <div key={i} className="pdiv-media-container">
              <img src={item.src} alt={item.caption} className="illustration" loading="lazy" />
              {item.caption && <p className="caption"><em>{item.caption}</em></p>}
            </div>
          ))}
        </PatternSection>
      )}

      {pContent.schematic && (
        <PatternSection sectionId={`${pattern.id}_schematic`} title={pContent.schematic.title || "Schematic"} icon={iconMap.schematic}>
          <div className="pdiv-media-container">
            <img src={pContent.schematic.src} alt={pContent.schematic.caption || 'Pattern schematic'} className="schematic-img" loading="lazy" />
            {pContent.schematic.caption && <p className="caption" dangerouslySetInnerHTML={{ __html: processGenericHtml(pContent.schematic.caption) }} />}
          </div>
        </PatternSection>
      )}

      {pContent.finishing && (
        <PatternSection sectionId={`${pattern.id}_finishing`} title={pContent.finishing.title} icon={iconMap.finishing}>
          <ol>
            {pContent.finishing.steps.map((step, i) => <li key={i} dangerouslySetInnerHTML={{ __html: processGenericHtml(step) }} />)}
          </ol>
          {/* Removed closingRemark rendering: pContent.finishing.closingRemark && <p style={{ marginTop: 'var(--spacing-unit-val)', textAlign: 'center', fontSize: '1.2rem', fontFamily: 'var(--font-primary)', color: 'var(--color-success-val)' }} dangerouslySetInnerHTML={{ __html: pContent.finishing.closingRemark }} /> */}
        </PatternSection>
      )}

      {pContent.requiredSkills && pContent.requiredSkills.skills.length > 0 && (
        <PatternSection sectionId={`${pattern.id}_requiredSkills`} title={pContent.requiredSkills.title} icon={iconMap.requiredSkills}>
          <ul className="pdiv-glossary-list">
            {pContent.requiredSkills.skills.map((skill, i) => <li key={i}><strong className="pdiv-glossary-term">{skill.term}</strong><span className="pdiv-glossary-def">{skill.definition}</span></li>)}
          </ul>
        </PatternSection>
      )}

      {pContent.abbreviations && pContent.abbreviations.list.length > 0 && (
        <PatternSection sectionId={`${pattern.id}_abbreviations`} title={pContent.abbreviations.title} icon={iconMap.abbreviations}>
          <ul className="pdiv-glossary-list">
            {pContent.abbreviations.list.map((abbr, i) => <li key={i}><strong id={`abbr-${abbr.term}`} className="pdiv-glossary-term" data-original-title={abbr.definition} tabIndex={0}>{abbr.term}</strong><span className="pdiv-glossary-def">{abbr.definition}</span></li>)}
          </ul>
        </PatternSection>
      )}

      <PatternSection sectionId={`${pattern.id}_support`} title="Support & Sharing" icon={iconMap.support}>
        <div className="pdiv-support-section">
          <p>If you need assistance or wish to share your finished project:</p>
          <ul>
            <li><strong>Video Tutorials (External Links):</strong>
              <ul style={{ marginLeft: '1rem', marginTop: '0.5rem', listStyleType: 'circle' }}>
                <li><a href="https://www.youtube.com/results?search_query=knitting+long+tail+cast+on" target="_blank" rel="noopener noreferrer">Long Tail Cast-On</a></li>
                <li><a href="https://www.youtube.com/results?search_query=knitting+weaving+in+ends" target="_blank" rel="noopener noreferrer">Weaving in Ends</a></li>
              </ul>
            </li>
            <li><strong>Pattern Support:</strong> Email <a href={`mailto:support@example.com?subject=Question about ${pattern.title}`}>support@example.com</a>.</li>
            <li><strong>Share Your Work:</strong> Post on Instagram or Ravelry with <strong>#{pattern.title.replace(/\s+/g, '')}</strong> and <strong>#AreumKnits</strong>.</li>
          </ul>
          <div className="mt-8 pt-6 border-t border-[var(--color-border-strong-val)] pdiv-no-print">
            <ul>
              <li><strong>Pattern Utilities:</strong></li>
                <ul style={{ marginLeft: '1rem', marginTop: '0.5rem', listStyleType: 'circle' }}>
                  <li>
                  <button onClick={onDownloadHtml} className="pdiv-text-link-utility">
                    <ArrowDownTrayIcon className="inline h-4 w-4 mr-1.5" />
                      Download Interactive HTML
                  </button>
                </li>
                <li>
                  <button onClick={() => window.print()} className="pdiv-text-link-utility">
                    <PrinterIcon className="inline h-4 w-4 mr-1.5" />
                      Print Pattern
                  </button>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </PatternSection>
    </main>
  );
};
