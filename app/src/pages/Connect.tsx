import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { PageHero } from '../components/ui/page-hero';
import { Button } from '../components/ui/button';
import { FadeIn } from '@/components/effects/FadeIn';
import { InvisibleCard } from '../components/ui/invisible-card';
import { PageContainer, PageSection } from '../components/ui/page-layout';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { editorialIllustrations } from '../lib/editorialIllustrations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { InlineWidget } from 'react-calendly';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';
import { ArrowRight, Check } from 'lucide-react';
import { Checkbox } from '../components/ui/checkbox';
import { Link } from 'react-router';

function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    // Check initial state
    const updateTheme = () => setIsDark(document.documentElement.classList.contains("dark"));
    updateTheme();
    
    // Watch for toggles on the html element
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_PUBLIC_KEY as string;
const REST_TIMEOUT_MS = 10000;

interface ContactMessagePayload {
  name: string;
  email: string;
  mobile: string | null;
  profile: string;
  message: string;
  status: string;
}

async function insertContactMessage(payload: ContactMessagePayload) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REST_TIMEOUT_MS);
  
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) {
      const errBody = await res.text();
      console.error('Supabase REST Error:', errBody);
      throw new Error(`Submission failed (HTTP ${res.status}). Please try again later.`);
    }
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error('Request timed out. Please check your connection and try again.');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

const translations = {
  heroCategory: "Advisory Connect",
  heroTitleNormal: "Connect & Guidance",
  heroDesc: "EduPlus Skills offers dedicated, one-on-one support tailored to students, parents, job seekers, and educators, alongside direct lines for inquiry.",
  tailoredRoadmap: "Tailored Roadmap",
  milestonesStrategy: "Milestones & Strategy:",
  
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
  ctaButtonText: "Book Free Session",
  
  // Tabs
  studentsLabel: "For Students",
  parentsLabel: "For Parents",
  seekersLabel: "For Job Seekers",
  teachersLabel: "For Teachers",
  
  // Student data
  studentsTitle: "Chart Your Personal Academic & Career Path",
  studentsDesc: "Navigate academic choices, discover your passions, and understand how your strengths connect to real-world opportunities. From subject selection and career mapping to entrance exam strategies and higher studies planning, you gain a personal roadmap instead of generic advice.",
  studentsCta: "Student Advisory",
  
  // Parents data
  parentsTitle: "Empower Your Child Without the Pressure",
  parentsDesc: "Equip yourself with the tools, frameworks, and information needed to support your child's professional and personal growth. Our sessions help you decode rapidly changing education and career landscapes so that you can guide-not pressure-your child toward realistic, fulfilling paths.",
  parentsCta: "Parent Consultation",
  
  // Seekers data
  seekersTitle: "Bridge the Gap Between Learning & Placement",
  seekersDesc: "Support your professional transition with structured career counseling, profile building, and targeted upskilling recommendations. Gain absolute clarity on your core strengths, international options, and the actions required to move from where you are to where you want to be.",
  seekersCta: "Placement Pathway",
  
  // Teachers data
  teachersTitle: "Evolve From Instructors Into Mentors",
  teachersDesc: "Enhance your classroom impact, mentorship capabilities, and academic leadership profile. Through reflective coaching, modern pedagogy training, and technology integration workshops, learn how to guide students not only to test success but to life readiness.",
  teachersCta: "Educator Mentorship",
  
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
  teacherMilestone4: "Professional Leadership & Career Growth",

  // Contact translations
  officeTitle: "Primary Head Office & Branch",
  officeName: "Mommy Complex (Head Office)",
  officeAddress: "Nambol Bazar, Bishnupur District, Nambol 795134, Manipur, India",
  branchName: "Wangkhei (Branch)",
  branchAddress: "3rd Floor, T.I. Building, Andro Parking, Palace Compound, Wangkhei, Imphal, Manipur 795001",
  hotlineLabel: "Direct Advisory Hotline",
  formTitle: "Send an Inquiry",
  successMessage: "Thank you! Your message has been received. Our team will contact you within 24 hours.",
  labelName: "Your Name",
  labelEmail: "Email Address",
  labelProfile: "Stakeholder Profile",
  placeholderProfile: "Select Profile",
  optStudent: "Student",
  optParent: "Parent / Guardian",
  optEducator: "Educator / School Leader",
  optCorp: "Corporate Recruiter",
  optInst: "Educational Institution",
  labelMessage: "Message",
  placeholderMessage: "Tell us how we can help configure your roadmap...",
  submitButton: "Submit Advisory Request",
  newsletterTitle: "Subscribe to Insights",
  newsletterDesc: "Receive curated updates on new future-ready programs, camps, and college scholarship opportunities. Free of spam.",
  newsletterSuccess: "Successfully subscribed! Welcome to our learning ecosystem.",
  subscribeButton: "Subscribe",
  placeholderEmail: "Enter your email",
  placeholderName: "John Doe",
  placeholderEmailInput: "john@example.com",
  inquiriesLabel: "Inquiries & Support",
  inquiriesEmail: "connect@eduplusskills.in",
  hotlinePhone1: "+91 90895 13731",
  hotlinePhone2: "+91 70851 55262"
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

export default function Connect() {
  const [activeTab, setActiveTab] = useState('students');
  const [mounted, setMounted] = useState(false);

  // Sync with global theme
  const isDark = useDarkMode();

  // Scheduling dialog states
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Form states
  const [submitted, setSubmitted] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    profile: 'student',
    message: '',
    marketingConsent: false
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const normalizedMobile = (() => {
      const trimmed = formData.mobile.trim();
      return trimmed && /\d/.test(trimmed) ? trimmed : null;
    })();
    if (!normalizedMobile) {
      toast.error('Please enter a valid mobile number.');
      setIsSubmitting(false);
      return;
    }
    const toastId = toast.loading('Sending your inquiry...');
    try {
      await insertContactMessage({
        name: formData.name,
        email: formData.email,
        mobile: normalizedMobile,
        profile: formData.profile,
        message: formData.message,
        status: 'unread',
      });

      // Invoke the Edge Function to send email notification
      const emailRes = await fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          type: 'contact',
          name: formData.name,
          email: formData.email,
          mobile: normalizedMobile ?? undefined,
          message: formData.message,
        }),
      });

      if (!emailRes.ok) {
        console.error('[Connect] Failed to send email via Edge Function');
      }

      toast.success('Inquiry sent! We\'ll respond within 24 hours.', { id: toastId });
      setSubmitted(true);
      setFormData({ name: '', email: '', mobile: '', profile: 'student', message: '', marketingConsent: false });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      console.error('Error sending message:', err);
      toast.error(err?.message || 'Failed to send. Please try again.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading('Subscribing...');
    try {
      // Invoke the Edge Function to send newsletter confirmation email
      const emailRes = await fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          type: 'newsletter',
          email: newsletterEmail,
        }),
      });

      if (!emailRes.ok) {
        console.error('[Connect] Failed to send newsletter email via Edge Function');
      }

      toast.success(t('newsletterSuccess'), { id: toastId });
      setSubscribed(true);
      setNewsletterEmail('');
      setNewsletterConsent(false);
      setTimeout(() => setSubscribed(false), 5000);
    } catch (err) {
      toast.error('Subscription failed. Please try again.', { id: toastId });
    }
  };



  const handleBookAdvisory = () => {
    setIsSchedulerOpen(true);
  };

  return (
    <div className="flex-1 bg-background text-foreground relative">
      <PageHero
        eyebrow={t('heroCategory')}
        title={t('heroTitleNormal')}
        description={t('heroDesc')}
        illustration={editorialIllustrations.guidance}
      />

      <PageContainer className="mt-16">
        
        {/* Guidance Split Panel using pure shadcn Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className={`flex flex-col lg:flex-row gap-12 transition-all duration-500 ease-out transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="lg:w-1/4 flex flex-col gap-6 w-full">
            {/* Tab Selectors using shadcn TabsList */}
            <TabsList className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-r border-border lg:pr-4 whitespace-nowrap bg-muted/20 p-2 w-full justify-start h-auto rounded-none">
              {STAKEHOLDERS.map(stakeholder => (
                <TabsTrigger
                  key={stakeholder.id}
                  value={stakeholder.id}
                  className="px-4 py-3 text-left font-sans text-[14px] tracking-wide transition-all duration-300 w-full justify-start data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t(stakeholder.labelKey)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Right Active Details Panel using shadcn TabsContent */}
          <div className="lg:w-3/4 flex flex-col gap-6 w-full">
            {STAKEHOLDERS.map(stakeholder => (
              <TabsContent key={stakeholder.id} value={stakeholder.id} className="mt-0">
                <InvisibleCard delay={0} className="border border-border/20 bg-background/50 h-auto min-h-[460px] flex flex-col justify-between">
                  <div className="flex flex-col h-full justify-between space-y-8 w-full">
                    <div className="space-y-8">
                      <span className="text-xs font-mono text-primary tracking-widest uppercase block opacity-80">
                        {t('tailoredRoadmap')}
                      </span>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground tracking-tight leading-tight">
                        {t(stakeholder.titleKey)}
                      </h2>
                      <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                        {t(stakeholder.descKey)}
                      </p>

                      {/* Milestones list */}
                      <div className="pt-6">
                        <h4 className="text-[13px] font-medium text-foreground uppercase tracking-wide mb-4">
                          {t('milestonesStrategy')}
                        </h4>
                        <ul className="grid sm:grid-cols-2 gap-4 items-start">
                          {stakeholder.roadmapKeys.map((stepKey, idx) => (
                            <li key={stepKey} className="flex items-start gap-3 text-[14px] text-muted-foreground font-sans w-full">
                              <span className="w-6 h-6 bg-primary/10 flex items-center justify-center text-[12px] text-primary font-medium shrink-0">
                                {idx + 1}
                              </span>
                              <span className="mt-0.5 leading-relaxed">{t(stepKey)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-12 pt-6 flex justify-end">
                      <Button
                        onClick={handleBookAdvisory}
                        size="md"
                        className="cursor-pointer rounded-none text-[13px] font-medium uppercase tracking-wide"
                      >
                        {t(stakeholder.ctaTextKey)}
                      </Button>
                    </div>
                  </div>
                </InvisibleCard>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </PageContainer>

        {/* Call to Action Section */}
        <PageSection className="mt-16 pt-20">
          <PageContainer>
          <div className="max-w-4xl mx-auto">
            <InvisibleCard
              delay={0}
              className="grid md:grid-cols-2 gap-8 border-none bg-background/50"
            >
              <div className="flex flex-col justify-center">
                <h3 className="font-heading text-3xl md:text-4xl font-light text-foreground tracking-tight leading-tight">
                  {t('ctaTitle')}
                </h3>
                <p className="text-muted-foreground mt-4 text-sm md:text-base leading-relaxed font-sans max-w-lg">
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
              
              <div className="bg-muted/50 flex flex-col justify-center rounded-none border border-border p-6">
                <p className="text-muted-foreground text-xs font-mono uppercase tracking-wider">{t('ctaStartingAt')}</p>
                <p className="mt-1 font-heading text-4xl font-bold text-foreground">
                  $0<span className="text-muted-foreground text-lg font-normal">/month</span>
                </p>
                <p className="text-muted-foreground mt-2 text-xs font-sans">{t('ctaFreeSubText')}</p>
                <Button
                  onClick={handleBookAdvisory}
                  size="md"
                  className="mt-6 gap-2 rounded-none font-mono text-xs uppercase tracking-wider w-full cursor-pointer"
                >
                  {t('ctaButtonText')}
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </InvisibleCard>
          </div>
          </PageContainer>
        </PageSection>

        {/* Contact Form & Office Split Section */}
        <PageSection className="pt-20">
        <PageContainer>
        <FadeIn direction="up" delay={0.2}>
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left Column: Office & Details */}
            <div className="lg:col-span-5 space-y-6">
              <InvisibleCard delay={0} className="border-none bg-background/50 flex flex-col justify-start">
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-primary uppercase block mb-3 font-semibold">
                      {t('officeTitle')}
                    </span>
                    <h3 className="text-[20px] font-medium text-foreground mb-3">{t('officeName')}</h3>
                    <p className="text-[15px] text-muted-foreground leading-relaxed mb-4">
                      {t('officeAddress')}
                    </p>
                    <h3 className="text-[20px] font-medium text-foreground mb-3">{t('branchName')}</h3>
                    <p className="text-[15px] text-muted-foreground leading-relaxed">
                      {t('branchAddress')}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-border/50 flex flex-col gap-2">
                    <span className="text-[10px] font-mono tracking-widest text-primary uppercase block font-semibold mb-2">
                      {t('hotlineLabel')}
                    </span>
                    <a href={`tel:${t('hotlinePhone1').replace(/\s/g, '')}`} className="text-[16px] font-medium text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                      {t('hotlinePhone1')}
                    </a>
                    <a href={`tel:${t('hotlinePhone2').replace(/\s/g, '')}`} className="text-[16px] font-medium text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                      {t('hotlinePhone2')}
                    </a>
                  </div>

                  <div className="pt-6 border-t border-border/50">
                    <span className="text-[10px] font-mono tracking-widest text-primary uppercase block font-semibold mb-3">
                      {t('inquiriesLabel')}
                    </span>
                    <a href={`mailto:${t('inquiriesEmail')}`} className="text-[16px] font-medium text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                      {t('inquiriesEmail')}
                    </a>
                  </div>
                </div>
              </InvisibleCard>
            </div>

            {/* Right Column: Interaction Form */}
            <div className="lg:col-span-7">
              <div className="relative border border-border/60 bg-card p-8 md:p-10">
                {/* Amber top accent — static, not hover-triggered, signals premium craftsmanship */}
                <div className="absolute top-0 left-0 w-16 h-[2px] bg-primary" />
                <h3 className="font-heading text-2xl md:text-3xl font-light tracking-tight text-foreground mb-8">
                  {t('formTitle')}
                </h3>

                <div className="mb-6 p-4 border border-dashed border-border/80 bg-muted/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-semibold text-foreground font-sans">Prefer an Instant Video Consultation?</h4>
                    <p className="text-[10px] text-muted-foreground font-sans mt-0.5">Book a slot on our calendar directly synced with Google Calendar.</p>
                  </div>
                  <Button
                    onClick={handleBookAdvisory}
                    size="md"
                    className="font-mono text-xs uppercase tracking-wider shrink-0 rounded-none cursor-pointer"
                  >
                    Book Slot
                  </Button>
                </div>

                {submitted ? (
                  <div className="bg-primary/10 border border-primary/30 p-6 text-primary text-xs font-mono">
                    {t('successMessage')}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-3">
                        <Label htmlFor="contact-name" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                          {t('labelName')}
                        </Label>
                        <Input
                          id="contact-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder={t('placeholderName')}
                          className="font-mono text-[13px] rounded-none border-border focus:border-primary focus:ring-0 bg-transparent h-12 px-4 transition-colors"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="contact-email" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                          {t('labelEmail')}
                        </Label>
                        <Input
                          id="contact-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder={t('placeholderEmailInput')}
                          className="font-mono text-[13px] rounded-none border-border focus:border-primary focus:ring-0 bg-transparent h-12 px-4 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="contact-mobile" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        Mobile Number
                      </Label>
                      <Input
                        id="contact-mobile"
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                        placeholder="+91 98765 43210"
                        pattern="[0-9+\-\s()]{7,20}"
                        className="font-sans text-[13px] rounded-none border-border focus:border-primary focus:ring-0 bg-transparent h-12 px-4 transition-colors"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="contact-profile" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block">
                        {t('labelProfile')}
                      </Label>
                      <Select
                        value={formData.profile}
                        onValueChange={(val) => setFormData(prev => ({ ...prev, profile: val }))}
                      >
                        <SelectTrigger id="contact-profile" className="w-full font-mono text-[13px] rounded-none bg-transparent border-border h-12 px-4 focus:ring-0 focus:border-primary transition-colors">
                          <SelectValue placeholder={t('placeholderProfile')} />
                        </SelectTrigger>
                        <SelectContent className="rounded-none font-mono text-xs border border-border bg-card">
                          <SelectItem value="student">{t('optStudent')}</SelectItem>
                          <SelectItem value="parent">{t('optParent')}</SelectItem>
                          <SelectItem value="educator">{t('optEducator')}</SelectItem>
                          <SelectItem value="corporation">{t('optCorp')}</SelectItem>
                          <SelectItem value="institution">{t('optInst')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="contact-message" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        {t('labelMessage')}
                      </Label>
                      <Textarea
                        id="contact-message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder={t('placeholderMessage')}
                        className="font-mono text-[13px] min-h-[140px] rounded-none border-border focus:border-primary focus:ring-0 bg-transparent p-4 transition-colors"
                      />
                    </div>

                    <div className="flex items-start space-x-3 mt-2">
                      <Checkbox
                        id="connect-marketing"
                        checked={formData.marketingConsent}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, marketingConsent: checked as boolean }))}
                        className="mt-1"
                      />
                      <label
                        htmlFor="connect-marketing"
                        className="font-sans text-[11px] text-muted-foreground leading-snug cursor-pointer"
                      >
                        I agree to receive marketing communications and accept the <Link to="/legal#terms" className="text-primary hover:underline" /* ui-ignore */>Terms of Service</Link>, <Link to="/legal#privacy" className="text-primary hover:underline" /* ui-ignore */>Privacy Policy</Link>, and <Link to="/legal#cookies" className="text-primary hover:underline" /* ui-ignore */>Cookie Policy</Link>.
                      </label>
                    </div>

                    <Button type="submit" disabled={isSubmitting} size="lg" className="w-full rounded-none font-mono text-[13px] uppercase tracking-widest cursor-pointer h-12 mt-4">
                      {isSubmitting ? 'Sending...' : t('submitButton')}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Newsletter — full-width, outside the grid to prevent row inflation */}
          <div className="mt-16 pt-16 border-t border-border/30">
            <div className="max-w-2xl">
              <h3 className="font-heading text-2xl font-light tracking-tight text-foreground">
                {t('newsletterTitle')}
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mt-2">
                {t('newsletterDesc')}
              </p>

              {subscribed ? (
                <p className="text-sm text-primary font-mono bg-primary/10 border border-primary/25 p-4 mt-6">
                  {t('newsletterSuccess')}
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-4 mt-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-grow font-mono text-[13px] rounded-none bg-transparent border-border h-12 px-4 focus:ring-0 focus:border-primary transition-colors"
                      placeholder={t('placeholderEmail')}
                    />
                    <Button type="submit" variant="outline" size="lg" className="rounded-none font-mono text-[13px] uppercase tracking-widest cursor-pointer h-12 px-8">
                      {t('subscribeButton')}
                    </Button>
                  </div>
                  <div className="flex items-start space-x-3 mt-1">
                    <Checkbox
                      id="connect-newsletter-marketing"
                      required
                      checked={newsletterConsent}
                      onCheckedChange={(checked) => setNewsletterConsent(checked as boolean)}
                      className="mt-[2px]"
                    />
                    <label
                      htmlFor="connect-newsletter-marketing"
                      className="font-sans text-[11px] text-muted-foreground leading-snug cursor-pointer"
                    >
                      I agree to receive marketing communications and accept the <Link to="/legal#terms" className="text-primary hover:underline" /* ui-ignore */>Terms of Service</Link>, <Link to="/legal#privacy" className="text-primary hover:underline" /* ui-ignore */>Privacy Policy</Link>, and <Link to="/legal#cookies" className="text-primary hover:underline" /* ui-ignore */>Cookie Policy</Link>.
                    </label>
                  </div>
                </form>
              )}
            </div>
          </div>
        </FadeIn>
        </PageContainer>
        </PageSection>

      {/* Dynamic EduPlus Scheduler Modal using shadcn Calendar & Dialog */}
      <Dialog open={isSchedulerOpen} onOpenChange={setIsSchedulerOpen}>
        <DialogContent className="sm:max-w-[720px] max-h-[85vh] overflow-y-auto border border-border bg-card p-6 rounded-none text-foreground">
          <DialogHeader className="border-b border-border pb-4 mb-4">
            <DialogTitle className="font-heading text-lg font-semibold uppercase tracking-wider text-primary">
              EduPlus Advisory Scheduler
            </DialogTitle>
            <DialogDescription className="font-sans text-xs text-muted-foreground">
              Configure your consultation slot directly with our founding steering committee.
            </DialogDescription>
          </DialogHeader>

          <div className="w-full h-full min-h-[600px]">
            <InlineWidget 
              url="https://calendly.com/oldlion806?timezone=Asia/Kolkata" 
              styles={{ height: '600px', width: '100%' }}
              prefill={{
                customAnswers: {
                  a1: activeTab === 'students' ? 'Student' : activeTab === 'parents' ? 'Parent' : activeTab === 'teachers' ? 'Teacher/Educator' : 'Job Seeker'
                }
              }}
              pageSettings={{
                hideEventTypeDetails: true,
                hideLandingPageDetails: true,
                primaryColor: 'B8860B', // Nordic Lagom accent
                textColor: isDark ? 'ffffff' : '1a1a1a',
                backgroundColor: isDark ? '1a1a1a' : 'ffffff'
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
