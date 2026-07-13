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
      <img
        src="/images/HomeHeroVisual.webp"
        alt="East Asian learners and mentors collaborating in a calm modern learning space"
        className="absolute inset-0 z-0 size-full object-cover opacity-30 transition-opacity duration-700"
        fetchPriority="high"
      />

      {/* ── Dark overlays ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 40%, oklch(var(--background) / 0.15) 0%, oklch(var(--background) / 0.6) 100%)',
            'linear-gradient(to bottom, oklch(var(--background) / 0.25) 0%, transparent 40%, oklch(var(--background) / 0.75) 100%)',
          ].join(', '),
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
        <div className="inline-flex items-center gap-2 border border-border bg-card/50 backdrop-blur-md px-4 py-2 rounded-none">
            <span className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-muted-foreground">
              {t('investing')}
            </span>
            <span className="text-primary/40 text-[10px] font-sans">·</span>
            <span className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-muted-foreground">
              {t('building')}
            </span>
            <span className="text-primary/40 text-[10px] font-sans">·</span>
            <span className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-muted-foreground">
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
              <Button asChild size="lg" className="rounded-none">
            <Link to="/contact" className="inline-flex items-center gap-2" /* ui-ignore */>
              {t('startPathway')}
              <ArrowRight size={14} />
            </Link>
          </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none">
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
                className="flex items-center gap-0 border border-border bg-card/50 backdrop-blur-sm rounded-none"
        >
          {STATS.map((s, i) => (
            <div
              key={s.labelKey}
              className={`flex flex-col items-center px-7 py-4 ${i < STATS.length - 1 ? 'border-r border-border' : ''}`}
            >
              <span className="text-xl font-bold text-primary font-sans">
                {s.value}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-sans mt-0.5">
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
