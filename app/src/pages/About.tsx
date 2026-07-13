import { useEffect, useState } from 'react';
import ImmersiveHero from '../components/effects/ImmersiveHero';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ChevronRight, MapPin, Globe, Sparkles, BookOpen, Shield } from 'lucide-react';

const translations = {
  altAbout: "About EduPlus",
  aboutCategory: "Inside EduPlus Skills",
  aboutTitleNormal: "Know Who",
  aboutTitleHighlighted: "We Are",
  aboutDesc: "EduPlus Skills is an innovation-led skills and career platform that seamlessly combines education, training, and employment enablement. We operate both online and offline, ensuring access and outreach across regions-from local communities in Manipur to global education and career pathways.",
  learnMore: "Learn More",
  specializeDesc: "We specialize in structured skill-building, career mapping, higher studies support, and curated placement opportunities, supported by a diverse network of experts from India, Asia, and beyond. Our programs are designed to be practical, experiential, and outcomes-focused, so that learning translates directly into confidence, clarity, and career progress.",
  whatWeStandFor: "What We Stand For",
  whatWeStandForDesc: "We believe that every learner deserves clarity of direction, access to opportunity, and the right skills at the right time. Our work centers on reducing confusion, demystifying career decisions, and making high-quality guidance accessible to students as early as school.",
  num01: "01",
  clarityOfDirection: "Clarity of Direction",
  clarityDesc: "Reducing confusion, demystifying career decisions, and making high-quality guidance accessible to students as early as school. We break complex educational decisions down into personalized milestones.",
  num02: "02",
  accessToOpportunity: "Access to Opportunity",
  psychometricSelection: "Psychometric Stream Selection",
  successRate: "94% Success",
  globalMentorship: "Global Mentorship Access",
  coverageRate: "89% Coverage",
  num03: "03",
  rightSkillsTitle: "Right Skills at the Right Time",
  rightSkillsDesc: "Empowering learners with critical soft skills, professional toolkits, and technical readiness designed for a fast-changing global economy.",
  criticalSoftSkills: "Critical Soft Skills & AI",
  criticalSoftSkillsDesc: "Integrated corporate preparedness programs mapped for global academic and corporate team collaboration routes across Singapore and Delhi hubs.",
  greenHydrogen: "Green Hydrogen & Energy Sciences",
  greenHydrogenDesc: "Pioneering clean energy training tracks built to channel local talent in Manipur toward emerging industrial hubs across Southeast Asia.",
  maritimeLogistics: "Maritime Logistics & Port Operations",
  maritimeLogisticsDesc: "Curating deep supply-chain and global port management modules to link Asian logistics experts to global shipping pathways.",
  internationalLaw: "International Law & Public Health",
  internationalLawDesc: "Mentorship channels guided by specialized global advisory councils to prep academic research candidates for top global institutions.",
  multiDomainExpertise: "Multi-Domain Expertise",
  professionalPedigree: "Our Professional Pedigree",
  pedigreeDesc: "Our team combines experience across education, corporate sectors, community development, research, healthcare, law, maritime, communication, and global academia. This multi-domain expertise allows us to build programs that are not only aspirational but deeply grounded in reality.",
  storyMatrixTimeline: "The Story Matrix // Timeline",
  journeyBuiltOnPurpose: "A Journey Built on Purpose",
  chapter01Roots: "Chapter 01 // The Roots",
  chapter01Title: "Nurturing Local Potential",
  chapter01Desc1: "EduPlus Skills originated from a simple yet powerful conviction: that geography should never dictate opportunity. Beginning our work directly at the grassroot levels in Manipur, we set out to build pathways that connect local, talented individuals with world-class capability standards.",
  chapter01Desc2: "We designed our programs not just as abstract courses, but as practical interventions that recognize the cultural, economic, and operational realities of the regions we serve. By building regional access channels, we ensure that learning is immediately relevant and outcomes-driven.",
  chapter02HubModel: "Chapter 02 // The Hub Model",
  chapter02Title: "Connecting East India to Global Networks",
  chapter02Desc1: "To scale our impact, we developed a distributed node network linking local communities to national and international metropolises. Operating active collaboration lines across Manipur, Kolkata, Delhi, and Singapore, we bridge the gap between traditional educational structures and modern professional ecosystems.",
  singapore: "SINGAPORE",
  speechInterventions: "Speech Interventions",
  delhiKolkata: "DELHI & KOLKATA",
  corporateToolkits: "Corporate Toolkits",
  globalAdvisory: "GLOBAL ADVISORY",
  directMentorship: "Direct Mentorship",
  chapter03CorePillars: "Chapter 03 // Core Pillars",
  ourValues: "Our Values & Enablement",
  systemPsychometrics: "SYSTEM // PSYCHOMETRICS",
  connectGlobalNetwork: "CONNECT // GLOBAL_NETWORK",
  chapter04Foundations: "Chapter 04 // Foundations",
  domain_edu: "Education",
  domain_corp: "Corporate leadership",
  domain_comm: "Community development",
  domain_research: "Research",
  domain_health: "Healthcare",
  domain_law: "Law",
  domain_maritime: "Maritime",
  manipurRoot: "MANIPUR ROOT",
  epicenterOpportunity: "Epicenter of Opportunity",
  nexusNode: "NEXUS NODE",
  clarityPipeline: "CLARITY PIPELINE",
  accessNode: "ACCESS NODE",
  skillsReady: "SKILLS READY",
  governance: "GOVERNANCE",
  advisoryCouncil: "ADVISORY COUNCIL"
};

const translationMap = new Map<string, string>(Object.entries(translations));
const t = (key: keyof typeof translations) => translationMap.get(key) || '';

const DOMAIN_KEYS = [
  'domain_edu',
  'domain_corp',
  'domain_comm',
  'domain_research',
  'domain_health',
  'domain_law',
  'domain_maritime'
] as const;

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-32 relative overflow-hidden">
      {/* Decorative Radial Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-none blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-primary/3 rounded-none blur-[150px] pointer-events-none" />

      {/* Immersive Top Hero Viewport */}
      <ImmersiveHero
        bgImage="/images/AboutCollabVisual.png"
        category={t('aboutCategory')}
        titleNormal={t('aboutTitleNormal')}
        titleHighlighted={t('aboutTitleHighlighted')}
        description={t('aboutDesc')}
        telemetryLeft="COLLAB_NEXUS // LOCAL_ROOTS"
        telemetryRight="GLOBAL_VALUE_NETWORKS // ONLINE"
      >
        <Button
          asChild
          className="mt-2 pr-1.5"
        >
          <a href="#story" className="hover:text-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors">
            <span className="text-nowrap">{t('learnMore')}</span>
            <ChevronRight className="opacity-50" />
          </a>
        </Button>
      </ImmersiveHero>

      {/* Main Container */}
      <div id="story" className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-24">
        
        {/* Story Intro */}
        <div className={`max-w-3xl mb-20 transition-all duration-1000 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-primary block mb-2">
            {t('storyMatrixTimeline')}
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
            {t('journeyBuiltOnPurpose')}
          </h2>
          <p className="font-sans text-muted-foreground text-lg leading-relaxed">
            {t('specializeDesc')}
          </p>
        </div>

        {/* Narrative Vertical Storyline */}
        <div className="relative border-l border-border/80 pl-8 md:pl-16 ml-4 md:ml-8 space-y-24">
          
          {/* Chapter 01: The Genesis */}
          <div className={`relative transition-all duration-1000 delay-100 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Timeline Node */}
            <div className="absolute -left-[41px] md:-left-[73px] top-4 flex items-center justify-center">
              <span className="relative flex h-5 w-5">
                <span className="relative inline-flex rounded-none h-5 w-5 bg-primary border-4 border-background"></span>
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Side: Narrative Card */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-primary/70 block">
                    {t('chapter01Roots')}
                  </span>
                  <div className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground border border-border px-2 py-0.5 bg-card/50">
                    <MapPin className="size-2.5 text-primary" /> Manipur Genesis
                  </div>
                </div>
                <Card className="border border-border/50 bg-card/30 backdrop-blur-sm shadow-sm p-6 space-y-4">
                  <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                    {t('chapter01Title')}
                  </h3>
                  <p className="font-sans text-muted-foreground leading-relaxed text-sm">
                    {t('chapter01Desc1')}
                  </p>
                  <p className="font-sans text-muted-foreground leading-relaxed text-sm">
                    {t('chapter01Desc2')}
                  </p>
                </Card>
              </div>

              {/* Right Side: Propagation Visualization */}
              <div className="lg:col-span-5 self-stretch flex flex-col justify-center">
                <div className="relative h-56 w-full overflow-hidden rounded-none bg-card/10 border border-border/50 flex flex-col justify-end p-6">
                  {/* Visual Background */}
                  <div aria-hidden className="absolute inset-0 select-none pointer-events-none">
                    <div className="bg-primary/25 absolute inset-y-0 left-1/2 w-px"></div>
                    <div className="absolute -inset-x-12 top-6 aspect-square rounded-none border border-border/25 animate-[pulse_4s_infinite]"></div>
                    <div className="absolute -inset-x-4 top-16 aspect-square rounded-none border border-dashed border-primary/25"></div>
                    <div className="absolute -inset-x-20 top-24 aspect-square rounded-none border border-border/10"></div>
                  </div>
                  {/* Focal Node */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <div className="relative flex h-4 w-4">
                      <span className="relative inline-flex rounded-none h-4 w-4 bg-primary border-2 border-background"></span>
                    </div>
                    <span className="mt-3 text-[10px] font-mono tracking-[0.3em] text-primary font-bold">{t('manipurRoot')}</span>
                    <span className="mt-1 text-[8px] font-mono text-muted-foreground uppercase">{t('epicenterOpportunity')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter 02: Expansion (The Hub Model) */}
          <div className={`relative transition-all duration-1000 delay-200 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Timeline Node */}
            <div className="absolute -left-[41px] md:-left-[73px] top-4 flex items-center justify-center">
              <span className="relative flex h-5 w-5">
                <span className="relative inline-flex rounded-none h-5 w-5 bg-muted border-4 border-background"></span>
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Side: Narrative Card */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-primary/70 block">
                    {t('chapter02HubModel')}
                  </span>
                  <div className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground border border-border px-2 py-0.5 bg-card/50">
                    <Globe className="size-2.5 text-primary" /> Delhi &amp; SG Connections
                  </div>
                </div>
                <Card className="border border-border/50 bg-card/30 backdrop-blur-sm shadow-sm p-6 space-y-4">
                  <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                    {t('chapter02Title')}
                  </h3>
                  <p className="font-sans text-muted-foreground leading-relaxed text-sm">
                    {t('chapter02Desc1')}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                    <div className="p-3 border border-border/30 bg-background/40 space-y-1">
                      <span className="text-primary block font-semibold text-[10px] tracking-wider">{t('singapore')}</span>
                      <span className="text-muted-foreground text-[10px]">{t('speechInterventions')}</span>
                    </div>
                    <div className="p-3 border border-border/30 bg-background/40 space-y-1">
                      <span className="text-primary block font-semibold text-[10px] tracking-wider">{t('delhiKolkata')}</span>
                      <span className="text-muted-foreground text-[10px]">{t('corporateToolkits')}</span>
                    </div>
                    <div className="p-3 border border-border/30 bg-background/40 space-y-1">
                      <span className="text-primary block font-semibold text-[10px] tracking-wider">{t('globalAdvisory')}</span>
                      <span className="text-muted-foreground text-[10px]">{t('directMentorship')}</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Side: Connections Hub Graph */}
              <div className="lg:col-span-5 self-stretch flex flex-col justify-center">
                <div className="relative h-56 w-full p-5 rounded-none bg-card/10 border border-border/50 flex flex-col justify-between overflow-hidden">
                  {/* Connection Lines Layout */}
                  <div className="absolute top-[28%] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-border/80 to-transparent"></div>
                  <div className="absolute top-[72%] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-border/80 to-transparent"></div>
                  <div className="absolute top-[28%] bottom-[28%] left-1/2 w-px bg-border/80"></div>
                  
                  {/* Dynamic Traversing Signals */}
                  <div className="absolute w-1.5 h-1.5 rounded-none bg-primary/70 animate-[ping_2s_infinite] top-[28%] left-[30%]"></div>
                  <div className="absolute w-1.5 h-1.5 rounded-none bg-primary/70 animate-[ping_2s_infinite] top-[72%] right-[30%]"></div>

                  <div className="relative flex justify-between items-center z-10">
                    <div className="bg-background/90 backdrop-blur-sm shadow-sm ring-1 ring-border rounded-none px-2.5 py-1 text-[9px] font-mono text-muted-foreground flex items-center gap-1.5 hover:ring-primary/40 transition-all select-none">
                      <span className="h-1 w-1 rounded-none bg-primary"></span>
                      SINGAPORE
                    </div>
                    <div className="bg-background/90 backdrop-blur-sm shadow-sm ring-1 ring-border rounded-none px-2.5 py-1 text-[9px] font-mono text-muted-foreground flex items-center gap-1.5 hover:ring-primary/40 transition-all select-none">
                      <span className="h-1 w-1 rounded-none bg-primary"></span>
                      DELHI
                    </div>
                  </div>

                  <div className="relative flex justify-center z-10">
                    <div className="bg-card shadow-black/10 ring-1 ring-primary/30 relative flex h-9 items-center rounded-none px-4 shadow-sm select-none">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-primary">{t('nexusNode')}</span>
                    </div>
                  </div>

                  <div className="relative flex justify-between items-center z-10">
                    <div className="bg-background/90 backdrop-blur-sm shadow-sm ring-1 ring-border rounded-none px-2.5 py-1 text-[9px] font-mono text-muted-foreground flex items-center gap-1.5 hover:ring-primary/40 transition-all select-none">
                      <span className="h-1 w-1 rounded-none bg-primary"></span>
                      KOLKATA
                    </div>
                    <div className="bg-background/90 backdrop-blur-sm shadow-sm ring-1 ring-border rounded-none px-2.5 py-1 text-[9px] font-mono text-muted-foreground flex items-center gap-1.5 hover:ring-primary/40 transition-all select-none">
                      <span className="h-1 w-1 rounded-none bg-primary"></span>
                      GLOBAL ADVISORY
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter 03: Core Pillars */}
          <div className={`relative transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Timeline Node */}
            <div className="absolute -left-[41px] md:-left-[73px] top-4 flex items-center justify-center">
              <span className="relative flex h-5 w-5">
                <span className="relative inline-flex rounded-none h-5 w-5 bg-muted border-4 border-background"></span>
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Side: Narrative Card with Bento Pillars */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-primary/70 block">
                    {t('chapter03CorePillars')}
                  </span>
                  <div className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground border border-border px-2 py-0.5 bg-card/50">
                    <Sparkles className="size-2.5 text-primary" /> {t('whatWeStandFor')}
                  </div>
                </div>
                <Card className="border border-border/50 bg-card/30 backdrop-blur-sm shadow-sm p-6 space-y-6">
                  <div>
                    <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground mb-3">
                      {t('ourValues')}
                    </h3>
                    <p className="font-sans text-muted-foreground leading-relaxed text-sm">
                      {t('whatWeStandForDesc')}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Pillar 1 */}
                    <div className="border border-border/40 p-4 bg-background/30 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-primary font-semibold border border-primary/20 px-1.5 py-0.2 bg-primary/5">{t('num01')}</span>
                        <h4 className="font-sans font-semibold text-xs text-foreground">{t('clarityOfDirection')}</h4>
                      </div>
                      <p className="font-sans text-[11px] text-muted-foreground leading-relaxed">
                        {t('clarityDesc')}
                      </p>
                    </div>

                    {/* Pillar 2 */}
                    <div className="border border-border/40 p-4 bg-background/30 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-primary font-semibold border border-primary/20 px-1.5 py-0.2 bg-primary/5">{t('num02')}</span>
                        <h4 className="font-sans font-semibold text-xs text-foreground">{t('accessToOpportunity')}</h4>
                      </div>
                      <div className="space-y-1 font-sans text-[10px]">
                        <div className="flex justify-between border-b border-border/20 pb-0.5">
                          <span className="text-muted-foreground">{t('psychometricSelection')}</span>
                          <span className="text-primary font-semibold">{t('successRate')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t('globalMentorship')}</span>
                          <span className="text-primary font-semibold">{t('coverageRate')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pillar 3 */}
                  <div className="border border-border/40 p-4 bg-background/30 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-primary font-semibold border border-primary/20 px-1.5 py-0.2 bg-primary/5">{t('num03')}</span>
                      <h4 className="font-sans font-semibold text-xs text-foreground">{t('rightSkillsTitle')}</h4>
                    </div>
                    <p className="font-sans text-[11px] text-muted-foreground leading-relaxed">
                      {t('rightSkillsDesc')}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-background/60 p-3 border border-border/30">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-semibold text-primary font-sans block">{t('criticalSoftSkills')}</span>
                        <p className="text-[9px] text-muted-foreground leading-normal">{t('criticalSoftSkillsDesc')}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-semibold text-primary font-sans block">{t('greenHydrogen')}</span>
                        <p className="text-[9px] text-muted-foreground leading-normal">{t('greenHydrogenDesc')}</p>
                      </div>
                      <div className="space-y-0.5 border-t border-border/20 pt-1.5">
                        <span className="text-[10px] font-semibold text-primary font-sans block">{t('maritimeLogistics')}</span>
                        <p className="text-[9px] text-muted-foreground leading-normal">{t('maritimeLogisticsDesc')}</p>
                      </div>
                      <div className="space-y-0.5 border-t border-border/20 pt-1.5">
                        <span className="text-[10px] font-semibold text-primary font-sans block">{t('internationalLaw')}</span>
                        <p className="text-[9px] text-muted-foreground leading-normal">{t('internationalLawDesc')}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Side: Milestone Matrix Graphic */}
              <div className="lg:col-span-5 self-stretch flex flex-col justify-center">
                <div className="relative h-56 w-full px-5 py-8 rounded-none bg-card/10 border border-border/50 flex justify-between items-end overflow-hidden">
                  {/* Grid Lines */}
                  {Array.from({ length: 15 }).map((_, i) => {
                    const isHighlighted = i === 2 || i === 7 || i === 12;
                    return (
                      <div key={i} className="flex flex-col items-center gap-1 h-full w-px bg-foreground/10 relative">
                        {isHighlighted && (
                          <>
                            <div className="absolute inset-0 bg-primary/60 w-0.5"></div>
                            <div className="absolute -top-3 w-1.5 h-1.5 rounded-none bg-primary"></div>
                          </>
                        )}
                      </div>
                    );
                  })}
                  <div className="absolute inset-x-0 bottom-1 flex justify-between px-3 text-[8px] font-mono text-muted-foreground bg-background/80 py-1 border-t border-border/40 z-10">
                    <span>{t('clarityPipeline')}</span>
                    <span>{t('accessNode')}</span>
                    <span>{t('skillsReady')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter 04: The Professional Pedigree */}
          <div className={`relative transition-all duration-1000 delay-500 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Timeline Node */}
            <div className="absolute -left-[41px] md:-left-[73px] top-4 flex items-center justify-center">
              <span className="relative flex h-5 w-5">
                <span className="relative inline-flex rounded-none h-5 w-5 bg-primary border-4 border-background"></span>
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Side: Narrative Card */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-primary/70 block">
                    {t('chapter04Foundations')}
                  </span>
                  <div className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground border border-border px-2 py-0.5 bg-card/50">
                    <BookOpen className="size-2.5 text-primary" /> {t('multiDomainExpertise')}
                  </div>
                </div>
                <Card className="border border-border/50 bg-card/30 backdrop-blur-sm shadow-sm p-6 space-y-4">
                  <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                    {t('professionalPedigree')}
                  </h3>
                  <p className="font-sans text-muted-foreground leading-relaxed text-sm">
                    {t('pedigreeDesc')}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {DOMAIN_KEYS.map(key => (
                      <span key={key} className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground border border-border/40 px-2 py-1 bg-background/50">
                        {t(key)}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Side: Enterprise Protection Shield */}
              <div className="lg:col-span-5 self-stretch flex flex-col justify-center">
                <div className="relative h-56 w-full flex items-center justify-center rounded-none bg-card/10 border border-border/50 overflow-hidden">
                  <Shield className="absolute inset-0 top-3 size-full stroke-[0.05px] opacity-10 text-primary" />
                  <Shield className="size-36 stroke-[0.15px] text-primary" />
                  <div className="absolute text-center space-y-1">
                    <span className="block text-[11px] font-mono font-bold tracking-[0.25em] text-foreground">{t('governance')}</span>
                    <span className="block text-[8px] font-mono text-muted-foreground tracking-widest">{t('advisoryCouncil')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
