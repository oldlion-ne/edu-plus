import { useState } from 'react';
import { toast } from 'sonner';
import { PageHero } from '../components/ui/page-hero';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
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

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    profile: 'student',
    message: '',
    marketingConsent: false,
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading('Sending your inquiry...');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REST_TIMEOUT_MS);
    try {
      // Use direct fetch to avoid Supabase auth-init delay on unauthenticated pages
      const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile || null,
          profile: formData.profile,
          message: formData.message,
          status: 'unread',
        }),
        signal: controller.signal,
      });
      if (!res.ok) {
        const errBody = await res.text();
        console.error('[Contact] Supabase error:', errBody);
        throw new Error(`Submission failed (HTTP ${res.status})`);
      }

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
          mobile: formData.mobile || undefined,
          message: formData.message,
        }),
        signal: controller.signal,
      });

      if (!emailRes.ok) {
        console.error('[Contact] Failed to send email via Edge Function');
      }

      console.log('Form data:', formData);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', mobile: '', profile: 'student', message: '', marketingConsent: false });
      toast.success('Inquiry sent! We\'ll be in touch within 24 hours.', { id: toastId });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err: any) {
      console.error('[Contact] Submit error:', err);
      const isTimeout = err.name === 'AbortError';
      const msg = isTimeout ? 'Request timed out. Please try again.' : 'Failed to send. Please email us directly.';
      toast.error(msg, { id: toastId });
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
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
        body: JSON.stringify({ email: newsletterEmail }),
        signal: controller.signal,
      });
      if (!res.ok && res.status !== 409) { // 409 = already subscribed
        const errBody = await res.text();
        console.error('[Contact] Subscribe error from Supabase:', errBody);
        throw new Error(`Subscription failed (HTTP ${res.status})`);
      }

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
        signal: controller.signal,
      });

      if (!emailRes.ok) {
        console.error('[Contact] Failed to send newsletter email via Edge Function');
      }

      console.log('Newsletter sub:', { newsletterEmail, newsletterConsent });
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSubscribed(true);
      setNewsletterEmail('');
      setNewsletterConsent(false);
      toast.success('Subscribed! Welcome to our learning ecosystem.', { id: toastId });
      setTimeout(() => setSubscribed(false), 5000);
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
    <div className="bg-background w-full flex-1">

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
              <InvisibleCard delay={0} className="border-none bg-background/50">
                <h3 className="text-xl md:text-2xl font-medium text-foreground mb-6">Send an Inquiry</h3>

                {submitted ? (
                  <div className="text-[14px] text-primary bg-primary/5 p-6 border border-primary/20">
                    Thank you! Your message has been received. Our team will contact you within 24 hours.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name" className="text-sm font-medium text-muted-foreground">
                          Your Name
                        </Label>
                        <Input
                          id="contact-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="John Doe"
                          className="rounded-none border-border/50 text-base h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email" className="text-sm font-medium text-muted-foreground">
                          Email Address
                        </Label>
                        <Input
                          id="contact-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          placeholder="john@example.com"
                          className="rounded-none border-border/50 text-base h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-mobile" className="text-sm font-medium text-muted-foreground">
                        Mobile Number <span className="text-muted-foreground/50 font-normal">(optional)</span>
                      </Label>
                      <Input
                        id="contact-mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => setFormData((prev) => ({ ...prev, mobile: e.target.value }))}
                        placeholder="+91 98765 43210"
                        pattern="[0-9+\-\s()]{7,20}"
                        className="rounded-none border-border/50 text-base h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-profile" className="text-sm font-medium text-muted-foreground block">
                        Stakeholder Profile
                      </Label>
                      <Select
                        value={formData.profile}
                        onValueChange={(val) => setFormData((prev) => ({ ...prev, profile: val }))}
                      >
                        <SelectTrigger id="contact-profile" className="w-full rounded-none bg-background border-border/50 h-12 text-base text-foreground">
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-message" className="text-sm font-medium text-muted-foreground">
                        Message
                      </Label>
                      <Textarea
                        id="contact-message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell us how we can help configure your roadmap..."
                        className="rounded-none border-border/50 text-base min-h-[120px]"
                      />
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="contact-marketing"
                        checked={formData.marketingConsent}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, marketingConsent: checked as boolean }))}
                        className="mt-1"
                      />
                      <label
                        htmlFor="contact-marketing"
                        className="text-[13px] font-medium text-muted-foreground leading-snug cursor-pointer"
                      >
                        I hereby agree to receive promotional messages through WhatsApp / RCS /SMS
                      </label>
                    </div>

                    <Button
                      type="submit"
                      size="md"
                      disabled={isSubmitting}
                      className="w-full rounded-none bg-foreground text-background hover:bg-primary transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Submit'}
                    </Button>
                  </form>
                )}
              </InvisibleCard>
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
                <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <Input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-grow rounded-none border-border/50 text-base h-10"
                      placeholder="Enter your email"
                    />
                    <Button type="submit" variant="outline" size="lg" className="rounded-none border-foreground/30 hover:border-foreground transition-colors duration-200">
                      Subscribe
                    </Button>
                  </div>
                  <div className="flex items-start space-x-3 mt-2">
                    <Checkbox
                      id="newsletter-marketing"
                      required
                      checked={newsletterConsent}
                      onCheckedChange={(checked) => setNewsletterConsent(checked as boolean)}
                      className="mt-[2px]"
                    />
                    <label
                      htmlFor="newsletter-marketing"
                      className="text-[13px] font-medium text-muted-foreground leading-snug cursor-pointer"
                    >
                      I hereby agree to receive promotional messages through WhatsApp / RCS /SMS
                    </label>
                  </div>
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
