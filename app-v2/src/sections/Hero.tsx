import { useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { TimelineAnimation } from '../components/timeline-animation';
import { Button } from '../components/ui/button';

const STATS = [
  { value: '4,200+', label: 'Learners' },
  { value: '98%',    label: 'Placement' },
  { value: '38',     label: 'Countries' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* ── Background video ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-55"
        src="/assets/hero-bg-new.mp4"
      />

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

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 pt-28 pb-16 max-w-5xl mx-auto w-full">

        {/* Headline */}
        <TimelineAnimation
          once
          as="h1"
          animationNum={1}
          timelineRef={sectionRef}
          className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-6xl font-semibold tracking-tight leading-[1.1] text-foreground mb-5"
        >
          Elevate{' '}
          <span className="text-primary">Tomorrow</span>
        </TimelineAnimation>

        {/* Subtext */}
        <TimelineAnimation
          once
          as="p"
          animationNum={2}
          timelineRef={sectionRef}
          className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed mb-10"
        >
          A global network redefining human potential through AI-powered learning.
        </TimelineAnimation>

        {/* CTAs */}
        <TimelineAnimation
          once
          as="div"
          animationNum={4}
          timelineRef={sectionRef}
          className="flex flex-col sm:flex-row items-center gap-3 mb-12"
        >
          <Button asChild size="lg">
            <Link to="/contact" className="inline-flex items-center gap-2">
              Start Your Pathway
              <ArrowRight size={14} />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/about">
              Explore Network
            </Link>
          </Button>
        </TimelineAnimation>

        {/* Stats strip */}
        <TimelineAnimation
          once
          as="div"
          animationNum={5}
          timelineRef={sectionRef}
          className="flex items-center gap-0 border border-border bg-card/70 backdrop-blur-sm"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center px-7 py-4 ${i < STATS.length - 1 ? 'border-r border-border' : ''}`}
            >
              <span className="text-xl font-bold text-primary font-mono">
                {s.value}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mt-0.5">
                {s.label}
              </span>
            </div>
          ))}
        </TimelineAnimation>
      </div>

      {/* ── Bottom fade ── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 z-[3] pointer-events-none"
        style={{ background: 'linear-gradient(to top, oklch(var(--background)) 0%, transparent 100%)' }}
      />

      {/* ── Bottom-right meta tag ── */}
      <TimelineAnimation
        once
        animationNum={7}
        timelineRef={sectionRef}
        className="absolute bottom-8 right-6 md:right-12 z-10"
      >
        <div className="border border-border bg-card/80 backdrop-blur-md px-4 py-2">
          <span className="text-[9px] font-mono font-bold tracking-[0.25em] uppercase text-muted-foreground">
            Investing · Building · Advisory
          </span>
        </div>
      </TimelineAnimation>
    </section>
  );
}
