
import React, { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import { Pattern, Stitch } from './types';
import {
  GRID_ROWS,
  GRID_COLS,
  MIN_ANIMATION_DELAY,
  MAX_ANIMATION_DELAY,
  UPDATES_PER_TICK_START,
  UPDATES_PER_TICK_END,
  PAUSE_DURATION,
  STITCH_STYLES,
  BOOSTED_MIN_ANIMATION_DELAY,
  BOOSTED_MAX_ANIMATION_DELAY,
  BOOSTED_UPDATES_PER_TICK_START,
  BOOSTED_UPDATES_PER_TICK_END,
  CURSOR_LIFESPAN,
  CURSOR_MAX_MOVES,
  MAX_ACTIVE_CURSORS,
  MAX_ADJACENT_EDITS_PER_CURSOR,
} from './constants';

interface KnitPatternDisplayProps {
  patterns: Pattern[];
  onPauseStateChange?: (isPaused: boolean) => void;
}

export interface KnitPatternDisplayHandles {
  skipToNextPattern: (callerConsidersItPaused: boolean) => void;
  togglePause: () => void;
  getIsPaused: () => boolean;
}

interface CellToChange {
  r: number;
  c: number;
  targetStitch: Stitch;
}

interface DisplayCursor {
  id: number;
  r: number;
  c: number;
  life: number;
  movesLeft: number;
}

export const KnitPatternDisplay = forwardRef<KnitPatternDisplayHandles, KnitPatternDisplayProps>(({ patterns, onPauseStateChange }, ref) => {
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [displayGrid, setDisplayGrid] = useState<Stitch[][]>(() => patterns[0]?.grid || []);
  const [cursors, setCursors] = useState<DisplayCursor[]>([]);
  const [isPaused, setIsPaused] = useState(true); // Start paused
  const [patternName, setPatternName] = useState<string>(patterns[0]?.name || '');
  const [isSpeedBoostActive, setIsSpeedBoostActive] = useState(false);

  const cellsToTransformRef = useRef<CellToChange[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  const interPatternPauseTimerRef = useRef<number | null>(null);
  const isSpeedBoostActiveRef = useRef(isSpeedBoostActive);
  const totalCellsToChangeAtStartRef = useRef<number>(0);
  const cursorsRef = useRef(cursors);

  const setInternalPaused = useCallback((newPausedStateOrCallback: boolean | ((prevState: boolean) => boolean)) => {
    setIsPaused(currentInternalIsPaused => {
      const newState = typeof newPausedStateOrCallback === 'function'
        ? newPausedStateOrCallback(currentInternalIsPaused)
        : newPausedStateOrCallback;

      if (onPauseStateChange && currentInternalIsPaused !== newState) {
        onPauseStateChange(newState);
      }
      return newState;
    });
  }, [onPauseStateChange]);

  useEffect(() => {
    isSpeedBoostActiveRef.current = isSpeedBoostActive;
  }, [isSpeedBoostActive]);

  useEffect(() => {
    cursorsRef.current = cursors;
  }, [cursors]);

  useEffect(() => {
    if (patterns.length > 0) {
      const initialIndex = 0;
      setCurrentPatternIndex(initialIndex);
      setPatternName(patterns[initialIndex].name);
      setDisplayGrid(JSON.parse(JSON.stringify(patterns[initialIndex].grid)));
      setCursors([]);
      cellsToTransformRef.current = [];
      totalCellsToChangeAtStartRef.current = 0;

      setInternalPaused(true); // Use the new setter

      if (interPatternPauseTimerRef.current) clearTimeout(interPatternPauseTimerRef.current);
      interPatternPauseTimerRef.current = window.setTimeout(() => {
        setInternalPaused(false); // Use the new setter
      }, PAUSE_DURATION);

      return () => {
        if (animationFrameIdRef.current) clearTimeout(animationFrameIdRef.current);
        if (interPatternPauseTimerRef.current) clearTimeout(interPatternPauseTimerRef.current);
      };
    }
  }, [patterns, setInternalPaused]); // Added setInternalPaused to dependencies

  const startTransition = useCallback(() => {
    if (!patterns.length || patterns.length === 0 || isPaused) return;

    const fromPattern = patterns[currentPatternIndex];
    const targetPatternIdx = (currentPatternIndex + 1) % patterns.length;
    const toPattern = patterns[targetPatternIdx];

    setPatternName(`${fromPattern.name} → ${toPattern.name}`);

    const cells: CellToChange[] = [];
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        if (fromPattern.grid[r]?.[c] !== toPattern.grid[r]?.[c]) {
          cells.push({ r, c, targetStitch: toPattern.grid[r][c] });
        }
      }
    }
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }
    cellsToTransformRef.current = cells;
    totalCellsToChangeAtStartRef.current = cells.length;

    if (cells.length === 0) {
      setCurrentPatternIndex(targetPatternIdx);
      setPatternName(toPattern.name);
      setDisplayGrid(JSON.parse(JSON.stringify(toPattern.grid)));
      setCursors([]);
      setInternalPaused(true);
      if (interPatternPauseTimerRef.current) clearTimeout(interPatternPauseTimerRef.current);
      interPatternPauseTimerRef.current = window.setTimeout(() => setInternalPaused(false), PAUSE_DURATION);
      return;
    }

    setDisplayGrid(JSON.parse(JSON.stringify(fromPattern.grid)));

    const animate = () => {
      if (isPaused) {
        if (animationFrameIdRef.current) clearTimeout(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
        return;
      }

      if (cellsToTransformRef.current.length === 0 && cursorsRef.current.every(c => c.life <=0) ) {
        setCurrentPatternIndex(targetPatternIdx);
        setPatternName(toPattern.name);
        setDisplayGrid(JSON.parse(JSON.stringify(toPattern.grid)));
        setCursors([]);
        setInternalPaused(true);
        if (interPatternPauseTimerRef.current) clearTimeout(interPatternPauseTimerRef.current);
        interPatternPauseTimerRef.current = window.setTimeout(() => {
            setInternalPaused(false);
        }, PAUSE_DURATION);
        return;
      }

      const currentMinDelay = isSpeedBoostActiveRef.current ? BOOSTED_MIN_ANIMATION_DELAY : MIN_ANIMATION_DELAY;
      const currentMaxDelay = isSpeedBoostActiveRef.current ? BOOSTED_MAX_ANIMATION_DELAY : MAX_ANIMATION_DELAY;
      const currentUpdatesStart = isSpeedBoostActiveRef.current ? BOOSTED_UPDATES_PER_TICK_START : UPDATES_PER_TICK_START;
      const currentUpdatesEnd = isSpeedBoostActiveRef.current ? BOOSTED_UPDATES_PER_TICK_END : UPDATES_PER_TICK_END;

      const normalizedProgress = totalCellsToChangeAtStartRef.current > 0 ?
                       (totalCellsToChangeAtStartRef.current - cellsToTransformRef.current.length) / totalCellsToChangeAtStartRef.current : 0;

      const delayEasingFactor = 4 * Math.pow(normalizedProgress - 0.5, 2);
      const updatesEasingFactor = 1 - delayEasingFactor;

      const delay = currentMinDelay + delayEasingFactor * (currentMaxDelay - currentMinDelay);
      let targetUpdatesThisTick = currentUpdatesStart + Math.floor(updatesEasingFactor * (currentUpdatesEnd - currentUpdatesStart));

      const editsToProcessThisTick = cellsToTransformRef.current.length > 0 ? Math.min(
        cellsToTransformRef.current.length,
        Math.max(1, targetUpdatesThisTick)
      ) : 0;

      const newlyCreatedCursorsThisTick: DisplayCursor[] = [];

      if (editsToProcessThisTick > 0) {
        setDisplayGrid(prevGrid => {
          const newGrid = JSON.parse(JSON.stringify(prevGrid));
          let editsProcessed = 0;

          while(editsProcessed < editsToProcessThisTick && cellsToTransformRef.current.length > 0) {
            const cellToChange = cellsToTransformRef.current.pop();
            if (!cellToChange) continue;

            newGrid[cellToChange.r][cellToChange.c] = cellToChange.targetStitch;

             if ((cursorsRef.current.length + newlyCreatedCursorsThisTick.length) < MAX_ACTIVE_CURSORS) {
                newlyCreatedCursorsThisTick.push({
                    id: Math.random() * Date.now(),
                    r: cellToChange.r,
                    c: cellToChange.c,
                    life: CURSOR_LIFESPAN,
                    movesLeft: CURSOR_MAX_MOVES,
                });
            }

            let adjacentEditsDone = 0;
            const neighbors = [
              { dr: -1, dc: 0 }, { dr: 1, dc: 0 },
              { dr: 0, dc: -1 }, { dr: 0, dc: 1 },
            ];

            for (const offset of neighbors) {
              if (adjacentEditsDone >= MAX_ADJACENT_EDITS_PER_CURSOR) break;
              const nr = cellToChange.r + offset.dr;
              const nc = cellToChange.c + offset.dc;
              if (nr >= 0 && nr < GRID_ROWS && nc >= 0 && nc < GRID_COLS) {
                const neighborIndexInTransformList = cellsToTransformRef.current.findIndex(
                  cell => cell.r === nr && cell.c === nc
                );
                if (neighborIndexInTransformList !== -1) {
                  const neighborCellToChange = cellsToTransformRef.current.splice(neighborIndexInTransformList, 1)[0];
                  newGrid[nr][nc] = neighborCellToChange.targetStitch;
                  adjacentEditsDone++;
                }
              }
            }
            editsProcessed++;
          }
          return newGrid;
        });
      }

      setCursors(prevCursors => {
        const processedExistingCursors = prevCursors.map(cursor => {
          let newR = cursor.r;
          let newC = cursor.c;
          let moved = false;
          if (cursor.movesLeft > 0 && cursor.life > 1) {
            const moveDirection = Math.floor(Math.random() * 5);
            if (moveDirection === 0 && cursor.r > 0) { newR--; moved = true; }
            else if (moveDirection === 1 && cursor.r < GRID_ROWS - 1) { newR++; moved = true; }
            else if (moveDirection === 2 && cursor.c > 0) { newC--; moved = true; }
            else if (moveDirection === 3 && cursor.c < GRID_COLS - 1) { newC++; moved = true; }
          }
          return {
            ...cursor,
            r: newR,
            c: newC,
            life: cursor.life - 1,
            movesLeft: (cursor.movesLeft > 0 && cursor.life > 1) ? (moved ? cursor.movesLeft - 1 : cursor.movesLeft) : 0,
          };
        }).filter(cursor => cursor.life > 0);
        return [...processedExistingCursors, ...newlyCreatedCursorsThisTick];
      });

      animationFrameIdRef.current = window.setTimeout(animate, delay);
    };

    if (animationFrameIdRef.current) clearTimeout(animationFrameIdRef.current);
    animationFrameIdRef.current = window.setTimeout(animate, isSpeedBoostActiveRef.current ? BOOSTED_MAX_ANIMATION_DELAY : MAX_ANIMATION_DELAY);

  }, [currentPatternIndex, patterns, isPaused, setInternalPaused]); // Added setInternalPaused

  useEffect(() => {
    if (patterns.length > 0) {
        if (!isPaused) {
            if (interPatternPauseTimerRef.current) {
                clearTimeout(interPatternPauseTimerRef.current);
                interPatternPauseTimerRef.current = null;
            }
            startTransition();
        } else {
            if (animationFrameIdRef.current) {
                clearTimeout(animationFrameIdRef.current);
                animationFrameIdRef.current = null;
            }
        }
    }
    return () => {
      if (animationFrameIdRef.current) {
        clearTimeout(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    };
  }, [isPaused, patterns, startTransition]);

  useImperativeHandle(ref, () => ({
    skipToNextPattern: (callerConsidersItPaused: boolean) => {
      if (animationFrameIdRef.current) {
        clearTimeout(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
      if (interPatternPauseTimerRef.current) {
        clearTimeout(interPatternPauseTimerRef.current);
        interPatternPauseTimerRef.current = null;
      }

      setIsSpeedBoostActive(false);
      isSpeedBoostActiveRef.current = false;

      const nextIdx = (currentPatternIndex + 1) % patterns.length;

      setCurrentPatternIndex(nextIdx);
      setPatternName(patterns[nextIdx].name);
      setDisplayGrid(JSON.parse(JSON.stringify(patterns[nextIdx].grid)));
      setCursors([]);
      cellsToTransformRef.current = [];
      totalCellsToChangeAtStartRef.current = 0;

      setInternalPaused(true); // Component is paused during skip operation

      if (!callerConsidersItPaused) {
        // If the app was playing before skip, schedule an unpause
        interPatternPauseTimerRef.current = window.setTimeout(() => {
          setInternalPaused(false);
        }, PAUSE_DURATION);
      }
      // If callerConsidersItPaused is true, it remains paused. App will show correct state.
    },
    togglePause: () => {
        const newPausedState = !isPaused; // Read current internal state
        setInternalPaused(newPausedState); // Set new state and notify App

        if (newPausedState) { // Becoming paused
            if (animationFrameIdRef.current) {
                clearTimeout(animationFrameIdRef.current);
                animationFrameIdRef.current = null;
            }
            if (interPatternPauseTimerRef.current) {
                clearTimeout(interPatternPauseTimerRef.current);
                interPatternPauseTimerRef.current = null;
            }
        } else { // Becoming unpaused
            // The useEffect watching `isPaused` will call startTransition.
            // If it was an inter-pattern pause, `startTransition` handles the PAUSE_DURATION.
        }
    },
    getIsPaused: () => isPaused,
  }));

  if (!patterns.length || !displayGrid.length) {
    return <div className="text-red-500 dark:text-red-400 p-4">No patterns loaded or patterns are empty.</div>;
  }

  const getStitchStyle = (stitch: Stitch) => {
    const style = STITCH_STYLES[stitch] || STITCH_STYLES.DEFAULT;
    return `${style.bgColor} ${style.textColor} ${style.darkBgColor} ${style.darkTextColor}`;
  };

  const baseCellSize = typeof window !== 'undefined' ? Math.min(20, window.innerWidth / (GRID_COLS + 10)) : 16;
  const cellSize = Math.max(8, Math.floor(baseCellSize));
  const fontSize = Math.max(5, Math.floor(cellSize * 0.6));

  const handleInteractionStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isPaused) return;
    if ('touches' in e && e.cancelable) {
      e.preventDefault();
    }
    setIsSpeedBoostActive(true);
  };

  const handleInteractionEnd = () => {
    setIsSpeedBoostActive(false);
  };

  return (
    <div
      className="flex flex-col select-none"
      onMouseDown={handleInteractionStart}
      onMouseUp={handleInteractionEnd}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      onTouchCancel={handleInteractionEnd}
      role="button"
      tabIndex={0}
      aria-pressed={isSpeedBoostActive}
      aria-label="Hold to speed up pattern transition. The grid itself is interactive."
    >
      <div
        className="relative grid border border-stone-300 dark:border-stone-600 shadow-lg rounded overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
          width: `${cellSize * GRID_COLS}px`,
          height: `${cellSize * GRID_ROWS}px`,
          cursor: isPaused ? 'default' : 'pointer'
        }}
        aria-hidden="true"
      >
        {displayGrid.map((row, rIdx) =>
          row.map((stitch, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              className={`flex items-center justify-center font-mono transition-colors duration-100 ${getStitchStyle(stitch)}`}
              style={{ width: `${cellSize}px`, height: `${cellSize}px`, fontSize: `${fontSize}px`}}
            >
              {STITCH_STYLES[stitch]?.symbol || stitch}
            </div>
          ))
        )}
        {( !isPaused || (isPaused && cursorsRef.current.length > 0 && cellsToTransformRef.current.length === 0) ) && cursors.map(cursor => (
          <div
            key={cursor.id}
            className="absolute flex items-center justify-center text-fuchsia-600 dark:text-fuchsia-400 font-mono font-bold pointer-events-none"
            style={{
              width: `${cellSize}px`, height: `${cellSize}px`, fontSize: `${fontSize * 1.2}px`,
              transform: `translate(${cursor.c * cellSize}px, ${cursor.r * cellSize}px)`,
              lineHeight: `${cellSize}px`,
              transition: 'transform 0.05s linear'
            }}
          >
            @
          </div>
        ))}
      </div>
      <p className="font-primary text-stone-700 dark:text-stone-200 flex items-center justify-end px-2" aria-live="polite">
        {patternName}
      </p>
    </div>
  );
});
KnitPatternDisplay.displayName = 'KnitPatternDisplay';
