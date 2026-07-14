import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { PageHero } from '../components/ui/page-hero';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profile: 'student',
    message: '',
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: formData.name,
        email: formData.email,
        profile: formData.profile,
        message: formData.message,
        status: 'unread',
      });
      if (error) throw error;
      setSubmitted(true);
      setFormData({ name: '', email: '', profile: 'student', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Error sending message to Supabase database:', err);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({ email: newsletterEmail });
      if (error) throw error;
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    } catch (err) {
      console.error('Error saving newsletter email:', err);
    }
  };

  return (
    <div className="bg-background w-full min-h-screen">

      {/* ── Typographic Hero ── */}
      <PageHero
        eyebrow="Connect With Us"
        title="Contact &amp; Locations"
        description="Whether you seek strategic collaboration, student enrollment, counselor support, or training resources — we are here to support you."
      />

      {/* ── Contact Info & Form Grid ── */}
      <section className="py-20 border-t border-border/50 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <span className="text-[13px] font-medium uppercase tracking-wide text-muted-foreground mb-4 block">
                Primary Head Office
              </span>
              <h3 className="text-[20px] font-medium text-foreground mb-3">Mommy Complex</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                Nambol Bazar, Bishnupur District, Nambol 795134, Manipur, India
              </p>
            </div>

            <div className="pt-8 border-t border-border/50">
              <span className="text-[13px] font-medium uppercase tracking-wide text-muted-foreground mb-4 block">
                Direct Advisory Hotline
              </span>
              <a href="tel:+919856456703" className="text-[16px] font-medium text-foreground hover:underline">
                +91 (985) 645 6703
              </a>
            </div>

            <div className="pt-8 border-t border-border/50">
              <span className="text-[13px] font-medium uppercase tracking-wide text-muted-foreground mb-4 block">
                Inquiries &amp; Support
              </span>
              <a href="mailto:hello@eduplus.skills" className="text-[16px] font-medium text-foreground hover:underline">
                hello@eduplus.skills
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 space-y-12">
            <div className="p-10 bg-secondary">
              <h3 className="text-[20px] font-medium text-foreground mb-8">Send an Inquiry</h3>

              {submitted ? (
                <div className="text-[14px] text-primary bg-primary/5 p-6 border border-primary/20">
                  Thank you! Your message has been received. Our team will contact you within 24 hours.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name" className="text-[13px] font-medium text-muted-foreground">
                        Your Name
                      </Label>
                      <Input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                        className="rounded-none border-border/50 text-[14px] h-[48px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email" className="text-[13px] font-medium text-muted-foreground">
                        Email Address
                      </Label>
                      <Input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="john@example.com"
                        className="rounded-none border-border/50 text-[14px] h-[48px]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-profile" className="text-[13px] font-medium text-muted-foreground block">
                      Stakeholder Profile
                    </Label>
                    <Select
                      value={formData.profile}
                      onValueChange={(val) => setFormData((prev) => ({ ...prev, profile: val }))}
                    >
                      <SelectTrigger id="contact-profile" className="w-full rounded-none bg-background border-border/50 h-[48px] text-[14px]">
                        <SelectValue placeholder="Select Profile" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none text-[14px] bg-background border border-border/50">
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="parent">Parent / Guardian</SelectItem>
                        <SelectItem value="educator">Educator / School Leader</SelectItem>
                        <SelectItem value="corporation">Corporate Recruiter</SelectItem>
                        <SelectItem value="institution">Educational Institution</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message" className="text-[13px] font-medium text-muted-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="contact-message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us how we can help configure your roadmap..."
                      className="rounded-none border-border/50 text-[14px] min-h-[120px]"
                    />
                  </div>

                  <Button type="submit" className="w-full rounded-none h-[52px] bg-foreground text-background hover:bg-primary transition-colors duration-200">
                    Submit Advisory Request
                  </Button>
                </form>
              )}
            </div>

            {/* Newsletter card */}
            <div className="p-10 bg-secondary">
              <h3 className="text-[20px] font-medium text-foreground mb-3">Subscribe to Insights</h3>
              <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">
                Receive curated updates on new future-ready programs, camps, and college scholarship opportunities. Free of spam.
              </p>

              {subscribed ? (
                <div className="text-[14px] text-primary bg-primary/5 p-4 border border-primary/20">
                  Successfully subscribed! Welcome to our learning ecosystem.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-4">
                  <Input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-grow rounded-none border-border/50 text-[14px] h-[48px]"
                    placeholder="Enter your email"
                  />
                  <Button type="submit" variant="outline" className="rounded-none h-[48px] px-6 border-foreground/30 hover:border-foreground transition-colors duration-200">
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
