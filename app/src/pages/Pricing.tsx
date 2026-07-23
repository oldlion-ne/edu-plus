import { useEffect, useState } from 'react';
import { PageHero } from '../components/ui/page-hero';
import { Button } from '../components/ui/button';
import { InvisibleCard } from '../components/ui/invisible-card';
import { PageContainer, PageSection, AnimatedHeader } from '../components/ui/page-layout';
import { Check, HelpCircle, ArrowRight, User, Building, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '../lib/utils';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { editorialIllustrations } from '../lib/editorialIllustrations';

const translations = {
  heroCategory: "Platform Access",
  heroTitleNormal: "EduPlus Access Tracks",
  heroDesc: "Join our ecosystem. We are rolling out our advanced advisory features in phases. Start for free today and secure your spot in our upcoming premium cohorts.",
  studentTab: "Student / Individual",
  instituteTab: "Institute / School",
  studentSubtitle: "Personalized pathways for career discovery and academic readiness",
  instituteSubtitle: "Enterprise solutions to scale innovation and pedagogy across cohorts",
  perMonth: "",
  billedMonthly: "Early Access rollout pricing.",
  popular: "Most Popular",
  getStarted: "Get Started Now",
  contactSales: "Request Advisory Consult",
  featuresHeader: "Key Features Included:",
  comparisonTitle: "Detailed Program Coverage",
  comparisonSubtitle: "See how our 6 core EduPlus Skill programs align with each tier.",
  faqTitle: "Access & Rollout FAQs",
  faqSubtitle: "Have questions about our rollout phases or beta access? Find answers below.",
  faqContactText: "Need customized institutional access? ",
  faqContactLink: "Connect with our advisory board",
};

const translationMap = new Map<string, string>(Object.entries(translations));
const t = (key: keyof typeof translations) => translationMap.get(key) || '';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  popular: boolean;
  ctaText: string;
  ctaLink: string;
}

const STUDENT_PLANS: Plan[] = [
  {
    id: "student-explorer",
    name: "Explorer",
    price: "Free",
    period: "Open Access",
    description: "Discover your baseline strengths and explore career pathways.",
    features: [
      { text: "FuturePath Navigator psychometric scan preview", included: true },
      { text: "Access to public learning resources & blogs", included: true },
      { text: "Join the community networking channels", included: true },
      { text: "LifeSkills Lab trial workshops", included: false },
      { text: "1-on-1 advisor counseling sessions", included: false },
      { text: "Global Admissions Studio access", included: false },
      { text: "Career Launchpad & placements portal", included: false },
    ],
    popular: false,
    ctaText: "Join Now",
    ctaLink: "/connect"
  },
  {
    id: "student-scholar",
    name: "Scholar",
    price: "Waitlist",
    period: "Beta Phase",
    description: "Deep dive into strengths and begin structural human capability building.",
    features: [
      { text: "Full FuturePath Navigator psychometric mapping", included: true },
      { text: "1-on-1 expert advisory review (1 session/mo)", included: true },
      { text: "LifeSkills Lab (Communication & critical thinking)", included: true },
      { text: "Expert Connect Live group mentorship (2/mo)", included: true },
      { text: "Domestic admissions (JEE/NEET) advisory guides", included: true },
      { text: "Global Admissions Studio suite", included: false },
      { text: "Career Launchpad & resume optimizer", included: false },
    ],
    popular: false,
    ctaText: "Join Waitlist",
    ctaLink: "/connect"
  },
  {
    id: "student-champion",
    name: "Champion",
    price: "Invite Only",
    period: "Q1 Launch",
    description: "Complete future-ready suite for global admissions and placements.",
    features: [
      { text: "Everything in Scholar tier", included: true },
      { text: "Unlimited Expert Connect Live mentorship", included: true },
      { text: "Global Admissions Studio (SAT/IELTS, visas, SOPs)", included: true },
      { text: "Career Launchpad (Resume, LinkedIn & placements)", included: true },
      { text: "Rigorous 1-on-1 mock interview feedback loops", included: true },
      { text: "Priority access to Winter/Summer camps", included: true },
      { text: "Admissions scholarship matching assistance", included: true },
    ],
    popular: true,
    ctaText: "Request Invite",
    ctaLink: "/connect"
  }
];

const INSTITUTE_PLANS: Plan[] = [
  {
    id: "institute-starter",
    name: "Starter Cohort",
    price: "Pilot",
    period: "Open",
    description: "Equip small student cohorts with modern career guidance frameworks.",
    features: [
      { text: "Enroll up to 50 active students", included: true },
      { text: "FuturePath Navigator psychometrics for cohort", included: true },
      { text: "LifeSkills Lab monthly school workshops", included: true },
      { text: "Basic student engagement reporting dashboard", included: true },
      { text: "1-on-1 counseling slots for top 10% students", included: true },
      { text: "Innovation Studio lab equipment model setup", included: false },
      { text: "Educator Academy teacher training tracks", included: false },
    ],
    popular: false,
    ctaText: "Start Pilot",
    ctaLink: "/connect"
  },
  {
    id: "institute-professional",
    name: "Professional Hub",
    price: "Waitlist",
    period: "Q3 Launch",
    description: "Scale future path discovery, counseling, and placements school-wide.",
    features: [
      { text: "Enroll up to 200 active students", included: true },
      { text: "All 6 programs integrated for school cohort", included: true },
      { text: "Monthly Expert Connect Live school webinars", included: true },
      { text: "Global Admissions Studio tools for counseling department", included: true },
      { text: "Advanced student analytics & performance tracking", included: true },
      { text: "Dedicated academic advisor & account manager", included: true },
      { text: "Educator Academy certification slots (5 teachers)", included: true },
    ],
    popular: true,
    ctaText: "Join Waitlist",
    ctaLink: "/connect"
  },
  {
    id: "institute-enterprise",
    name: "Enterprise Core",
    price: "Custom",
    period: "Bespoke",
    description: "India's National Education Policy (NEP) 2020 implementation and custom school setups.",
    features: [
      { text: "Unlimited student enrollment", included: true },
      { text: "Custom physical Robotics & Innovation labs (Innovation Studio)", included: true },
      { text: "Full Educator Academy implementation & pedagogy audits", included: true },
      { text: "White-labeled student dashboard with school branding", included: true },
      { text: "Dedicated on-site coordinators & workshop leaders", included: true },
      { text: "Custom API & SIS integrations", included: true },
      { text: "Priority VIP admission fair university representation", included: true },
    ],
    popular: false,
    ctaText: "Request Audit",
    ctaLink: "/connect"
  }
];

const COMPARISON_ROWS = [
  {
    program: "FuturePath Navigator",
    student: ["Aptitude Scan", "Full Profile", "Full Profile + 1-on-1 Support"],
    institute: ["Cohort Assessment", "Cohort Assessment + Advising", "Bespoke Audits"]
  },
  {
    program: "LifeSkills Lab",
    student: ["Not Included", "Core Workshops", "Unlimited Modules"],
    institute: ["Monthly Workshops", "Integrated Modules", "Bespoke On-Site Labs"]
  },
  {
    program: "Expert Connect Live",
    student: ["Not Included", "2 Sessions/Mo", "Unlimited Sessions"],
    institute: ["Not Included", "Monthly Webinars", "Dedicated Mentorship Panels"]
  },
  {
    program: "Global Admissions Studio",
    student: ["Not Included", "Domestic Advisory", "Global Prep (SAT/Visas/SOPs)"],
    institute: ["Not Included", "Counselor Dashboard", "Bespoke University Channels"]
  },
  {
    program: "Career Launchpad",
    student: ["Not Included", "Basic Directory", "Resume/LinkedIn + Placements"],
    institute: ["Not Included", "Standard Placements Portal", "Exclusive Corporate Drives"]
  },
  {
    program: "Innovation Studio & Educator Academy",
    student: ["Not Included", "Not Included", "Camp Priority Access"],
    institute: ["Not Included", "5 Teacher Slots", "Custom Labs + School-Wide Training"]
  }
];

const FAQS_DATA = [
  {
    id: "pricing-faq-1",
    question: "When will the waitlisted features launch?",
    answer: "We are rolling out our advanced features in phases throughout the year. Waitlisted members get priority access and beta invitations as soon as cohorts open."
  },
  {
    id: "pricing-faq-2",
    question: "Is the Explorer tier truly free?",
    answer: "Yes! Our foundational mission is to ensure every student has access to basic psychometric scans and community resources at absolutely zero cost."
  },
  {
    id: "pricing-faq-3",
    question: "How do I request an invite to the Champion tier?",
    answer: "You can request an invite by contacting our advisory board through the Connect page. We select highly motivated students for our exclusive beta groups based on their career goals."
  },
  {
    id: "pricing-faq-4",
    question: "Do you offer demo accounts for schools?",
    answer: "Absolutely. We offer an evaluation environment for school boards and counseling teams to inspect the psychometrics, counseling, and reporting dashboard as part of a free pilot."
  },
  {
    id: "pricing-faq-5",
    question: "What happens after the Beta phase ends?",
    answer: "Users who join during the Open Access and Beta phases will be grandfathered into exclusive early-adopter pricing plans when the full commercial platform launches."
  }
];

export default function Pricing() {
  const [mounted, setMounted] = useState(false);
  const [planType, setPlanType] = useState<'student' | 'institute'>('student');

  useEffect(() => {
    setMounted(true);
  }, []);

  const activePlans = planType === 'student' ? STUDENT_PLANS : INSTITUTE_PLANS;

  return (
    <div className="flex-1 bg-background text-foreground relative">

      {/* Typographic Hero */}
      <PageHero
        eyebrow={t('heroCategory')}
        title={t('heroTitleNormal')}
        description={t('heroDesc')}
        illustration={editorialIllustrations.programs}
      />

      <PageContainer className="mt-16">
        
        {/* Plan Type Selector Toggle */}
        <div className={`flex flex-col items-center justify-center mb-16 transition-all duration-500 ease-out transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="border border-border bg-secondary p-1 flex items-center justify-center rounded-none mb-4">
            <button /* ui-ignore */
              onClick={() => setPlanType('student')}
              className={cn(
                "px-6 py-2.5 text-[14px] font-medium transition-all duration-300 rounded-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                planType === 'student'
                  ? "bg-primary text-background font-bold shadow-none"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-1.5 justify-center">
                <User className="size-4" />
                {t('studentTab')}
              </div>
            </button>
            <button /* ui-ignore */
              onClick={() => setPlanType('institute')}
              className={cn(
                "px-6 py-2.5 text-[14px] font-medium transition-all duration-300 rounded-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                planType === 'institute'
                  ? "bg-primary text-background font-bold shadow-none"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-1.5 justify-center">
                <Building className="size-3.5" />
                {t('instituteTab')}
              </div>
            </button>
          </div>
          <p className="text-muted-foreground text-sm font-sans max-w-lg text-center leading-relaxed">
            {planType === 'student' ? t('studentSubtitle') : t('instituteSubtitle')}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {activePlans.map((plan, idx) => {
            const CardMarkup = (
              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Badge & Popular highlights */}
                  <div className="flex items-center justify-between mb-4 border-b border-border/60 pb-3">
                    <span className="text-[13px] font-medium tracking-wide text-primary uppercase">
                      {plan.name}
                    </span>
                    {plan.popular && (
                      <Badge className="bg-primary text-background hover:bg-primary border-none rounded-none text-[11px] py-0 px-2 uppercase flex items-center gap-1 font-medium">
                        <Sparkles className="size-3 fill-background text-background" />
                        {t('popular')}
                      </Badge>
                    )}
                  </div>

                  {/* Price */}
                  <div className="my-6">
                    <div className="flex items-baseline gap-2 text-foreground">
                      <span className="text-4xl font-light tracking-tight">{plan.price}</span>
                      <span className="text-[13px] font-medium text-muted-foreground uppercase">
                        {plan.price !== 'Custom' && `/ ${plan.period}`}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-muted-foreground block mt-1.5 uppercase tracking-wide">
                      {plan.price === 'Custom' ? 'Tailored to school scale' : t('billedMonthly')}
                    </span>
                  </div>

                  <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6 min-h-[44px]">
                    {plan.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-4 border-t border-border/50 pt-6">
                    <h4 className="text-[12px] font-medium uppercase tracking-wide text-foreground flex items-center gap-1">
                      <ShieldCheck className="size-4 text-primary" /> {t('featuresHeader')}
                    </h4>
                    <ul className="space-y-3 text-[14px]">
                      {plan.features.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className={cn(
                            "flex items-start gap-2.5 leading-relaxed",
                            feature.included ? "text-muted-foreground" : "text-muted-foreground/40 line-through"
                          )}
                        >
                          {feature.included ? (
                            <Check className="size-4 text-primary shrink-0 mt-0.5" />
                          ) : (
                            <span className="text-primary/40 shrink-0 mt-0.5 w-4 text-center">&bull;</span>
                          )}
                          <span>{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-border/50 pt-6 mt-8">
                  <Button
                    asChild
                    size="md"
                    variant={plan.popular ? "default" : "outline"}
                    className="w-full text-[13px] font-medium uppercase tracking-wide rounded-none"
                  >
                    <Link to={plan.ctaLink} /* ui-ignore */>
                      {plan.ctaText}
                      <ArrowRight className="size-3.5 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            );

            return (
              <div key={plan.id} className="relative flex flex-col h-full">
                {plan.popular ? (
                  <InvisibleCard 
                    delay={0.2 + (idx * 0.1)}
                    className="bg-primary/5 border-none h-full flex flex-col justify-between"
                  >
                    {CardMarkup}
                  </InvisibleCard>
                ) : (
                  <InvisibleCard 
                    delay={0.2 + (idx * 0.1)}
                    className="h-full flex flex-col justify-between"
                  >
                    {CardMarkup}
                  </InvisibleCard>
                )}
              </div>
            );
          })}
        </div>

        {/* Detailed Program Coverage Section */}
        <PageSection className="mt-32 pt-20">
          <AnimatedHeader 
            eyebrow="Program Coverage"
            title={t('comparisonTitle')}
            description={t('comparisonSubtitle')}
          />

          <div className="border border-border bg-card/30 overflow-x-auto rounded-none">
            <table className="w-full border-collapse text-[14px] text-left min-w-[700px]">
              <thead>
                <tr className="border-b border-border bg-secondary text-[12px] font-medium uppercase tracking-wide text-muted-foreground">
                  <th className="p-4 w-[250px]">Core Program</th>
                  {planType === 'student' ? (
                    <>
                      <th className="p-4">Explorer (Free)</th>
                      <th className="p-4">Scholar (Waitlist)</th>
                      <th className="p-4 text-primary">Champion (Invite)</th>
                    </>
                  ) : (
                    <>
                      <th className="p-4">Starter (Pilot)</th>
                      <th className="p-4 text-primary">Professional (Waitlist)</th>
                      <th className="p-4">Enterprise (Custom)</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {COMPARISON_ROWS.map((row, idx) => {
                  const values = planType === 'student' ? row.student : row.institute;
                  return (
                    <tr key={idx} className="hover:bg-muted/10 transition-colors">
                      <td className="p-4 font-medium text-foreground border-r border-border/50">
                        {row.program}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {values[0]}
                      </td>
                      <td className="p-4 text-muted-foreground border-x border-border/50">
                        {values[1]}
                      </td>
                      <td className="p-4 text-foreground font-medium">
                        {values[2]}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </PageSection>

        {/* FAQs Accordion */}
        <PageSection className="mt-16 pt-20">
          <AnimatedHeader 
            title={t('faqTitle')}
            description={t('faqSubtitle')}
            align="center"
          />

          <div className="max-w-3xl mx-auto">

            <div className="border border-border bg-card/30 p-8 rounded-none">
              <div className="mb-6 flex items-center gap-3 border-b border-border/50 pb-4">
                <HelpCircle className="text-primary size-5" />
                <h3 className="text-[18px] font-medium text-foreground">
                  Pricing & Policy Queries
                </h3>
              </div>

              <Accordion
                type="single"
                collapsible
                className="border-none bg-transparent flex flex-col gap-2.5"
              >
                {FAQS_DATA.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="border-b border-border/50 bg-transparent rounded-none"
                  >
                    <AccordionTrigger className="cursor-pointer py-4 text-[15px] font-medium hover:no-underline hover:text-primary transition-colors text-left text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <p className="text-muted-foreground text-[14px] leading-relaxed">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <p className="text-muted-foreground mt-12 text-center text-[14px]">
              {t('faqContactText')}
              <Link to="/connect" className="text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background ml-1">
                {t('faqContactLink')}
              </Link>
            </p>
          </div>
        </PageSection>

      </PageContainer>
    </div>
  );
}
