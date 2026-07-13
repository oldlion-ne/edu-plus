import { useState } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/AuthContext';
import AuthLayout, { AuthError } from './AuthLayout';
import { passwordSchema } from './authSchemas';

export default function ResetPassword() {
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = passwordSchema.safeParse(password);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'Choose a stronger password.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError(null);
    const response = await updatePassword(password);
    if (response.error) setError(response.error.message);
    else setComplete(true);
  };

  return (
    <AuthLayout title="Choose a new password" description="Use a unique password with at least 12 characters.">
      {complete ? <div className="space-y-4"><div className="border border-primary/30 bg-primary/5 p-4 text-sm">Your password has been updated.</div><Link className="text-primary hover:text-foreground focus:outline-none focus:underline" to="/auth/sign-in">Continue to sign in</Link></div> : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <AuthError message={error} />
          <div className="space-y-2"><Label htmlFor="new-password">New password</Label><Input id="new-password" type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="confirm-new-password">Confirm password</Label><Input id="confirm-new-password" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} /></div>
          <Button className="w-full rounded-none" type="submit">Update password</Button>
        </form>
      )}
    </AuthLayout>
  );
}
