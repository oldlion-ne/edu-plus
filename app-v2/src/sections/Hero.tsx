import { useRef } from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  Activity,
} from 'lucide-react';
import { TimelineAnimation } from '../components/timeline-animation';

const STATS = [
  { value: '4,200+', label: 'Learners' },
  { value: '98%', label: 'Placement' },
  { value: '12ms', label: 'Latency' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-[#0B0F14]"
    >
      {/* ── Background video ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        src="/assets/hero-bg-new.mp4"
      />

      {/* ── Dark overlays ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(11,15,20,0.45) 0%, rgba(11,15,20,0.85) 100%)',
            'linear-gradient(to bottom, rgba(11,15,20,0.6) 0%, transparent 45%, rgba(11,15,20,0.95) 100%)',
          ].join(', '),
        }}
      />

      {/* ── Subtle neon top glow ── */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 z-[2] pointer-events-none h-[40%]"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(125,249,255,0.06) 0%, transparent 80%)',
        }}
      />

      {/* ── Grid dot overlay ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(#7DF9FF 1px, transparent 1px), linear-gradient(90deg, #7DF9FF 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 pt-28 pb-16 max-w-5xl mx-auto w-full">

        {/* Eyebrow */}
        <TimelineAnimation
          once
          as="div"
          animationNum={1}
          timelineRef={sectionRef}
          className="inline-flex items-center gap-2 border border-[#7DF9FF]/30 bg-[#7DF9FF]/05 px-4 py-1.5 mb-8"
        >
          <Activity size={11} className="text-[#7DF9FF]" />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#7DF9FF]">
            Eduplus · Learning Intelligence Platform
          </span>
        </TimelineAnimation>

        {/* Headline — tighter, scaled down */}
        <TimelineAnimation
          once
          as="h1"
          animationNum={2}
          timelineRef={sectionRef}
          className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-6xl font-semibold tracking-tight leading-[1.1] text-[#E6EDF3] mb-5"
        >
          Shaping the builders{' '}
          <span className="text-[#7DF9FF]">of tomorrow</span>
        </TimelineAnimation>

        {/* Subtext */}
        <TimelineAnimation
          once
          as="p"
          animationNum={3}
          timelineRef={sectionRef}
          className="max-w-xl text-base md:text-lg text-[#E6EDF3]/55 leading-relaxed mb-10"
        >
          A global network of innovators, educators, and visionaries
          redefining human capability through AI-powered personalised pathways.
        </TimelineAnimation>

        {/* CTAs */}
        <TimelineAnimation
          once
          as="div"
          animationNum={4}
          timelineRef={sectionRef}
          className="flex flex-col sm:flex-row items-center gap-3 mb-12"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#7DF9FF] text-[#0B0F14] font-bold text-sm tracking-wide hover:bg-white transition-all duration-300 shadow-[0_0_28px_rgba(125,249,255,0.22)]"
          >
            Start Your Pathway
            <ArrowRight size={14} />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-7 py-3 border border-[#7DF9FF]/30 text-[#E6EDF3] font-medium text-sm tracking-wide hover:border-[#7DF9FF] hover:text-[#7DF9FF] transition-all duration-300"
          >
            Explore Network
          </Link>
        </TimelineAnimation>

        {/* Stats strip */}
        <TimelineAnimation
          once
          as="div"
          animationNum={5}
          timelineRef={sectionRef}
          className="flex items-center gap-0 border border-[#7DF9FF]/15 bg-[#0E131A]/70 backdrop-blur-sm"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center px-7 py-4 ${i < STATS.length - 1 ? 'border-r border-[#7DF9FF]/10' : ''}`}
            >
              <span className="text-xl font-bold text-[#7DF9FF] font-mono">
                {s.value}
              </span>
              <span className="text-[10px] text-[#E6EDF3]/40 uppercase tracking-widest font-mono mt-0.5">
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
        style={{ background: 'linear-gradient(to top, #0B0F14 0%, transparent 100%)' }}
      />

      {/* ── Bottom-right meta tag ── */}
      <TimelineAnimation
        once
        animationNum={7}
        timelineRef={sectionRef}
        className="absolute bottom-8 right-6 md:right-12 z-10"
      >
        <div className="border border-[#7DF9FF]/20 bg-[#0B0F14]/80 backdrop-blur-md px-4 py-2">
          <span className="text-[9px] font-mono font-bold tracking-[0.25em] uppercase text-[#7DF9FF]/70">
            Investing · Building · Advisory
          </span>
        </div>
      </TimelineAnimation>
    </section>
  );
}
