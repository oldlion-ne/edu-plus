import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../lib/useAuth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import DreamyClouds from '@/components/effects/DreamyClouds';

const translations = {
  brandName: 'Edu',
  brandPlus: '+',
  signIn: 'Sign in',
  emailLabel: 'Email address',
  passwordLabel: 'Password',
  signingIn: 'Signing in…',
  taglineHeading: 'Education,\nElevated.',
  taglineSub: 'A platform built for those who shape the next generation of learners.',
  footerNote: 'Authorised personnel only.',
  systemNote: 'Secure staff authentication',
};

const translationMap = new Map<string, string>(Object.entries(translations));
const t = (key: keyof typeof translations) => translationMap.get(key) || '';

export default function Login() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  React.useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      toast.success('Welcome back.');
      navigate(from, { replace: true });
    } catch (err: any) {
      toast.error(err.message || 'Invalid credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-grow w-full flex flex-col md:flex-row min-h-[calc(100dvh-64px)]">

      {/* ── Left Brand Panel (shader + editorial text) ─────────────────── */}
      <div className="relative hidden md:flex md:w-[58%] flex-col overflow-hidden">
        {/* Full-bleed shader — no overlay, shader itself is dark charcoal/amber */}
        <div className="absolute inset-0 z-0">
          <DreamyClouds className="w-full h-full" />
        </div>

        {/* Content — text is always white since shader is always dark */}
        <div className="relative z-10 flex flex-col h-full px-12 py-10">

          {/* Logo */}
          <div className="shrink-0">
            <span className="font-heading font-bold text-2xl text-white leading-none tracking-tight">
              {t('brandName')}
              <span className="text-[#FBBF24] font-light">{t('brandPlus')}</span>
            </span>
          </div>

          {/* Central editorial statement */}
          <div className="flex-1 flex flex-col justify-center max-w-md">
            <div className="w-8 h-[2px] bg-[#FBBF24] mb-8" />
            <h2
              className="font-heading font-bold text-5xl xl:text-6xl text-white leading-[1.08] whitespace-pre-line"
            >
              {t('taglineHeading')}
            </h2>
            <div className="w-full h-[1px] bg-white/20 my-6" />
            <p className="text-white/75 text-base font-sans leading-relaxed max-w-xs">
              {t('taglineSub')}
            </p>
          </div>

          {/* Bottom system note — amber accent with white text, clearly readable */}
          <div className="shrink-0 flex items-center gap-2">
            <div className="w-1 h-3 bg-[#FBBF24]" />
            <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-white/80 font-medium">
              {t('systemNote')}
            </p>
          </div>

        </div>
      </div>

      {/* ── Right Form Panel ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center bg-background px-8 py-12 md:py-0">

        {/* Mobile-only logo */}
        <div className="mb-10 md:hidden">
          <span className="font-heading font-bold text-2xl text-foreground leading-none tracking-tight">
            {t('brandName')}
            <span className="text-[#FBBF24] font-light">{t('brandPlus')}</span>
          </span>
        </div>

        <div className="w-full max-w-[360px]">

          {/* Heading */}
          <div className="mb-8">
            <h1 className="font-heading text-2xl font-semibold text-foreground tracking-tight">
              {t('signIn')}
            </h1>
            <p className="font-sans text-sm text-muted-foreground mt-1.5">
              Access your staff dashboard.
            </p>
          </div>

          {/* Amber top-rule */}
          <div className="w-full h-[2px] bg-[#FBBF24] mb-8" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="login-email"
                className="text-[11px] font-sans font-medium uppercase tracking-widest text-muted-foreground"
              >
                {t('emailLabel')}
              </Label>
              <input
                id="login-email"
                type="email"
                placeholder="name@eduplus.in"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  'w-full h-11 px-3 text-sm font-sans',
                  'bg-muted/50 text-foreground',
                  'border border-border',
                  'placeholder:text-muted-foreground/50',
                  'outline-none focus:border-[#FBBF24] focus:ring-1 focus:ring-[#FBBF24]/40',
                  'transition-colors duration-200',
                  'rounded-none',
                )}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="login-password"
                className="text-[11px] font-sans font-medium uppercase tracking-widest text-muted-foreground"
              >
                {t('passwordLabel')}
              </Label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(
                    'w-full h-11 px-3 pr-10 text-sm font-sans',
                    'bg-muted/50 text-foreground',
                    'border border-border',
                    'placeholder:text-muted-foreground/50',
                    'outline-none focus:border-[#FBBF24] focus:ring-1 focus:ring-[#FBBF24]/40',
                    'transition-colors duration-200',
                    'rounded-none',
                  )}
                />
                <button /* ui-ignore */
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPass
                    ? <EyeOff size={15} strokeWidth={1.5} />
                    : <Eye     size={15} strokeWidth={1.5} />
                  }
                </button>
              </div>
            </div>

            {/* CTA */}
            <Button
              type="submit"
              className="w-full h-11 mt-2 font-sans text-sm tracking-wide bg-[#FBBF24] text-[#1C1B1A] hover:bg-[#FBBF24]/90 rounded-none border-none transition-colors duration-200"
              disabled={submitting}
            >
              {submitting ? t('signingIn') : t('signIn')}
            </Button>

          </form>

          {/* Footer note */}
          <p className="mt-6 text-center text-[11px] text-muted-foreground/60 font-sans tracking-wide">
            {t('footerNote')}
          </p>

        </div>
      </div>

    </div>
  );
}
