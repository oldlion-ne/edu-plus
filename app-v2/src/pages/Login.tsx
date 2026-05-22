import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../lib/AuthContext';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function Login() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

      {/* Card */}
      <div className="w-full max-w-sm border border-border bg-card p-8 flex flex-col gap-8">

        {/* Brand */}
        <div className="flex flex-col gap-1">
          <span className="font-heading font-bold text-2xl text-foreground leading-none">
            Edu<span className="text-primary font-light">+</span>
          </span>
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mt-2">
            Staff Portal
          </p>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-foreground">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            Access is restricted to authorised staff only.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div className="flex flex-col gap-2">
            <Label htmlFor="login-email" className="text-xs uppercase tracking-wider font-mono">
              Email
            </Label>
            <Input
              id="login-email"
              type="email"
              placeholder="name@eduplus.in"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="login-password" className="text-xs uppercase tracking-wider font-mono">
              Password
            </Label>
            <Input
              id="login-password"
              type="password"
              placeholder="••••••••••••"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-1"
            disabled={submitting}
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </Button>

        </form>

      </div>
    </div>
  );
}
