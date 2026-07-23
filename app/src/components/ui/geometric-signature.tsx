import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface GeometricSignatureProps {
  seed: string;
  className?: string;
}

// PRNG implementations for deterministic generation
function xmur3(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

function sfc32(a: number, b: number, c: number, d: number) {
  return function () {
    a >>>= 0;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
    let t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    t = (t + d) | 0;
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

export function GeometricSignature({ seed, className }: GeometricSignatureProps) {
  const elements = useMemo(() => {
    const seedFunc = xmur3(seed);
    const rand = sfc32(seedFunc(), seedFunc(), seedFunc(), seedFunc());

    const cols = 6;
    const rows = 8;
    const cellW = 40;
    const cellH = 40; // Total 240x320 (4:5 aspect ratio)

    const els: React.ReactNode[] = [];

    // Draw a subtle background grid
    for (let c = 1; c < cols; c++) {
      els.push(
        <line
          key={`bg-v-${c}`}
          x1={c * cellW}
          y1={0}
          x2={c * cellW}
          y2={rows * cellH}
          className="text-border/40"
          stroke="currentColor"
          strokeWidth="1"
        />
      );
    }
    for (let r = 1; r < rows; r++) {
      els.push(
        <line
          key={`bg-h-${r}`}
          x1={0}
          y1={r * cellH}
          x2={cols * cellW}
          y2={r * cellH}
          className="text-border/40"
          stroke="currentColor"
          strokeWidth="1"
        />
      );
    }

    // Populate grid cells
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = c * cellW;
        const y = r * cellH;

        const type = rand();

        // 30% empty
        if (type < 0.3) continue;

        const opacity = rand() > 0.5 ? 0.4 : 0.15;
        const colorClass =
          rand() > 0.95
            ? 'text-primary'
            : rand() > 0.5
            ? 'text-foreground'
            : 'text-muted-foreground';

        if (type < 0.45) {
          // Horizontal line
          els.push(
            <line
              key={`${c}-${r}-h`}
              x1={x}
              y1={y + cellH / 2}
              x2={x + cellW}
              y2={y + cellH / 2}
              className={colorClass}
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity={opacity * 2}
            />
          );
        } else if (type < 0.6) {
          // Vertical line
          els.push(
            <line
              key={`${c}-${r}-v`}
              x1={x + cellW / 2}
              y1={y}
              x2={x + cellW / 2}
              y2={y + cellH}
              className={colorClass}
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity={opacity * 2}
            />
          );
        } else if (type < 0.75) {
          // Cross hatch
          els.push(
            <line
              key={`${c}-${r}-ch`}
              x1={x}
              y1={y + cellH / 2}
              x2={x + cellW}
              y2={y + cellH / 2}
              className={colorClass}
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity={opacity}
            />
          );
          els.push(
            <line
              key={`${c}-${r}-cv`}
              x1={x + cellW / 2}
              y1={y}
              x2={x + cellW / 2}
              y2={y + cellH}
              className={colorClass}
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity={opacity}
            />
          );
        } else if (type < 0.9) {
          // Solid block (small or large)
          const w = rand() > 0.5 ? cellW : cellW / 2;
          const h = rand() > 0.5 ? cellH : cellH / 2;
          const ox = x + (cellW - w) / 2;
          const oy = y + (cellH - h) / 2;
          els.push(
            <rect
              key={`${c}-${r}-b`}
              x={ox}
              y={oy}
              width={w}
              height={h}
              className={colorClass}
              fill="currentColor"
              fillOpacity={opacity}
            />
          );
        } else if (type < 0.97) {
          // Inner frame
          els.push(
            <rect
              key={`${c}-${r}-f`}
              x={x + 6}
              y={y + 6}
              width={cellW - 12}
              height={cellH - 12}
              className={colorClass}
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              strokeOpacity={opacity * 2}
            />
          );
        } else {
          // A tiny accent square in the center
          els.push(
            <rect
              key={`${c}-${r}-d`}
              x={x + cellW / 2 - 2}
              y={y + cellH / 2 - 2}
              width={4}
              height={4}
              className="text-primary"
              fill="currentColor"
            />
          );
        }
      }
    }

    // Add some connecting/spanning lines across the grid
    for (let i = 0; i < 6; i++) {
      if (rand() > 0.5) {
        // Horizontal span
        const startC = Math.floor(rand() * (cols - 2));
        const span = Math.floor(rand() * 3) + 2;
        const r = Math.floor(rand() * rows);
        els.push(
          <line
            key={`span-h-${i}`}
            x1={startC * cellW}
            y1={r * cellH}
            x2={(startC + span) * cellW}
            y2={r * cellH}
            className="text-foreground"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity={0.15}
          />
        );
      } else {
        // Vertical span
        const startR = Math.floor(rand() * (rows - 2));
        const span = Math.floor(rand() * 3) + 2;
        const c = Math.floor(rand() * cols);
        els.push(
          <line
            key={`span-v-${i}`}
            x1={c * cellW}
            y1={startR * cellH}
            x2={c * cellW}
            y2={(startR + span) * cellH}
            className="text-foreground"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity={0.15}
          />
        );
      }
    }

    return els;
  }, [seed]);

  return (
    <svg
      viewBox="0 0 240 320"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full", className)}
      shapeRendering="crispEdges"
    >
      {elements}
    </svg>
  );
}
