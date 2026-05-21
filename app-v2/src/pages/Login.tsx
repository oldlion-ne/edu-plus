import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../lib/AuthContext';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, role);
        if (error) throw error;
        toast.success('Sign up successful. Your account has been created.');
        setIsSignUp(false);
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast.success('Access granted. Welcome back.');
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
    toast.success(`Simulated session established as ${selectedRole.toUpperCase()}.`);
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center items-center py-24 relative overflow-hidden font-sans pt-[100px] px-6 animate-fade-in">
      <Card className="w-full max-w-[460px] z-10 relative">
        <CardHeader className="text-center pb-6">
          <CardTitle className="font-heading text-2xl font-light tracking-wide">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </CardTitle>
          <CardDescription className="font-mono text-[10px] tracking-[0.2em] uppercase">
            EduPlus // Central Gateway
          </CardDescription>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="w-full">
          <div className="px-6">
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="secure" className="text-[10px] font-mono tracking-widest uppercase">
                Secure Access
              </TabsTrigger>
              <TabsTrigger value="bypass" className="text-[10px] font-mono tracking-widest uppercase">
                Dev Bypass
              </TabsTrigger>
            </TabsList>
          </div>

          <CardContent className="px-6 pb-6">
            {/* SECURE ACCESS CONTENT */}
            <TabsContent value="secure" className="space-y-4 text-left m-0 outline-none">
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-mono uppercase tracking-wider">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@eduplus.in"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-mono uppercase tracking-wider">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                  />
                </div>

                {isSignUp && (
                  <div className="space-y-1.5">
                    <Label className="text-xs font-mono uppercase tracking-wider">Role</Label>
                    <Select value={role} onValueChange={(val) => setRole(val as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="educator">Educator</SelectItem>
                        <SelectItem value="resource_person">Resource Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button type="submit" disabled={submitting} className="w-full font-mono text-xs tracking-widest uppercase mt-2">
                  {submitting ? 'Processing...' : isSignUp ? 'Create Account' : 'Authorize Access'}
                </Button>

                <div className="text-center pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-xs font-mono text-muted-foreground hover:text-primary"
                  >
                    {isSignUp ? 'Already registered? Log in' : "Don't have an account? Sign up"}
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* DEV BYPASS NODE CONTENT */}
            <TabsContent value="bypass" className="space-y-4 text-left m-0 outline-none">
              <div className="space-y-4 text-left">
                <Alert>
                  <AlertDescription className="text-[10px] font-mono leading-relaxed">
                    [DEV MODE]: Bypass remote server queries. Inject simulated role directly to unlock all dashboard sections immediately.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2 pt-2">
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
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
