import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { PageHero } from '../components/ui/page-hero';
import { Button } from '../components/ui/button';
import { FadeIn } from '@/components/effects/FadeIn';
import { Card } from '../components/ui/card';
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
import { Calendar } from '../components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';
import { ArrowRight, Check, MapPin, Phone, Mail } from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_PUBLIC_KEY as string;
const REST_TIMEOUT_MS = 10000;

async function insertContactMessage(payload: Record<string, string>) {
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
  officeTitle: "Primary Head Office",
  officeName: "Mommy Complex",
  officeAddress: "Nambol Bazar, Bishnupur District, Nambol 795134, Manipur, India",
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
  inquiriesEmail: "hello@eduplus.skills",
  hotlinePhone: "+91 90895 13731"
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

const ADVISORS = [
  {
    id: 'bikash',
    name: 'Bikash Oinam',
    role: 'Founder, EduPlus Skills',
    avatar: 'BO',
    desc: 'Digital transformation, global pathways, admissions & tech integrations.'
  },
  {
    id: 'ronen',
    name: 'Ronen Akoijam',
    role: 'Co-Founder, EduPlus Skills',
    avatar: 'RA',
    desc: 'Pedagogy, language development, active learning & stressful test strategies.'
  }
];

const TIME_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM"
];

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

  // Scheduling dialog states
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState<{ id: string, name: string, role: string, avatar: string, desc: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Form states
  const [submitted, setSubmitted] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profile: 'student',
    message: ''
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const toastId = toast.loading('Sending your inquiry...');
    try {
      await insertContactMessage({
        name: formData.name,
        email: formData.email,
        profile: formData.profile,
        message: formData.message,
        status: 'unread',
      });
      toast.success('Inquiry sent! We\'ll respond within 24 hours.', { id: toastId });
      setSubmitted(true);
      setFormData({ name: '', email: '', profile: 'student', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      console.error('Error sending message:', err);
      toast.error(err?.message || 'Failed to send. Please try again.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  const mapStakeholderToProfile = (id: string) => {
    if (id === 'students') return 'student';
    if (id === 'parents') return 'parent';
    if (id === 'seekers') return 'student';
    if (id === 'teachers') return 'educator';
    return 'student';
  };

  const handleScheduleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdvisor || !selectedDate || !selectedTime) return;
    const toastId = toast.loading('Scheduling appointment...');
    try {
      await insertContactMessage({
        name: bookingName,
        email: bookingEmail,
        profile: mapStakeholderToProfile(activeTab),
        message: `[BOOKING REQUEST] Advisor: ${selectedAdvisor.name} | Date: ${selectedDate.toLocaleDateString('en-IN')} | Time: ${selectedTime} IST. Topic/Message: ${bookingMessage}`,
        status: 'unread',
      });
      toast.success('Booking request sent!', { id: toastId, description: `Awaiting confirmation for ${selectedAdvisor.name} on ${selectedDate.toLocaleDateString('en-IN')}` });
      setBookingSuccess(true);
      setTimeout(() => {
        setIsSchedulerOpen(false);
        setBookingSuccess(false);
        setBookingName('');
        setBookingEmail('');
        setBookingMessage('');
        setSelectedTime('');
      }, 3500);
    } catch (err: any) {
      console.error('Error confirming appointment:', err);
      toast.error(err?.message || 'Failed to schedule. Please try again.', { id: toastId });
    }
  };

  const handleBookAdvisory = () => {
    setIsSchedulerOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-32 relative">
      <PageHero
        eyebrow={t('heroCategory')}
        title={t('heroTitleNormal')}
        description={t('heroDesc')}
        illustration={editorialIllustrations.guidance}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 mt-16">
        
        {/* Guidance Split Panel using pure shadcn Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className={`flex flex-col lg:flex-row gap-8 transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="lg:w-1/4 flex flex-col gap-6 w-full">
            {/* Tab Selectors using shadcn TabsList */}
            <TabsList className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-r border-border lg:pr-4 whitespace-nowrap bg-muted/20 p-2 w-full justify-start h-auto rounded-none">
              {STAKEHOLDERS.map(stakeholder => (
                <TabsTrigger
                  key={stakeholder.id}
                  value={stakeholder.id}
                  className="px-4 py-3 text-left font-sans text-[14px] tracking-wide transition-all duration-300 w-full justify-start border-l-2 border-transparent data-[state=active]:border-l-primary data-[state=active]:bg-primary/5 data-[state=active]:text-primary rounded-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
                <Card className="border border-border/50 h-auto min-h-[460px] p-6 md:p-8 bg-card rounded-none shadow-sm flex flex-col justify-between">
                  <div className="flex flex-col h-full justify-between space-y-6">
                    <div className="space-y-6">
                      <span className="text-xs font-mono text-primary tracking-wider uppercase block opacity-60">
                        {t('tailoredRoadmap')}
                      </span>
                      <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                        {t(stakeholder.titleKey)}
                      </h2>
                      <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
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

                    <div className="mt-12 pt-6 border-t border-border flex justify-end">
                      <Button
                        onClick={() => {
                          const defaultAdvisor = activeTab === 'teachers' || activeTab === 'parents'
                            ? ADVISORS.find(a => a.id === 'ronen')
                            : ADVISORS.find(a => a.id === 'bikash');
                          setSelectedAdvisor(defaultAdvisor || ADVISORS[0]);
                          handleBookAdvisory();
                        }}
                        size="md"
                        className="cursor-pointer rounded-none text-[13px] font-medium uppercase tracking-wide"
                      >
                        {t(stakeholder.ctaTextKey)}
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </div>
        </Tabs>

        {/* Call to Action Section */}
        <section className="mt-28 border-t border-border/60 pt-20">
          <div className="max-w-3xl mx-auto">
            <Card
              className="border border-border grid md:grid-cols-2 gap-8 p-6 md:p-8 bg-card rounded-none shadow-sm"
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
              
              <div className="bg-muted/50 flex flex-col justify-center rounded-none border border-border p-6">
                <p className="text-muted-foreground text-xs font-mono uppercase tracking-wider">{t('ctaStartingAt')}</p>
                <p className="mt-1 font-heading text-4xl font-bold text-foreground">
                  $0<span className="text-muted-foreground text-lg font-normal">/month</span>
                </p>
                <p className="text-muted-foreground mt-2 text-xs font-sans">{t('ctaFreeSubText')}</p>
                <Button
                  onClick={() => {
                    setSelectedAdvisor(ADVISORS[0]);
                    handleBookAdvisory();
                  }}
                  size="md"
                  className="mt-6 gap-2 rounded-none font-mono text-xs uppercase tracking-wider w-full cursor-pointer"
                >
                  {t('ctaButtonText')}
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Contact Form & Office Split Section */}
        <section className="py-20 border-t border-border/50 px-6 md:px-12 max-w-[1440px] mx-auto">
        <FadeIn direction="up" delay={0.2}>
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left Column: Office & Details */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="p-6 bg-card rounded-none border border-border flex flex-col justify-between min-h-[360px] shadow-sm">
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-primary uppercase block mb-3 font-semibold">
                      {t('officeTitle')}
                    </span>
                    <div className="flex items-start gap-3">
                      <MapPin className="text-primary size-5 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-heading text-lg font-semibold text-foreground tracking-tight mb-2">
                          {t('officeName')}
                        </h4>
                        <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                          {t('officeAddress')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border flex items-start gap-3">
                    <Phone className="text-primary size-5 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">
                        {t('hotlineLabel')}
                      </span>
                      <a href="tel:+919089513731" className="text-sm font-semibold font-mono text-foreground hover:text-primary hover:underline focus:outline-none focus:ring-1 focus:ring-primary">
                        {t('hotlinePhone')}
                      </a>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border flex items-start gap-3">
                    <Mail className="text-primary size-5 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">
                        {t('inquiriesLabel')}
                      </span>
                      <a href={`mailto:${t('inquiriesEmail')}`} className="text-sm font-semibold font-mono text-foreground hover:text-primary hover:underline focus:outline-none focus:ring-1 focus:ring-primary">
                        {t('inquiriesEmail')}
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column: Interaction Form */}
            <div className="lg:col-span-7 space-y-6">
              <Card className="p-6 bg-card rounded-none border border-border shadow-sm">
                <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground mb-6">
                  {t('formTitle')}
                </h3>

                <div className="mb-6 p-4 border border-dashed border-border/80 bg-muted/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-semibold text-foreground font-sans">Prefer an Instant Video Consultation?</h4>
                    <p className="text-[10px] text-muted-foreground font-sans mt-0.5">Book a slot on our calendar directly synced with Google Calendar.</p>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedAdvisor(ADVISORS[0]);
                      handleBookAdvisory();
                    }}
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
                      <div className="space-y-2">
                        <Label htmlFor="contact-name" className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                          {t('labelName')}
                        </Label>
                        <Input
                          id="contact-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder={t('placeholderName')}
                          className="font-mono text-xs rounded-none border-border focus:border-primary focus:ring-1 focus:ring-primary/20 bg-background/50 h-10 px-3"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email" className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                          {t('labelEmail')}
                        </Label>
                        <Input
                          id="contact-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder={t('placeholderEmailInput')}
                          className="font-mono text-xs rounded-none border-border focus:border-primary focus:ring-1 focus:ring-primary/20 bg-background/50 h-10 px-3"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-profile" className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                        {t('labelProfile')}
                      </Label>
                      <Select
                        value={formData.profile}
                        onValueChange={(val) => setFormData(prev => ({ ...prev, profile: val }))}
                      >
                        <SelectTrigger id="contact-profile" className="w-full font-mono text-xs rounded-none bg-background/50 border-border h-10 px-3">
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

                    <div className="space-y-2">
                      <Label htmlFor="contact-message" className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                        {t('labelMessage')}
                      </Label>
                      <Textarea
                        id="contact-message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder={t('placeholderMessage')}
                        className="font-mono text-xs min-h-[120px] rounded-none border-border focus:border-primary focus:ring-1 focus:ring-primary/20 bg-background/50 p-3"
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting} size="md" className="w-full rounded-none font-mono text-xs uppercase tracking-wider cursor-pointer">
                      {isSubmitting ? 'Sending...' : t('submitButton')}
                    </Button>
                  </form>
                )}
              </Card>

              {/* Newsletter Subscription */}
              <Card className="p-6 bg-card rounded-none border border-border shadow-sm">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                      {t('newsletterTitle')}
                    </h3>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed mt-1">
                      {t('newsletterDesc')}
                    </p>
                  </div>

                  {subscribed ? (
                    <p className="text-xs text-primary font-mono bg-primary/10 border border-primary/25 p-3">
                      {t('newsletterSuccess')}
                    </p>
                  ) : (
                    <form onSubmit={handleSubscribe} className="flex gap-3">
                      <Input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="flex-grow font-mono text-xs rounded-none bg-background/50 border-border h-9 px-3"
                        placeholder={t('placeholderEmail')}
                      />
                      <Button type="submit" variant="outline" size="md" className="rounded-none font-mono text-xs uppercase tracking-wider cursor-pointer">
                        {t('subscribeButton')}
                      </Button>
                    </form>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </FadeIn>
      </section>

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

          {bookingSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
              <span className="w-12 h-12 bg-primary/20 border border-primary text-primary flex items-center justify-center text-xl font-bold rounded-none animate-bounce">
                ✓
              </span>
              <h3 className="font-heading text-lg font-semibold text-foreground">Booking Confirmed!</h3>
              <p className="font-sans text-xs text-muted-foreground max-w-sm leading-relaxed">
                Your advisory session with <strong className="text-primary">{selectedAdvisor?.name}</strong> has been successfully scheduled on <strong className="text-foreground">{selectedDate?.toLocaleDateString('en-IN')}</strong> at <strong className="text-foreground">{selectedTime} IST</strong>.
              </p>
              <p className="font-mono text-[10px] text-muted-foreground/60 animate-pulse pt-4">
                Routing details and virtual link sent to {bookingEmail}...
              </p>
            </div>
          ) : (
            <form onSubmit={handleScheduleConfirm} className="space-y-6">
              {/* Step 1: Advisor Selection */}
              <div className="space-y-3">
                <Label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Step 1: Select Advisor
                </Label>
                <div className="grid sm:grid-cols-2 gap-4">
                  {ADVISORS.map(advisor => {
                    const isSelected = selectedAdvisor?.id === advisor.id;
                    return (
                      <div
                        key={advisor.id}
                        onClick={() => setSelectedAdvisor(advisor)}
                        className={`border p-4 rounded-none cursor-pointer transition-all duration-300 flex items-start gap-3 select-none ${
                          isSelected
                            ? 'border-primary bg-primary/5 shadow-sm shadow-primary/10'
                            : 'border-border bg-muted/20 hover:border-border-hover hover:bg-muted/30'
                        }`}
                      >
                        <span className="w-10 h-10 shrink-0 bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary font-heading rounded-none">
                          {advisor.avatar}
                        </span>
                        <div>
                          <h4 className="font-heading text-xs font-semibold text-foreground">
                            {advisor.name}
                          </h4>
                          <span className="text-[9px] font-mono text-primary/80 uppercase tracking-wide block">
                            {advisor.role}
                          </span>
                          <p className="text-[10px] text-muted-foreground leading-normal mt-1">
                            {advisor.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Choose Date & Time */}
              <div className="space-y-3 pt-4 border-t border-border/60">
                <Label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Step 2: Choose Date & Time
                </Label>
                <div className="grid md:grid-cols-12 gap-6 border border-border bg-muted/10 p-3">
                  {/* Calendar Column */}
                  <div className="md:col-span-7 flex justify-center bg-card border border-border p-2">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      className="w-full flex justify-center"
                    />
                  </div>
                  {/* Time Slots Column */}
                  <div className="md:col-span-5 flex flex-col gap-2">
                    <span className="text-[9px] font-mono text-muted-foreground uppercase text-center block mb-1">
                      Slots (IST)
                    </span>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-2 overflow-y-auto max-h-[260px] pr-1">
                      {TIME_SLOTS.map(time => {
                        const isSelected = selectedTime === time;
                        return (
                          <button /* ui-ignore */
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`h-9 text-[10px] font-mono tracking-wider transition-all duration-200 cursor-pointer rounded-none border focus:outline-none focus:ring-1 focus:ring-[#7DF9FF] ${
                              isSelected
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-card text-muted-foreground border-border hover:text-foreground hover:bg-muted/40'
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Attendee Details */}
              <div className="space-y-3 pt-4 border-t border-border/60">
                <Label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Step 3: Your Info
                </Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={bookingName}
                      onChange={e => setBookingName(e.target.value)}
                      className="font-mono text-[10px] h-8 rounded-none border-border focus:border-primary focus:ring-1 focus:ring-primary/20 bg-background/50 px-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <Input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={bookingEmail}
                      onChange={e => setBookingEmail(e.target.value)}
                      className="font-mono text-[10px] h-8 rounded-none border-border focus:border-primary focus:ring-1 focus:ring-primary/20 bg-background/50 px-3"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Textarea
                    required
                    placeholder="Consultation Topic / Inquiry Details..."
                    value={bookingMessage}
                    onChange={e => setBookingMessage(e.target.value)}
                    className="font-mono text-[10px] min-h-[70px] rounded-none border-border focus:border-primary focus:ring-1 focus:ring-primary/20 bg-background/50 p-2 w-full"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={!selectedAdvisor || !selectedDate || !selectedTime}
                  size="md"
                  className="w-full rounded-none font-mono text-[10px] uppercase tracking-wider mt-2 cursor-pointer"
                >
                  Confirm
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      </div>
    </div>
  );
}
