import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../lib/AuthContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

const translations = {
  brandName: "Edu",
  brandPlus: "+",
  staffPortal: "Staff Portal",
  signIn: "Sign in",
  restrictedAccess: "Access is restricted to authorised staff only.",
  emailLabel: "Email",
  passwordLabel: "Password",
  signingIn: "Signing in…",
};

const translationMap = new Map<string, string>(Object.entries(translations));
const t = (key: keyof typeof translations) => translationMap.get(key) || '';

export default function Login() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPass, setShowPass]   = useState(false);
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
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm border border-border bg-card p-8 flex flex-col gap-8">

        {/* Brand */}
        <div>
          <span className="font-heading font-bold text-2xl text-card-foreground leading-none">
            {t('brandName')}<span className="text-primary font-light">{t('brandPlus')}</span>
          </span>
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mt-2">
            {t('staffPortal')}
          </p>
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-xl font-semibold text-card-foreground">{t('signIn')}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t('restrictedAccess')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="login-email"
              className="text-[10px] font-mono uppercase tracking-widest text-card-foreground"
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
                // Explicit text + bg so typed text is always visible
                'w-full h-10 px-3 text-sm',
                'bg-background text-foreground',
                'border border-border',
                'placeholder:text-muted-foreground',
                'outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
                'transition-colors duration-200',
                'rounded-none', // matches --radius:0 token
              )}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="login-password"
              className="text-[10px] font-mono uppercase tracking-widest text-card-foreground"
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
                  'w-full h-10 px-3 pr-10 text-sm',
                  'bg-background text-foreground',
                  'border border-border',
                  'placeholder:text-muted-foreground',
                  'outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
                  'transition-colors duration-200',
                  'rounded-none',
                )}
              />
              {/* Show / hide toggle */}
              <button
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

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-10 mt-1 font-mono text-xs tracking-widest uppercase"
            disabled={submitting}
          >
            {submitting ? t('signingIn') : t('signIn')}
          </Button>

        </form>
      </div>
    </div>
  );
}
