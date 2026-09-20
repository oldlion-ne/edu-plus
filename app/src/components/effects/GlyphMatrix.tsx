'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { cn } from '@/lib/utils';

export interface GlyphMatrixProps {
  /** The set of characters to randomly pick from */
  glyphs?: string;
  /** Size of each grid cell (and font size) */
  cellSize?: number;
  /** Probability (0 to 1) of a glyph mutating per tick */
  mutationRate?: number;
  /** Tick interval in ms */
  interval?: number;
  /** Opacity gradient strength toward the bottom */
  fadeBottom?: number;
  /** Text color (e.g., hex, rgb, or a CSS variable) */
  color?: string;
  className?: string;
}

export function GlyphMatrix({
  glyphs = '01·•+*/\\<>=',
  cellSize = 14,
  mutationRate = 0.04,
  interval = 90,
  fadeBottom = 0.6,
  color, // Custom override if provided
  className,
}: GlyphMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine current theme color
  const [currentColor, setCurrentColor] = useState(color || '#1a1a1a1a');

  // Watch for theme changes
  useEffect(() => {
    if (color) {
      setCurrentColor(color);
      return;
    }

    const htmlEl = document.documentElement;
    const updateColor = () => {
      const isDark = htmlEl.classList.contains('dark');
      // Light Mode: Warm charcoal at 15% opacity
      // Dark Mode: Warm paper white at 10% opacity
      setCurrentColor(isDark ? 'rgba(245, 245, 240, 0.1)' : 'rgba(42, 42, 42, 0.15)');
    };

    updateColor();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.attributeName === 'class') {
          updateColor();
        }
      });
    });
    observer.observe(htmlEl, { attributes: true });

    return () => observer.disconnect();
  }, [color]);

  // Store matrix state
  const grid = useRef<{ char: string; opacity: number }[][]>([]);
  const columns = useRef(0);
  const rows = useRef(0);

  const resize = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;

    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Support high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    // Recalculate columns and rows
    columns.current = Math.ceil(width / cellSize);
    rows.current = Math.ceil(height / cellSize);

    // Re-initialize grid
    const newGrid: { char: string; opacity: number }[][] = [];
    for (let c = 0; c < columns.current; c++) {
      const col = [];
      for (let r = 0; r < rows.current; r++) {
        // Compute static baseline opacity for this row (fade towards bottom)
        // fadeBottom controls how much it fades. 0 = no fade, 1 = fade to completely transparent
        const progress = r / rows.current;
        const baselineOpacity = Math.max(0, 1 - (progress * fadeBottom));
        
        col.push({
          char: glyphs.charAt(Math.floor(Math.random() * glyphs.length)),
          opacity: baselineOpacity,
        });
      }
      newGrid.push(col);
    }
    grid.current = newGrid;
  }, [cellSize, fadeBottom, glyphs]);

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTick = 0;

    const render = (timestamp: number) => {
      if (timestamp - lastTick > interval) {
        lastTick = timestamp;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Setup text rendering
        ctx.font = `${cellSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Update and draw grid
        for (let c = 0; c < columns.current; c++) {
          for (let r = 0; r < rows.current; r++) {
            const cell = grid.current[c][r];
            
            // Mutate randomly based on rate
            if (Math.random() < mutationRate) {
              cell.char = glyphs.charAt(Math.floor(Math.random() * glyphs.length));
            }

            // Parse color and apply opacity
            ctx.fillStyle = currentColor;
            ctx.globalAlpha = cell.opacity;
            
            // Draw text
            const x = c * cellSize + cellSize / 2;
            const y = r * cellSize + cellSize / 2;
            ctx.fillText(cell.char, x, y);
          }
        }
        ctx.globalAlpha = 1.0;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, glyphs, interval, mutationRate, cellSize, currentColor]);

  return (
    <div ref={containerRef} className={cn('absolute inset-0 h-full w-full', className)}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
