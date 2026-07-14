import { useEffect, useState } from 'react';
import ImmersiveHero from '../components/effects/ImmersiveHero';
import { Button } from '../components/ui/button';
import { NeonGradientCard } from '../components/ui/neon-gradient-card';
import { Card } from '../components/ui/card';
import { Check, HelpCircle, ArrowRight, User, Building, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '../lib/utils';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const translations = {
  heroCategory: "Investment in Excellence",
  heroTitleNormal: "Scalable",
  heroTitleHighlighted: "Pricing Plans",
  heroDesc: "Empower your future or scale your institution. Transparent, value-driven plans designed to deliver real-world outcomes and skill growth.",
  telemetryLeft: "FINANCIAL_SYSTEM // ACTIVE_INR",
  telemetryRight: "PLANS_MATRIX // COHORT_SCALES",
  studentTab: "Student / Individual",
  instituteTab: "Institute / School",
  studentSubtitle: "Personalized pathways for career discovery and academic readiness",
  instituteSubtitle: "Enterprise solutions to scale innovation and pedagogy across cohorts",
  perMonth: "/ month",
  billedMonthly: "Billed monthly. Prices in Indian Rupees (INR)",
  popular: "Most Popular",
  getStarted: "Get Started Now",
  contactSales: "Request Advisory Consult",
  featuresHeader: "Key Features Included:",
  comparisonTitle: "Detailed Program Coverage",
  comparisonSubtitle: "See how our 6 core EduPlus Skill programs align with each tier.",
  faqTitle: "Frequently Asked Questions",
  faqSubtitle: "Have questions about pricing, billing, or programs? Find answers below.",
  faqContactText: "Need customized institutional pricing? ",
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
    price: "₹0",
    period: "forever",
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
    ctaText: "Start for Free",
    ctaLink: "/connect"
  },
  {
    id: "student-scholar",
    name: "Scholar",
    price: "₹999",
    period: "month",
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
    ctaText: "Enroll in Scholar",
    ctaLink: "/connect"
  },
  {
    id: "student-champion",
    name: "Champion",
    price: "₹2,499",
    period: "month",
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
    ctaText: "Become a Champion",
    ctaLink: "/connect"
  }
];

const INSTITUTE_PLANS: Plan[] = [
  {
    id: "institute-starter",
    name: "Starter Cohort",
    price: "₹9,999",
    period: "month",
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
    ctaText: "Deploy Starter",
    ctaLink: "/connect"
  },
  {
    id: "institute-professional",
    name: "Professional Hub",
    price: "₹24,999",
    period: "month",
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
    ctaText: "Deploy Professional",
    ctaLink: "/connect"
  },
  {
    id: "institute-enterprise",
    name: "Enterprise Core",
    price: "Custom",
    period: "bespoke",
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
    ctaText: "Request Advisory",
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
    question: "Can we switch plans at any time?",
    answer: "Yes, you can upgrade, downgrade, or cancel your student subscription at any time via your dashboard. For institutions, modifications are handled via your dedicated school advisor to align with academic terms."
  },
  {
    id: "pricing-faq-2",
    question: "What currencies do you accept?",
    answer: "Currently, our primary pricing is in Indian Rupees (INR - ₹). For international institutions or students, we support card payments globally, automatically converted by our payment gateway."
  },
  {
    id: "pricing-faq-3",
    question: "Is there a setup fee for the Institute plans?",
    answer: "There are no setup fees for the Starter or Professional plans. For the Enterprise plan, which includes setting up physical Robotics & Innovation labs (Innovation Studio) or custom portal integrations, a custom layout and implementation cost may apply."
  },
  {
    id: "pricing-faq-4",
    question: "Do you offer demo accounts for schools?",
    answer: "Absolutely. We offer a 14-day evaluation environment for school boards and counseling teams to inspect the psychometrics, counseling, and reporting dashboard before making a purchase."
  },
  {
    id: "pricing-faq-5",
    question: "What is your refund policy?",
    answer: "For monthly subscriptions, cancellations prevent subsequent renewal. If a student is unsatisfied, they can request a refund within 7 days of initial subscription. Camps and events are governed by separate cancellation policies listed in Programs."
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
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-16">
        
        {/* Plan Type Selector Toggle */}
        <div className={`flex flex-col items-center justify-center mb-16 transition-all duration-1000 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="border border-border bg-card/65 p-1 flex items-center justify-center rounded-none mb-4">
            <button /* ui-ignore */
              onClick={() => setPlanType('student')}
              className={cn(
                "px-6 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 rounded-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#7DF9FF]",
                planType === 'student'
                  ? "bg-primary text-background font-bold shadow-[0_0_12px_oklch(var(--primary)/0.3)]"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-1.5 justify-center">
                <User className="size-3.5" />
                {t('studentTab')}
              </div>
            </button>
            <button /* ui-ignore */
              onClick={() => setPlanType('institute')}
              className={cn(
                "px-6 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 rounded-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#7DF9FF]",
                planType === 'institute'
                  ? "bg-primary text-background font-bold shadow-[0_0_12px_oklch(var(--primary)/0.3)]"
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
          {activePlans.map((plan) => {
            const CardMarkup = (
              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Badge & Popular highlights */}
                  <div className="flex items-center justify-between mb-4 border-b border-border/60 pb-3">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase font-bold">
                      {plan.name}
                    </span>
                    {plan.popular && (
                      <Badge className="bg-primary text-background hover:bg-primary border-none rounded-none font-mono text-[9px] py-0 px-2 tracking-widest uppercase flex items-center gap-1">
                        <Sparkles className="size-2.5 fill-background text-background" />
                        {t('popular')}
                      </Badge>
                    )}
                  </div>

                  {/* Price */}
                  <div className="my-6">
                    <div className="flex items-baseline gap-1 text-foreground">
                      <span className="font-heading text-5xl font-semibold tracking-tight">{plan.price}</span>
                      <span className="font-mono text-xs text-muted-foreground tracking-wider uppercase">
                        {plan.price !== 'Custom' && `/ ${plan.period}`}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground block mt-1.5 uppercase tracking-wider">
                      {plan.price === 'Custom' ? 'Tailored to school scale' : t('billedMonthly')}
                    </span>
                  </div>

                  <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6 min-h-[44px]">
                    {plan.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-4 border-t border-border/50 pt-6">
                    <h4 className="font-mono text-[10px] uppercase tracking-widest text-foreground font-semibold flex items-center gap-1">
                      <ShieldCheck className="size-3.5 text-primary" /> {t('featuresHeader')}
                    </h4>
                    <ul className="space-y-3 font-sans text-xs">
                      {plan.features.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className={cn(
                            "flex items-start gap-2.5 leading-normal",
                            feature.included ? "text-muted-foreground" : "text-muted-foreground/30 line-through"
                          )}
                        >
                          {feature.included ? (
                            <Check className="size-3.5 text-primary shrink-0 mt-0.5" />
                          ) : (
                            <span className="font-mono text-primary/40 shrink-0 mt-0.5 w-3.5 text-center">&bull;</span>
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
                    variant={plan.popular ? "default" : "outline"}
                    className="w-full font-mono text-[10px] uppercase tracking-widest rounded-none"
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
                  <NeonGradientCard className="border border-border/50 h-full flex flex-col justify-between">
                    {CardMarkup}
                  </NeonGradientCard>
                ) : (
                  <Card className="border border-border bg-card/45 backdrop-blur-sm rounded-none h-full flex flex-col justify-between p-6">
                    {CardMarkup}
                  </Card>
                )}
              </div>
            );
          })}
        </div>

        {/* Detailed Program Coverage Section */}
        <section className="mt-32 border-t border-border/60 pt-20">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-primary block mb-2">
              COMPARSION // DOSSIER
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
              {t('comparisonTitle')}
            </h2>
            <p className="font-sans text-muted-foreground text-sm leading-relaxed">
              {t('comparisonSubtitle')}
            </p>
          </div>

          <div className="border border-border bg-card/25 backdrop-blur-sm overflow-x-auto rounded-none">
            <table className="w-full border-collapse font-sans text-xs text-left min-w-[700px]">
              <thead>
                <tr className="border-b border-border bg-card/60 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="p-4 w-[250px]">Core Program</th>
                  {planType === 'student' ? (
                    <>
                      <th className="p-4">Explorer (₹0)</th>
                      <th className="p-4">Scholar (₹999)</th>
                      <th className="p-4 text-primary">Champion (₹2,499)</th>
                    </>
                  ) : (
                    <>
                      <th className="p-4">Starter (₹9,999)</th>
                      <th className="p-4 text-primary">Professional (₹24,999)</th>
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
                      <td className="p-4 font-semibold text-foreground border-r border-border/40">
                        {row.program}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {values[0]}
                      </td>
                      <td className="p-4 text-muted-foreground border-x border-border/40">
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
        </section>

        {/* FAQs Accordion */}
        <section className="mt-32 border-t border-border/60 pt-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-semibold text-foreground tracking-tight">
                {t('faqTitle')}
              </h2>
              <p className="text-muted-foreground mt-3 text-sm">
                {t('faqSubtitle')}
              </p>
            </div>

            <div className="border border-border bg-card/40 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <HelpCircle className="text-primary size-4" />
                <h3 className="font-heading text-base font-semibold text-foreground tracking-tight">
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
                    className="border border-border/40 bg-background/30 rounded-none not-last:border-b-0"
                  >
                    <AccordionTrigger className="cursor-pointer px-4 py-3.5 text-xs font-semibold hover:no-underline font-mono uppercase tracking-wider text-left text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <p className="text-muted-foreground mt-12 text-center text-xs font-mono">
              {t('faqContactText')}
              <Link to="/connect" className="text-primary font-semibold hover:text-[#7DF9FF] hover:underline focus:outline-none focus:ring-1 focus:ring-[#7DF9FF]">
                {t('faqContactLink')}
              </Link>
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
