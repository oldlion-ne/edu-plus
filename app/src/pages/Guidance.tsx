import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import ImmersiveHero from '../components/effects/ImmersiveHero';

interface StakeholderDetails {
  id: string;
  label: string;
  title: string;
  desc: string;
  roadmap: string[];
  ctaText: string;
}

const STAKEHOLDERS: StakeholderDetails[] = [
  {
    id: 'students',
    label: 'For Students',
    title: 'Chart Your Personal Academic & Career Path',
    desc: 'Navigate academic choices, discover your passions, and understand how your strengths connect to real-world opportunities. From subject selection and career mapping to entrance exam strategies and higher studies planning, you gain a personal roadmap instead of generic advice.',
    roadmap: [
      'Core Strengths & Passion Discovery',
      'Customized Subject & Stream Selection',
      'Entrance Exam (JEE, NEET, CUET) Goal-Setting',
      'University Matching & Application Strategy'
    ],
    ctaText: 'Schedule Student Advisory'
  },
  {
    id: 'parents',
    label: 'For Parents',
    title: 'Empower Your Child Without the Pressure',
    desc: 'Equip yourself with the tools, frameworks, and information needed to support your child’s professional and personal growth. Our sessions help you decode rapidly changing education and career landscapes so that you can guide—not pressure—your child toward realistic, fulfilling paths.',
    roadmap: [
      'Understanding Modern Career Landscapes',
      'DMIT & Psychometrics Outcomes Explanation',
      'Academic Stress Mitigation Strategies',
      'Financial Planning for Higher Education'
    ],
    ctaText: 'Schedule Parent Consultation'
  },
  {
    id: 'seekers',
    label: 'For Job Seekers',
    title: 'Bridge the Gap Between Learning & Placement',
    desc: 'Support your professional transition with structured career counseling, profile building, and targeted upskilling recommendations. Gain absolute clarity on your core strengths, international options, and the actions required to move from where you are to where you want to be.',
    roadmap: [
      'Industrial Skill Gap Assessments',
      'Resume & LinkedIn Profile Optimization',
      'Mock Technical & HR Interviews',
      'Global Job Placement Routing'
    ],
    ctaText: 'Launch Placement Pathway'
  },
  {
    id: 'teachers',
    label: 'For Teachers',
    title: 'Evolve From Instructors Into Mentors',
    desc: 'Enhance your classroom impact, mentorship capabilities, and academic leadership profile. Through reflective coaching, modern pedagogy training, and technology integration workshops, learn how to guide students not only to test success but to life readiness.',
    roadmap: [
      'Advanced Pedagogy & Active Learning',
      'E-Learning & Tech Tools Integration',
      'Student Mentorship & Counseling Basics',
      'Professional Leadership & Career Growth'
    ],
    ctaText: 'Register for Educator Mentorship'
  }
];

export default function Guidance() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('students');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Retro Terminal script log typewriter flow triggered on tab changes
  useEffect(() => {
    let isMounted = true;
    setIsRunning(true);
    setTerminalLogs([]);

    const scripts: Record<string, string[]> = {
      students: [
        '[GUEST@EDU-PLUS:~]$ ./futurepath-navigator.sh --assess',
        '>> INITIALIZING PSYCHOMETRIC TEST ENGINE...',
        '>> CAPTURING STRENGTHS MATRIX [COGNITIVE & CREATIVE]...',
        '>> COMPILING APTITUDE FEEDBACK NODES...',
        '>> RESULT:',
        '   - STEM APTITUDE: 94.2%',
        '   - SPATIAL INTERPRETATION: 88.6%',
        '   - RECOMMENDATION: APPLIED SCIENCES & DEEP TECH',
        '>> SYSTEM STATUS: READY FOR 1-ON-1 ADVISORY SESSION _'
      ],
      parents: [
        '[GUEST@EDU-PLUS:~]$ ./parent-consultation.sh --mitigate',
        '>> LOADING ACADEMIC STRESS INDEX (ASI)...',
        '>> DETECTING BOARD EXAM PRESSURE INDICES...',
        '>> COMPUTING STRESS MITIGATION METRICS...',
        '>> RECOMMENDATIONS GENERATED:',
        '   - WEEKLY DISCOVERY TRACKING',
        '   - NON-INTRUSIVE ACADEMIC PROGRESS CHECKS',
        '   - FINANCIAL PLAN MATCHED TO ASIA GOALS',
        '>> SYSTEM STATUS: STRATEGY SHEET READY _'
      ],
      seekers: [
        '[GUEST@EDU-PLUS:~]$ ./career-launchpad.sh --region "singapore"',
        '>> RUNNING SKILLS CAPABILITY GAP ANALYSIS...',
        '>> SCANNING RESUME FOR DIGITAL AND ANALYTICAL TOOLS...',
        '>> MATCHING PLACEMENT PORTALS IN SE ASIA...',
        '>> COMPILING METRICS:',
        '   - TOOL COMPATIBILITY: 91%',
        '   - REGIONAL FIT INDEX: 97.4%',
        '   - GLOBAL ROUTING STATUS: PLACEMENT-READY',
        '>> SYSTEM STATUS: RESUME OPTIMIZED FOR SG PORTAL _'
      ],
      teachers: [
        '[GUEST@EDU-PLUS:~]$ ./educator-academy.sh --train',
        '>> LOADING PEDAGOGICAL METRIC DIAGNOSTICS...',
        '>> VERIFYING ACTIVE-LEARNING MODULE RATINGS...',
        '>> BENCHMARKING SYSTEM CLASS INTEGRATION RATIO...',
        '>> PERFORMANCE:',
        '   - CLASS ENGAGEMENT INDEX: +34%',
        '   - HYBRID TECH BENCHMARK: EXCELLENT',
        '   - OUTCOMES METRIC: 98.2/100',
        '>> SYSTEM STATUS: REGISTRATION COMPLETED _'
      ]
    };

    const lines = scripts[activeTab] || [];
    let currentLineIndex = 0;

    const typeNextLine = () => {
      if (!isMounted) return;
      if (currentLineIndex < lines.length) {
        const nextLine = lines[currentLineIndex];
        setTerminalLogs(prev => [...prev, nextLine]);
        currentLineIndex++;
        const delay = currentLineIndex === 1 ? 400 : Math.random() * 150 + 50;
        setTimeout(typeNextLine, delay);
      } else {
        setIsRunning(false);
      }
    };

    typeNextLine();

    return () => {
      isMounted = false;
    };
  }, [activeTab]);

  const activeStakeholder = STAKEHOLDERS.find(s => s.id === activeTab) || STAKEHOLDERS[0];

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] pb-32 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7DF9FF]/5 rounded-none blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#7DF9FF]/3 rounded-none blur-[130px] pointer-events-none" />

      {/* Immersive Top Hero Viewport */}
      <ImmersiveHero
        bgImage="/images/MentorshipVisual.png"
        category="Advisory Services"
        titleNormal="One-to-One"
        titleHighlighted="Guidance"
        description="EduPlus Skills offers dedicated, one-on-one support tailored to each stakeholder in the education ecosystem. We guide you toward realistic, fulfilling paths with confidence."
        telemetryLeft="MENTORSHIP_STREAM // ACTIVE"
        telemetryRight="UTC_COORD_GUIDANCE"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-16">
        {/* Dynamic Stakeholder Tabs & Dashboard Grid */}
        <div className={`flex flex-col lg:flex-row gap-8 transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Left Navigation and Retro Terminal Control Block */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            {/* Tab Selectors */}
            <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-r border-white/[0.08] lg:pr-4 whitespace-nowrap bg-black/10 p-2">
              {STAKEHOLDERS.map(stakeholder => (
                <button
                  key={stakeholder.id}
                  onClick={() => setActiveTab(stakeholder.id)}
                  className={`px-4 py-3 text-left font-sans text-sm tracking-wide transition-all duration-300 rounded-none w-full ${
                    activeTab === stakeholder.id
                      ? 'text-[#7DF9FF] bg-[#7DF9FF]/5 border-b-2 lg:border-b-0 lg:border-l-2 border-[#7DF9FF] font-semibold'
                      : 'text-[#8B949E] hover:text-[#7DF9FF] hover:bg-[#7DF9FF]/2 border-b-2 lg:border-b-0 lg:border-l-2 border-transparent'
                  }`}
                >
                  {stakeholder.label}
                </button>
              ))}
            </div>

            {/* Typing Retro Log Terminal */}
            <div className="relative border border-white/[0.08] bg-[#0E131A] p-1 rounded-none">
              <div className="relative bg-[#090D12] p-4 font-mono text-[10px] leading-relaxed text-[#4AF626] h-[220px] overflow-hidden rounded-none select-none flex flex-col justify-start">
                
                {/* scanline glass filter overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7DF9FF]/2 to-transparent opacity-30 pointer-events-none" />
                
                {/* Simulated Scanlines */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
                     style={{ 
                       backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)', 
                       backgroundSize: '100% 4px' 
                     }} 
                />

                {/* Console header */}
                <div className="flex justify-between items-center text-[8px] text-[#7DF9FF]/60 border-b border-white/[0.08] pb-2 mb-3">
                  <span>LOG_PORT: TERMINAL_EXECUTION_DEV</span>
                  <span className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-none bg-[#4AF626] ${isRunning ? 'animate-ping' : ''}`} />
                    {isRunning ? 'EXEC_SH' : 'READY_PRMPT'}
                  </span>
                </div>

                {/* Log outputs stream */}
                <div className="space-y-1 overflow-y-auto flex-1 font-mono pr-2 scrollbar-thin scrollbar-thumb-white/[0.04] scrollbar-track-transparent">
                  {terminalLogs.map((log, idx) => {
                    const isCmd = log.startsWith('[GUEST');
                    return (
                      <div key={idx} className={isCmd ? 'text-[#7DF9FF]' : 'text-[#4AF626]'}>
                        {log}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Active Details Panel */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            
            {/* Active Tab Panel */}
            <div className="liquid-glass p-8 md:p-12 min-h-[380px] flex flex-col justify-between border border-white/[0.08] rounded-none">
              <div className="space-y-6">
                <span className="text-xs font-sans text-[#7DF9FF] tracking-wider uppercase block opacity-60">
                  Tailored Roadmap
                </span>
                <h2 className="font-heading text-2xl md:text-3xl font-light text-[#E6EDF3]">
                  {activeStakeholder.title}
                </h2>
                <p className="font-sans text-sm md:text-base text-[#8B949E] leading-relaxed">
                  {activeStakeholder.desc}
                </p>

                {/* Milestones list */}
                <div className="pt-6">
                  <h4 className="font-heading text-sm text-[#E6EDF3] uppercase tracking-wider mb-4">Milestones & Strategy:</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {activeStakeholder.roadmap.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-[#8B949E] font-sans">
                        <span className="w-6 h-6 rounded-none bg-[#7DF9FF]/10 border border-[#7DF9FF]/20 flex items-center justify-center text-xs text-[#7DF9FF] font-medium font-heading">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-white/[0.08] flex justify-end">
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-[#7DF9FF] text-[#0B0F14] hover:bg-white font-sans text-sm font-medium tracking-wide transition-all duration-300 rounded-none border border-transparent hover:border-[#7DF9FF]"
                >
                  {activeStakeholder.ctaText}
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
