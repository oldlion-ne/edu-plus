import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import ImmersiveHero from '../components/effects/ImmersiveHero';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { SurfaceCard } from '../components/effects/SurfaceCard';
import { ArrowRight, Check } from 'lucide-react';

const translations = {
  heroCategory: "Advisory Services",
  heroTitleNormal: "One-to-One",
  heroTitleHighlighted: "Guidance",
  heroDesc: "EduPlus Skills offers dedicated, one-on-one support tailored to each stakeholder in the education ecosystem. We guide you toward realistic, fulfilling paths with confidence.",
  tailoredRoadmap: "Tailored Roadmap",
  milestonesStrategy: "Milestones & Strategy:",
  logPort: "LOG_PORT: TERMINAL_EXECUTION_DEV",
  terminalExecSh: "EXEC_SH",
  terminalReadyPrmpt: "READY_PRMPT",
  
  // Call to Action
  ctaTitle: "Transform Your Learning & Career Journey",
  ctaDesc: "Experience the power of structured, one-on-one expert counseling. Get absolute clarity on your core strengths and actionable map directions.",
  ctaBenefit1: "1-on-1 Personalized Discovery Session",
  ctaBenefit2: "Aptitude & Cognitive Mapping (DMIT)",
  ctaBenefit3: "Detailed Career Pathway & College Prep Reports",
  ctaBenefit4: "Direct Alignment With Global Internships & Camps",
  ctaStartingAt: "Starting at",
  ctaFreeLabel: "Discovery Call",
  ctaFreeSubText: "Free forever for initial discovery sessions",
  ctaButtonText: "Book Free Advisory Consult",
  
  // Tabs
  studentsLabel: "For Students",
  parentsLabel: "For Parents",
  seekersLabel: "For Job Seekers",
  teachersLabel: "For Teachers",
  
  // Student data
  studentsTitle: "Chart Your Personal Academic & Career Path",
  studentsDesc: "Navigate academic choices, discover your passions, and understand how your strengths connect to real-world opportunities. From subject selection and career mapping to entrance exam strategies and higher studies planning, you gain a personal roadmap instead of generic advice.",
  studentsCta: "Schedule Student Advisory",
  
  // Parents data
  parentsTitle: "Empower Your Child Without the Pressure",
  parentsDesc: "Equip yourself with the tools, frameworks, and information needed to support your child's professional and personal growth. Our sessions help you decode rapidly changing education and career landscapes so that you can guide-not pressure-your child toward realistic, fulfilling paths.",
  parentsCta: "Schedule Parent Consultation",
  
  // Seekers data
  seekersTitle: "Bridge the Gap Between Learning & Placement",
  seekersDesc: "Support your professional transition with structured career counseling, profile building, and targeted upskilling recommendations. Gain absolute clarity on your core strengths, international options, and the actions required to move from where you are to where you want to be.",
  seekersCta: "Launch Placement Pathway",
  
  // Teachers data
  teachersTitle: "Evolve From Instructors Into Mentors",
  teachersDesc: "Enhance your classroom impact, mentorship capabilities, and academic leadership profile. Through reflective coaching, modern pedagogy training, and technology integration workshops, learn how to guide students not only to test success but to life readiness.",
  teachersCta: "Register for Educator Mentorship",
  
  // Roadmap milestones
  studentMilestone1: "Core Strengths & Passion Discovery",
  studentMilestone2: "Customized Subject & Stream Selection",
  studentMilestone3: "Entrance Exam (JEE, NEET, CUET) Goal-Setting",
  studentMilestone4: "University Matching & Application Strategy",
  
  parentMilestone1: "Understanding Modern Career Landscapes",
  parentMilestone2: "DMIT & Psychometrics Outcomes Explanation",
  parentMilestone3: "Academic Stress Mitigation Strategies",
  parentMilestone4: "Financial Planning for Higher Education",
  
  seekerMilestone1: "Industrial Skill Gap Assessments",
  seekerMilestone2: "Resume & LinkedIn Profile Optimization",
  seekerMilestone3: "Mock Technical & HR Interviews",
  seekerMilestone4: "Global Job Placement Routing",
  
  teacherMilestone1: "Advanced Pedagogy & Active Learning",
  teacherMilestone2: "E-Learning & Tech Tools Integration",
  teacherMilestone3: "Student Mentorship & Counseling Basics",
  teacherMilestone4: "Professional Leadership & Career Growth"
};

const translationMap = new Map<string, string>(Object.entries(translations));
const t = (key: keyof typeof translations) => translationMap.get(key) || '';

interface StakeholderDetails {
  id: string;
  labelKey: keyof typeof translations;
  titleKey: keyof typeof translations;
  descKey: keyof typeof translations;
  roadmapKeys: (keyof typeof translations)[];
  ctaTextKey: keyof typeof translations;
}

const STAKEHOLDERS: StakeholderDetails[] = [
  {
    id: 'students',
    labelKey: 'studentsLabel',
    titleKey: 'studentsTitle',
    descKey: 'studentsDesc',
    roadmapKeys: [
      'studentMilestone1',
      'studentMilestone2',
      'studentMilestone3',
      'studentMilestone4'
    ],
    ctaTextKey: 'studentsCta'
  },
  {
    id: 'parents',
    labelKey: 'parentsLabel',
    titleKey: 'parentsTitle',
    descKey: 'parentsDesc',
    roadmapKeys: [
      'parentMilestone1',
      'parentMilestone2',
      'parentMilestone3',
      'parentMilestone4'
    ],
    ctaTextKey: 'parentsCta'
  },
  {
    id: 'seekers',
    labelKey: 'seekersLabel',
    titleKey: 'seekersTitle',
    descKey: 'seekersDesc',
    roadmapKeys: [
      'seekerMilestone1',
      'seekerMilestone2',
      'seekerMilestone3',
      'seekerMilestone4'
    ],
    ctaTextKey: 'seekersCta'
  },
  {
    id: 'teachers',
    labelKey: 'teachersLabel',
    titleKey: 'teachersTitle',
    descKey: 'teachersDesc',
    roadmapKeys: [
      'teacherMilestone1',
      'teacherMilestone2',
      'teacherMilestone3',
      'teacherMilestone4'
    ],
    ctaTextKey: 'teachersCta'
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

    const scripts = new Map<string, string[]>([
      ['students', [
        '[GUEST@EDU-PLUS:~]$ ./futurepath-navigator.sh --assess',
        '>> INITIALIZING PSYCHOMETRIC TEST ENGINE...',
        '>> CAPTURING STRENGTHS MATRIX [COGNITIVE & CREATIVE]...',
        '>> COMPILING APTITUDE FEEDBACK NODES...',
        '>> RESULT:',
        '   - STEM APTITUDE: 94.2%',
        '   - SPATIAL INTERPRETATION: 88.6%',
        '   - RECOMMENDATION: APPLIED SCIENCES & DEEP TECH',
        '>> SYSTEM STATUS: READY FOR 1-ON-1 ADVISORY SESSION _'
      ]],
      ['parents', [
        '[GUEST@EDU-PLUS:~]$ ./parent-consultation.sh --mitigate',
        '>> LOADING ACADEMIC STRESS INDEX (ASI)...',
        '>> DETECTING BOARD EXAM PRESSURE INDICES...',
        '>> COMPUTING STRESS MITIGATION METRICS...',
        '>> RECOMMENDATIONS GENERATED:',
        '   - WEEKLY DISCOVERY TRACKING',
        '   - NON-INTRUSIVE ACADEMIC PROGRESS CHECKS',
        '   - FINANCIAL PLAN MATCHED TO ASIA GOALS',
        '>> SYSTEM STATUS: STRATEGY SHEET READY _'
      ]],
      ['seekers', [
        '[GUEST@EDU-PLUS:~]$ ./career-launchpad.sh --region "singapore"',
        '>> RUNNING SKILLS CAPABILITY GAP ANALYSIS...',
        '>> SCANNING RESUME FOR DIGITAL AND ANALYTICAL TOOLS...',
        '>> MATCHING PLACEMENT PORTALS IN SE ASIA...',
        '>> COMPILING METRICS:',
        '   - TOOL COMPATIBILITY: 91%',
        '   - REGIONAL FIT INDEX: 97.4%',
        '   - GLOBAL ROUTING STATUS: PLACEMENT-READY',
        '>> SYSTEM STATUS: RESUME OPTIMIZED FOR SG PORTAL _'
      ]],
      ['teachers', [
        '[GUEST@EDU-PLUS:~]$ ./educator-academy.sh --train',
        '>> LOADING PEDAGOGICAL METRIC DIAGNOSTICS...',
        '>> VERIFYING ACTIVE-LEARNING MODULE RATINGS...',
        '>> BENCHMARKING SYSTEM CLASS INTEGRATION RATIO...',
        '>> PERFORMANCE:',
        '   - CLASS ENGAGEMENT INDEX: +34%',
        '   - HYBRID TECH BENCHMARK: EXCELLENT',
        '   - OUTCOMES METRIC: 98.2/100',
        '>> SYSTEM STATUS: REGISTRATION COMPLETED _'
      ]]
    ]);

    const lines = scripts.get(activeTab) || [];
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
        bgImage="/images/MentorshipVisual.webp"
        category={t('heroCategory')}
        titleNormal={t('heroTitleNormal')}
        titleHighlighted={t('heroTitleHighlighted')}
        description={t('heroDesc')}
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
                <button /* ui-ignore */
                  key={stakeholder.id}
                  onClick={() => setActiveTab(stakeholder.id)}
                  className={`px-4 py-3 text-left font-sans text-sm tracking-wide transition-all duration-300 w-full border-l-2 ${
                    activeTab === stakeholder.id
                      ? 'text-primary bg-primary/5 border-l-primary font-semibold'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5 border-l-transparent'
                  }`}
                >
                  {t(stakeholder.labelKey)}
                </button>
              ))}
            </div>

            {/* Retro Terminal Log */}
            <div className="border border-border bg-card/60 backdrop-blur-sm p-1">
                <div className="bg-card p-4 font-mono text-[10px] leading-relaxed text-primary h-[220px] overflow-hidden select-none flex flex-col justify-start relative">
                {/* Console header */}
                <div className="flex justify-between items-center text-[8px] text-primary/60 border-b border-border pb-2 mb-3">
                  <span>{t('logPort')}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-primary" />
                    {isRunning ? t('terminalExecSh') : t('terminalReadyPrmpt')}
                  </span>
                </div>

                {/* Log outputs stream */}
                <div className="space-y-1 overflow-y-auto flex-1 font-mono pr-2">
                  {terminalLogs.map((log, idx) => {
                    const isCmd = log.startsWith('[GUEST');
                    return (
                      <div key={idx} className={isCmd ? 'text-primary' : 'text-muted-foreground'}>
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
            <SurfaceCard heightClass="min-h-[460px]">
              <div className="flex flex-col justify-between h-full space-y-6 p-2">
                <div className="space-y-6">
                  <span className="text-xs font-mono text-primary tracking-wider uppercase block opacity-60">
                    {t('tailoredRoadmap')}
                  </span>
                  <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                    {t(activeStakeholder.titleKey)}
                  </h2>
                  <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                    {t(activeStakeholder.descKey)}
                  </p>

                  {/* Milestones list */}
                  <div className="pt-6">
                    <h4 className="font-mono text-xs text-foreground uppercase tracking-wider mb-4">
                      {t('milestonesStrategy')}
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {activeStakeholder.roadmapKeys.map((stepKey, idx) => (
                        <div key={stepKey} className="flex items-center gap-3 text-sm text-muted-foreground font-sans">
                          <span className="w-6 h-6 bg-primary/10 border border-primary/20 flex items-center justify-center text-xs text-primary font-medium font-heading shrink-0">
                            {idx + 1}
                          </span>
                          <span>{t(stepKey)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-6 border-t border-border flex justify-end">
                  <Button asChild>
                    <Link to="/contact" /* ui-ignore */>{t(activeStakeholder.ctaTextKey)}</Link>
                  </Button>
                </div>
              </div>
            </SurfaceCard>
          </div>

        </div>

        {/* Call to Action Section */}
        <section className="mt-28 border-t border-border/60 pt-20">
          <div className="max-w-3xl mx-auto">
            <Card
              className="bg-card/40 border border-border grid md:grid-cols-2 gap-8 p-6 md:p-8 backdrop-blur-sm rounded-none"
            >
              <div>
                <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                  {t('ctaTitle')}
                </h3>
                <p className="text-muted-foreground mt-3 text-xs leading-relaxed font-sans">
                  {t('ctaDesc')}
                </p>
                <ul className="mt-6 space-y-2">
                  {[
                    t('ctaBenefit1'),
                    t('ctaBenefit2'),
                    t('ctaBenefit3'),
                    t('ctaBenefit4')
                  ].map((benefit, index) => (
                    <li
                      key={index}
                      className="text-muted-foreground flex items-center gap-2 text-xs font-sans"
                    >
                      <Check className="text-primary size-4 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-muted/30 flex flex-col justify-center rounded-none border border-border/60 p-6">
                <p className="text-muted-foreground text-xs font-mono uppercase tracking-wider">{t('ctaStartingAt')}</p>
                <p className="mt-1 font-heading text-4xl font-bold text-foreground">
                  $0<span className="text-muted-foreground text-lg font-normal">/month</span>
                </p>
                <p className="text-muted-foreground mt-2 text-xs font-sans">{t('ctaFreeSubText')}</p>
                <Button
                  asChild
                  className="mt-6 gap-2 rounded-none font-mono text-xs uppercase tracking-wider h-10 w-full"
                >
                  <Link to="/contact" /* ui-ignore */>
                    {t('ctaButtonText')}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </section>

      </div>
    </div>
  );
}
