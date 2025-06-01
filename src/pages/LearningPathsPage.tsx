
import React from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle } from '../../components/ui/SectionTitle'; 
import { Card } from '../../components/ui/Card'; 
import { learningPathsData } from '../../data/learningPathsData'; 
import { AREUM_ACCENT_COLOR } from '../../constants'; // This is 'accent-clay'
import { AcademicCapIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button'; 

export const LearningPathsPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <SectionTitle 
        title="Guided Journeys: Learning Paths"
        subtitle="Want to grow your knitting skills with a bit more intention? I've put together these 'Learning Paths' that pair some of my patterns with specific Notebook articles and insights from my design process. Each path is designed to help you explore a particular set of techniques or concepts, building your confidence and understanding one stitch at a time."
      />

      {learningPathsData.length > 0 ? (
        <div className="space-y-10">
          {learningPathsData.map((path, index) => (
            <Card key={path.id} className="p-6 md:p-8 shadow-xl border border-border-light">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                <div className={`p-3 bg-${AREUM_ACCENT_COLOR}/10 dark:bg-${AREUM_ACCENT_COLOR}/20 rounded-full`}>
                    <AcademicCapIcon className={`h-8 w-8 text-${AREUM_ACCENT_COLOR} dark:text-${AREUM_ACCENT_COLOR}`} />
                </div>
                <div>
                    <h2 className={`font-primary text-2xl md:text-3xl font-semibold text-text-primary`}>
                        Path {index + 1}: {path.title}
                    </h2>
                    <p className="text-sm text-text-muted italic">{path.focusAndLevel}</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none text-text-secondary space-y-6 
                              prose-headings:font-primary prose-headings:text-text-primary 
                              prose-p:text-text-secondary prose-li:text-text-secondary
                              prose-strong:text-text-primary
                              prose-a:text-${AREUM_ACCENT_COLOR} dark:prose-a:text-${AREUM_ACCENT_COLOR} hover:prose-a:underline">
                <div className="p-4 bg-bg-accent rounded-md">
                    <h4 className="font-semibold font-primary">A Little Letter From Me:</h4>
                    <p className="text-sm">{path.areumLetter}</p>
                </div>
                
                <div>
                    <h4 className="font-semibold font-primary">What We'll Explore Together:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1 pl-1">
                        {path.learningObjectives.map((obj, i) => <li key={i}>{obj}</li>)}
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold font-primary">What You'll Create & Achieve:</h4>
                    <p className="text-sm">
                        <strong>Your Project(s):</strong>{' '}
                        {path.whatYoullCreate.projects.map((proj, i) => (
                            <React.Fragment key={proj.patternId}>
                                <Link to={`/patterns/${proj.patternId}`} className={`text-${AREUM_ACCENT_COLOR} dark:text-${AREUM_ACCENT_COLOR} hover:underline`}>{proj.name}</Link>
                                {i < path.whatYoullCreate.projects.length - 1 && ', '}
                            </React.Fragment>
                        ))}
                    </p>
                    <p className="text-sm"><strong>By the end of this path, you'll have:</strong></p>
                    <ul className="list-disc list-inside text-sm space-y-1 pl-1">
                        {path.whatYoullCreate.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
                    </ul>
                </div>

                {path.helpfulReads.length > 0 && (
                    <div>
                        <h4 className="font-semibold font-primary">Helpful Reads from My Notebook:</h4>
                        <ul className="space-y-2 text-sm">
                            {path.helpfulReads.map((read, i) => (
                                <li key={i} className="p-3 bg-bg-primary rounded shadow-sm border border-border-light">
                                    <Link to={`/notebook/${read.articleId}`} className={`font-medium text-${AREUM_ACCENT_COLOR} dark:text-${AREUM_ACCENT_COLOR} hover:underline`}>{read.name}</Link>
                                    <p className="text-xs text-text-muted mt-0.5">{read.note}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="mt-6 text-right">
                    <Button variant="primary" rightIcon={ArrowRightIcon} onClick={() => alert(`Feature to 'Start Path: ${path.title}' coming soon!`)}>
                        Begin This Journey
                    </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-text-muted">No learning paths available at the moment. Check back soon!</p>
      )}
    </div>
  );
};
