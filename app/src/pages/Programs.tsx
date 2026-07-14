import { useEffect, useState } from 'react';
import { EditorialHero } from '../components/layout/EditorialHero';
import { Button } from '../components/ui/button';
import { SurfaceCard } from '../components/effects/SurfaceCard';
import { ArrowRight, Compass, Layers, Users, GraduationCap, Rocket, Lightbulb, Star, Shield } from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '../lib/utils';

const translations = {
  heroCategory: "Curriculum Pathways",
  heroTitleNormal: "Future-Ready",
  heroTitleHighlighted: "Programs",
  heroDesc: "Interconnected modules from discovery to global career launch.",
  skillRoadmaps: "Skill Roadmaps // Interactive Pathways",
  skillEnhancementJourney: "The Skill Enhancement Journey",
  selectPhase: "Select a phase on the interactive pipeline below to inspect curriculum details, outcomes, and routing.",
  activeNode: "ACTIVE_NODE",
  coreProgramOutcomes: "Core Program Outcomes:",
  requestAdvisoryConsult: "Request Advisory Consult",
  refRoute: "REF // COGNITIVE_ROUTE_0",
  discoveryScan: "Aptitude Scan // Discovery_Active",
  communication: "COMMUNICATION",
  resilience: "RESILIENCE",
  humanCapabilityMatrix: "HUMAN CAPABILITIES",
  criticalThinking: "CRITICAL THINKING",
  adaptability: "ADAPTABILITY",
  expertLiveConnect: "EXPERT LIVE CONNECT",
  admissionsStudio: "ADMISSIONS STUDIO",
  domesticPrep: "DOMESTIC (JEE/NEET)",
  globalPrep: "GLOBAL (SAT/GRE/IELTS)",
  resumeOptimization: "RESUME OPTIMIZATION",
  interviewFeedback: "INTERVIEW FEEDBACK",
  globalPlacement: "GLOBAL PLACEMENT",
  systemicScale: "SYSTEMIC SCALE",
  pedagogyLabs: "PEDAGOGY & LABS"
};

const translationMap = new Map<string, string>(Object.entries(translations));
const t = (key: keyof typeof translations) => translationMap.get(key) || '';

interface Program {
  title: string;
  tagline: string;
  shortDesc: string;
  longDesc: string;
  outcomes: string[];
  icon: any;
  phaseCode: string;
}

const PROGRAMS_DATA: Program[] = [
  {
    title: 'FuturePath Navigator',
    tagline: 'Discover Your True Potential',
    shortDesc: 'Decodes natural strengths, interests, and aptitudes using scientific psychometric assessments and DMIT evaluations for smarter stream selection.',
    longDesc: `FuturePath Navigator helps school students understand who they are before deciding where to go. Through scientifically designed psychometric assessments and DMIT-based evaluations, we decode each learner's natural strengths, interests, and aptitudes. This data-driven insight becomes the foundation for smarter academic and career choices.\n\nStudents receive one-on-one counseling sessions with certified professionals who translate assessment outcomes into clear, relatable guidance. We build detailed career maps that connect personality traits, academic performance, and real-world opportunities, highlighting both emerging and traditional fields. Learners also receive direction on subject selection aligned with their long-term goals, making board and stream choices more confident and informed.`,
    outcomes: ['Scientific Strengths Mapping', '1-on-1 Counseling Sessions', 'Custom academic and career roadmaps', 'Board & subject selection clarity'],
    icon: Compass,
    phaseCode: 'PHASE_01 // DISCOVERY'
  },
  {
    title: 'LifeSkills Lab',
    tagline: "Building Tomorrow's Leaders Today",
    shortDesc: 'Equips students with critical communication, critical thinking, emotional intelligence, financial literacy, and adaptability workshops.',
    longDesc: `LifeSkills Lab equips students with the non-negotiable soft skills and human capabilities that define success beyond grades. In a world where automation and AI reshape work, communication, critical thinking, emotional intelligence, and adaptability become differentiators. Our program ensures learners don't just perform in exams-they thrive in life.\n\nCore modules cover verbal, written, and presentation skills so that students can express themselves clearly and confidently in any setting. We develop analytical reasoning and problem-solving abilities through scenario-based challenges and decision-making frameworks. Emotional intelligence modules build self-awareness, empathy, and relationship management skills. We also train students in time management, organization, leadership, teamwork, financial literacy, and digital literacy.`,
    outcomes: ['Aesthetic verbal & written communication', 'Critical analytical reasoning skills', 'Emotional resilience and collaboration', 'Budgeting & financial literacy basics'],
    icon: Layers,
    phaseCode: 'PHASE_02 // HUMAN_CAPABILITY'
  },
  {
    title: 'Expert Connect Live',
    tagline: 'Learn from the Best',
    shortDesc: 'Interactive mentorship and live Q&A sessions connecting students directly with corporate professionals, academics, and global leaders.',
    longDesc: `Once learners identify their areas of interest, Expert Connect Live connects them directly with people who live and work in those worlds. Students engage with subject matter experts, industry leaders, and experienced academics who offer insights far beyond textbooks.\n\nThrough live Q&A sessions, webinars, panel discussions, mentorship conversations, and hands-on project guidance, students see how concepts translate into careers. Mentors help them understand real job roles, industry expectations, future trends, and pathways to build relevant skills. For ambitious learners, these sessions often become the first step toward internships, collaborations, and long-term professional networks.`,
    outcomes: ['Direct global professional networks', 'Real-world career path exposure', 'Live interactive mentoring workshops', 'Project-based coaching'],
    icon: Users,
    phaseCode: 'PHASE_03 // DIRECT_MENTORSHIP'
  },
  {
    title: 'Global Admissions Studio',
    tagline: 'Your Gateway to Global Education',
    shortDesc: 'End-to-end guidance for domestic competitive prep (JEE/NEET) and international admissions (SAT/GRE/essay writing/visas).',
    longDesc: `Global Admissions Studio simplifies complex higher education journeys-both within India and abroad. For domestic pathways, we guide learners through competitive exam ecosystems such as JEE, NEET, CUET, CLAT, and other entrance exams, aligning preparation with target institutions and career goals.\n\nWe support students in college selection by considering rankings, course relevance, faculty quality, campus culture, and long-term outcomes. Our team assists with applications, documentation, and scholarship or financial aid information.\n\nFor international education, we advise on university shortlisting across the USA, UK, Canada, Australia, Europe, and Asia. We support standardized test preparation-including SAT, ACT, GRE, GMAT, IELTS, and TOEFL-alongside guidance for crafting compelling Statements of Purpose and admissions essays. We also provide detailed visa guidance, interview preparation, and pre-departure briefings.`,
    outcomes: ['Domestic & international application support', 'Standardized test strategies (SAT, IELTS, etc.)', 'Compelling Statement of Purpose guidance', 'Visa documentation and mock interview prep'],
    icon: GraduationCap,
    phaseCode: 'PHASE_04 // PREPARATION'
  },
  {
    title: 'Career Launchpad',
    tagline: 'Launch Your Career with Confidence',
    shortDesc: 'Bridges talent to opportunities with resume building, LinkedIn optimization, mock interviews, and local/global placements.',
    longDesc: `Career Launchpad connects skilled individuals to real opportunities in India and abroad, closing the loop between learning and employment. We work with fresh graduates, career switchers, and experienced professionals seeking global exposure.\n\nOur placement services include resume and portfolio building, LinkedIn profile optimization, and targeted interview preparation through mock sessions and feedback loops. We leverage an extensive network of corporate partners and recruiters to match candidates with roles aligned to their skills, interests, and career goals.\n\nOpportunities span IT, healthcare, finance, engineering, management, and more, covering metro hubs as well as emerging Tier-2 and Tier-3 cities in India. For international careers, we support placements and opportunities across the Middle East, Europe, North America, Asia-Pacific, and Africa.`,
    outcomes: ['Resume and LinkedIn portfolio design', 'Rigorous mock interview evaluations', 'Tier-1 & international placement channels', 'Career transitions counseling'],
    icon: Rocket,
    phaseCode: 'PHASE_05 // PLACEMENT'
  },
  {
    title: 'Innovation Studio & Educator Academy',
    tagline: 'Innovation in Education Starts Here',
    shortDesc: 'Sets up school STEM/robotics spaces for project incubation, alongside modern pedagogical training and growth tracks for teachers.',
    longDesc: `Innovation Studio transforms schools into hubs of creativity, research, and entrepreneurship. We design and set up innovation labs, STEM and robotics spaces, and creative learning environments that encourage students to experiment, build, and solve real problems. Through guided research projects, competitions, and entrepreneurship programs, learners prototype ideas, explore startup thinking, and understand how to convert concepts into impact.\n\nEducator Academy is our dedicated track for teachers and school leaders. We offer advanced training in modern pedagogy, classroom management, and curriculum delivery, alongside workshops on integrating technology, digital platforms, and e-learning tools. Subject-specific sessions deepen content delivery and assessment strategies, and professional development tracks focus on leadership, emotional intelligence, and career growth for educators.`,
    outcomes: ['STEM & Robotics lab installation models', 'Alpha Project incubation support', 'Modern pedagogy and e-learning training', 'Educator mentorship and resources'],
    icon: Lightbulb,
    phaseCode: 'PHASE_06 // SYSTEMIC_SCALE'
  }
];

export default function Programs() {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeProgram = PROGRAMS_DATA.find((_, i) => i === activeIdx) || PROGRAMS_DATA[0];
  const ActiveIcon = activeProgram.icon;

  return (
    <div className="min-h-screen bg-background text-foreground pb-32 relative overflow-hidden">
      <EditorialHero
        image="/images/CurriculumVisual.webp"
        imageAlt="East Asian learners exploring practical education pathways"
        eyebrow={t('heroCategory')}
        title={<>{t('heroTitleNormal')} <span className="text-primary">{t('heroTitleHighlighted')}</span></>}
        description={t('heroDesc')}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-20">
        
        {/* Pathway intro */}
        <div className={`max-w-3xl mb-16 transition-all duration-1000 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="eyebrow block mb-2">
            {t('skillRoadmaps')}
          </span>
          <h2 className="section-title text-foreground mb-4">
            {t('skillEnhancementJourney')}
          </h2>
          <p className="font-sans text-muted-foreground text-base leading-relaxed">
            {t('selectPhase')}
          </p>
        </div>

        {/* Master Stepper and Content Layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          
          {/* Left Column: Vertical Interactive Journey Stepper */}
          <div className="relative min-w-0 space-y-6">
            
            {/* Thread line connecting nodes */}
            <div className="absolute left-[26px] top-6 bottom-6 w-px bg-border -z-10" />

            {PROGRAMS_DATA.map((prog, index) => {
              const Icon = prog.icon;
              const isActive = index === activeIdx;

              return (
                <button /* ui-ignore */
                  key={prog.title}
                  onClick={() => setActiveIdx(index)}
                  data-selected={isActive}
                  className="w-full text-left flex items-start gap-4 p-4 border transition-all duration-500 rounded-none relative outline-none focus:ring-1 focus:ring-primary/30 bg-card/40 border-border hover:border-primary/30 hover:bg-card/70 hover:translate-x-1 data-[selected=true]:bg-card data-[selected=true]:border-primary/50 data-[selected=true]:shadow-md data-[selected=true]:translate-x-2 group/btn"
                >
                  {/* Step status dot indicator */}
                  <div className="relative z-10 mt-1 shrink-0">
                    <div className="w-6 h-6 rounded-none flex items-center justify-center font-sans text-xs border transition-all duration-300 bg-background text-muted-foreground border-border group-data-[selected=true]/btn:bg-primary group-data-[selected=true]/btn:text-background group-data-[selected=true]/btn:border-primary">
                      0{index + 1}
                    </div>
                    {isActive && (
                      <span className="absolute -inset-1 rounded-none border border-primary/40 -z-10" />
                    )}
                  </div>

                  {/* Step name / summary */}
                  <div className="space-y-1">
                    <span className="font-sans text-xs uppercase tracking-wider text-primary block">
                      {prog.phaseCode.split(' // ')[0]}
                    </span>
                    <h3 className="font-sans font-semibold text-sm transition-colors duration-300 text-muted-foreground group-data-[selected=true]/btn:text-foreground group-hover/btn:text-foreground">
                      {prog.title}
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground leading-normal line-clamp-1">
                      {prog.tagline}
                    </p>
                  </div>

                  {/* Icon indicator right */}
                  <div className="ml-auto mt-2 shrink-0">
                    <Icon className="size-4 transition-colors duration-300 text-muted-foreground/40 group-data-[selected=true]/btn:text-primary group-hover/btn:text-primary" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Phase Dossier Viewer using MagicCard */}
          <div className="min-w-0">
            <div className="sticky top-28">
              <SurfaceCard heightClass="h-auto min-h-[640px]">
                <div className="flex flex-col justify-between h-full space-y-6">
                  
                  {/* Visual Top Header Box (Dynamic Background & SVGs) */}
                  <div className="relative h-56 border-b border-border/80 flex items-center justify-center bg-card/10 overflow-hidden -mx-6 -mt-6 mb-2">
                    
                    {/* Dynamic Shifting Grid Background */}
                    <div
                      aria-hidden
                      className={cn(
                        'absolute inset-0 grid grid-cols-4 opacity-15 transition-all duration-700 ease-in-out select-none pointer-events-none',
                        activeIdx === 0 && '[&>*]:bg-gradient-to-t grid-cols-1 grid-rows-6',
                        activeIdx === 1 && '[&>*]:bg-gradient-to-b grid-cols-3 opacity-20',
                        activeIdx === 2 && '[&>*]:bg-gradient-to-r opacity-30',
                        activeIdx === 3 && '[&>*]:bg-gradient-to-l grid-cols-2 opacity-25',
                        activeIdx === 4 && '[&>*]:bg-gradient-to-tr grid-cols-3',
                        activeIdx === 5 && '[&>*]:bg-gradient-to-br opacity-20'
                      )}
                    >
                      <div className="bg-gradient-to-r from-primary/10 to-transparent" />
                      <div className="bg-gradient-to-r from-primary/10 to-transparent" />
                      <div className="bg-gradient-to-r from-primary/10 to-transparent" />
                      <div className="bg-gradient-to-r from-primary/10 to-transparent" />
                    </div>
                    
                    {/* Phase Illustrations */}
                    {activeIdx === 0 && <DiscoveryIllustration />}
                    {activeIdx === 1 && <CapabilityIllustration />}
                    {activeIdx === 2 && <MentorshipIllustration />}
                    {activeIdx === 3 && <PrepIllustration />}
                    {activeIdx === 4 && <PlacementIllustration />}
                    {activeIdx === 5 && <SystemicIllustration />}
                  </div>

                  {/* Header */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <span className="font-sans text-xs tracking-widest text-primary font-bold uppercase">
                        {activeProgram.phaseCode}
                      </span>
                      <div className="flex items-center gap-1.5 font-sans text-xs tracking-[0.2em] text-muted-foreground border border-border px-2 py-0.5 bg-background/60">
                        <span className="w-1.5 h-1.5 bg-primary rounded-none" />
                        {t('activeNode')}
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <ActiveIcon className="size-6 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs font-sans tracking-widest text-muted-foreground block uppercase">
                          {activeProgram.tagline}
                        </span>
                        <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                          {activeProgram.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Body description */}
                  <div className="space-y-4 font-sans text-sm text-muted-foreground leading-relaxed flex-1">
                    {activeProgram.longDesc.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {/* Focus areas & outcome pills */}
                  <div className="space-y-4 border-t border-border pt-6">
                    <h4 className="font-sans text-xs uppercase tracking-widest text-foreground font-semibold flex items-center gap-1.5">
                      <Star className="size-3 text-primary fill-primary" /> {t('coreProgramOutcomes')}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {activeProgram.outcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-muted-foreground font-sans bg-muted/20 border border-border p-2">
                          <span className="text-primary font-sans select-none mt-0.5">&bull;</span>
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Footer */}
                  <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="font-sans text-xs text-muted-foreground uppercase">
                      {t('refRoute')}{activeIdx + 1}
                    </span>
                    <Button asChild size="sm" className="w-full sm:w-auto font-sans text-xs uppercase tracking-wider">
                      <Link to="/guidance" /* ui-ignore */>
                        {t('requestAdvisoryConsult')}
                        <ArrowRight className="size-3.5 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </SurfaceCard>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

{/* Visual Illustration Subcomponents */}

const DiscoveryIllustration = () => {
  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      <Compass className="absolute size-12 text-primary/80 animate-[spin_12s_linear_infinite]" />
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
        <div className="size-36 rounded-none border border-primary/25 opacity-60"></div>
        <div className="size-28 rounded-none border border-dashed border-primary/20"></div>
        <div className="size-20 rounded-none border border-border/40"></div>
      </div>
      {/* Sweeper arm */}
      <div className="absolute size-44 rounded-none border border-primary/10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-tr from-primary/10 to-transparent origin-top-left animate-[spin_4s_linear_infinite]" style={{ transformOrigin: '0 0' }} /* ui-ignore */></div>
      </div>
      <span className="absolute bottom-3 font-sans text-xs text-muted-foreground/60 uppercase tracking-[0.25em]">{t('discoveryScan')}</span>
    </div>
  );
};

const CapabilityIllustration = () => {
  return (
    <div className="relative h-full w-full flex flex-col justify-center items-center gap-1.5 overflow-hidden px-8">
      <div className="flex w-full justify-between items-center gap-3 relative">
        <div className="h-px bg-border/60 absolute inset-x-0 top-1/2 -translate-y-1/2 -z-10"></div>
        <div className="bg-background shadow-xs border border-border rounded-none px-2.5 py-1.5 flex items-center gap-1.5 select-none hover:border-primary/50 transition-colors">
          <div className="size-1.5 rounded-none bg-primary"></div>
          <span className="font-sans text-xs text-muted-foreground/90">{t('communication')}</span>
        </div>
        <div className="bg-background shadow-xs border border-border rounded-none px-2.5 py-1.5 flex items-center gap-1.5 select-none hover:border-primary/50 transition-colors">
          <div className="size-1.5 rounded-none bg-primary"></div>
          <span className="font-sans text-xs text-muted-foreground/90">{t('resilience')}</span>
        </div>
      </div>
      
      <div className="w-px h-6 bg-border/60"></div>
      <div className="flex w-full justify-center items-center select-none z-10">
        <div className="bg-primary/5 border border-primary/20 rounded-none px-4 py-2 text-xs font-sans text-primary font-bold tracking-wider shadow-sm">
          {t('humanCapabilityMatrix')}
        </div>
      </div>
      <div className="w-px h-6 bg-border/60"></div>

      <div className="flex w-full justify-between items-center gap-3 relative">
        <div className="h-px bg-border/60 absolute inset-x-0 top-1/2 -translate-y-1/2 -z-10"></div>
        <div className="bg-background shadow-xs border border-border rounded-none px-2.5 py-1.5 flex items-center gap-1.5 select-none hover:border-primary/50 transition-colors">
          <div className="size-1.5 rounded-none bg-primary"></div>
          <span className="font-sans text-xs text-muted-foreground/90">{t('criticalThinking')}</span>
        </div>
        <div className="bg-background shadow-xs border border-border rounded-none px-2.5 py-1.5 flex items-center gap-1.5 select-none hover:border-primary/50 transition-colors">
          <div className="size-1.5 rounded-none bg-primary"></div>
          <span className="font-sans text-xs text-muted-foreground/90">{t('adaptability')}</span>
        </div>
      </div>
    </div>
  );
};

const MentorshipIllustration = () => {
  return (
    <div className="relative h-full w-full flex flex-col justify-between p-5 overflow-hidden">
      <div className="absolute top-[28%] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-border/60 to-transparent"></div>
      <div className="absolute top-[72%] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-border/60 to-transparent"></div>
      <div className="absolute top-[28%] bottom-[72%] left-1/2 w-px bg-border/60"></div>
      <div className="absolute top-[72%] bottom-[28%] left-1/2 w-px bg-border/60"></div>
      <div className="absolute w-1 h-1 rounded-none bg-primary/70 animate-[ping_2s_infinite] top-[28%] left-[30%]"></div>
      <div className="absolute w-1 h-1 rounded-none bg-primary/70 animate-[ping_2s_infinite] top-[72%] right-[30%]"></div>

      <div className="relative flex justify-between items-center z-10">
        <div className="bg-background/90  border border-border rounded-none px-2 py-0.5 text-xs font-sans text-muted-foreground flex items-center gap-1 hover:border-primary/50 transition-all select-none">
          <span className="h-1 w-1 rounded-none bg-primary"></span>
          ACADEMIC COUNCIL
        </div>
        <div className="bg-background/90  border border-border rounded-none px-2 py-0.5 text-xs font-sans text-muted-foreground flex items-center gap-1 hover:border-primary/50 transition-all select-none">
          <span className="h-1 w-1 rounded-none bg-primary"></span>
          INDUSTRY LEADERS
        </div>
      </div>

      <div className="relative flex justify-center z-10">
        <div className="bg-card shadow-sm border border-primary/20 relative flex h-7 items-center rounded-none px-3 select-none">
          <span className="text-xs font-sans font-bold tracking-wider text-primary">{t('expertLiveConnect')}</span>
        </div>
      </div>

      <div className="relative flex justify-between items-center z-10">
        <div className="bg-background/90  border border-border rounded-none px-2 py-0.5 text-xs font-sans text-muted-foreground flex items-center gap-1 hover:border-primary/50 transition-all select-none">
          <span className="h-1 w-1 rounded-none bg-primary"></span>
          RESEARCH MENTORS
        </div>
        <div className="bg-background/90  border border-border rounded-none px-2 py-0.5 text-xs font-sans text-muted-foreground flex items-center gap-1 hover:border-primary/50 transition-all select-none">
          <span className="h-1 w-1 rounded-none bg-primary"></span>
          GLOBAL SCHOLARS
        </div>
      </div>
    </div>
  );
};

const PrepIllustration = () => {
  return (
    <div className="relative h-full w-full flex items-center justify-between px-6 overflow-hidden">
      {/* Central Node */}
      <div className="bg-background/90 border border-border p-2 rounded-none z-10 select-none shadow-xs flex flex-col items-center max-w-[120px]">
        <GraduationCap className="size-4.5 text-primary mb-0.5" />
        <span className="font-sans text-xs text-muted-foreground tracking-wider uppercase">{t('admissionsStudio')}</span>
      </div>
      {/* Connecting Paths */}
      <div className="absolute inset-0 select-none pointer-events-none flex items-center">
        <div className="w-[45%] h-px bg-border/60 absolute left-10"></div>
        <svg className="w-full h-full absolute inset-0 text-border/60" viewBox="0 0 350 200" fill="none">
          <path d="M160,100 L280,50" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M160,100 L280,150" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      {/* Destination Nodes */}
      <div className="flex flex-col gap-6 z-10">
        <div className="bg-background/90 border border-border px-2.5 py-1 rounded-none select-none shadow-xs flex items-center gap-1 hover:border-primary/50 transition-colors">
          <div className="size-1 rounded-none bg-primary"></div>
          <span className="font-sans text-xs text-muted-foreground/90 uppercase tracking-wide">{t('domesticPrep')}</span>
        </div>
        <div className="bg-background/90 border border-border px-2.5 py-1 rounded-none select-none shadow-xs flex items-center gap-1 hover:border-primary/50 transition-colors">
          <div className="size-1 rounded-none bg-primary"></div>
          <span className="font-sans text-xs text-muted-foreground/90 uppercase tracking-wide">{t('globalPrep')}</span>
        </div>
      </div>
    </div>
  );
};

const PlacementIllustration = () => {
  return (
    <div className="relative h-full w-full flex justify-between items-end px-5 py-6 overflow-hidden">
      {/* Background matrix bars */}
      {Array.from({ length: 15 }).map((_, i) => {
        const isHighlighted = i === 2 || i === 7 || i === 12;
        return (
          <div key={i} className="flex flex-col items-center gap-1 h-full w-px bg-foreground/10 relative">
            {isHighlighted && (
              <>
                <div className="absolute inset-0 bg-primary/60 w-0.5"></div>
                <div className="absolute -top-3 w-1 h-1 rounded-none bg-primary"></div>
              </>
            )}
          </div>
        );
      })}
      <div className="absolute inset-x-0 bottom-1 flex justify-between px-3 text-xs font-sans text-muted-foreground bg-background/80 py-0.5 border-t border-border/40 z-10">
        <span>{t('resumeOptimization')}</span>
        <span>{t('interviewFeedback')}</span>
        <span>{t('globalPlacement')}</span>
      </div>
    </div>
  );
};

const SystemicIllustration = () => {
  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      <Shield className="absolute inset-0 top-1 size-full stroke-[0.05px] opacity-10 text-primary" />
      <Shield className="size-24 stroke-[0.15px] text-primary" />
      <div className="absolute text-center space-y-1">
        <Lightbulb className="size-4.5 text-primary mx-auto" />
        <span className="block text-xs font-sans font-bold tracking-[0.2em] text-foreground">{t('systemicScale')}</span>
        <span className="block text-xs font-sans text-muted-foreground tracking-widest">{t('pedagogyLabs')}</span>
      </div>
    </div>
  );
};
