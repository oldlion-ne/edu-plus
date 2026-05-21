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
  { icon: BrainCircuit, label: 'AI & Machine Learning', active: true },
  { icon: Zap, label: 'Energy Innovation', active: false },
  { icon: Globe2, label: 'Global Leadership', active: false },
  { icon: TrendingUp, label: 'Venture Strategy', active: false },
];

const STAT_NODES = [
  { value: '4,200+', label: 'Active Learners' },
  { value: '98%', label: 'Placement Rate' },
  { value: '12ms', label: 'Avg. Response' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative min-h-screen bg-[#0B0F14] text-[#E6EDF3] overflow-hidden flex flex-col"
    >
      {/* Ambient neon glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(125,249,255,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#7DF9FF 1px, transparent 1px), linear-gradient(90deg, #7DF9FF 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Hero headline block ── */}
      <div className="relative z-10 px-6 md:px-12">
        <article className="border-b border-[#7DF9FF]/10">
          <div className="flex flex-col items-center text-center space-y-5 max-w-7xl mx-auto border-x border-[#7DF9FF]/10 px-8 pt-24 pb-10">
            {/* Eyebrow tag */}
            <TimelineAnimation
              once
              as="div"
              animationNum={1}
              timelineRef={sectionRef}
              className="inline-flex items-center gap-2 border border-[#7DF9FF]/30 bg-[#7DF9FF]/5 px-4 py-1.5"
            >
              <Activity size={12} className="text-[#7DF9FF]" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#7DF9FF]">
                Eduplus · Next-Gen Learning Intelligence
              </span>
            </TimelineAnimation>

            {/* Main headline */}
            <TimelineAnimation
              once
              as="h1"
              animationNum={2}
              timelineRef={sectionRef}
              className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-[#E6EDF3]"
            >
              Shaping the builders{' '}
              <br className="hidden md:block" />
              <span className="text-[#7DF9FF]">of tomorrow</span>
            </TimelineAnimation>

            {/* Sub-headline */}
            <TimelineAnimation
              once
              as="p"
              animationNum={3}
              timelineRef={sectionRef}
              className="text-[#E6EDF3]/60 text-lg md:text-xl max-w-3xl font-medium leading-relaxed"
            >
              A global network of innovators, educators, and visionaries
              redefining human capability through AI-powered personalised
              learning pathways.
            </TimelineAnimation>
          </div>
        </article>

        {/* ── CTA + social proof ── */}
        <div className="border-b border-[#7DF9FF]/10">
          <div className="max-w-7xl mx-auto border-x border-[#7DF9FF]/10 flex flex-col items-center gap-6 py-10 px-10">
            <TimelineAnimation
              once
              as="div"
              animationNum={4}
              timelineRef={sectionRef}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#7DF9FF] text-[#0B0F14] font-bold text-sm tracking-wide hover:bg-white transition-all duration-300 shadow-[0_0_24px_rgba(125,249,255,0.25)]"
              >
                Start Your Pathway
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#7DF9FF]/30 text-[#E6EDF3] font-medium text-sm tracking-wide hover:border-[#7DF9FF] hover:text-[#7DF9FF] transition-all duration-300"
              >
                Explore Network
              </Link>
            </TimelineAnimation>

            {/* Social proof avatars */}
            <div className="flex flex-col items-center gap-1">
              <TimelineAnimation
                once
                as="p"
                animationNum={5}
                timelineRef={sectionRef}
                className="text-[10px] font-bold text-[#E6EDF3]/40 uppercase tracking-[0.25em]"
              >
                Trusted by 4,200+ innovators worldwide
              </TimelineAnimation>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <TimelineAnimation
                      once
                      key={i}
                      animationNum={6}
                      timelineRef={sectionRef}
                    >
                      <img
                        src={`https://picsum.photos/seed/ep-member-${i}/100`}
                        className="w-9 h-9 border-2 border-[#0B0F14] object-cover grayscale opacity-70"
                        alt=""
                      />
                    </TimelineAnimation>
                  ))}
                </div>
                <TimelineAnimation
                  once
                  as="div"
                  animationNum={7}
                  timelineRef={sectionRef}
                  className="border border-[#7DF9FF]/40 bg-[#7DF9FF]/10 text-[#7DF9FF] text-xs font-bold px-3 py-1"
                >
                  +1,234
                </TimelineAnimation>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Dashboard mockup preview ── */}
      <div className="relative z-10 w-full border-b border-[#7DF9FF]/10 pb-10">
        <div className="max-w-7xl mx-auto border-x border-[#7DF9FF]/10 px-6 md:px-12">
          <TimelineAnimation
            once
            animationNum={8}
            timelineRef={sectionRef}
            className="relative bg-[#0E131A] border border-[#7DF9FF]/15 shadow-[0_40px_100px_-20px_rgba(125,249,255,0.06)] p-2 mt-4"
          >
            {/* Mockup chrome bar */}
            <div className="bg-[#0B0F14] border-b border-[#7DF9FF]/10 flex items-center gap-2 px-4 py-2">
              <div className="w-2.5 h-2.5 bg-[#7DF9FF]/30" />
              <div className="w-2.5 h-2.5 bg-[#7DF9FF]/15" />
              <div className="w-2.5 h-2.5 bg-[#7DF9FF]/08" />
              <span className="ml-4 text-[10px] tracking-widest text-[#E6EDF3]/25 uppercase font-mono">
                eduplus · learning.intelligence · dashboard
              </span>
            </div>

            {/* Mockup content */}
            <TimelineAnimation
              once
              animationNum={9}
              timelineRef={sectionRef}
              className="bg-[#0E131A] p-8 md:p-12 flex flex-col gap-8 min-h-[400px]"
            >
              {/* Breadcrumb + meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#7DF9FF] animate-pulse" />
                  <span className="text-[11px] text-[#E6EDF3]/40 uppercase tracking-widest font-mono">
                    my pathways /
                  </span>
                  <span className="text-[11px] text-[#7DF9FF] uppercase tracking-widest font-mono font-bold">
                    AI Engineering Track 2026
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-[10px] text-[#E6EDF3]/30 font-mono uppercase tracking-widest">
                    Node 12ms ·
                  </div>
                  <div className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Stats telemetry */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Stat row */}
                  <div className="grid grid-cols-3 gap-4">
                    {STAT_NODES.map((s) => (
                      <TimelineAnimation
                        once
                        key={s.label}
                        animationNum={10}
                        timelineRef={sectionRef}
                        className="border border-[#7DF9FF]/15 bg-[#0B0F14] p-4"
                      >
                        <p className="text-[10px] text-[#E6EDF3]/40 uppercase tracking-widest font-mono mb-1">
                          {s.label}
                        </p>
                        <p className="text-xl font-bold text-[#7DF9FF] font-mono">
                          {s.value}
                        </p>
                      </TimelineAnimation>
                    ))}
                  </div>

                  {/* Progress bar block */}
                  <TimelineAnimation
                    once
                    animationNum={11}
                    timelineRef={sectionRef}
                    className="border border-[#7DF9FF]/10 bg-[#0B0F14] p-5 space-y-3"
                  >
                    <p className="text-[10px] font-bold text-[#E6EDF3]/40 uppercase tracking-widest font-mono">
                      Pathway Completion
                    </p>
                    <div className="relative h-1.5 bg-[#7DF9FF]/10">
                      <div
                        className="absolute top-0 left-0 h-full bg-[#7DF9FF]"
                        style={{ width: '62%' }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-[#E6EDF3]/30">
                      <span>Module 8 of 13</span>
                      <span className="text-[#7DF9FF]">62%</span>
                    </div>
                    <div className="space-y-2 pt-2">
                      <div className="w-full h-2 bg-[#7DF9FF]/08" />
                      <div className="w-[90%] h-2 bg-[#7DF9FF]/06" />
                      <div className="w-[80%] h-2 bg-[#7DF9FF]/04" />
                    </div>
                  </TimelineAnimation>
                </div>

                {/* Right: Program selection panel */}
                <div className="lg:col-span-5">
                  <TimelineAnimation
                    once
                    animationNum={12}
                    timelineRef={sectionRef}
                    className="bg-[#0B0F14] border border-[#7DF9FF]/15 p-6 space-y-4"
                  >
                    <p className="text-[10px] font-bold text-[#E6EDF3]/50 uppercase tracking-widest font-mono mb-4">
                      Select Program Domain
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {PROGRAMS.map(({ icon: Icon, label, active }, idx) => (
                        <TimelineAnimation
                          once
                          key={label}
                          animationNum={13 + idx}
                          timelineRef={sectionRef}
                          className={`p-4 border flex flex-col gap-3 transition-all ${
                            active
                              ? 'border-[#7DF9FF] bg-[#7DF9FF]/05 shadow-[0_0_16px_rgba(125,249,255,0.10)]'
                              : 'border-[#7DF9FF]/10 opacity-50'
                          }`}
                        >
                          <div
                            className={`w-8 h-8 flex items-center justify-center ${
                              active
                                ? 'bg-[#7DF9FF]/15 text-[#7DF9FF]'
                                : 'bg-[#7DF9FF]/05 text-[#E6EDF3]/30'
                            }`}
                          >
                            <Icon size={16} />
                          </div>
                          <p className="text-[10px] font-bold text-[#E6EDF3]/70 font-mono uppercase tracking-wider leading-tight">
                            {label}
                          </p>
                        </TimelineAnimation>
                      ))}
                    </div>
                  </TimelineAnimation>
                </div>
              </div>
            </TimelineAnimation>
          </TimelineAnimation>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{
          background:
            'linear-gradient(to top, #0B0F14 0%, transparent 100%)',
        }}
      />
    </section>
  );
}
