import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/useAuth';
import { supabase } from '@/lib/supabaseClient';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Shield, Users, UploadCloud, CheckCircle2, Smartphone } from 'lucide-react';
import { toast } from 'sonner';


export default function SettingsHub() {
  const { user, role } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'access'>('profile');
  
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
    <div className="space-y-6 animate-in fade-in duration-300 text-left">
      <div className="border-b border-border pb-4">
        <h2 className="font-heading text-2xl font-light text-foreground">Settings & Security</h2>
        <p className="font-sans text-xs text-muted-foreground mt-1">Manage your profile, security preferences, and dashboard access.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 flex flex-col gap-1 shrink-0">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-sans font-medium transition-all rounded-none border-l-2 ${activeTab === 'profile' ? 'border-primary bg-primary/5 text-foreground' : 'border-transparent text-muted-foreground hover:bg-muted/30 hover:text-foreground'}`}
          >
            <User size={16} /> Profile
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-sans font-medium transition-all rounded-none border-l-2 ${activeTab === 'security' ? 'border-primary bg-primary/5 text-foreground' : 'border-transparent text-muted-foreground hover:bg-muted/30 hover:text-foreground'}`}
          >
            <Shield size={16} /> Security & MFA
          </button>
          {role === 'admin' && (
            <button 
              onClick={() => setActiveTab('access')}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-sans font-medium transition-all rounded-none border-l-2 ${activeTab === 'access' ? 'border-primary bg-primary/5 text-foreground' : 'border-transparent text-muted-foreground hover:bg-muted/30 hover:text-foreground'}`}
            >
              <Users size={16} /> Access Control
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full">
          {activeTab === 'profile' && (
            <Card className="border border-border p-6 sm:p-8 bg-card/30 rounded-none space-y-8">
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-border">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-none overflow-hidden bg-muted border border-border flex items-center justify-center">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User size={32} className="text-muted-foreground/50" />
                    )}
                  </div>
                  <label className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer border border-primary/50">
                    <UploadCloud size={20} className="text-primary mb-1" />
                    <span className="text-[10px] font-sans font-medium text-foreground">Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={isUploading} />
                  </label>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-medium text-foreground">Profile Picture</h3>
                  <p className="font-sans text-xs text-muted-foreground mt-1">We recommend a 1:1 image, at least 200x200px.</p>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-foreground block">Full Name</Label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full bg-background border border-border text-xs px-4 py-2.5 outline-none focus:border-primary rounded-none text-foreground font-sans h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-foreground block">Email Address (Read-only)</Label>
                  <Input
                    value={user?.email || ''}
                    disabled
                    className="w-full bg-muted/50 border border-border text-xs px-4 py-2.5 outline-none rounded-none text-muted-foreground font-sans h-10 cursor-not-allowed"
                  />
                </div>
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-foreground hover:text-background font-sans text-sm font-medium rounded-none px-6 mt-2">
                  Save Changes
                </Button>
              </form>
            </Card>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8">
              {/* Password Update */}
              <Card className="border border-border p-6 sm:p-8 bg-card/30 rounded-none space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-medium text-foreground">Update Password</h3>
                  <p className="font-sans text-xs text-muted-foreground mt-1">Ensure your account is using a long, random password.</p>
                </div>
                <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-foreground block">New Password</Label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-background border border-border text-xs px-4 py-2.5 outline-none focus:border-primary rounded-none text-foreground font-sans h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-foreground block">Confirm New Password</Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-background border border-border text-xs px-4 py-2.5 outline-none focus:border-primary rounded-none text-foreground font-sans h-10"
                    />
                  </div>
                  <Button type="submit" className="bg-primary text-primary-foreground hover:bg-foreground hover:text-background font-sans text-sm font-medium rounded-none px-6 mt-2">
                    Update Password
                  </Button>
                </form>
              </Card>

              {/* MFA Settings */}
              <Card className="border border-border p-6 sm:p-8 bg-card/30 rounded-none space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-medium text-foreground">Two-Factor Authentication (TOTP)</h3>
                  <p className="font-sans text-xs text-muted-foreground mt-1">Add an extra layer of security to your account using an authenticator app.</p>
                </div>

                {mfaStatus === 'loading' && (
                  <p className="text-sm font-sans text-muted-foreground animate-pulse">Loading security status...</p>
                )}

                {mfaStatus === 'unenrolled' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/30 border border-border flex items-start gap-4">
                      <Smartphone className="text-muted-foreground shrink-0 mt-1" size={20} />
                      <div>
                        <p className="text-sm font-sans font-medium text-foreground">Authenticator App</p>
                        <p className="text-xs font-sans text-muted-foreground mt-1">Use an app like Google Authenticator, Authy, or 1Password to generate one-time codes.</p>
                      </div>
                    </div>
                    <Button onClick={handleMfaEnroll} className="bg-primary text-primary-foreground hover:bg-foreground hover:text-background font-sans text-sm font-medium rounded-none px-6">
                      Enable Two-Factor Auth
                    </Button>
                  </div>
                )}

                {mfaStatus === 'enrolling' && (
                  <form onSubmit={handleMfaVerify} className="space-y-6 max-w-md">
                    <div className="space-y-4">
                      <p className="text-sm font-sans text-foreground">1. Scan this QR code with your authenticator app:</p>
                      <div className="bg-white p-4 border border-border inline-block" dangerouslySetInnerHTML={{ __html: mfaQrCode }} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-foreground block">2. Enter the 6-digit code from the app:</Label>
                      <Input
                        type="text"
                        value={mfaCode}
                        onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="000000"
                        className="w-32 bg-background border border-border text-center text-lg tracking-widest px-4 py-2.5 outline-none focus:border-primary rounded-none text-foreground font-sans h-12"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" disabled={mfaCode.length !== 6} className="bg-primary text-primary-foreground hover:bg-foreground hover:text-background font-sans text-sm font-medium rounded-none px-6">
                        Verify & Enable
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setMfaStatus('unenrolled')} className="font-sans text-sm font-medium rounded-none">
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}

                {mfaStatus === 'enrolled' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/5 border border-primary/20 flex items-start gap-4">
                      <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                      <div>
                        <p className="text-sm font-sans font-medium text-foreground">MFA is Active</p>
                        <p className="text-xs font-sans text-muted-foreground mt-1">Your account is secured with a TOTP authenticator app. You will be prompted for a code when signing in.</p>
                      </div>
                    </div>
                    <Button onClick={handleMfaUnenroll} variant="destructive" className="font-sans text-sm font-medium rounded-none px-6 border border-destructive hover:bg-destructive/10 hover:text-destructive bg-transparent text-destructive">
                      Disable Two-Factor Auth
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          )}

          {activeTab === 'access' && role === 'admin' && (
            <Card className="border border-border p-6 sm:p-8 bg-card/30 rounded-none space-y-6">
              <div>
                <h3 className="font-heading text-lg font-medium text-foreground">Add New User</h3>
                <p className="font-sans text-xs text-muted-foreground mt-1">Invite a new staff member to the dashboard and assign their permissions.</p>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-foreground block">Email Address</Label>
                  <Input
                    type="email"
                    required
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="staff@eduplus.in"
                    className="w-full bg-background border border-border text-xs px-4 py-2.5 outline-none focus:border-primary rounded-none text-foreground font-sans h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-foreground block">Temporary Password</Label>
                  <Input
                    type="password"
                    required
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-background border border-border text-xs px-4 py-2.5 outline-none focus:border-primary rounded-none text-foreground font-sans h-10"
                  />
                  <p className="text-[10px] text-muted-foreground">Must be at least 8 chars with uppercase, lowercase, number, and special character.</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-foreground block">Role</Label>
                  <select 
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as any)}
                    className="w-full bg-background border border-border text-xs px-4 py-2.5 outline-none focus:border-primary rounded-none text-foreground font-sans h-10"
                  >
                    <option value="admin">Administrator</option>
                    <option value="educator">Educator</option>
                    <option value="resource_person">Resource Person</option>
                  </select>
                </div>
                <Button type="submit" disabled={isCreatingUser} className="bg-primary text-primary-foreground hover:bg-foreground hover:text-background font-sans text-sm font-medium rounded-none px-6 mt-4 w-full">
                  {isCreatingUser ? 'Creating...' : 'Create Dashboard User'}
                </Button>
              </form>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
