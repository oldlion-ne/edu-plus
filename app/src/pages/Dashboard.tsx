import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from '../i18n/useTranslation';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'sonner';
import { useAuth } from '../lib/useAuth';
import DashboardOnboardingTour from '../components/DashboardOnboardingTour';
import SettingsHub from '../components/dashboard/SettingsHub';
import { NumberTicker } from '../components/magicui/NumberTicker';
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogTitle,
} from '../components/ui/dialog';
import {
 Avatar,
 AvatarImage,
 AvatarFallback,
} from '../components/ui/avatar';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
 ChartContainer,
 ChartTooltip,
 ChartTooltipContent,
 type ChartConfig,
} from '../components/ui/chart';
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Bell, UploadCloud } from 'lucide-react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '../components/ui/sidebar';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import UserManagement from '../components/dashboard/UserManagement';
import MediaLibrary from '../components/dashboard/MediaLibrary';
import InboxManager from '../components/dashboard/InboxManager';
import ResourceManager from '../components/dashboard/ResourceManager';
import LmsManager from '../components/dashboard/LmsManager';

type UserRole = 'admin' | 'educator' | 'resource_person' | 'none';

const chartData = [
 { date: "2024-04-01", desktop: 222, mobile: 150 },
 { date: "2024-04-02", desktop: 97, mobile: 180 },
 { date: "2024-04-03", desktop: 167, mobile: 120 },
 { date: "2024-04-04", desktop: 242, mobile: 260 },
 { date: "2024-04-05", desktop: 373, mobile: 290 },
 { date: "2024-04-06", desktop: 301, mobile: 340 },
 { date: "2024-04-07", desktop: 245, mobile: 180 },
 { date: "2024-04-08", desktop: 409, mobile: 320 },
 { date: "2024-04-09", desktop: 59, mobile: 110 },
 { date: "2024-04-10", desktop: 261, mobile: 190 },
 { date: "2024-04-11", desktop: 327, mobile: 350 },
 { date: "2024-04-12", desktop: 292, mobile: 210 },
 { date: "2024-04-13", desktop: 342, mobile: 380 },
 { date: "2024-04-14", desktop: 137, mobile: 220 },
 { date: "2024-04-15", desktop: 120, mobile: 170 },
 { date: "2024-04-16", desktop: 138, mobile: 190 },
 { date: "2024-04-17", desktop: 446, mobile: 360 },
 { date: "2024-04-18", desktop: 364, mobile: 410 },
 { date: "2024-04-19", desktop: 243, mobile: 180 },
 { date: "2024-04-20", desktop: 89, mobile: 150 },
 { date: "2024-04-21", desktop: 137, mobile: 200 },
 { date: "2024-04-22", desktop: 224, mobile: 170 },
 { date: "2024-04-23", desktop: 138, mobile: 230 },
 { date: "2024-04-24", desktop: 387, mobile: 290 },
 { date: "2024-04-25", desktop: 215, mobile: 250 },
 { date: "2024-04-26", desktop: 75, mobile: 130 },
 { date: "2024-04-27", desktop: 383, mobile: 420 },
 { date: "2024-04-28", desktop: 122, mobile: 180 },
 { date: "2024-04-29", desktop: 315, mobile: 240 },
 { date: "2024-04-30", desktop: 454, mobile: 380 },
 { date: "2024-05-01", desktop: 165, mobile: 220 },
 { date: "2024-05-02", desktop: 293, mobile: 310 },
 { date: "2024-05-03", desktop: 247, mobile: 190 },
 { date: "2024-05-04", desktop: 385, mobile: 420 },
 { date: "2024-05-05", desktop: 481, mobile: 390 },
 { date: "2024-05-06", desktop: 498, mobile: 520 },
 { date: "2024-05-07", desktop: 388, mobile: 300 },
 { date: "2024-05-08", desktop: 149, mobile: 210 },
 { date: "2024-05-09", desktop: 227, mobile: 180 },
 { date: "2024-05-10", desktop: 293, mobile: 330 },
 { date: "2024-05-11", desktop: 335, mobile: 270 },
 { date: "2024-05-12", desktop: 197, mobile: 240 },
 { date: "2024-05-13", desktop: 197, mobile: 160 },
 { date: "2024-05-14", desktop: 448, mobile: 490 },
 { date: "2024-05-15", desktop: 473, mobile: 380 },
 { date: "2024-05-16", desktop: 338, mobile: 400 },
 { date: "2024-05-17", desktop: 499, mobile: 420 },
 { date: "2024-05-18", desktop: 315, mobile: 350 },
 { date: "2024-05-19", desktop: 235, mobile: 180 },
 { date: "2024-05-20", desktop: 177, mobile: 230 },
 { date: "2024-05-21", desktop: 82, mobile: 140 },
 { date: "2024-05-22", desktop: 81, mobile: 120 },
 { date: "2024-05-23", desktop: 252, mobile: 290 },
 { date: "2024-05-24", desktop: 294, mobile: 220 },
 { date: "2024-05-25", desktop: 201, mobile: 250 },
 { date: "2024-05-26", desktop: 213, mobile: 170 },
 { date: "2024-05-27", desktop: 420, mobile: 460 },
 { date: "2024-05-28", desktop: 233, mobile: 190 },
 { date: "2024-05-29", desktop: 78, mobile: 130 },
 { date: "2024-05-30", desktop: 340, mobile: 280 },
 { date: "2024-05-31", desktop: 178, mobile: 230 },
 { date: "2024-06-01", desktop: 178, mobile: 200 },
 { date: "2024-06-02", desktop: 470, mobile: 410 },
 { date: "2024-06-03", desktop: 103, mobile: 160 },
 { date: "2024-06-04", desktop: 439, mobile: 380 },
 { date: "2024-06-05", desktop: 88, mobile: 140 },
 { date: "2024-06-06", desktop: 294, mobile: 250 },
 { date: "2024-06-07", desktop: 323, mobile: 370 },
 { date: "2024-06-08", desktop: 385, mobile: 320 },
 { date: "2024-06-09", desktop: 438, mobile: 480 },
 { date: "2024-06-10", desktop: 155, mobile: 200 },
 { date: "2024-06-11", desktop: 92, mobile: 150 },
 { date: "2024-06-12", desktop: 492, mobile: 420 },
 { date: "2024-06-13", desktop: 81, mobile: 130 },
 { date: "2024-06-14", desktop: 426, mobile: 380 },
 { date: "2024-06-15", desktop: 307, mobile: 350 },
 { date: "2024-06-16", desktop: 371, mobile: 310 },
 { date: "2024-06-17", desktop: 475, mobile: 520 },
 { date: "2024-06-18", desktop: 107, mobile: 170 },
 { date: "2024-06-19", desktop: 341, mobile: 290 },
 { date: "2024-06-20", desktop: 408, mobile: 450 },
 { date: "2024-06-21", desktop: 169, mobile: 210 },
 { date: "2024-06-22", desktop: 317, mobile: 270 },
 { date: "2024-06-23", desktop: 480, mobile: 530 },
 { date: "2024-06-24", desktop: 132, mobile: 180 },
 { date: "2024-06-25", desktop: 141, mobile: 190 },
 { date: "2024-06-26", desktop: 434, mobile: 380 },
 { date: "2024-06-27", desktop: 448, mobile: 490 },
 { date: "2024-06-28", desktop: 149, mobile: 200 },
 { date: "2024-06-29", desktop: 103, mobile: 160 },
 { date: "2024-06-30", desktop: 446, mobile: 400 },
];

const chartConfig = {
 visitors: {
 label: "Visitors",
 },
 desktop: {
 label: "Desktop",
 color: "oklch(var(--chart-1))",
 },
 mobile: {
 label: "Mobile",
 color: "oklch(var(--chart-2))",
 },
} satisfies ChartConfig;

export type DashboardTab = 'overview' | 'users' | 'courses' | 'library' | 'media' | 'inquiries' | 'subscribers' | 'ai-chats' | 'profile' | 'security' | 'ai-advisor' | 'access-control';

export default function Dashboard() {
 const { t } = useTranslation();
 const { user, role: selectedRole, isSimulated, signOut, signInSimulated } = useAuth();
 const navigate = useNavigate();
 const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
 const [showTour, setShowTour] = useState(false);
 const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
 const [showBellDropdown, setShowBellDropdown] = useState(false);
 const mainScrollRef = useRef<HTMLElement>(null);

 // Reset scroll position whenever tab changes
 const handleTabChange = (tab: DashboardTab) => {
 setActiveTab(tab);
 if (mainScrollRef.current) mainScrollRef.current.scrollTop = 0;
 };

 // Chart States
 const [timeRange, setTimeRange] = useState("90d");

 // Profile and Settings Form States
 const [profileName, setProfileName] = useState('');
 const [profileAvatar, setProfileAvatar] = useState('');
 const [profileBio, setProfileBio] = useState('');
 const [isSettingsOpen, setIsSettingsOpen] = useState(false);
 const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

 // Sync profile metadata on user session loaded
 useEffect(() => {
 if (user) {
 setProfileName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'Advisor');
 setProfileAvatar(user.user_metadata?.avatar_url || '');
 setProfileBio(user.user_metadata?.bio || 'Authorized administrator of the Edu+ Core Net.');
 }
 }, [user]);

 const handleUpdateProfile = async (e: React.FormEvent) => {
 e.preventDefault();
 try {
 if (isSimulated) {
 // Update simulated localStorage cache
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
 window.location.reload();
 }
 } else {
 // Real Supabase User update
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
 }
 setIsSettingsOpen(false);
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
 const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
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

 const handleLogout = async () => {
 try {
 await signOut();
 toast.success('Signed Out', {
 description: 'You have been signed out successfully.',
 style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--primary)/0.3)', color: 'oklch(var(--foreground))', borderRadius: '0px' }
 });
 navigate('/', { replace: true });
 } catch (err: any) {
 toast.error('Sign Out Failed', {
 description: err.message || 'Logout failed.',
 style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--destructive)/0.3)', color: 'oklch(var(--foreground))', borderRadius: '0px' }
 });
 }
 };

 // Database state collections
 const [knowledgeHubItems, setKnowledgeHubItems] = useState<any[]>([]);
 const [kbDocuments, setKbDocuments] = useState<any[]>([]);
 const [contactMessages, setContactMessages] = useState<any[]>([]);

 // Form inputs





 useEffect(() => {
 const completed = localStorage.getItem('edu_plus_onboarding_completed');
 if (!completed) {
 setShowTour(true);
 }
 fetchData();
 }, []);

 // Subscribe to real-time additions to contact_messages
 useEffect(() => {
 const channel = supabase
 .channel('realtime-messages')
 .on(
 'postgres_changes',
 { event: 'INSERT', schema: 'public', table: 'contact_messages' },
 (payload) => {
 const newMsg = payload.new;
 setContactMessages(prev => [newMsg, ...prev]);
 setUnreadMessagesCount(c => c + 1);

 // Trigger Sonar notification alert
 toast(`New Inquiry Received`, {
 description: `Sender: ${newMsg.name} (${newMsg.profile})`,
 style: {
 background: 'oklch(var(--card))',
 border: '1px solid oklch(var(--primary)/0.3)',
 color: 'oklch(var(--foreground))',
 fontFamily: 'monospace',
 borderRadius: '0px'
 }
 });
 }
 )
 .subscribe();

 return () => {
 supabase.removeChannel(channel);
 };
 }, []);

 const fetchData = async () => {
 try {
 const [hubRes, kbRes, contactRes] = await Promise.all([
 supabase.from('knowledge_hub').select('*').order('created_at', { ascending: false }),
 supabase.from('kb_documents').select('*').order('created_at', { ascending: false }),
 supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
 ]);

 const hub = hubRes.data;
 const kb = kbRes.data;
 const contact = contactRes.data;

 setKnowledgeHubItems(hub || []);
 setKbDocuments(kb || []);
 setContactMessages(contact || []);

 const unread = contact?.filter((m: any) => m.status === 'unread').length || 0;
 setUnreadMessagesCount(unread);
 } catch (err) {
 console.error('Error fetching dashboard telemetry:', err);
 }
 };



 const hasPermission = (allowed: UserRole[]) => {
 // If a real user is authenticated but role is still resolving, deny access until resolved
 if (user && !selectedRole) return false;
 return allowed.includes(selectedRole || 'none');
 };

 // True while we know a real user is logged in but the role hasn't been fetched yet.
 // Use this to show a loading skeleton instead of "Access Restricted".
 const isRoleResolving = !!user && !isSimulated && selectedRole === null;

 const filteredData = chartData.filter((item) => {
 const date = new Date(item.date)
 const referenceDate = new Date("2024-06-30")
 let daysToSubtract = 90
 if (timeRange === "30d") {
 daysToSubtract = 30
 } else if (timeRange === "7d") {
 daysToSubtract = 7
 }
 const startDate = new Date(referenceDate)
 startDate.setDate(startDate.getDate() - daysToSubtract)
 return date >= startDate
 });


 return (
 <SidebarProvider
 style={{ '--sidebar-width': '15rem', '--sidebar-width-icon': '3rem' } as React.CSSProperties}
 className="h-dvh overflow-hidden"
 >
 {/* Onboarding Tour */}
 {showTour && <DashboardOnboardingTour onComplete={() => setShowTour(false)} />}

 {/* Sidebar */}
 <DashboardSidebar
 activeTab={activeTab}
 setActiveTab={handleTabChange}
 selectedRole={selectedRole}
 profileName={profileName}
 profileAvatar={profileAvatar}
 userEmail={user?.email}
 unreadMessagesCount={unreadMessagesCount}
 onProfileClick={() => setIsSettingsOpen(true)}
 onLogout={handleLogout}
 hasPermission={hasPermission}
 />

  {/* Main content inset */}
  <SidebarInset className="flex flex-col min-h-0 overflow-hidden">
  {/* Statusbar matching Nordic Lagom reference */}
  <header className="h-[52px] border-b border-border bg-background flex items-center px-6 md:px-10 shrink-0 z-30 w-full">
  <div className="w-full flex items-center gap-2 max-w-[calc(var(--content-max)+80px)] mx-auto text-muted-foreground text-[13px]">
  <SidebarTrigger className="md:hidden text-muted-foreground hover:text-foreground rounded-none mr-2 size-7" />
  <span className="size-[7px] rounded-none bg-[oklch(var(--moss))] shrink-0" />
  <span className="font-sans text-foreground font-medium">System Active</span>
  {unreadMessagesCount > 0 && (
  <div className="relative ml-2">
  <button
  id="bell-sonar"
  onClick={() => { setShowBellDropdown(!showBellDropdown); setUnreadMessagesCount(0); }}
  className="relative p-1.5 text-muted-foreground hover:text-primary transition-colors cursor-pointer rounded-none focus:outline-none"
  aria-label="Notifications"
  >
  <Bell className="size-3.5" />
  <span className="absolute top-1 right-1 size-1.5 bg-[oklch(var(--moss))] rounded-none" />
  </button>
  {showBellDropdown && (
  <div className="absolute left-0 mt-2 w-80 bg-card border border-border p-4 shadow-xl z-50 rounded-none text-left font-sans animate-fade-in">
  <h4 className="font-sans text-xs font-semibold text-foreground tracking-wide border-b border-border pb-2 mb-2">
  Inbound Inquiries
  </h4>
  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
  {contactMessages
  .filter(m => m.status === 'unread')
  .map(m => (
  <div key={m.id} className="border-b border-border pb-2 text-[11px] last:border-0 last:pb-0">
  <p className="font-mono text-[10px] text-primary">{m.name} // {m.profile.toUpperCase()}</p>
  <p className="text-muted-foreground line-clamp-1 mt-0.5">{m.message}</p>
  </div>
  ))}
  </div>
  </div>
  )}
  </div>
  )}
  <span className="ml-auto font-mono text-[11px] text-muted-foreground">
  eduplus.app · {selectedRole || 'admin'}
  </span>
  </div>
  </header>

  {/* Content workspace */}
  <main ref={mainScrollRef} className="flex-1 h-0 overflow-y-auto overflow-x-hidden">
  {/* Profile edit dialog — triggered programmatically from sidebar user badge */}
  <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
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
  <Button key={role} type="button" variant="ghost" onClick={() => { signInSimulated(role); toast.success(`Role set to ${role}`, { style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--primary))', color: 'oklch(var(--foreground))', borderRadius: '0px' } }); setIsSettingsOpen(false); }} className={`py-1 px-3 h-auto text-center font-sans text-xs capitalize transition-colors rounded-none focus:outline-none ${selectedRole === role ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}>
  {role.replace('_', ' ')}
  </Button>
  ))}
  </div>
  </div>
  )}
  <div className="pt-4 flex flex-col gap-5">
  <div className="flex justify-end gap-5 items-center">
  <button type="button" onClick={() => setIsSettingsOpen(false)} className="text-xs font-sans text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary">Cancel</button>
  <Button type="submit" className="px-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-sans text-[11px] font-medium cursor-pointer rounded-none h-9 shadow-none border-none tracking-wide focus-visible:ring-1 focus-visible:ring-primary">Save changes</Button>
  </div>
  <div className="w-full h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
  <button type="button" onClick={() => { setIsSettingsOpen(false); handleLogout(); }} className="text-[10px] font-sans text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary uppercase tracking-widest text-center pb-2">Sign out of account</button>
  </div>
  </form>
  </DialogContent>
  </Dialog>

  <div className="w-full min-h-[500px] flex flex-col">
  {/* TAB OVERVIEW */}
  {activeTab === 'overview' && (
  <div id="view-overview" className="page animate-in fade-in duration-300">
  <div className="page-head">
  <h1>{t('dashboard.overview.heading')}</h1>
  <span className="sub">{t('dashboard.overview.telemetryLink')}</span>
  </div>

  <div className="stack flex flex-col gap-7">
  <div className="stats">
  <div className="card stat p-[18px_20px]">
  <div className="text-[13px] text-muted-foreground whitespace-nowrap">{t('dashboard.overview.hubResources')}</div>
  <div className="font-heading text-[32px] leading-[1.2] mt-0.5 text-foreground font-normal tabular-nums">
  <NumberTicker value={knowledgeHubItems.length} />
  </div>
  <div className="text-[12px] mt-0.5 text-muted-foreground font-sans">
  {knowledgeHubItems.length === 0 ? 'Library is nearly empty' : `${knowledgeHubItems.length} published`}
  </div>
  </div>
  <div className="card stat p-[18px_20px]">
  <div className="text-[13px] text-muted-foreground whitespace-nowrap">{t('dashboard.overview.aiTrainingRules')}</div>
  <div className="font-heading text-[32px] leading-[1.2] mt-0.5 text-foreground font-normal tabular-nums">
  {kbDocuments.length === 0 ? '—' : <NumberTicker value={kbDocuments.length} />}
  </div>
  <div className="text-[12px] mt-0.5 text-muted-foreground font-sans">
  {kbDocuments.length === 0 ? 'None yet · add in AI Advisor' : `${kbDocuments.length} active rules`}
  </div>
  </div>
  <div className="card stat p-[18px_20px]">
  <div className="text-[13px] text-muted-foreground whitespace-nowrap">{t('dashboard.overview.inboundInquiries')}</div>
  <div className="font-heading text-[32px] leading-[1.2] mt-0.5 text-foreground font-normal tabular-nums">
  <NumberTicker value={contactMessages.length} />
  </div>
  <div className={`text-[12px] mt-0.5 font-sans ${contactMessages.length > 0 ? 'text-[oklch(var(--moss))]' : 'text-muted-foreground'}`}>
  {contactMessages.length > 0 ? `+${Math.min(contactMessages.length, 2)} this week` : 'No inquiries yet'}
  </div>
  </div>
  </div>

  {/* Interactive Area Chart */}
  <div className="card">
  {/* Chart Header */}
  <div className="chart-head flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-3 p-[22px_24px_0]">
  <div>
  <h3 className="font-sans text-[16px] font-semibold text-foreground leading-[1.15]">{t('dashboard.overview.systemAnalytics')}</h3>
  <div className="text-muted-foreground font-sans text-[12.5px] mt-0.5">Sessions per day</div>
  </div>
  <Select value={timeRange} onValueChange={setTimeRange}>
  <SelectTrigger
  className="w-[140px] rounded-none border border-border bg-transparent text-xs font-mono tracking-wider px-3 h-[34px] text-muted-foreground outline-none"
  aria-label="Select a value"
  >
  <SelectValue placeholder="Last 3 months" />
  </SelectTrigger>
  <SelectContent className="rounded-none bg-card border border-border text-foreground font-mono text-xs z-50">
  <SelectItem value="90d" className="rounded-none cursor-pointer focus:bg-primary/10 text-[11px]">
  Last 3 months
  </SelectItem>
  <SelectItem value="30d" className="rounded-none cursor-pointer focus:bg-primary/10 text-[11px]">
  Last 30 days
  </SelectItem>
  <SelectItem value="7d" className="rounded-none cursor-pointer focus:bg-primary/10 text-[11px]">
  Last 7 days
  </SelectItem>
  </SelectContent>
  </Select>
  </div>

  {/* Chart Content */}
  <div className="chart-box p-[8px_12px_16px]">
  <ChartContainer
  config={chartConfig}
  className="aspect-[4/3] sm:aspect-auto h-[240px] w-full"
  >
  <AreaChart data={filteredData} margin={{ left: 12, right: 12, top: 20, bottom: 12 }}>
  <defs>
  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stopColor="#D9A75C" stopOpacity={0.22} />
  <stop offset="100%" stopColor="#D9A75C" stopOpacity={0} />
  </linearGradient>
  </defs>
  <CartesianGrid vertical={false} stroke="oklch(var(--border) / 0.4)" strokeDasharray="3 3" />
  <XAxis
  dataKey="date"
  tickLine={false}
  axisLine={false}
  tickMargin={8}
  minTickGap={64}
  tick={{ fill: 'currentColor', fontSize: 10.5 }}
  className="fill-muted-foreground font-mono"
  tickFormatter={(value) => {
  if (!value) return '';
  const d = new Date(`${value}T00:00:00`);
  if (isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  })
  }}
  />
  <ChartTooltip
  cursor={false}
  content={
  <ChartTooltipContent
  labelFormatter={(value) => {
  if (!value) return '';
  const d = new Date(`${value}T00:00:00`);
  if (isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  })
  }}
  indicator="dot"
  className="rounded-none border border-border bg-card text-foreground shadow-lg"
  />
  }
  />
  <Area
  dataKey="mobile"
  type="linear"
  fill="none"
  stroke="oklch(var(--muted-foreground) / 0.6)"
  strokeWidth={1.5}
  strokeDasharray="2 3"
  />
  <Area
  dataKey="desktop"
  type="linear"
  fill="url(#fillDesktop)"
  fillOpacity={1}
  stroke="#F59E0B"
  strokeWidth={2}
  />
  </AreaChart>
  </ChartContainer>
  </div>

  <div className="legend flex items-center gap-4 px-6 pb-4 text-[12px] text-muted-foreground">
  <span className="flex items-center gap-1.5"><i className="inline-block w-3.5 h-[2.5px] rounded-none bg-[#F59E0B]" /> Desktop</span>
  <span className="flex items-center gap-1.5"><i className="inline-block w-3.5 h-[2.5px] rounded-none bg-muted-foreground/60" /> Mobile</span>
  </div>
  </div>

  {/* Content Category Distribution */}
  <div className="card card-pad">
  <h3 className="font-sans text-[16px] font-semibold text-foreground leading-[1.15]">{t('dashboard.overview.contentCategoryDistribution')}</h3>
  <div className="text-[12.5px] text-muted-foreground mt-0.5 mb-4">Knowledge Hub resources by format</div>
  <div className="w-full h-2.5 flex rounded-none overflow-hidden bg-muted border border-border/40">
  {['tutorial', 'podcast', 'webinar', 'study_material'].map((cat, i) => {
  const count = knowledgeHubItems.filter(item => item.category === cat).length;
  const percent = knowledgeHubItems.length > 0 ? (count / knowledgeHubItems.length) * 100 : 0;
  if (percent === 0) return null;
  const opacity = 1 - (i * 0.2);
  return (
  <div
  key={cat}
  style={{ width: `${percent}%`, backgroundColor: `oklch(var(--primary) / ${opacity})` }}
  className="h-full transition-all duration-300"
  />
  );
  })}
  </div>
  {/* Legend */}
  <div className="flex flex-wrap gap-x-6 gap-y-2 pt-3 text-[12.5px] text-muted-foreground">
  {['tutorial', 'podcast', 'webinar', 'study_material'].map((cat, i) => {
  const count = knowledgeHubItems.filter(item => item.category === cat).length;
  const percent = knowledgeHubItems.length > 0 ? (count / knowledgeHubItems.length) * 100 : 0;
  const opacity = 1 - (i * 0.2);
  return (
  <div key={cat} className="flex items-center gap-2">
  <span className="inline-block size-2 rounded-none" style={{ backgroundColor: `oklch(var(--primary) / ${opacity})` }} />
  <span className="font-sans capitalize">{cat.replace('_', ' ')}</span>
  <span className="font-mono text-[11px] text-foreground tabular-nums">{count} ({percent.toFixed(0)}%)</span>
  </div>
  );
  })}
  </div>
  </div>
  </div>
  </div>
  )}

 {/* TAB PEOPLE */}
 {activeTab === 'users' && (
 <div id="view-people" className="page animate-in fade-in duration-300">
 <UserManagement />
 </div>
 )}

 {/* TAB CONTENT (Flattened) */}
 {activeTab === 'courses' && (
 <div id="view-courses" className="page animate-in fade-in duration-300">
 <LmsManager />
 </div>
 )}
 
 {activeTab === 'library' && (
 <div id="view-library" className="page animate-in fade-in duration-300">
 {hasPermission(['admin', 'educator', 'resource_person']) ? (
 <ResourceManager />
 ) : isRoleResolving ? (
 <div className="flex items-center justify-center py-16">
 <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase animate-pulse">Verifying permissions...</span>
 </div>
 ) : (
 <Card className="p-8 text-center font-mono text-xs border border-border bg-card/30 rounded-none flex flex-col gap-2 py-8">
 <span className="text-foreground font-semibold text-sm">Access Restricted</span>
 <span className="text-muted-foreground text-[11px]">Resource management requires Educator or Admin privileges. Contact your administrator to request access.</span>
 </Card>
 )}
 </div>
 )}

 {activeTab === 'media' && (
 <div id="view-media" className="page animate-in fade-in duration-300">
 <MediaLibrary />
 </div>
 )}

 {/* TAB INBOX (Flattened) */}
 {(activeTab === 'inquiries' || activeTab === 'subscribers' || activeTab === 'ai-chats') && (
 <div id="view-inbox" className="page animate-in fade-in duration-300">
 <InboxManager activeFolder={activeTab} />
 </div>
 )}

 {/* TAB SETTINGS (Flattened) */}
 {(activeTab === 'profile' || activeTab === 'security' || activeTab === 'ai-advisor' || activeTab === 'access-control') && (
 <div id="view-settings" className="page animate-in fade-in duration-300">
 <SettingsHub activeTab={activeTab} />
 </div>
 )}
 </div>
 </main>
 </SidebarInset>
 </SidebarProvider>
 );
}
