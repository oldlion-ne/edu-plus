import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../ui/dialog';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '../ui/avatar';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { UploadCloud } from 'lucide-react';
import type { UserRole } from '../../lib/useAuth';

interface ProfileSettingsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
  isSimulated: boolean;
  selectedRole: UserRole | null;
  signInSimulated: (role: UserRole) => void;
  handleLogout: () => void;
  initialName: string;
  initialAvatar: string;
  initialBio: string;
  onProfileUpdated: (name: string, avatar: string, bio: string) => void;
}

export default function ProfileSettingsDialog({
  isOpen,
  onOpenChange,
  user,
  isSimulated,
  selectedRole,
  signInSimulated,
  handleLogout,
  initialName,
  initialAvatar,
  initialBio,
  onProfileUpdated
}: ProfileSettingsDialogProps) {
  const [profileName, setProfileName] = useState('');
  const [profileAvatar, setProfileAvatar] = useState('');
  const [profileBio, setProfileBio] = useState('');
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProfileName(initialName);
      setProfileAvatar(initialAvatar);
      setProfileBio(initialBio);
    }
  }, [isOpen, initialName, initialAvatar, initialBio]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSimulated) {
        const cachedSim = localStorage.getItem('edu_plus_sim_session');
        if (cachedSim) {
          const parsed = JSON.parse(cachedSim);
          parsed.user.user_metadata = {
            ...parsed.user.user_metadata,
            full_name: profileName,
            avatar_url: profileAvatar,
            bio: profileBio
          };
          localStorage.setItem('edu_plus_sim_session', JSON.stringify(parsed));
          toast.success('Profile Updated', {
            description: 'Your profile has been updated successfully.',
            style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--primary)/0.3)', color: 'oklch(var(--foreground))', borderRadius: '0px' }
          });
          onProfileUpdated(profileName, profileAvatar, profileBio);
        }
      } else {
        const { error } = await supabase.auth.updateUser({
          data: {
            full_name: profileName,
            avatar_url: profileAvatar,
            bio: profileBio
          }
        });
        if (error) throw error;
        toast.success('Profile Updated', {
          description: 'Your profile credentials have been updated securely.',
          style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--primary)/0.3)', color: 'oklch(var(--foreground))', borderRadius: '0px' }
        });
        onProfileUpdated(profileName, profileAvatar, profileBio);
      }
      onOpenChange(false);
    } catch (err: any) {
      toast.error('Update Failed', {
        description: err.message || 'Failed to update user profile.',
        style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--destructive)/0.3)', color: 'oklch(var(--foreground))', borderRadius: '0px' }
      });
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    if (isSimulated) {
      toast.error('Disabled in simulation', {
        description: 'Avatar upload requires a real Supabase backend connection.',
        style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--destructive)/0.3)', color: 'oklch(var(--foreground))', borderRadius: '0px' }
      });
      return;
    }

    setIsUploadingAvatar(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setProfileAvatar(data.publicUrl);
      
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: data.publicUrl }
      });
      
      if (updateError) throw updateError;
      toast.success('Avatar Uploaded', {
        description: 'Your profile picture has been updated.',
        style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--primary)/0.3)', color: 'oklch(var(--foreground))', borderRadius: '0px' }
      });
    } catch (err: any) {
      toast.error('Upload Failed', {
        description: err.message || 'Error uploading avatar',
        style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--destructive)/0.3)', color: 'oklch(var(--foreground))', borderRadius: '0px' }
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full bg-card border border-border text-foreground rounded-none p-0 shadow-xl font-sans overflow-hidden max-h-[85vh] overflow-y-auto">
        {/* Profile Identity Header */}
        <div className="p-6 pb-2 flex flex-col items-center text-center mt-4">
          <div className="relative group mb-4">
            <Avatar className="size-16 border border-border rounded-none shrink-0">
              <AvatarImage src={profileAvatar} className="rounded-none object-cover" />
              <AvatarFallback className="bg-muted text-muted-foreground font-heading text-xl rounded-none flex items-center justify-center">
                {profileName.substring(0, 2).toUpperCase() || 'AD'}
              </AvatarFallback>
            </Avatar>
            <label className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center cursor-pointer border border-primary/20">
              {isUploadingAvatar ? (
                <span className="text-xs font-sans text-muted-foreground animate-in fade-in duration-200">Uploading...</span>
              ) : (
                <>
                  <UploadCloud size={18} className="text-muted-foreground mb-1" />
                  <span className="text-[10px] font-sans text-muted-foreground">Upload</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={isUploadingAvatar} />
                </>
              )}
            </label>
          </div>
          <DialogTitle className="text-foreground font-sans font-medium text-lg tracking-wide truncate w-full">
            {profileName || 'Administrator'}
          </DialogTitle>
          <div className="flex items-center justify-center gap-2 mt-1 opacity-60">
            <p className="font-sans text-xs truncate">{user?.email}</p>
            {selectedRole && (
              <>
                <span className="w-1 h-1 bg-foreground/30 rounded-none" />
                <span className="text-[10px] font-mono uppercase tracking-wider">{selectedRole.replace('_', ' ')}</span>
              </>
            )}
          </div>
        </div>
        <DialogDescription className="sr-only">Manage your display name, avatar image, and workspace parameters.</DialogDescription>
        <form onSubmit={handleUpdateProfile} className="px-6 pb-6 space-y-5 font-sans">
          <div className="space-y-1.5">
            <Label className="text-sm font-sans text-muted-foreground font-normal">Display name</Label>
            <Input
              type="text" required autoComplete="off"
              value={profileName} onChange={e => setProfileName(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-border px-0 py-2 outline-none focus:border-foreground focus:ring-0 rounded-none text-foreground font-sans text-base transition-colors shadow-none"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-sans text-muted-foreground font-normal">About</Label>
            <Textarea
              value={profileBio} onChange={e => setProfileBio(e.target.value)}
              rows={2}
              className="w-full bg-transparent border-0 border-b border-border px-0 py-2 outline-none focus:border-foreground focus:ring-0 rounded-none text-foreground font-sans text-base resize-none min-h-[60px] transition-colors shadow-none"
            />
          </div>
          {isSimulated && (
            <div className="pt-4 space-y-3">
              <span className="font-sans text-[10px] text-muted-foreground uppercase tracking-widest block">Role Override</span>
              <div className="flex gap-2">
                {(['admin', 'educator', 'resource_person'] as const).map(role => (
                  <Button key={role} type="button" variant="ghost" onClick={() => { signInSimulated(role); toast.success(`Role set to ${role}`, { style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--primary))', color: 'oklch(var(--foreground))', borderRadius: '0px' } }); onOpenChange(false); }} className={`py-1 px-3 h-auto text-center font-sans text-xs capitalize transition-colors rounded-none focus:outline-none ${selectedRole === role ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}>
                    {role.replace('_', ' ')}
                  </Button>
                ))}
              </div>
            </div>
          )}
          <div className="pt-4 flex flex-col gap-5">
            <div className="flex justify-end gap-5 items-center">
              <button type="button" onClick={() => onOpenChange(false)} className="text-xs font-sans text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary">Cancel</button>
              <Button type="submit" className="px-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-sans text-[11px] font-medium cursor-pointer rounded-none h-9 shadow-none border-none tracking-wide focus-visible:ring-1 focus-visible:ring-primary">Save changes</Button>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
            <button type="button" onClick={() => { onOpenChange(false); handleLogout(); }} className="text-[10px] font-sans text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary uppercase tracking-widest text-center pb-2">Sign out of account</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
