import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/AuthContext';
import AuthLayout, { AuthError } from './AuthLayout';
import { signInSchema } from './authSchemas';

function safeReturnPath(value: unknown) {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')
    ? value
    : '/';
}

export default function SignIn() {
  const { signIn, user, role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const from = safeReturnPath((location.state as { from?: { pathname?: string } } | null)?.from?.pathname);

  useEffect(() => {
    if (user) {
      navigate(from === '/' && role !== 'member' ? '/dashboard' : from, { replace: true });
    }
  }, [from, navigate, role, user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = signInSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'Check your details.');
      return;
    }

    setSubmitting(true);
    setError(null);
    const response = await signIn(result.data.email, result.data.password);
    if (response.error) setError(response.error.message);
    setSubmitting(false);
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to manage your profile, event registrations, or staff workspace."
      footer={<>New to EduPlus? <Link className="text-primary hover:text-foreground focus:outline-none focus:underline" to="/auth/sign-up">Create an account</Link>.</>}
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <AuthError message={error} />
        <div className="space-y-2">
          <Label htmlFor="sign-in-email">Email</Label>
          <Input id="sign-in-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="sign-in-password">Password</Label>
            <Link className="text-xs text-primary hover:text-foreground focus:outline-none focus:underline" to="/auth/forgot-password">Forgot password?</Link>
          </div>
          <Input id="sign-in-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <Button className="w-full rounded-none" type="submit" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </AuthLayout>
  );
}
