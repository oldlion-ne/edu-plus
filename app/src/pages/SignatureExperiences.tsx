import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { EditorialHero } from '../components/layout/EditorialHero';
import { SurfaceCard } from '../components/effects/SurfaceCard';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, ClipboardList, Shield, HelpCircle } from 'lucide-react';
import { UpcomingEvents } from '../components/events/UpcomingEvents';

const translations = {
  heroCategory: "Flagship Events",
  heroTitleNormal: "Signature",
  heroTitleHighlighted: "Experiences",
  heroDesc: "Curated experiences connecting students, educators, and industry.",
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

export default function SignatureExperiences() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-32 relative overflow-hidden">
      <EditorialHero
        variant="full-bleed"
        image="/images/EventsVisual.webp"
        imageAlt="East Asian learners gathering for a community workshop"
        eyebrow={t('heroCategory')}
        title={<>{t('heroTitleNormal')} <span className="text-primary">{t('heroTitleHighlighted')}</span></>}
        description={t('heroDesc')}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-20">
        <UpcomingEvents />
        
        {/* Intro */}
        <div className={`max-w-3xl mb-16 transition-all duration-1000 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="eyebrow block mb-2">
            {t('timelineHeader')}
          </span>
          <h2 className="section-title text-foreground mb-4">
            {t('heroTitleNormal')} {t('heroTitleHighlighted')}
          </h2>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-border pl-8 md:pl-16 ml-4 md:ml-8 space-y-16">
          
          {EVENTS_KEYS.map((event, idx) => {
            const hasPing = event.active;

            return (
              <div 
                key={event.title}
                className={`relative transition-all duration-1000 transform ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                {/* Timeline node */}
                <div className="absolute -left-[41px] md:-left-[73px] top-4 flex items-center justify-center">
                  <span className="relative flex h-5 w-5">
                    <span className={`relative inline-flex rounded-none h-5 w-5 border-4 border-background ${
                      hasPing ? 'bg-primary' : 'bg-muted'
                    }`}></span>
                  </span>
                </div>

                {/* Event details card */}
                <SurfaceCard heightClass="h-auto">
                  <div className="p-2 space-y-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-4">
                      <div>
                        <span className="font-sans text-xs uppercase tracking-widest text-primary/70 block mb-1">
                          {event.status}
                        </span>
                        <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                          {t(event.title)}
                        </h3>
                        <span className="text-xs font-sans text-muted-foreground uppercase tracking-widest block mt-0.5">
                          {t(event.subtitle)}
                        </span>
                      </div>

                      {/* Telemetry info */}
                      <div className="space-y-2 font-sans text-xs bg-background/50 border border-border/80 p-3 shrink-0">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{t('durationLabel')}</span>
                          <Badge variant="secondary" className="font-sans text-xs py-0 px-1.5 rounded-none">{t(event.duration)}</Badge>
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
                      <h4 className="font-sans text-xs uppercase tracking-widest text-foreground font-bold flex items-center gap-1.5">
                        <Star className="size-3 text-primary fill-primary" /> {t('highlightsHeader')}
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3 text-xs font-sans">
                        {event.highlights.map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 text-muted-foreground bg-muted/20 border border-border p-2">
                            <span className="text-primary font-sans select-none">&bull;</span>
                            <span>{t(hl)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </SurfaceCard>
              </div>
            );
          })}

        </div>

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
                  className="border border-border bg-card/40 p-5 "
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
                        <AccordionTrigger className="cursor-pointer px-4 py-3 text-xs font-semibold hover:no-underline font-sans uppercase tracking-wider text-left text-foreground">
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
            
            <p className="text-muted-foreground mt-12 text-center text-xs font-sans">
              {t('faqContactText')}
          <Link to="/contact" className="text-primary font-semibold hover:text-foreground focus:outline-none focus:ring-1 focus:ring-primary hover:underline">
                {t('faqContactLink')}
              </Link>
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
