import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../lib/AuthContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// ── LoginForm component (shadcn block pattern) ────────────────────────────────
function LoginForm({
  className,
  isSignUp,
  setIsSignUp,
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  role,
  setRole,
  submitting,
}: {
  className?: string;
  isSignUp: boolean;
  setIsSignUp: (v: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  role: 'admin' | 'educator' | 'resource_person';
  setRole: (v: 'admin' | 'educator' | 'resource_person') => void;
  submitting: boolean;
}) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {isSignUp ? 'Create an account' : 'Login to your account'}
          </CardTitle>
          <CardDescription>
            {isSignUp
              ? 'Fill in the details below to create your EduPlus account'
              : 'Enter your email below to login to your account'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">

              {/* Email */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@eduplus.in"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {!isSignUp && (
                    <Link
                      to="/contact"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-muted-foreground"
                    >
                      Forgot your password?
                    </Link>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Role selector — sign-up only */}
              {isSignUp && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={role}
                    onValueChange={(val) =>
                      setRole(val as 'admin' | 'educator' | 'resource_person')
                    }
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="educator">Educator</SelectItem>
                      <SelectItem value="resource_person">Resource Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Submit */}
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting
                    ? 'Processing...'
                    : isSignUp
                    ? 'Create Account'
                    : 'Login'}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="underline underline-offset-4 hover:text-primary transition-colors"
                  >
                    {isSignUp ? 'Sign in' : 'Sign up'}
                  </button>
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Login() {
  const { signIn, signUp, signInSimulated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<'secure' | 'bypass'>('secure');
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'educator' | 'resource_person'>('educator');
  const [submitting, setSubmitting] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  React.useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, role);
        if (error) throw error;
        toast.success('Account created successfully.');
        setIsSignUp(false);
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast.success('Welcome back.');
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      toast.error(err.message || 'Operation failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBypass = (selectedRole: 'admin' | 'educator' | 'resource_person') => {
    signInSimulated(selectedRole);
    toast.success(`Simulated session: ${selectedRole.toUpperCase()}`);
    navigate(from, { replace: true });
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-sm">

        {/* Tab switcher: Secure / Dev Bypass */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as 'secure' | 'bypass')}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="secure" className="text-[10px] font-mono tracking-widest uppercase">
              Secure Access
            </TabsTrigger>
            <TabsTrigger value="bypass" className="text-[10px] font-mono tracking-widest uppercase">
              Dev Bypass
            </TabsTrigger>
          </TabsList>

          {/* ── Secure login tab ── */}
          <TabsContent value="secure" className="m-0 outline-none">
            <LoginForm
              isSignUp={isSignUp}
              setIsSignUp={setIsSignUp}
              onSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              role={role}
              setRole={setRole}
              submitting={submitting}
            />
          </TabsContent>

          {/* ── Dev bypass tab ── */}
          <TabsContent value="bypass" className="m-0 outline-none">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Dev Bypass</CardTitle>
                <CardDescription>
                  Inject a simulated role session without hitting the auth server.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Alert>
                  <AlertDescription className="text-[10px] font-mono leading-relaxed">
                    [DEV MODE] — Bypasses Supabase auth. Inject a role directly to unlock all dashboard sections.
                  </AlertDescription>
                </Alert>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => handleBypass('admin')}
                    variant="outline"
                    className="w-full font-mono text-[9px] tracking-widest uppercase border-destructive/30 hover:border-destructive text-destructive hover:bg-destructive/5"
                  >
                    Inject Admin Clearance
                  </Button>
                  <Button
                    onClick={() => handleBypass('educator')}
                    variant="outline"
                    className="w-full font-mono text-[9px] tracking-widest uppercase border-green-500/30 hover:border-green-500 text-green-600 dark:text-green-400 hover:bg-green-500/5"
                  >
                    Inject Educator Clearance
                  </Button>
                  <Button
                    onClick={() => handleBypass('resource_person')}
                    variant="outline"
                    className="w-full font-mono text-[9px] tracking-widest uppercase border-primary/30 hover:border-primary text-primary hover:bg-primary/5"
                  >
                    Inject Resource Clearance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
