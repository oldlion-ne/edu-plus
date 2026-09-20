import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/useAuth';
import { supabase } from '@/lib/supabaseClient';
import {  CheckCircle2, Smartphone } from 'lucide-react';
import { toast } from 'sonner';


export default function SettingsHub({ activeTab = 'profile' }: { activeTab?: 'profile' | 'security' | 'access-control' | 'ai-advisor' }) {
  const { user, role } = useAuth();
  
  // Profile State
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || '');
  const [isUploading, setIsUploading] = useState(false);
  
  // Security State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // MFA State
  const [mfaStatus, setMfaStatus] = useState<'loading' | 'unenrolled' | 'enrolling' | 'enrolled'>('loading');
  const [mfaFactorId, setMfaFactorId] = useState('');
  const [mfaQrCode, setMfaQrCode] = useState('');
  const [mfaCode, setMfaCode] = useState('');

  // Access Control State
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'educator' | 'resource_person'>('educator');
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  useEffect(() => {
    checkMfaStatus();
  }, []);

  const checkMfaStatus = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.listFactors();
      if (error) throw error;
      const totpFactor = data.totp.find(f => f.status === 'verified');
      if (totpFactor) {
        setMfaStatus('enrolled');
        setMfaFactorId(totpFactor.id);
      } else {
        setMfaStatus('unenrolled');
      }
    } catch (err) {
      console.error('Error checking MFA status:', err);
      setMfaStatus('unenrolled');
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName, avatar_url: avatarUrl }
      });
      if (error) throw error;
      toast.success('Profile updated successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update profile');
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      setAvatarUrl(data.publicUrl);
      
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: data.publicUrl }
      });
      
      if (updateError) throw updateError;
      toast.success('Avatar uploaded successfully');
    } catch (err: any) {
      toast.error(err.message || 'Error uploading avatar');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Strong password regex: 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!strongPasswordRegex.test(newPassword)) {
      toast.error('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast.success('Password updated successfully');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update password');
    }
  };

  const handleMfaEnroll = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp' });
      if (error) throw error;
      
      setMfaFactorId(data.id);
      setMfaQrCode(data.totp.qr_code);
      setMfaStatus('enrolling');
    } catch (err: any) {
      toast.error(err.message || 'Failed to start MFA enrollment');
    }
  };

  const handleMfaVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const challengeRes = await supabase.auth.mfa.challenge({ factorId: mfaFactorId });
      if (challengeRes.error) throw challengeRes.error;

      const verifyRes = await supabase.auth.mfa.verify({
        factorId: mfaFactorId,
        challengeId: challengeRes.data.id,
        code: mfaCode
      });
      if (verifyRes.error) throw verifyRes.error;

      toast.success('Multi-Factor Authentication enabled!');
      setMfaStatus('enrolled');
      setMfaCode('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to verify MFA code');
    }
  };

  const handleMfaUnenroll = async () => {
    try {
      const { error } = await supabase.auth.mfa.unenroll({ factorId: mfaFactorId });
      if (error) throw error;
      toast.success('Multi-Factor Authentication disabled');
      setMfaStatus('unenrolled');
      setMfaFactorId('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to disable MFA');
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (role !== 'admin') {
      toast.error('Only administrators can add users');
      return;
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(newUserPassword)) {
      toast.error('Temporary password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
      return;
    }

    setIsCreatingUser(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-user', {
        body: { email: newUserEmail, password: newUserPassword, role: newUserRole },
      });

      if (error) throw new Error(error.message || 'Failed to reach server');
      if (!data?.success) throw new Error(data?.error || 'Unknown error creating user');

      toast.success(`User ${newUserEmail} created as ${newUserRole}`);
      setNewUserEmail('');
      setNewUserPassword('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to create user');
    } finally {
      setIsCreatingUser(false);
    }
  };

  return (
    <div className="flex flex-col gap-7 animate-in fade-in duration-300 w-full text-left">
      <div className="flex flex-col gap-8 items-start">
        {/* Content Area */}
        <div className="flex-1 w-full">
          {activeTab === 'profile' && (
            <div id="v-profile" className="animate-in fade-in duration-300">
              <div className="page-head mb-8">
                <h1>Profile</h1>
                <span className="sub">Your display name and avatar</span>
              </div>
              <div className="space-y-[28px]">
                <div className="card card-pad panel flex flex-col sm:flex-row items-center gap-5">
                  <div className="relative group shrink-0">
                    <div className="w-[64px] h-[64px] rounded-none bg-muted border border-border/60 flex items-center justify-center overflow-hidden">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-heading text-[26px] text-muted-foreground">A</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-sans text-[16px] font-semibold text-foreground leading-[1.15]">Profile picture</h3>
                    <p className="text-[12.5px] text-muted-foreground mt-[3px]">Square image works best · at least 200×200px</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <label className="inline-flex items-center gap-2 h-[34px] px-[14px] text-[13px] font-semibold bg-transparent border border-border text-foreground hover:border-muted-foreground hover:bg-muted/30 cursor-pointer transition-colors">
                      Change
                      <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={isUploading} />
                    </label>
                    <button type="button" className="inline-flex items-center h-[34px] px-3 text-[13px] font-semibold text-[oklch(var(--fjord))] hover:bg-[oklch(var(--fjord)/0.12)] transition-colors bg-transparent border border-transparent">
                      Remove
                    </button>
                  </div>
                </div>
                
                <form onSubmit={handleUpdateProfile} className="card card-pad measure">
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold mb-[7px] text-foreground">Full name</label>
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your name"
                      className="w-full h-[42px] px-[14px] rounded-none bg-card border border-border text-[14px] text-foreground focus:outline-none focus:border-[oklch(var(--fjord))] focus:shadow-[0_0_0_2.5px_oklch(var(--fjord)/0.12)] transition-all"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold mb-[7px] text-foreground">Email address</label>
                    <input
                      value={user?.email || ''}
                      readOnly
                      className="w-full h-[42px] px-[14px] rounded-none bg-background border border-border border-dashed text-[14px] text-muted-foreground focus:outline-none transition-all cursor-not-allowed"
                    />
                    <div className="text-[12.5px] text-muted-foreground mt-[6px]">Sign-in email — contact a system administrator to change it.</div>
                  </div>
                  <div className="mt-[26px]">
                    <button type="submit" className="btn btn-p">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div id="v-security" className="animate-in fade-in duration-300">
              <div className="page-head mb-8">
                <h1>Security & MFA</h1>
                <span className="sub">Password and two-factor authentication</span>
              </div>
              <div className="space-y-[28px]">
                
                <form onSubmit={handleUpdatePassword} className="card card-pad measure">
                  <h3 className="font-sans text-[16px] font-semibold text-foreground mb-1">Update password</h3>
                  <p className="text-[12.5px] text-muted-foreground mb-5">Use a long, random password you don't reuse elsewhere.</p>
                  
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold mb-[7px] text-foreground">New password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-[42px] px-[14px] rounded-none bg-card border border-border text-[14px] text-foreground focus:outline-none focus:border-[oklch(var(--fjord))] focus:shadow-[0_0_0_2.5px_oklch(var(--fjord)/0.12)] transition-all"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold mb-[7px] text-foreground">Confirm new password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-[42px] px-[14px] rounded-none bg-card border border-border text-[14px] text-foreground focus:outline-none focus:border-[oklch(var(--fjord))] focus:shadow-[0_0_0_2.5px_oklch(var(--fjord)/0.12)] transition-all"
                    />
                  </div>
                  <div className="mt-[24px]">
                    <button type="submit" className="btn btn-p">
                      Update password
                    </button>
                  </div>
                </form>

                <div className="card card-pad measure">
                  <h3 className="font-sans text-[16px] font-semibold text-foreground mb-1">Two-factor authentication</h3>
                  <p className="text-[12.5px] text-muted-foreground mb-5">Add a one-time code from an authenticator app on top of your password.</p>
                  
                  {mfaStatus === 'loading' && <p className="text-[12.5px] text-muted-foreground animate-pulse">Loading...</p>}
                  
                  {mfaStatus === 'unenrolled' && (
                    <>
                      <div className="flex items-center gap-[14px] p-4 border border-border/60 rounded-none bg-background">
                        <Smartphone className="size-[22px] text-muted-foreground shrink-0" strokeWidth={1.6} />
                        <div>
                          <div className="font-semibold text-[14px] text-foreground">Authenticator app</div>
                          <div className="text-[12.5px] text-muted-foreground">Google Authenticator, Authy, or 1Password</div>
                        </div>
                        <span className="font-mono text-[10px] tracking-[.1em] text-muted-foreground uppercase ml-auto">Not enabled</span>
                      </div>
                      <div className="mt-5">
                        <button onClick={handleMfaEnroll} className="btn btn-p">
                          Enable two-factor auth
                        </button>
                      </div>
                    </>
                  )}
                  
                  {mfaStatus === 'enrolling' && (
                    <form onSubmit={handleMfaVerify}>
                      <div className="space-y-4 mb-5">
                        <p className="text-[13px] font-semibold text-foreground">1. Scan this QR code with your authenticator app:</p>
                        <div className="bg-white p-4 border border-border/60 inline-block" dangerouslySetInnerHTML={{ __html: mfaQrCode }} />
                      </div>
                      <div className="mb-5">
                        <label className="block text-[13px] font-semibold mb-[7px] text-foreground">2. Enter the 6-digit code from the app:</label>
                        <input
                          type="text"
                          value={mfaCode}
                          onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          placeholder="000000"
                          className="w-[120px] h-[42px] px-[14px] rounded-none bg-card border border-border text-[14px] text-center tracking-[.2em] text-foreground focus:outline-none focus:border-[oklch(var(--fjord))] focus:shadow-[0_0_0_2.5px_oklch(var(--fjord)/0.12)] transition-all"
                        />
                      </div>
                      <div className="flex gap-2.5">
                        <button type="submit" disabled={mfaCode.length !== 6} className="inline-flex items-center gap-2 h-[40px] px-[18px] font-semibold text-[13.5px] bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:-translate-y-px disabled:opacity-50">
                          Verify & Enable
                        </button>
                        <button type="button" onClick={() => setMfaStatus('unenrolled')} className="inline-flex items-center h-[40px] px-[18px] text-[13.5px] font-semibold bg-transparent border border-border text-foreground hover:border-muted-foreground hover:bg-muted/30 transition-colors">
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                  
                  {mfaStatus === 'enrolled' && (
                    <>
                      <div className="flex items-center gap-[14px] p-4 border border-border/60 rounded-none bg-background">
                        <CheckCircle2 className="size-[22px] text-primary shrink-0" strokeWidth={1.6} />
                        <div>
                          <div className="font-semibold text-[14px] text-foreground">Authenticator app</div>
                          <div className="text-[12.5px] text-muted-foreground">Google Authenticator, Authy, or 1Password</div>
                        </div>
                        <span className="font-mono text-[10px] tracking-[.1em] text-primary uppercase ml-auto">Active</span>
                      </div>
                      <div className="mt-5">
                        <button onClick={handleMfaUnenroll} className="inline-flex items-center gap-2 h-[34px] px-[12px] font-semibold text-[13px] bg-transparent text-[oklch(var(--destructive))] border border-[oklch(var(--destructive)/0.3)] hover:bg-[oklch(var(--destructive)/0.1)] transition-colors">
                          Disable two-factor auth
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'access-control' && role === 'admin' && (
            <div id="v-access" className="animate-in fade-in duration-300">
              <div className="page-head mb-8">
                <h1>Access Control</h1>
                <span className="sub">Invite staff and assign permissions</span>
              </div>
              <form onSubmit={handleCreateUser} className="card card-pad measure">
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold mb-[7px] text-foreground">Email address</label>
                  <input
                    type="email"
                    required
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="name@eduplus.app"
                    className="w-full h-[42px] px-[14px] rounded-none bg-card border border-border text-[14px] text-foreground focus:outline-none focus:border-[oklch(var(--fjord))] focus:shadow-[0_0_0_2.5px_oklch(var(--fjord)/0.12)] transition-all"
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold mb-[7px] text-foreground">Temporary password</label>
                  <input
                    type="password"
                    required
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-[42px] px-[14px] rounded-none bg-card border border-border text-[14px] text-foreground focus:outline-none focus:border-[oklch(var(--fjord))] focus:shadow-[0_0_0_2.5px_oklch(var(--fjord)/0.12)] transition-all"
                  />
                  <div className="text-[12.5px] text-muted-foreground mt-[6px]">At least 8 characters with uppercase, lowercase, a number, and a special character. The user changes it on first sign-in.</div>
                </div>
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold mb-[7px] text-foreground">Role</label>
                  <select 
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as any)}
                    className="w-full h-[42px] px-[14px] rounded-none bg-card border border-border text-[14px] text-foreground focus:outline-none focus:border-[oklch(var(--fjord))] focus:shadow-[0_0_0_2.5px_oklch(var(--fjord)/0.12)] transition-all appearance-none"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23B3A88F\' stroke-width=\'2.4\' stroke-linecap=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '38px' }}
                  >
                    <option value="admin">Admin</option>
                    <option value="educator">Educator</option>
                    <option value="resource_person">Resource Person</option>
                  </select>
                  <div className="text-[12.5px] text-muted-foreground mt-[6px]">Roles map to dashboard permissions — admins manage people, educators manage content.</div>
                </div>
                <div className="mt-[26px] flex gap-2.5">
                  <button type="submit" disabled={isCreatingUser} className="btn btn-p" style={{ opacity: isCreatingUser ? 0.5 : 1 }}>
                    {isCreatingUser ? 'Creating...' : 'Create dashboard user'}
                  </button>
                  <button type="button" onClick={() => {setNewUserEmail(''); setNewUserPassword('')}} className="btn btn-g">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'ai-advisor' && (
            <div id="v-aiadvisor" className="animate-in fade-in duration-300">
              <div className="page-head mb-8">
                <h1>AI Advisor</h1>
                <span className="sub">Facts injected into the site advisor chatbot</span>
              </div>
              <div className="space-y-[28px]">
                <form className="card card-pad measure" onSubmit={(e) => { e.preventDefault(); toast('Fact added'); }}>
                  <h3 className="font-sans text-[16px] font-semibold text-foreground mb-4">Add a fact</h3>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold mb-[7px] text-foreground">Topic</label>
                    <input
                      placeholder="e.g. Founder Bikash Oinam's email"
                      className="w-full h-[42px] px-[14px] rounded-none bg-card border border-border text-[14px] text-foreground focus:outline-none focus:border-[oklch(var(--fjord))] focus:shadow-[0_0_0_2.5px_oklch(var(--fjord)/0.12)] transition-all"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold mb-[7px] text-foreground">Answer</label>
                    <textarea
                      placeholder="e.g. Mr. Bikash Oinam can be reached at info@eduplus.in"
                      className="w-full min-h-[96px] py-[12px] px-[14px] rounded-none bg-card border border-border text-[14px] text-foreground focus:outline-none focus:border-[oklch(var(--fjord))] focus:shadow-[0_0_0_2.5px_oklch(var(--fjord)/0.12)] transition-all resize-y"
                    />
                    <div className="text-[12.5px] text-muted-foreground mt-[6px]">Write it the way the advisor should say it — one clear sentence works best.</div>
                  </div>
                  <div className="mt-[24px]">
                    <button type="submit" className="btn btn-p">
                      Add fact
                    </button>
                  </div>
                </form>
                <div className="max-w-[560px]">
                  <h3 className="font-sans text-[16px] font-semibold text-foreground mb-[14px]">Active facts</h3>
                  <div className="bg-card border border-border/60 rounded-none">
                    <div className="grid place-content-center justify-items-center gap-2 text-center min-h-[220px] pb-4">
                      <svg viewBox="0 0 24 24" className="size-[30px] stroke-muted-foreground opacity-70 mb-1.5 fill-none" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /><circle cx="12" cy="12" r="3.2" />
                      </svg>
                      <div className="font-heading text-[17px] text-foreground">No facts yet</div>
                      <div className="text-[13.5px] text-muted-foreground max-w-[40ch]">Add your first one above — for example, the advisor's answer to "How do I contact the founder?"</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
