import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../lib/useAuth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import DreamyClouds from '@/components/effects/DreamyClouds';
import { supabase } from '@/lib/supabaseClient';

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
  const [mfaRequired, setMfaRequired] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [mfaFactorId, setMfaFactorId] = useState('');

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  React.useEffect(() => {
    if (user && !mfaRequired) {
      // Check MFA asynchronously just in case user object was loaded from session
      supabase.auth.mfa.getAuthenticatorAssuranceLevel().then(({ data }) => {
        if (data && data.nextLevel === 'aal2' && data.currentLevel === 'aal1') {
          supabase.auth.mfa.listFactors().then(({ data: factorsData }) => {
            const totpFactor = factorsData?.totp.find(f => f.status === 'verified');
            if (totpFactor) {
              setMfaFactorId(totpFactor.id);
              setMfaRequired(true);
            } else {
              navigate(from, { replace: true });
            }
          });
        } else {
          navigate(from, { replace: true });
        }
      });
    }
  }, [user, navigate, from, mfaRequired]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      
      const { data: aalData, error: aalError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      if (aalError) throw aalError;
      
      if (aalData.nextLevel === 'aal2' && aalData.currentLevel === 'aal1') {
        const { data: factorsData, error: factorsError } = await supabase.auth.mfa.listFactors();
        if (factorsError) throw factorsError;
        
        const totpFactor = factorsData.totp.find(f => f.status === 'verified');
        if (totpFactor) {
          setMfaFactorId(totpFactor.id);
          setMfaRequired(true);
          setSubmitting(false);
          return; // Stop here, wait for MFA
        }
      }

      toast.success('Welcome back.');
      navigate(from, { replace: true });
    } catch (err: any) {
      toast.error(err.message || 'Invalid credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleMfaVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const challengeRes = await supabase.auth.mfa.challenge({ factorId: mfaFactorId });
      if (challengeRes.error) throw challengeRes.error;

      const verifyRes = await supabase.auth.mfa.verify({
        factorId: mfaFactorId,
        challengeId: challengeRes.data.id,
        code: mfaCode
      });
      if (verifyRes.error) throw verifyRes.error;

      toast.success('Welcome back.');
      setMfaRequired(false);
      navigate(from, { replace: true });
    } catch (err: any) {
      toast.error(err.message || 'Invalid verification code');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-grow w-full flex flex-col md:flex-row min-h-[calc(100dvh-64px)] bg-background">

      {/* ── Left Brand Panel (shader + editorial text) ─────────────────── */}
      <div className="relative hidden md:flex md:w-1/2 lg:w-[55%] flex-col overflow-hidden border-r border-border">
        {/* Full-bleed shader — untouched as requested */}
        <div className="absolute inset-0 z-0">
          <DreamyClouds className="w-full h-full" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col h-full px-12 py-12 justify-between">
          
          {/* Logo */}
          <div className="shrink-0 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both delay-[100ms]">
            <span className="font-heading font-bold text-3xl text-[#0E131A] leading-none tracking-tight">
              {t('brandName')}
              <span className="text-[#FBBF24] font-light">{t('brandPlus')}</span>
            </span>
          </div>

          {/* Central editorial statement */}
          <div className="flex-1 flex flex-col justify-center max-w-lg">
            <h2 className="font-heading font-semibold text-5xl lg:text-7xl text-[#0E131A] leading-[1.05] whitespace-pre-line tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out fill-mode-both delay-[300ms]">
              {t('taglineHeading')}
            </h2>
            <div className="w-12 h-[2px] bg-[#0E131A]/30 my-8 animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out fill-mode-both delay-[500ms]" />
            <p className="text-[#0E131A]/70 text-lg font-sans leading-relaxed max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both delay-[600ms]">
              {t('taglineSub')}
            </p>
          </div>

          {/* Bottom system note */}
          <div className="shrink-0 animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out fill-mode-both delay-[800ms]">
            <p className="text-xs font-sans tracking-[0.25em] uppercase text-[#0E131A]/60 font-semibold">
              {t('systemNote')}
            </p>
          </div>
        </div>
      </div>

      {/* ── Right Form Panel ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center bg-background px-8 py-16 md:py-0 relative">
        
        {/* Subtle geometric background element (Nordic Lagom: Straight lines, strict) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Mobile-only logo */}
        <div className="mb-12 md:hidden animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both">
          <span className="font-heading font-bold text-3xl text-foreground leading-none tracking-tight">
            {t('brandName')}
            <span className="text-[#FBBF24] font-light">{t('brandPlus')}</span>
          </span>
        </div>

        <div className="w-full max-w-[380px] relative z-10">

          {/* Heading */}
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both delay-[200ms]">
            <h1 className="font-heading text-3xl font-medium text-foreground tracking-tight">
              {t('signIn')}
            </h1>
            <p className="font-sans text-sm text-muted-foreground mt-2">
              Access your staff dashboard.
            </p>
          </div>

          {/* Form / MFA View */}
          {mfaRequired ? (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both delay-[100ms]">
              <div className="bg-primary/5 border border-primary/20 p-5 flex items-start gap-4 rounded-none">
                <ShieldCheck className="text-primary shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-heading font-medium text-foreground text-sm tracking-wide">Two-Factor Authentication</h3>
                  <p className="font-sans text-xs text-muted-foreground mt-1.5 leading-relaxed">Please enter the 6-digit code from your authenticator app to continue.</p>
                </div>
              </div>
              
              <form onSubmit={handleMfaVerify} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2 relative group">
                  <Label htmlFor="mfa-code" className="text-[10px] font-sans font-semibold uppercase tracking-widest text-muted-foreground group-focus-within:text-foreground transition-colors duration-300">
                    Authentication Code
                  </Label>
                  <div className="relative">
                    <input
                      id="mfa-code"
                      type="text"
                      required
                      autoFocus
                      placeholder="000000"
                      value={mfaCode}
                      onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="peer w-full h-14 text-center tracking-[0.5em] text-xl font-sans bg-transparent text-foreground border-0 border-b border-border outline-none focus:ring-0 rounded-none transition-colors duration-300"
                    />
                    <div className="absolute bottom-0 left-0 h-[2px] bg-[#FBBF24] w-0 transition-all duration-300 peer-focus:w-full" />
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-2">
                  <Button
                    type="submit"
                    disabled={mfaCode.length !== 6 || submitting}
                    className="w-full h-12 font-sans text-sm font-medium tracking-wider uppercase bg-[#FBBF24] text-[#0E131A] hover:bg-[#FBBF24]/90 rounded-none border-none transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(28,27,26,0.1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] disabled:hover:shadow-none disabled:opacity-50"
                  >
                    {submitting ? 'Verifying...' : 'Verify & Continue'}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => { setMfaRequired(false); setMfaCode(''); }}
                    className="w-full h-12 font-sans text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-transparent rounded-none transition-colors duration-300"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both delay-[400ms]">
                {/* Email */}
                <div className="flex flex-col gap-2 relative group">
                  <Label
                    htmlFor="login-email"
                    className="text-[10px] font-sans font-semibold uppercase tracking-widest text-muted-foreground group-focus-within:text-foreground transition-colors duration-300"
                  >
                    {t('emailLabel')}
                  </Label>
                  <div className="relative">
                    <input
                      id="login-email"
                      type="email"
                      placeholder="name@eduplus.in"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={cn(
                        'peer w-full h-12 px-0 text-base font-sans',
                        'bg-transparent text-foreground',
                        'border-0 border-b border-border',
                        'placeholder:text-muted-foreground/30',
                        'outline-none focus:ring-0',
                        'transition-all duration-300',
                        'rounded-none'
                      )}
                    />
                    <div className="absolute bottom-0 left-0 h-[2px] bg-[#FBBF24] w-0 transition-all duration-300 peer-focus:w-full" />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2 relative group">
                  <Label
                    htmlFor="login-password"
                    className="text-[10px] font-sans font-semibold uppercase tracking-widest text-muted-foreground group-focus-within:text-foreground transition-colors duration-300"
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
                        'peer w-full h-12 px-0 pr-10 text-base font-sans',
                        'bg-transparent text-foreground',
                        'border-0 border-b border-border',
                        'placeholder:text-muted-foreground/30',
                        'outline-none focus:ring-0',
                        'transition-all duration-300',
                        'rounded-none'
                      )}
                    />
                    <div className="absolute bottom-0 left-0 h-[2px] bg-[#FBBF24] w-0 transition-all duration-300 peer-focus:w-full" />
                    <button
                      type="button"
                      onClick={() => setShowPass((v) => !v)}
                      aria-label={showPass ? 'Hide password' : 'Show password'}
                      className="absolute inset-y-0 right-0 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPass
                        ? <EyeOff size={16} strokeWidth={1.5} />
                        : <Eye     size={16} strokeWidth={1.5} />
                      }
                    </button>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both delay-[600ms]">
                <Button
                  type="submit"
                  className="w-full h-12 font-sans text-sm font-medium tracking-wider uppercase bg-[#FBBF24] text-[#0E131A] hover:bg-[#FBBF24]/90 rounded-none border-none transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(28,27,26,0.1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] disabled:hover:shadow-none disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? t('signingIn') : t('signIn')}
                </Button>
              </div>

            </form>
          )}

          {/* Footer note */}
          <div className="mt-12 animate-in fade-in duration-1000 ease-out fill-mode-both delay-[800ms]">
            <p className="text-center text-[10px] text-muted-foreground/60 font-sans tracking-widest uppercase font-medium">
              {t('footerNote')}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
