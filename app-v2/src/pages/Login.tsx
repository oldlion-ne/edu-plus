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

  // Redirect if already logged in
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
        toast.success('[SIGN UP SUCCESSFUL]', {
          description: 'Your credential record has been loaded into Supabase Auth.',
          style: { background: '#0E131A', border: '1px solid #7DF9FF', color: '#E6EDF3', borderRadius: '0px' }
        });
        setIsSignUp(false);
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast.success('[ACCESS GRANTED]', {
          description: 'Active session compiled successfully.',
          style: { background: '#0E131A', border: '1px solid #7DF9FF', color: '#E6EDF3', borderRadius: '0px' }
        });
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      toast.error('AUTH_ERROR', {
        description: err.message || 'Operation failed.',
        style: { borderRadius: '0px' }
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBypass = (selectedRole: 'admin' | 'educator' | 'resource_person') => {
    signInSimulated(selectedRole);
    toast.success('[SIMULATED SESSION ESTABLISHED]', {
      description: `Bypassing remote check. Simulated role: ${selectedRole.toUpperCase()}`,
      style: { background: '#0E131A', border: '1px solid #7DF9FF', color: '#E6EDF3', borderRadius: '0px' }
    });
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] flex justify-center items-center py-24 relative overflow-hidden font-sans pt-[100px] px-6 animate-fade-in">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#7DF9FF]/3 rounded-none blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-[460px] bg-[#0E131A]/80 border-[#7DF9FF]/20 p-8 shadow-[0_0_40px_rgba(11,15,20,0.85)] z-10 relative rounded-none">
        
        {/* Neon Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#7DF9FF] to-transparent shadow-[0_0_12px_#7DF9FF]"></div>

        <CardHeader className="text-center p-0 mb-8 space-y-0">
          <CardTitle className="font-heading text-2xl font-light tracking-wide text-[#E6EDF3] p-0">Secure Terminal Entry</CardTitle>
          <CardDescription className="font-mono text-[9px] text-[#7DF9FF] tracking-[0.2em] mt-1 uppercase p-0">EduPlus // Central Gateway</CardDescription>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="w-full">
          <TabsList className="grid grid-cols-2 gap-2 bg-transparent border-b border-[#7DF9FF]/10 pb-4 mb-6 h-auto p-0 rounded-none">
            <TabsTrigger 
              value="secure" 
              className="py-2 text-[10px] font-mono tracking-widest uppercase border rounded-none transition-all duration-300 cursor-pointer focus:outline-none data-[state=active]:border-[#7DF9FF] data-[state=active]:bg-[#7DF9FF]/5 data-[state=active]:text-[#7DF9FF] border-transparent text-white/40 hover:text-white hover:border-[#7DF9FF]/30"
            >
              [ SECURE ACCESS ]
            </TabsTrigger>
            <TabsTrigger 
              value="bypass" 
              className="py-2 text-[10px] font-mono tracking-widest uppercase border rounded-none transition-all duration-300 cursor-pointer focus:outline-none data-[state=active]:border-[#7DF9FF] data-[state=active]:bg-[#7DF9FF]/5 data-[state=active]:text-[#7DF9FF] border-transparent text-white/40 hover:text-white hover:border-[#7DF9FF]/30"
            >
              [ DEV BYPASS NODE ]
            </TabsTrigger>
          </TabsList>

          <CardContent className="p-0">
            {/* SECURE ACCESS CONTENT */}
            <TabsContent value="secure" className="space-y-4 text-left m-0 outline-none">
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-[#8B949E] uppercase tracking-wider">Email Address</label>
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@eduplus.in"
                    className="w-full bg-[#0B0F14] border-white/10 text-xs px-4 py-2.5 outline-none focus-visible:ring-1 focus-visible:ring-[#7DF9FF] focus-visible:border-[#7DF9FF] rounded-none text-white font-sans h-auto"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-[#8B949E] uppercase tracking-wider">Passkey Matrix</label>
                  <Input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#0B0F14] border-white/10 text-xs px-4 py-2.5 outline-none focus-visible:ring-1 focus-visible:ring-[#7DF9FF] focus-visible:border-[#7DF9FF] rounded-none text-white font-sans h-auto"
                  />
                </div>

                {isSignUp && (
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-[#8B949E] uppercase tracking-wider">Requested Security Clearance</label>
                    <Select value={role} onValueChange={(val) => setRole(val as any)}>
                      <SelectTrigger className="w-full bg-[#0B0F14] border-white/10 text-xs px-4 py-2.5 outline-none focus:ring-1 focus:ring-[#7DF9FF] rounded-none text-white font-mono h-auto">
                        <SelectValue placeholder="Select Clearance Level" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0E131A] border border-[#7DF9FF]/20 rounded-none text-white font-mono">
                        <SelectItem value="admin" className="focus:bg-[#7DF9FF]/10 focus:text-[#7DF9FF] rounded-none">Administrator (Level A)</SelectItem>
                        <SelectItem value="educator" className="focus:bg-[#7DF9FF]/10 focus:text-[#7DF9FF] rounded-none">Educator (Level B)</SelectItem>
                        <SelectItem value="resource_person" className="focus:bg-[#7DF9FF]/10 focus:text-[#7DF9FF] rounded-none">Resource Expert (Level C)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button type="submit" disabled={submitting} className="w-full py-3 bg-[#7DF9FF] text-[#0B0F14] hover:bg-white hover:text-[#0B0F14] focus:outline-none focus:ring-1 focus:ring-[#7DF9FF]/70 transition-all duration-300 font-mono text-[10px] font-bold tracking-widest uppercase cursor-pointer rounded-none mt-2 h-auto border-0">
                  {submitting ? 'PROCESSING...' : isSignUp ? 'CREATE RECORD' : 'AUTHORIZE ACCESS'}
                </Button>

                <div className="text-center pt-2">
                  <Button type="button" variant="ghost" onClick={() => setIsSignUp(!isSignUp)} className="text-[10px] font-mono text-white/50 hover:text-[#7DF9FF] hover:bg-transparent focus:text-[#7DF9FF] focus:outline-none transition-colors cursor-pointer p-0 h-auto rounded-none">
                    {isSignUp ? 'Already registered? Log in here' : "Don't have credentials? Request key"}
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* DEV BYPASS NODE CONTENT */}
            <TabsContent value="bypass" className="space-y-4 text-left m-0 outline-none">
              <div className="space-y-4 text-left">
                <p className="text-[10px] font-mono text-[#8B949E] leading-relaxed border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-3 rounded-none">
                  [ DEV ENVIRONMENT MODE ]: Bypass remote server queries. Inject simulated telemetry directly into local storage matrices to unlock all dashboard sections immediately.
                </p>
                
                <div className="space-y-2 pt-2">
                  <Button onClick={() => handleBypass('admin')} variant="outline" className="w-full py-3 border-[#EF4444]/30 hover:border-[#EF4444] hover:bg-[#EF4444]/5 hover:text-[#F87171] text-[#F87171] font-mono text-[9px] font-bold tracking-widest uppercase cursor-pointer rounded-none transition-all duration-300 focus:outline-none h-auto bg-transparent">
                    [ Inject Admin clearance ]
                  </Button>
                  <Button onClick={() => handleBypass('educator')} variant="outline" className="w-full py-3 border-[#22C55E]/30 hover:border-[#22C55E] hover:bg-[#22C55E]/5 hover:text-[#4ADE80] text-[#4ADE80] font-mono text-[9px] font-bold tracking-widest uppercase cursor-pointer rounded-none transition-all duration-300 focus:outline-none h-auto bg-transparent">
                    [ Inject Educator clearance ]
                  </Button>
                  <Button onClick={() => handleBypass('resource_person')} variant="outline" className="w-full py-3 border-[#7DF9FF]/30 hover:border-[#7DF9FF] hover:bg-[#7DF9FF]/5 hover:text-[#7DF9FF] text-[#7DF9FF] font-mono text-[9px] font-bold tracking-widest uppercase cursor-pointer rounded-none transition-all duration-300 focus:outline-none h-auto bg-transparent">
                    [ Inject Resource clearance ]
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
