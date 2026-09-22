import { useState } from 'react';
import { PageMeta } from '@/components/PageMeta';
import { toast } from 'sonner';
import { PageHero } from '../components/ui/page-hero';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { editorialIllustrations } from '@/lib/editorialIllustrations';
import { FadeIn } from '@/components/effects/FadeIn';
import { InvisibleCard } from '../components/ui/invisible-card';
import { PageSection, PageContainer } from '../components/ui/page-layout';
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '../components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';


const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_PUBLIC_KEY as string;
const REST_TIMEOUT_MS = 10000;

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100).trim(),
  email: z.string().email('Invalid email address').max(100).trim().toLowerCase(),
  mobile: z.string().regex(/^[0-9+\-\s()]{7,20}$/, 'Invalid mobile number').optional().or(z.literal('')),
  profile: z.string().min(1, 'Please select a profile'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000).trim(),
  marketingConsent: z.boolean(),
});

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address').max(100).trim().toLowerCase(),
  marketingConsent: z.boolean().refine(val => val === true, {
    message: 'You must agree to receive communications',
  }),
});

export default function Contact() {
 const [submitted, setSubmitted] = useState(false);
 const [subscribed, setSubscribed] = useState(false);

 const inquiryForm = useForm<z.infer<typeof inquirySchema>>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      profile: 'student',
      message: '',
      marketingConsent: false,
    },
  });

  const newsletterForm = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
      marketingConsent: false,
    },
  });

  const onSubmitInquiry = async (data: z.infer<typeof inquirySchema>) => {
    // UI Lockout
    const lastSub = localStorage.getItem('last_inquiry_submission');
    if (lastSub && Date.now() - parseInt(lastSub) < 60000) {
      toast.error('Please wait a minute before submitting another inquiry.');
      return;
    }

    const toastId = toast.loading('Sending your inquiry...');
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
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          mobile: data.mobile || null,
          profile: data.profile,
          message: data.message,
          status: 'unread',
        }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`Submission failed (HTTP ${res.status})`);

      // Primary write succeeded — confirm success immediately
      localStorage.setItem('last_inquiry_submission', Date.now().toString());
      setSubmitted(true);
      inquiryForm.reset();
      toast.success('Inquiry sent! We\'ll be in touch within 24 hours.', { id: toastId });
      setTimeout(() => setSubmitted(false), 6000);

      // Best-effort email notification
      fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          type: 'contact',
          name: data.name,
          email: data.email,
          mobile: data.mobile || undefined,
          message: data.message,
        }),
        signal: AbortSignal.timeout(10_000),
      }).catch((emailErr) => {
        console.error('[Contact] Best-effort email delivery failed:', emailErr);
      });
    } catch (err: any) {
      console.error('[Contact] Submit error:', err);
      const isTimeout = err.name === 'AbortError';
      const msg = isTimeout ? 'Request timed out. Please try again.' : 'Failed to send. Please email us directly.';
      toast.error(msg, { id: toastId });
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const onSubmitNewsletter = async (data: z.infer<typeof newsletterSchema>) => {
    // UI Lockout
    const lastSub = localStorage.getItem('last_newsletter_submission');
    if (lastSub && Date.now() - parseInt(lastSub) < 60000) {
      toast.error('Please wait a minute before subscribing again.');
      return;
    }

    const toastId = toast.loading('Subscribing...');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REST_TIMEOUT_MS);
    
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/newsletter_subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({ email: data.email }),
        signal: controller.signal,
      });

      if (!res.ok && res.status !== 409) {
        throw new Error(`Subscription failed (HTTP ${res.status})`);
      }

      // Primary write succeeded — confirm success immediately
      localStorage.setItem('last_newsletter_submission', Date.now().toString());
      setSubscribed(true);
      newsletterForm.reset();
      toast.success('Subscribed! Welcome to our learning ecosystem.', { id: toastId });
      setTimeout(() => setSubscribed(false), 5000);

      // Best-effort email confirmation
      fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          type: 'newsletter',
          email: data.email,
        }),
        signal: AbortSignal.timeout(10_000),
      }).catch((emailErr) => {
        console.error('[Contact] Best-effort newsletter email failed:', emailErr);
      });
    } catch (err: any) {
      console.error('[Contact] Subscribe error:', err);
      const isTimeout = err.name === 'AbortError';
      const msg = isTimeout ? 'Request timed out. Please try again.' : 'Subscription failed. Please try again.';
      toast.error(msg, { id: toastId });
    } finally {
      clearTimeout(timeoutId);
    }
  };

 return (
 <div className=" w-full flex-1">
      <PageMeta title="Contact Us"
        description="Get in touch with EduPlus Skills for program inquiries, partnerships, or general information."
      />

 {/* ── Typographic Hero ── */}
 <PageHero
 eyebrow="Connect With Us"
 title="Contact &amp; Locations"
 illustration={editorialIllustrations.contact}
 description="Whether you seek strategic collaboration, student enrollment, counselor support, or training resources - we are here to support you."
 />

 {/* ── Contact Info & Form Grid ── */}
 <PageSection className="pt-20">
 <PageContainer>
 <FadeIn direction="up" delay={0.2}>
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

 {/* Left Column: Office Details */}
 <div className="lg:col-span-5 space-y-6">
 <InvisibleCard delay={0} className="border-none bg-background/50 flex flex-col justify-start">
 <div className="space-y-6">
 <div>
 <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary mb-4 block">
 Primary Head Office & Branch
 </span>
 <h3 className="text-[20px] font-medium text-foreground mb-3">Mommy Complex (Head Office)</h3>
 <p className="text-[15px] text-muted-foreground leading-relaxed mb-4">
 Nambol Bazar, Bishnupur District, Nambol 795134, Manipur, India
 </p>
 <h3 className="text-[20px] font-medium text-foreground mb-3">Wangkhei (Branch)</h3>
 <p className="text-[15px] text-muted-foreground leading-relaxed">
 3rd Floor, T.I. Building, Andro Parking, Palace Compound, Wangkhei, Imphal, Manipur 795001
 </p>
 </div>

 <div className="pt-8 border-t border-border/50">
 <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary mb-4 block">
 Direct Advisory Hotline
 </span>
 <a href="tel:+919089513731" className="text-[16px] font-medium text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background">
 +91 90895 13731
 </a>
 <br/>
 <a href="tel:+917085155262" className="text-[16px] font-medium text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background mt-2 inline-block">
 +91 70851 55262
 </a>
 </div>

 <div className="pt-8 border-t border-border/50">
 <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary mb-4 block">
 Inquiries &amp; Support
 </span>
 <a href="mailto:connect@eduplusskills.in" className="text-[16px] font-medium text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background">
 connect@eduplusskills.in
 </a>
 </div>
 </div>
 </InvisibleCard>
 </div>

 {/* Right Column: Form */}
 <div className="lg:col-span-7">
 <div className="relative border border-border/60 bg-card p-8 md:p-10">
 {/* Amber top accent — static, not hover-triggered, signals premium craftsmanship */}
 <div className="absolute top-0 left-0 w-16 h-[2px] bg-primary" />

 <h3 className="text-xl md:text-2xl font-medium text-foreground mb-8">Send an Inquiry</h3>

 {submitted ? (
 <div className="text-[14px] text-primary bg-primary/5 p-6 border border-primary/20">
 Thank you! Your message has been received. Our team will contact you within 24 hours.
 </div>
 ) : (
 <form onSubmit={inquiryForm.handleSubmit(onSubmitInquiry)} className="space-y-6">
 <div className="grid md:grid-cols-2 gap-6">
 <div className="space-y-2">
 <Label htmlFor="contact-name" className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
 Your Name
 </Label>
 <Input
 id="contact-name"
 {...inquiryForm.register('name')}
 placeholder="John Doe"
 className="rounded-none border-border/60 bg-background text-base h-11 focus:border-primary focus:ring-0 transition-colors duration-200"
 />
 {inquiryForm.formState.errors.name && <p className="text-[11px] text-destructive">{inquiryForm.formState.errors.name.message}</p>}
 </div>
 <div className="space-y-2">
 <Label htmlFor="contact-email" className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
 Email Address
 </Label>
 <Input
 id="contact-email"
 {...inquiryForm.register('email')}
 placeholder="john@example.com"
 className="rounded-none border-border/60 bg-background text-base h-11 focus:border-primary focus:ring-0 transition-colors duration-200"
 />
 {inquiryForm.formState.errors.email && <p className="text-[11px] text-destructive">{inquiryForm.formState.errors.email.message}</p>}
 </div>
 </div>

 <div className="space-y-2">
 <Label htmlFor="contact-mobile" className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
 Mobile Number
 </Label>
 <Input
 id="contact-mobile"
 {...inquiryForm.register('mobile')}
 placeholder="+91 98765 43210"
 className="rounded-none border-border/60 bg-background text-base h-11 focus:border-primary focus:ring-0 transition-colors duration-200"
 />
 {inquiryForm.formState.errors.mobile && <p className="text-[11px] text-destructive">{inquiryForm.formState.errors.mobile.message}</p>}
 </div>

 <div className="space-y-2">
 <Label htmlFor="contact-profile" className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground block">
 Stakeholder Profile
 </Label>
 <Select
 value={inquiryForm.watch('profile')}
 onValueChange={(val) => inquiryForm.setValue('profile', val)}
 >
 <SelectTrigger id="contact-profile" className="w-full rounded-none bg-background border-border/60 h-11 text-base text-foreground focus:border-primary focus:ring-0 transition-colors duration-200">
 <SelectValue placeholder="Select Profile" />
 </SelectTrigger>
 <SelectContent className="rounded-none text-base bg-background border border-border text-foreground">
 <SelectItem value="student">Student</SelectItem>
 <SelectItem value="parent">Parent / Guardian</SelectItem>
 <SelectItem value="educator">Educator / School Leader</SelectItem>
 <SelectItem value="corporation">Corporate Recruiter</SelectItem>
 <SelectItem value="institution">Educational Institution</SelectItem>
 </SelectContent>
 </Select>
 {inquiryForm.formState.errors.profile && <p className="text-[11px] text-destructive">{inquiryForm.formState.errors.profile.message}</p>}
 </div>

 <div className="space-y-2">
 <Label htmlFor="contact-message" className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
 Message
 </Label>
 <Textarea
 id="contact-message"
 {...inquiryForm.register('message')}
 placeholder="Tell us how we can help configure your roadmap..."
 className="rounded-none border-border/60 bg-background text-base min-h-[120px] focus:border-primary focus:ring-0 transition-colors duration-200 resize-none"
 />
 {inquiryForm.formState.errors.message && <p className="text-[11px] text-destructive">{inquiryForm.formState.errors.message.message}</p>}
 </div>

 <div className="flex items-start space-x-3">
 <Checkbox
 id="contact-marketing"
 checked={inquiryForm.watch('marketingConsent')}
 onCheckedChange={(checked) => inquiryForm.setValue('marketingConsent', checked as boolean)}
 className="mt-0.5 rounded-none"
 />
 <label
 htmlFor="contact-marketing"
 className="text-[12px] font-mono text-muted-foreground leading-relaxed cursor-pointer"
 >
 I hereby agree to receive promotional messages through WhatsApp / RCS / SMS
 </label>
 </div>

 <Button
 type="submit"
 size="md"
 disabled={inquiryForm.formState.isSubmitting}
 className="w-full rounded-none bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
 >
 {inquiryForm.formState.isSubmitting ? 'Sending...' : 'Submit'}
 </Button>
 </form>
 )}
 </div>
 </div>
 </div>

 {/* Newsletter — full-width, outside the grid to prevent row inflation */}
 <div className="mt-16 pt-16 border-t border-border/30">
 <div className="max-w-2xl">
 <h3 className="text-xl md:text-2xl font-medium text-foreground mb-3">Subscribe to Insights</h3>
 <p className="text-sm text-muted-foreground leading-relaxed mb-6">
 Receive curated updates on new future-ready programs, camps, and college scholarship opportunities. Free of spam.
 </p>

 {subscribed ? (
 <div className="text-[14px] text-primary bg-primary/5 p-4 border border-primary/20">
 Successfully subscribed! Welcome to our learning ecosystem.
 </div>
 ) : (
 <form onSubmit={newsletterForm.handleSubmit(onSubmitNewsletter)} className="flex flex-col gap-4">
 <div className="flex gap-4">
 <div className="flex-grow flex flex-col">
 <Input
 {...newsletterForm.register('email')}
 className="rounded-none border-border/50 text-base h-10"
 placeholder="Enter your email"
 />
 {newsletterForm.formState.errors.email && <p className="text-[11px] text-destructive mt-1">{newsletterForm.formState.errors.email.message}</p>}
 </div>
 <Button type="submit" variant="outline" size="lg" disabled={newsletterForm.formState.isSubmitting} className="rounded-none border-foreground/30 hover:border-foreground transition-colors duration-200">
 {newsletterForm.formState.isSubmitting ? 'Subscribing...' : 'Subscribe'}
 </Button>
 </div>
 <div className="flex items-start space-x-3 mt-2">
 <Checkbox
 id="newsletter-marketing"
 checked={newsletterForm.watch('marketingConsent')}
 onCheckedChange={(checked) => newsletterForm.setValue('marketingConsent', checked as boolean)}
 className="mt-[2px]"
 />
 <label
 htmlFor="newsletter-marketing"
 className="text-[13px] font-medium text-muted-foreground leading-snug cursor-pointer"
 >
 I hereby agree to receive promotional messages through WhatsApp / RCS /SMS
 </label>
 </div>
 {newsletterForm.formState.errors.marketingConsent && <p className="text-[11px] text-destructive">{newsletterForm.formState.errors.marketingConsent.message}</p>}
 </form>
 )}
 </div>
 </div>
 </FadeIn>
 </PageContainer>
 </PageSection>

 </div>
 );
}
