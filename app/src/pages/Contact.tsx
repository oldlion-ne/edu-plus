import { useEffect, useState } from 'react';
import { EditorialHero } from '../components/layout/EditorialHero';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { supabase } from '../lib/supabaseClient';
import { Mail, MapPin, Phone } from 'lucide-react';


const translations = {
  heroCategory: "Connect With Us",
  heroTitleNormal: "Contact &",
  heroTitleHighlighted: "Locations",
  heroDesc: "Let's Build Your Next Chapter. Whether you seek strategic collaboration, student enrollment, counselor support, or training resources-we are here to launch you forward.",
  officeTitle: "Primary Head Office",
  officeName: "Mommy Complex",
  officeAddress: "Nambol Bazar, Bishnupur District, Nambol 795134, Manipur, India",
  hotlineLabel: "Direct Advisory Hotline",
  formTitle: "Send an Inquiry",
  successMessage: "Thank you! Your message has been received. Our team will contact you within 24 hours.",
  errorMessage: "We could not send your message. Please try again or use the email address shown here.",
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
  newsletterError: "We could not complete the subscription. You may already be subscribed.",
  subscribeButton: "Subscribe",
  placeholderEmail: "Enter your email",
  
  // Newly Added for i18n
  placeholderName: "John Doe",
  placeholderEmailInput: "john@example.com",
  inquiriesLabel: "Inquiries & Support",
  inquiriesEmail: "hello@eduplus.skills",
  hotlinePhone: "+91 (985) 645 6703"
};

const translationMap = new Map<string, string>(Object.entries(translations));
const t = (key: keyof typeof translations) => translationMap.get(key) || '';

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profile: 'student',
    message: ''
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: formData.name,
        email: formData.email,
        profile: formData.profile,
        message: formData.message,
        status: 'unread'
      });
      if (error) throw error;
      setSubmitted(true);
      setFormData({ name: '', email: '', profile: 'student', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Error sending message to Supabase database:', err);
      setFormError(t('errorMessage'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');
    const { error } = await supabase.from('newsletter_subscribers').insert({ email: newsletterEmail.trim().toLowerCase() });
    if (error) {
      setNewsletterError(t('newsletterError'));
      return;
    }
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-32 relative overflow-hidden">
      <EditorialHero
        image="/images/ContactVisual.webp"
        imageAlt="East Asian support team welcoming a community conversation"
        eyebrow={t('heroCategory')}
        title={<>{t('heroTitleNormal')} <span className="text-primary">{t('heroTitleHighlighted')}</span></>}
        description={t('heroDesc')}
        layout="split"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-16 pb-20">
        {/* Info & Form Split Layout */}
        <div className={`grid gap-10 transition-all duration-1000 delay-300 transform lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Left Column: Office & Details */}
          <div className="min-w-0 space-y-6">
            <Card className="p-6 bg-card/40  rounded-none border border-border flex flex-col justify-between min-h-[360px]">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-sans tracking-widest text-primary uppercase block mb-3 font-semibold">
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
                    <span className="text-xs font-sans text-muted-foreground uppercase tracking-widest block mb-1">
                      {t('hotlineLabel')}
                    </span>
                    <a href="tel:+919856456703" className="text-sm font-semibold font-sans text-foreground hover:text-primary hover:underline focus:outline-none focus:ring-1 focus:ring-primary">
                      {t('hotlinePhone')}
                    </a>
                  </div>
                </div>

                <div className="pt-6 border-t border-border flex items-start gap-3">
                  <Mail className="text-primary size-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-sans text-muted-foreground uppercase tracking-widest block mb-1">
                      {t('inquiriesLabel')}
                    </span>
                    <a href={`mailto:${t('inquiriesEmail')}`} className="text-sm font-semibold font-sans text-foreground hover:text-primary hover:underline focus:outline-none focus:ring-1 focus:ring-primary">
                      {t('inquiriesEmail')}
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Interaction Form */}
          <div className="min-w-0 space-y-6">
            <Card className="p-6 bg-card/40  rounded-none border border-border">
              <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground mb-6">
                {t('formTitle')}
              </h3>

              {submitted ? (
                <div className="bg-primary/10 border border-primary/30 p-6 text-primary text-xs font-sans">
                  {t('successMessage')}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name" className="text-xs font-sans uppercase tracking-wider text-muted-foreground">
                        {t('labelName')}
                      </Label>
                      <Input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder={t('placeholderName')}
                        className="font-sans text-xs rounded-none border-border focus:border-primary focus:ring-1 focus:ring-primary/20 bg-background/50 h-10 px-3"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email" className="text-xs font-sans uppercase tracking-wider text-muted-foreground">
                        {t('labelEmail')}
                      </Label>
                      <Input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder={t('placeholderEmailInput')}
                        className="font-sans text-xs rounded-none border-border focus:border-primary focus:ring-1 focus:ring-primary/20 bg-background/50 h-10 px-3"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-profile" className="text-xs font-sans uppercase tracking-wider text-muted-foreground block">
                      {t('labelProfile')}
                    </Label>
                    <Select
                      value={formData.profile}
                      onValueChange={(val) => setFormData(prev => ({ ...prev, profile: val }))}
                    >
                      <SelectTrigger id="contact-profile" className="w-full font-sans text-xs rounded-none bg-background/50 border-border h-10 px-3">
                        <SelectValue placeholder={t('placeholderProfile')} />
                      </SelectTrigger>
                      <SelectContent className="rounded-none font-sans text-xs border border-border bg-card">
                        <SelectItem value="student">{t('optStudent')}</SelectItem>
                        <SelectItem value="parent">{t('optParent')}</SelectItem>
                        <SelectItem value="educator">{t('optEducator')}</SelectItem>
                        <SelectItem value="corporation">{t('optCorp')}</SelectItem>
                        <SelectItem value="institution">{t('optInst')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message" className="text-xs font-sans uppercase tracking-wider text-muted-foreground">
                      {t('labelMessage')}
                    </Label>
                    <Textarea
                      id="contact-message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder={t('placeholderMessage')}
                      className="font-sans text-xs min-h-[120px] rounded-none border-border focus:border-primary focus:ring-1 focus:ring-primary/20 bg-background/50 p-3"
                    />
                  </div>

                  {formError && <p role="alert" className="border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">{formError}</p>}
                  <Button disabled={submitting} type="submit" className="w-full rounded-none font-sans text-xs uppercase tracking-wider h-10">
                    {submitting ? 'Sending...' : t('submitButton')}
                  </Button>
                </form>
              )}
            </Card>

            {/* Newsletter Subscription */}
            <Card className="p-6 bg-card/40  rounded-none border border-border">
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
                  <p className="text-xs text-primary font-sans bg-primary/10 border border-primary/25 p-3">
                    {t('newsletterSuccess')}
                  </p>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-3">
                    <Input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-grow font-sans text-xs rounded-none bg-background/50 border-border h-10 px-3"
                      placeholder={t('placeholderEmail')}
                    />
                    <Button type="submit" variant="outline" className="rounded-none font-sans text-xs uppercase tracking-wider h-10 px-6">
                      {t('subscribeButton')}
                    </Button>
                  </form>
                )}
                {newsletterError && <p role="alert" className="text-xs text-destructive">{newsletterError}</p>}
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
