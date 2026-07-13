import { useEffect, useState } from 'react';

interface ImmersiveHeroProps {
  bgImage: string;
  category: string;
  titleNormal: string;
  titleHighlighted: string;
  description: string;
  telemetryLeft?: string;
  telemetryRight?: string;
  children?: React.ReactNode;
}

export default function ImmersiveHero({
  bgImage,
  category,
  titleNormal,
  titleHighlighted,
  description,
  telemetryLeft,
  telemetryRight,
  children
}: ImmersiveHeroProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[55vh] min-h-[420px] md:h-[60vh] overflow-hidden bg-background border-b border-border select-none group flex flex-col justify-between py-12 md:py-16">
      {/* Parallax Background Layer */}
      <div
        className="absolute inset-0 w-full h-full z-0 pointer-events-none transition-transform duration-1200 ease-out group-hover:scale-[1.03]"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <img
          src={bgImage}
          alt="Section background illustration"
          className="w-full h-full object-cover opacity-55"
        />
      </div>

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

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col justify-center items-center py-6">
        <div className="space-y-6 max-w-3xl mx-auto flex flex-col items-center text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 border border-border bg-card/50 backdrop-blur-md px-4 py-2 rounded-none">
            <span className="text-[10px] font-sans font-medium tracking-wider uppercase text-muted-foreground">
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
        <div className="flex justify-between items-end text-[9px] font-sans text-muted-foreground/60 pt-4 border-t border-border/30">
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
