import { useState } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/AuthContext';
import AuthLayout, { AuthError } from './AuthLayout';
import { signUpSchema } from './authSchemas';

export default function SignUp() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = signUpSchema.safeParse({ email, password, confirmPassword });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'Check your details.');
      return;
    }
    setSubmitting(true);
    setError(null);
    const response = await signUp(result.data.email, result.data.password);
    setSubmitting(false);
    if (response.error) setError(response.error.message);
    else setComplete(true);
  };

  return (
    <AuthLayout
      title="Create your member account"
      description="New accounts start with member access. Staff permissions are granted only by an administrator."
      footer={<>Already registered? <Link className="text-primary hover:text-foreground focus:outline-none focus:underline" to="/auth/sign-in">Sign in</Link>.</>}
    >
      {complete ? (
        <div className="border border-primary/30 bg-primary/5 p-4 text-sm text-foreground">
          Check your email to confirm your account, then return to sign in.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <AuthError message={error} />
          <div className="space-y-2"><Label htmlFor="sign-up-email">Email</Label><Input id="sign-up-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="sign-up-password">Password</Label><Input id="sign-up-password" type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} /><p className="text-xs text-muted-foreground">Use at least 12 characters.</p></div>
          <div className="space-y-2"><Label htmlFor="sign-up-confirm">Confirm password</Label><Input id="sign-up-confirm" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} /></div>
          <Button className="w-full rounded-none" type="submit" disabled={submitting}>{submitting ? 'Creating account…' : 'Create member account'}</Button>
        </form>
      )}
    </AuthLayout>
  );
}
