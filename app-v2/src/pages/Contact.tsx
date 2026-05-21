import { useEffect, useState } from 'react';
import ImmersiveHero from '../components/effects/ImmersiveHero';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { supabase } from '../lib/supabaseClient';

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
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
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: formData.name,
        email: formData.email,
        profile: formData.profile,
        message: formData.message,
        status: 'unread'
      });
      if (error) throw error;
    } catch (err) {
      console.error('Error sending message to Supabase database:', err);
    } finally {
      setSubmitted(true);
      setFormData({ name: '', email: '', profile: 'student', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-32 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-none blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-none blur-[130px] pointer-events-none" />

      {/* Immersive Top Hero Viewport */}
      <ImmersiveHero
        bgImage="/images/ContactVisual.png"
        category="Connect With Us"
        titleNormal="Contact &"
        titleHighlighted="Locations"
        description="Let's Build Your Next Chapter. Whether you seek strategic collaboration, student enrollment, counselor support, or training resources—we are here to launch you forward."
        telemetryLeft="COMMUNICATION_CHANNELS // ACTIVE"
        telemetryRight="UTC_COORD_CONTACT"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-16">
        {/* Info & Form Split Layout */}
        <div className={`grid lg:grid-cols-12 gap-12 transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Left Column: Office & Details */}
          <div className="lg:col-span-5 space-y-8">
            <Card>
              <CardHeader>
                <CardDescription className="text-xs tracking-wider uppercase">
                  Primary Head Office
                </CardDescription>
                <CardTitle className="font-heading text-xl font-light">Mommy Complex</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nambol Bazar, Bishnupur District,<br />
                  Nambol 795134, Manipur, India
                </p>
                <div className="pt-4 border-t border-border space-y-2">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Direct Advisory Hotline</span>
                  <a href="tel:+919856456703" className="text-base text-primary hover:underline font-medium">
                    +91 (985) 645 6703
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Interaction Form */}
          <div className="lg:col-span-7 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-2xl font-light">Send an Inquiry</CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="bg-primary/10 border border-primary/30 p-6 text-primary text-sm">
                    Thank you! Your message has been received. Our team will contact you within 24 hours.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name" className="text-xs uppercase tracking-wider">Your Name</Label>
                        <Input
                          id="contact-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email" className="text-xs uppercase tracking-wider">Email Address</Label>
                        <Input
                          id="contact-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-profile" className="text-xs uppercase tracking-wider block">Stakeholder Profile</Label>
                      <Select
                        value={formData.profile}
                        onValueChange={(val) => setFormData(prev => ({ ...prev, profile: val }))}
                      >
                        <SelectTrigger id="contact-profile" className="w-full">
                          <SelectValue placeholder="Select Profile" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="parent">Parent / Guardian</SelectItem>
                          <SelectItem value="educator">Educator / School Leader</SelectItem>
                          <SelectItem value="corporation">Corporate Recruiter</SelectItem>
                          <SelectItem value="institution">Educational Institution</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-message" className="text-xs uppercase tracking-wider">Message</Label>
                      <Textarea
                        id="contact-message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell us how we can help configure your roadmap..."
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Submit Advisory Request
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Newsletter Subscription */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg font-light">Subscribe to Insights</CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  Receive curated updates on new future-ready programs, camps, and college scholarship opportunities. Free of spam.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {subscribed ? (
                  <p className="text-xs text-primary">
                    Successfully subscribed! Welcome to our learning ecosystem.
                  </p>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-3">
                    <Input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-grow"
                      placeholder="Enter your email"
                    />
                    <Button type="submit" variant="outline">
                      Subscribe
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
