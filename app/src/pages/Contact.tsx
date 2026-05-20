import { useEffect, useState } from 'react';
import ImmersiveHero from '../components/effects/ImmersiveHero';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
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
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] pb-32 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7DF9FF]/5 rounded-none blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#7DF9FF]/3 rounded-none blur-[130px] pointer-events-none" />

      {/* Immersive Top Hero Viewport */}
      <ImmersiveHero
        bgImage="/images/ContactVisual.png"
        category="Connect With Us"
        titleNormal="Contact &"
        titleHighlighted="Locations"
        description="Let’s Build Your Next Chapter. Whether you seek strategic collaboration, student enrollment, counselor support, or training resources—we are here to launch you forward."
        telemetryLeft="COMMUNICATION_CHANNELS // ACTIVE"
        telemetryRight="UTC_COORD_CONTACT"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-16">
        {/* Info & Form Split Layout */}
        <div className={`grid lg:grid-cols-12 gap-12 transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Left Column: Office & Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="liquid-glass p-8 space-y-6">
              <span className="text-xs font-sans text-[#7DF9FF] tracking-wider uppercase block opacity-60">
                Primary Head Office
              </span>
              
              <div>
                <h3 className="font-heading text-xl font-light text-[#E6EDF3] mb-3">Mommy Complex</h3>
                <p className="font-sans text-sm text-[#8B949E] leading-relaxed">
                  Nambol Bazar, Bishnupur District,<br />
                  Nambol 795134, Manipur, India
                </p>
              </div>

              <div className="pt-4 border-t border-[#7DF9FF]/10 space-y-4">
                <div>
                  <span className="text-[10px] font-sans text-[#8B949E] uppercase tracking-wider block mb-1">Direct Advisory Hotline</span>
                  <a href="tel:+919856456703" className="font-sans text-base text-[#7DF9FF] hover:underline font-medium">
                    +91 (985) 645 6703
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="liquid-glass p-8 md:p-10">
              <h3 className="font-heading text-2xl font-light text-[#E6EDF3] mb-6">Send an Inquiry</h3>
              
              {submitted ? (
                <div className="bg-[#7DF9FF]/10 border border-[#7DF9FF]/30 p-6 text-[#7DF9FF] font-sans text-sm">
                  Thank you! Your message has been received. Our team will contact you within 24 hours.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-sans text-[#8B949E] uppercase tracking-wider">Your Name</label>
                      <Input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-sans text-[#8B949E] uppercase tracking-wider">Email Address</label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-sans text-[#8B949E] uppercase tracking-wider block mb-1">Stakeholder Profile</label>
                    <Select
                      value={formData.profile}
                      onValueChange={(val) => setFormData(prev => ({ ...prev, profile: val }))}
                    >
                      <SelectTrigger className="w-full bg-[#0B0F14] text-[#E6EDF3] border-[#E6EDF3]/10 h-11">
                        <SelectValue placeholder="Select Profile" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0E131A] border-[#7DF9FF]/20 text-[#E6EDF3]">
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="parent">Parent / Guardian</SelectItem>
                        <SelectItem value="educator">Educator / School Leader</SelectItem>
                        <SelectItem value="corporation">Corporate Recruiter</SelectItem>
                        <SelectItem value="institution">Educational Institution</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-sans text-[#8B949E] uppercase tracking-wider">Message</label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us how we can help configure your roadmap..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#7DF9FF] text-[#0B0F14] hover:bg-white transition-colors duration-300 font-sans font-medium text-sm tracking-wide"
                  >
                    Submit Advisory Request
                  </button>
                </form>
              )}
            </div>

            {/* Newsletter Subscription */}
            <div className="liquid-glass p-8">
              <h3 className="font-heading text-lg font-light text-[#E6EDF3] mb-2">Subscribe to Insights</h3>
              <p className="font-sans text-xs text-[#8B949E] mb-6 leading-relaxed">
                Receive curated updates on new future-ready programs, camps, and college scholarship opportunities. Free of spam.
              </p>

              {subscribed ? (
                <div className="text-xs font-sans text-[#7DF9FF]">
                  Successfully subscribed! Welcome to our learning ecosystem.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-3">
                  <Input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-grow bg-[#0B0F14] border border-[#E6EDF3]/10 h-10 placeholder:text-xs"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#7DF9FF]/10 text-[#7DF9FF] hover:bg-[#7DF9FF]/20 border border-[#7DF9FF]/20 text-xs font-sans font-medium transition-all duration-300"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
