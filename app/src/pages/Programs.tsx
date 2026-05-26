import { useEffect, useState } from 'react';
import ImmersiveHero from '../components/effects/ImmersiveHero';
import { Button } from '../components/ui/button';
import { NeonGradientCard } from '../components/ui/neon-gradient-card';
import Magnet from '../components/effects/Magnet';
import { ArrowRight, Compass, Layers, Users, GraduationCap, Rocket, Lightbulb, Star, Shield, ClipboardList, HelpCircle } from 'lucide-react';
import { Link } from 'react-router';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const translations = {
  heroCategory: "Curriculum Pathways",
  heroTitleNormal: "Future-Ready",
  heroTitleHighlighted: "Programs",
  heroDesc: "At EduPlus Skills, our programs are designed as interconnected modules that support learners at every milestone-from discovering their strengths to launching global careers.",
  telemetryLeft: "EXPLORATION_STUDIO // VR_ACTIVE",
  telemetryRight: "FUTURE_PATHWAYS // SYS_ADMIS",
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
  humanCapabilityMatrix: "HUMAN CAPABILITY MATRIX",
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
  pedagogyLabs: "PEDAGOGY & LABS",

  // Merged from SignatureExperiences
  expHeroCategory: "Flagship Events",
  expHeroTitleNormal: "Signature",
  expHeroTitleHighlighted: "Experiences",
  expHeroDesc: "Our flagship events bring energy, community, and real-world exposure into the learning experience. These curated experiences connect students, educators, and industry experts.",
  timelineHeader: "Flagship Event Logs // Historical Tracks",
  durationLabel: "DURATION // ",
  targetLabel: "TARGET // ",
  highlightsHeader: "Experience Highlights:",
  
  // Event 1
  evt1Title: "Winter Camp",
  evt1Subtitle: "Ignite Curiosity",
  evt1Duration: "5–7 Days Immersive",
  evt1Target: "Middle & High School Students",
  evt1Desc: "An immersive journey blending technical skill development, creativity, and adventure. Designed to unlock hidden talents and spark early curiosity about STEM fields, culture, and career pathways.",
  evt1Highlight1: "Interactive STEM & Robotics labs",
  evt1Highlight2: "Adventure-based team-building",
  evt1Highlight3: "Creative arts & cultural showcases",
  evt1Highlight4: "Early career discovery workshops",

  // Event 2
  evt2Title: "Summer Camp",
  evt2Subtitle: "Scale Your Potential",
  evt2Duration: "2–3 Weeks Bootcamp",
  evt2Target: "High School & Higher Secondary",
  evt2Desc: "An intensive, project-driven camp designed to build future academic profiles, college readiness, and competitive advantages for higher education selection.",
  evt2Highlight1: "Advanced subject & exam bootcamps",
  evt2Highlight2: "Leadership & public speaking modules",
  evt2Highlight3: "Corporate & industry exposure visits",
  evt2Highlight4: "Project-based innovation challenges",

  // Event 3
  evt3Title: "Education Fair",
  evt3Subtitle: "Connect, Explore, Decide",
  evt3Duration: "1–2 Days Expo",
  evt3Target: "Aspirants, Parents, & Educators",
  evt3Desc: "Our premier annual expo bringing global universities, career counselors, financial institutions, and industry advisors together under one roof to simplify admissions.",
  evt3Highlight1: "Interact with university officials",
  evt3Highlight2: "Free psychometrics & aptitude assessments",
  evt3Highlight3: "Admissions & visa masterclasses",
  evt3Highlight4: "Scholarship & financial aid seminars",

  // FAQs
  faqTitle: "Frequently Asked Questions",
  faqSubtitle: "Got questions about our camps or fair? Find answers to commonly asked questions below.",
  faqContactText: "Need more help? ",
  faqContactLink: "Contact our coordination team",
  
  // FAQs Cat 1: Registration
  faqCat1Title: "Registration & Requirements",
  faqCat1Q1: "Who is eligible to join the Winter and Summer camps?",
  faqCat1A1: "Winter Camp is open to Middle & High School students (grades 6-10). Summer Camp is tailored for High School & Higher Secondary students preparing for college profile building.",
  faqCat1Q2: "How do I register for the upcoming Education Fair?",
  faqCat1A2: "Registration for the Education Fair is free for parents, students, and educators. Simply register online via our dashboard to reserve your entry pass.",
  
  // FAQs Cat 2: Accommodation
  faqCat2Title: "Accommodation & Safety",
  faqCat2Q1: "Are the immersive camps residential?",
  faqCat2A1: "Yes, both camps offer secure, fully supervised residential facilities with separate hostels for boys and girls, nutritious meals, and 24/7 staff support.",
  faqCat2Q2: "What safety measures are in place during camp activities?",
  faqCat2A2: "All technical workshops and outdoor team-building activities are guided by certified instructors, with comprehensive emergency medical services on-site.",

  // FAQs Cat 3: Support
  faqCat3Title: "Fees & Financial Aid",
  faqCat3Q1: "Do you offer scholarships or sibling discounts?",
  faqCat3A1: "Yes, we offer early-bird discounts, sibling packages, and need-based scholarships for talented students from grassroots backgrounds. Apply during enrollment.",
  faqCat3Q2: "What is the refund policy for cancellations?",
  faqCat3A2: "Cancellations made 14 days prior to the camp start date are eligible for a full refund. Cancellations made within 14 days will be issued as credits for future programs."
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

const PROGRAM_IMAGES = [
  '/assets/futurepath-navigator.png',
  '/assets/lifeskills-lab.png',
  '/assets/expert-connect.png',
  '/assets/global-admissions.png',
  '/assets/career-launchpad.png',
  '/assets/innovation-studio.png'
];

const EVENTS_KEYS = [
  {
    title: 'evt1Title',
    subtitle: 'evt1Subtitle',
    duration: 'evt1Duration',
    target: 'evt1Target',
    desc: 'evt1Desc',
    highlights: ['evt1Highlight1', 'evt1Highlight2', 'evt1Highlight3', 'evt1Highlight4'],
    status: 'LOG_01 // COMPLETED',
    active: false
  },
  {
    title: 'evt2Title',
    subtitle: 'evt2Subtitle',
    duration: 'evt2Duration',
    target: 'evt2Target',
    desc: 'evt2Desc',
    highlights: ['evt2Highlight1', 'evt2Highlight2', 'evt2Highlight3', 'evt2Highlight4'],
    status: 'LOG_02 // COMPLETED',
    active: false
  },
  {
    title: 'evt3Title',
    subtitle: 'evt3Subtitle',
    duration: 'evt3Duration',
    target: 'evt3Target',
    desc: 'evt3Desc',
    highlights: ['evt3Highlight1', 'evt3Highlight2', 'evt3Highlight3', 'evt3Highlight4'],
    status: 'LOG_03 // ACTIVE_ENROLLMENT',
    active: true
  }
] as const;

const faqCategories = [
  {
    title: 'faqCat1Title' as const,
    icon: ClipboardList,
    items: [
      {
        id: 'faq-1-1',
        question: 'faqCat1Q1' as const,
        answer: 'faqCat1A1' as const,
      },
      {
        id: 'faq-1-2',
        question: 'faqCat1Q2' as const,
        answer: 'faqCat1A2' as const,
      },
    ],
  },
  {
    title: 'faqCat2Title' as const,
    icon: Shield,
    items: [
      {
        id: 'faq-2-1',
        question: 'faqCat2Q1' as const,
        answer: 'faqCat2A1' as const,
      },
      {
        id: 'faq-2-2',
        question: 'faqCat2Q2' as const,
        answer: 'faqCat2A2' as const,
      },
    ],
  },
  {
    title: 'faqCat3Title' as const,
    icon: HelpCircle,
    items: [
      {
        id: 'faq-3-1',
        question: 'faqCat3Q1' as const,
        answer: 'faqCat3A1' as const,
      },
      {
        id: 'faq-3-2',
        question: 'faqCat3Q2' as const,
        answer: 'faqCat3A2' as const,
      },
    ],
  },
] as const;

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
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-none blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-primary/3 rounded-none blur-[150px] pointer-events-none" />

      {/* Immersive Top Hero Viewport */}
      <ImmersiveHero
        category={t('heroCategory')}
        titleNormal={t('heroTitleNormal')}
        titleHighlighted={t('heroTitleHighlighted')}
        description={t('heroDesc')}
        telemetryLeft={t('telemetryLeft')}
        telemetryRight={t('telemetryRight')}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-20">
        
        {/* Pathway intro */}
        <div className={`max-w-3xl mb-16 transition-all duration-1000 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-primary block mb-2">
            {t('skillRoadmaps')}
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
            {t('skillEnhancementJourney')}
          </h2>
          <p className="font-sans text-muted-foreground text-base leading-relaxed">
            {t('selectPhase')}
          </p>
        </div>

        {/* Master Stepper and Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Vertical Interactive Journey Stepper */}
          <div className="lg:col-span-5 relative space-y-6">
            
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
                  <Magnet range={40} strength={0.4} className="relative z-10 mt-1 shrink-0">
                    <div className="w-6 h-6 rounded-none flex items-center justify-center font-mono text-[10px] border transition-all duration-300 bg-background text-muted-foreground border-border group-data-[selected=true]/btn:bg-primary group-data-[selected=true]/btn:text-background group-data-[selected=true]/btn:border-primary">
                      0{index + 1}
                    </div>
                    {isActive && (
                      <span className="absolute -inset-1 rounded-none border border-primary/40 animate-ping -z-10" />
                    )}
                  </Magnet>

                  {/* Step name / summary */}
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-primary block">
                      {prog.phaseCode.split(' // ')[0]}
                    </span>
                    <h3 className="font-sans font-semibold text-sm transition-colors duration-300 text-muted-foreground group-data-[selected=true]/btn:text-foreground group-hover/btn:text-foreground">
                      {prog.title}
                    </h3>
                    <p className="font-sans text-[11px] text-muted-foreground leading-normal line-clamp-1">
                      {prog.tagline}
                    </p>
                  </div>

                  {/* Icon indicator right */}
                  <Magnet range={30} strength={0.3} className="ml-auto mt-2 shrink-0">
                    <Icon className="size-4 transition-colors duration-300 text-muted-foreground/40 group-data-[selected=true]/btn:text-primary group-hover/btn:text-primary" />
                  </Magnet>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Phase Dossier Viewer using NeonGradientCard */}
          <div className="lg:col-span-7">
            <div className="sticky top-28">
              <NeonGradientCard className="border border-border/50 h-auto min-h-[640px]">
                <div className="flex flex-col justify-between h-full space-y-6">
                  
                  {/* Visual Top Header Box with Diorama Image */}
                  <div className="relative w-[calc(100%+3rem)] aspect-video border-b border-border/80 overflow-hidden -mx-6 -mt-6 mb-2 group/program-image">
                    {/* Image Background */}
                    <img
                      src={PROGRAM_IMAGES[activeIdx]}
                      alt={activeProgram.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-95 transition-transform duration-700 group-hover/program-image:scale-105"
                    />
                    {/* Overlay gradient to keep text highly readable */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-[1]" />
                  </div>

                  {/* Header */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <span className="font-mono text-[10px] tracking-widest text-primary font-bold uppercase">
                        {activeProgram.phaseCode}
                      </span>
                      <div className="flex items-center gap-1.5 font-mono text-[8px] tracking-[0.2em] text-muted-foreground border border-border px-2 py-0.5 bg-background/60">
                        <span className="w-1.5 h-1.5 bg-primary rounded-none animate-pulse" />
                        {t('activeNode')}
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <ActiveIcon className="size-6 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs font-mono tracking-widest text-muted-foreground block uppercase">
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
                    <h4 className="font-mono text-[10px] uppercase tracking-widest text-foreground font-semibold flex items-center gap-1.5">
                      <Star className="size-3 text-primary fill-primary" /> {t('coreProgramOutcomes')}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {activeProgram.outcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-muted-foreground font-sans bg-muted/20 border border-border p-2">
                          <span className="text-primary font-mono select-none mt-0.5">&bull;</span>
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Footer */}
                  <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="font-mono text-[9px] text-muted-foreground uppercase">
                      {t('refRoute')}{activeIdx + 1}
                    </span>
                    <Button asChild size="sm" className="w-full sm:w-auto font-mono text-[10px] uppercase tracking-wider">
                      <Link to="/connect" /* ui-ignore */>
                        {t('requestAdvisoryConsult')}
                        <ArrowRight className="size-3.5 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </NeonGradientCard>
            </div>
          </div>

        </div>

        {/* Immersive Flagship Experiences Section */}
        <section id="experiences" className="mt-32 border-t border-border/60 pt-24">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-primary block mb-2">
              {t('timelineHeader')}
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
              {t('expHeroTitleNormal')} {t('expHeroTitleHighlighted')}
            </h2>
            <p className="font-sans text-muted-foreground text-base leading-relaxed">
              {t('expHeroDesc')}
            </p>
          </div>

          {/* Timeline Path */}
          <div className="relative border-l border-border pl-8 md:pl-16 ml-4 md:ml-8 space-y-16">
            {EVENTS_KEYS.map((event, idx) => {
              const hasPing = event.active;

              return (
                <div 
                  key={event.title}
                  className="relative sticky transition-all duration-1000 transform"
                  style={{
                    top: `${120 + idx * 32}px`,
                  }}
                >
                  {/* Timeline node */}
                  <div className="absolute -left-[41px] md:-left-[73px] top-4 flex items-center justify-center">
                    <span className="relative flex h-5 w-5">
                      {hasPing && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-primary/20 opacity-75"></span>
                      )}
                      <span className={`relative inline-flex rounded-none h-5 w-5 border-4 border-background ${
                        hasPing ? 'bg-primary' : 'bg-muted'
                      }`}></span>
                    </span>
                  </div>

                  {/* Event details card */}
                  <NeonGradientCard className="border border-border/50 h-auto">
                    <div className="p-2 space-y-6">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-4">
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-widest text-primary/70 block mb-1">
                            {event.status}
                          </span>
                          <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                            {t(event.title)}
                          </h3>
                          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mt-0.5">
                            {t(event.subtitle)}
                          </span>
                        </div>

                        {/* Telemetry info */}
                        <div className="space-y-2 font-mono text-[10px] bg-background/50 border border-border/80 p-3 shrink-0">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">{t('durationLabel')}</span>
                            <Badge variant="secondary" className="font-mono text-[9px] py-0 px-1.5 rounded-none">{t(event.duration)}</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">{t('targetLabel')}</span>
                            <span className="text-primary font-semibold">{t(event.target)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Desc */}
                      <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                        {t(event.desc)}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-4 border-t border-border/40 pt-4">
                        <h4 className="font-mono text-[10px] uppercase tracking-widest text-foreground font-bold flex items-center gap-1.5">
                          <Star className="size-3 text-primary fill-primary" /> {t('highlightsHeader')}
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3 text-xs font-sans">
                          {event.highlights.map((hl, hIdx) => (
                            <div key={hIdx} className="flex items-center gap-2 text-muted-foreground bg-muted/20 border border-border p-2">
                              <span className="text-primary font-mono select-none">&bull;</span>
                              <span>{t(hl)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </NeonGradientCard>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQs Section */}
        <section className="mt-28 border-t border-border/60 pt-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-semibold text-foreground tracking-tight">{t('faqTitle')}</h2>
              <p className="text-muted-foreground mt-3 text-sm">{t('faqSubtitle')}</p>
            </div>
            
            <div className="grid gap-6">
              {faqCategories.map((category) => (
                <div
                  key={category.title}
                  className="border border-border bg-card/40 p-5 backdrop-blur-sm"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <category.icon className="text-primary size-4" />
                    <h3 className="font-heading text-base font-semibold text-foreground tracking-tight">{t(category.title)}</h3>
                  </div>
                  
                  <Accordion
                    type="single"
                    collapsible
                    className="border-none bg-transparent flex flex-col gap-2"
                  >
                    {category.items.map((item) => (
                      <AccordionItem
                        key={item.id}
                        value={item.id}
                        className="border border-border/40 bg-background/30 rounded-none not-last:border-b-0"
                      >
                        <AccordionTrigger className="cursor-pointer px-4 py-3 text-xs font-semibold hover:no-underline font-mono uppercase tracking-wider text-left text-foreground">
                          {t(item.question)}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <p className="text-muted-foreground text-xs font-sans leading-relaxed">{t(item.answer)}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
            
            <p className="text-muted-foreground mt-12 text-center text-xs font-mono">
              {t('faqContactText')}
              <Link to="/connect" className="text-primary font-semibold hover:text-[#7DF9FF] focus:outline-none focus:ring-1 focus:ring-[#7DF9FF] hover:underline">
                {t('faqContactLink')}
              </Link>
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}


