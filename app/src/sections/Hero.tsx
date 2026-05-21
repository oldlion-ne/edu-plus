import { useRef } from 'react';
import { Link } from 'react-router';
import {
  BrainCircuit,
  Zap,
  Globe2,
  TrendingUp,
  ArrowRight,
  Activity,
} from 'lucide-react';
import { TimelineAnimation } from '../components/timeline-animation';

const PROGRAMS = [
  { icon: BrainCircuit, label: 'AI & ML', active: true },
  { icon: Zap, label: 'Energy', active: false },
  { icon: Globe2, label: 'Leadership', active: false },
  { icon: TrendingUp, label: 'Venture', active: false },
];

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
          className="flex items-center gap-0 border border-[#7DF9FF]/15 bg-[#0E131A]/70 backdrop-blur-sm mb-14"
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

        {/* ── Dashboard mockup ── */}
        <TimelineAnimation
          once
          animationNum={6}
          timelineRef={sectionRef}
          className="w-full max-w-3xl border border-[#7DF9FF]/15 bg-[#0E131A]/80 backdrop-blur-sm shadow-[0_32px_80px_-16px_rgba(125,249,255,0.07)]"
        >
          {/* Chrome bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#7DF9FF]/10 bg-[#0B0F14]/60">
            <div className="w-2 h-2 bg-[#7DF9FF]/40" />
            <div className="w-2 h-2 bg-[#7DF9FF]/20" />
            <div className="w-2 h-2 bg-[#7DF9FF]/10" />
            <span className="ml-3 text-[9px] tracking-widest text-[#E6EDF3]/20 uppercase font-mono">
              eduplus · learning intelligence · ai track 2026
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" />
              <span className="text-[9px] text-[#E6EDF3]/25 font-mono uppercase tracking-widest">
                live
              </span>
            </div>
          </div>

          {/* Inner layout */}
          <div className="p-6 grid grid-cols-12 gap-4">
            {/* Left: progress */}
            <div className="col-span-7 space-y-3">
              <p className="text-[9px] font-bold text-[#E6EDF3]/30 uppercase tracking-widest font-mono mb-3">
                Pathway Completion
              </p>
              <div className="relative h-1 bg-[#7DF9FF]/10">
                <div className="absolute top-0 left-0 h-full bg-[#7DF9FF]" style={{ width: '62%' }} />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-[#E6EDF3]/30">
                <span>Module 8 of 13</span>
                <span className="text-[#7DF9FF]">62%</span>
              </div>
              <div className="space-y-2 pt-2">
                {[100, 90, 78].map((w) => (
                  <div
                    key={w}
                    className="h-1.5 bg-[#7DF9FF]/06"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Right: program selector */}
            <div className="col-span-5">
              <p className="text-[9px] font-bold text-[#E6EDF3]/30 uppercase tracking-widest font-mono mb-3">
                Domain
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {PROGRAMS.map(({ icon: Icon, label, active }) => (
                  <div
                    key={label}
                    className={`p-2.5 border flex items-center gap-2 transition-all ${
                      active
                        ? 'border-[#7DF9FF]/50 bg-[#7DF9FF]/06'
                        : 'border-[#7DF9FF]/08 opacity-40'
                    }`}
                  >
                    <Icon
                      size={11}
                      className={active ? 'text-[#7DF9FF]' : 'text-[#E6EDF3]/30'}
                    />
                    <span className="text-[9px] font-mono text-[#E6EDF3]/60 uppercase tracking-wider">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
