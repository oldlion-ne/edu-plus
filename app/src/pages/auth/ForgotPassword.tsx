import { useState } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/AuthContext';
import AuthLayout, { AuthError } from './AuthLayout';
import { emailSchema } from './authSchemas';

export default function ForgotPassword() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'Enter a valid email address.');
      return;
    }
    setError(null);
    const response = await requestPasswordReset(result.data.email);
    if (response.error) setError(response.error.message);
    else setSent(true);
  };

  return (
    <AuthLayout title="Reset your password" description="We will send a secure recovery link if the address belongs to an account." footer={<Link className="text-primary hover:text-foreground focus:outline-none focus:underline" to="/auth/sign-in">Return to sign in</Link>}>
      {sent ? <div className="border border-primary/30 bg-primary/5 p-4 text-sm">Check your inbox for the recovery link.</div> : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <AuthError message={error} />
          <div className="space-y-2"><Label htmlFor="recovery-email">Email</Label><Input id="recovery-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /></div>
          <Button className="w-full rounded-none" type="submit">Send recovery link</Button>
        </form>
      )}
    </AuthLayout>
  );
}
