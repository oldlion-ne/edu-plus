import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { RetroGrid } from '../ui/retro-grid';

interface ImmersiveHeroProps {
  bgImage?: string;
  bgVideo?: string;
  bgPosition?: string;
  category: string;
  titleNormal: string;
  titleHighlighted: string;
  description: string;
  telemetryLeft?: string;
  telemetryRight?: string;
  children?: React.ReactNode;
}

export default function ImmersiveHero({
  category,
  titleNormal,
  titleHighlighted,
  description,
  telemetryLeft,
  telemetryRight,
  children
}: ImmersiveHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const ySmooth = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[55vh] min-h-[420px] md:h-[60vh] overflow-hidden bg-background border-b border-border select-none group flex flex-col justify-between py-12 md:py-16"
    >
      {/* Parallax Background Layer */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0 pointer-events-none transition-transform duration-[1.6s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.03]"
        style={{
          y: ySmooth,
        }}
      >
        <RetroGrid
          angle={65}
          cellSize={50}
          opacity={0.3}
          lightLineColor="#8B949E"
          darkLineColor="#7DF9FF"
        />
      </motion.div>

      {/* ── Dark overlays ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 40%, oklch(var(--background) / 0.25) 0%, oklch(var(--background) / 0.7) 100%)',
            'linear-gradient(to bottom, oklch(var(--background) / 0.35) 0%, transparent 40%, oklch(var(--background) / 0.85) 100%)',
          ].join(', '),
        }}
      />

      {/* ── Subtle neon top glow ── */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 z-[2] pointer-events-none h-[40%]"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, oklch(var(--primary) / 0.06) 0%, transparent 80%)',
        }}
      />

      {/* ── Grid dot overlay ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(oklch(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* spacer */}
      <div className="flex-1" />

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col justify-center items-center py-6">
        <div className="space-y-6 max-w-3xl mx-auto flex flex-col items-center text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 border border-border bg-card/70 backdrop-blur-md px-4 py-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 bg-primary" />
            </span>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-muted-foreground">
              {category}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1] text-foreground">
            {titleNormal} <span className="text-primary">{titleHighlighted}</span>
          </h1>

          {/* Description */}
          <p className="text-muted-foreground text-sm md:text-base max-w-xl leading-relaxed">
            {description}
          </p>

          {/* Children in-flow (e.g. CTA buttons) */}
          {children && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* spacer */}
      <div className="flex-1" />

      {/* Telemetry Corner Footers */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 mt-auto">
        <div className="flex justify-between items-end text-[9px] font-mono text-muted-foreground/60 pt-4 border-t border-border/30">
          <span>{telemetryLeft || "SYSTEM_ACTIVE_NODES // OK"}</span>
          <span>{telemetryRight || "UTC_COORDINATES_ACTIVE"}</span>
        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-24 z-[3] pointer-events-none"
        style={{ background: 'linear-gradient(to top, oklch(var(--background)) 0%, transparent 100%)' }} /* ui-ignore */
      />
    </div>
  );
}
