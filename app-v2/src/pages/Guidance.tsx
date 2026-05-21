import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import ImmersiveHero from '../components/effects/ImmersiveHero';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

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
    desc: 'Equip yourself with the tools, frameworks, and information needed to support your child\'s professional and personal growth. Our sessions help you decode rapidly changing education and career landscapes so that you can guide—not pressure—your child toward realistic, fulfilling paths.',
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
    <div className="min-h-screen bg-background text-foreground pb-32 relative overflow-hidden">
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
        <div className={`flex flex-col lg:flex-row gap-8 transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Left Navigation and Terminal Block */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            {/* Tab Selectors */}
            <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-r border-border lg:pr-4 whitespace-nowrap bg-muted/40 p-2">
              {STAKEHOLDERS.map(stakeholder => (
                <button
                  key={stakeholder.id}
                  onClick={() => setActiveTab(stakeholder.id)}
                  className={`px-4 py-3 text-left font-sans text-sm tracking-wide transition-all duration-300 w-full border-l-2 ${
                    activeTab === stakeholder.id
                      ? 'text-primary bg-primary/5 border-l-primary font-semibold'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5 border-l-transparent'
                  }`}
                >
                  {stakeholder.label}
                </button>
              ))}
            </div>

            {/* Retro Terminal Log */}
            <Card>
              <CardContent className="p-1">
                <div className="bg-card p-4 font-mono text-[10px] leading-relaxed text-green-600 dark:text-green-400 h-[220px] overflow-hidden select-none flex flex-col justify-start relative">
                  {/* Console header */}
                  <div className="flex justify-between items-center text-[8px] text-primary/60 border-b border-border pb-2 mb-3">
                    <span>LOG_PORT: TERMINAL_EXECUTION_DEV</span>
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 bg-green-500 ${isRunning ? 'animate-ping' : ''}`} />
                      {isRunning ? 'EXEC_SH' : 'READY_PRMPT'}
                    </span>
                  </div>

                  {/* Log outputs stream */}
                  <div className="space-y-1 overflow-y-auto flex-1 font-mono pr-2">
                    {terminalLogs.map((log, idx) => {
                      const isCmd = log.startsWith('[GUEST');
                      return (
                        <div key={idx} className={isCmd ? 'text-primary' : 'text-green-600 dark:text-green-400'}>
                          {log}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Active Details Panel */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            <Card className="min-h-[380px] flex flex-col justify-between">
              <CardContent className="p-8 md:p-12 flex flex-col justify-between h-full">
                <div className="space-y-6">
                  <span className="text-xs font-sans text-primary tracking-wider uppercase block opacity-60">
                    Tailored Roadmap
                  </span>
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground">
                    {activeStakeholder.title}
                  </h2>
                  <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                    {activeStakeholder.desc}
                  </p>

                  {/* Milestones list */}
                  <div className="pt-6">
                    <h4 className="font-heading text-sm text-foreground uppercase tracking-wider mb-4">Milestones &amp; Strategy:</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {activeStakeholder.roadmap.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-muted-foreground font-sans">
                          <span className="w-6 h-6 bg-primary/10 border border-primary/20 flex items-center justify-center text-xs text-primary font-medium font-heading shrink-0">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-6 border-t border-border flex justify-end">
                  <Button asChild>
                    <Link to="/contact">{activeStakeholder.ctaText}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
