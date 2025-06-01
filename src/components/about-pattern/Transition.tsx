
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { KnitPatternDisplay, KnitPatternDisplayHandles } from './PatternDisplay';
import { PATTERNS_DATA } from './constants';

const Transition: React.FC = () => {
  const knitPatternDisplayRef = useRef<KnitPatternDisplayHandles>(null);
  const [isDisplayPaused, setIsDisplayPaused] = useState(true); // Initialize based on KnitPatternDisplay's initial state

  const handlePauseStateChangeFromDisplay = useCallback((newlyPausedState: boolean) => {
    setIsDisplayPaused(newlyPausedState);
  }, []);

  useEffect(() => {
    // Sync initial pause state from component after it mounts
    // This is still useful if the component doesn't immediately call onPauseStateChange on mount
    // for its very first state.
    if (knitPatternDisplayRef.current) {
      setIsDisplayPaused(knitPatternDisplayRef.current.getIsPaused());
    }
  }, []);

  // const handleSkipPattern = () => {
  //   if (knitPatternDisplayRef.current) {
  //     // Pass the current `isDisplayPaused` state. This tells skipToNextPattern
  //     // whether the user had it paused *before* initiating the skip.
  //     knitPatternDisplayRef.current.skipToNextPattern(isDisplayPaused);
  //     // `onPauseStateChange` (called by `setInternalPaused` in KnitPatternDisplay)
  //     // will update `isDisplayPaused` correctly.
  //   }
  // };

  // const handleTogglePause = () => {
  //   if (knitPatternDisplayRef.current) {
  //     knitPatternDisplayRef.current.togglePause();
  //     // `onPauseStateChange` (called by `setInternalPaused` in KnitPatternDisplay)
  //     // will update `isDisplayPaused` correctly.
  //   }
  // };

  return (
    <div className="flex flex-col items-center pb-4 justify-center bg-stone-50 dark:bg-stone-900 transition-colors duration-300">
      {/* <div className="flex justify-between">
        <button
          onClick={handleTogglePause}
          className="p-2 rounded-md hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors"
          aria-label={isDisplayPaused ? "Play pattern animation" : "Pause pattern animation"}
          aria-pressed={isDisplayPaused}
        >
          {isDisplayPaused ? <PlayIcon className="w-6 h-6" /> : <PauseIcon className="w-6 h-6" />}
        </button>
        <button
          onClick={handleSkipPattern}
          className="p-2 rounded-md hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors"
          aria-label="Skip to next pattern"
        >
          <ForwardIcon className="w-6 h-6" />
        </button>
      </div> */}
      <main className="w-full flex justify-center">
        <KnitPatternDisplay
          ref={knitPatternDisplayRef}
          patterns={PATTERNS_DATA}
          onPauseStateChange={handlePauseStateChangeFromDisplay}
        />
      </main>
    </div>
  );
};

export default Transition;
