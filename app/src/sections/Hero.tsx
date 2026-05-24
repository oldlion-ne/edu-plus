import { useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { TimelineAnimation } from '../components/timeline-animation';
import { Button } from '../components/ui/button';
import { KineticText } from '@/components/ui/kinetic-text';

const STATS = [
  { value: '4,200+', labelKey: 'learners' as const },
  { value: '98%',    labelKey: 'placement' as const },
  { value: '38',     labelKey: 'countries' as const },
];

const translations = {
  investing: 'Investing',
  building: 'Building',
  advisory: 'Advisory',
  elevate: 'Elevate',
  tomorrow: 'Tomorrow',
  subtext: 'A global network redefining human potential through AI-powered learning.',
  startPathway: 'Start Your Pathway',
  exploreNetwork: 'Explore Network',
  learners: 'Learners',
  placement: 'Placement',
  countries: 'Countries',
};

const translationMap = new Map<string, string>(Object.entries(translations));
const t = (key: keyof typeof translations) => translationMap.get(key) || '';

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
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 dark:opacity-55 dark:invert-0 invert grayscale-[0.95] dark:grayscale-0 contrast-[1.1] dark:contrast-100 brightness-[1.02] dark:brightness-100 transition-all duration-700"
        src="/assets/bg-hero-new.mp4"
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

        {/* ── Investing · Building · Advisory eyebrow ── */}
        <TimelineAnimation
          once
          as="div"
          animationNum={1}
          timelineRef={sectionRef}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 border border-border bg-card/70 backdrop-blur-md px-4 py-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 bg-primary" />
            </span>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-muted-foreground">
              {t('investing')}
            </span>
            <span className="text-primary/40 text-[10px] font-mono">·</span>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-muted-foreground">
              {t('building')}
            </span>
            <span className="text-primary/40 text-[10px] font-mono">·</span>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-muted-foreground">
              {t('advisory')}
            </span>
          </div>
        </TimelineAnimation>

        {/* Headline */}
        <TimelineAnimation
          once
          as="h1"
          animationNum={2}
          timelineRef={sectionRef}
          className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-6xl font-semibold tracking-tight leading-[1.1] text-foreground mb-5 flex flex-wrap justify-center"
        >
          <KineticText text={t('elevate')} as="span" className="mr-[0.25em]" />
          <KineticText text={t('tomorrow')} as="span" className="text-primary" />
        </TimelineAnimation>

        {/* Subtext */}
        <TimelineAnimation
          once
          as="p"
          animationNum={3}
          timelineRef={sectionRef}
          className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed mb-10"
        >
          {t('subtext')}
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
            <Link to="/contact" className="inline-flex items-center gap-2" /* ui-ignore */>
              {t('startPathway')}
              <ArrowRight size={14} />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/about" /* ui-ignore */>
              {t('exploreNetwork')}
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
              key={s.labelKey}
              className={`flex flex-col items-center px-7 py-4 ${i < STATS.length - 1 ? 'border-r border-border' : ''}`}
            >
              <span className="text-xl font-bold text-primary font-mono">
                {s.value}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mt-0.5">
                {t(s.labelKey)}
              </span>
            </div>
          ))}
        </TimelineAnimation>
      </div>

      {/* ── Bottom fade ── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 z-[3] pointer-events-none"
        style={{ background: 'linear-gradient(to top, oklch(var(--background)) 0%, transparent 100%)' }} /* ui-ignore */
      />

    </section>
  );
}
