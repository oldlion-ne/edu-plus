import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from '../i18n/useTranslation';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'sonner';
import { useAuth } from '../lib/useAuth';
import DashboardOnboardingTour from '../components/DashboardOnboardingTour';
import SettingsHub from '../components/dashboard/SettingsHub';
import { NumberTicker } from '../components/magicui/NumberTicker';
import { MagicCard } from '../components/ui/magic-card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
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
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '../components/ui/sheet';
import { AnimatedThemeToggler } from '../components/ui/animated-theme-toggler';
import { 
  Bell, 
  LayoutDashboard, 
  UploadCloud, 
  Cpu, 
  Menu, 
  X,
  Settings,
  FileImage,
  Inbox,
  ShieldCheck
} from 'lucide-react';
import UserManagement from '../components/dashboard/UserManagement';
import MediaLibrary from '../components/dashboard/MediaLibrary';
import InboxManager from '../components/dashboard/InboxManager';
import { ResourceManager } from '../components/dashboard/ResourceManager';

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

export default function Dashboard() {
  const { t } = useTranslation();
  const { user, role: selectedRole, isSimulated, signOut, signInSimulated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'users' | 'uploader' | 'ai-matrix' | 'media' | 'inbox' | 'settings'
  >('overview');
  const [showTour, setShowTour] = useState(false);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [showBellDropdown, setShowBellDropdown] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

  const [newKbDoc, setNewKbDoc] = useState({
    question: '',
    answer: ''
  });





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



  const handleCreateKbDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('kb_documents').insert({
        question: newKbDoc.question,
        answer: newKbDoc.answer,
        is_active: true
      });

      if (error) throw error;

      toast.success('Guideline Saved', {
        description: 'AI knowledge guideline has been added successfully.',
        style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--primary)/0.3)', color: 'oklch(var(--foreground))', borderRadius: '0px' }
      });

      setNewKbDoc({ question: '', answer: '' });
      fetchData();
    } catch (err) {
      toast.error('Save Failed', {
        description: 'Failed to save knowledge guideline. Please try again.',
        style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--destructive)/0.3)', color: 'oklch(var(--foreground))', borderRadius: '0px' }
      });
    }
  };

  const handleToggleKbActive = async (id: string, current: boolean) => {
    try {
      const { error } = await supabase.from('kb_documents').update({ is_active: !current }).eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (err) {
      console.error('Failed to change document status:', err);
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

  const renderSidebarContents = (onNavItemClick?: () => void) => (
    <div className="flex flex-col h-full justify-between bg-card text-card-foreground border-r border-border font-sans">
      <div className="flex flex-col flex-1">
        {/* Brand header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <Link to="/" className="flex items-center gap-0 hover:text-primary focus:outline-none focus:ring-1 focus:ring-primary/70">
            <span className="font-heading font-bold text-xl text-foreground">{t('dashboard.brand')}</span>
            <span className="text-primary font-light text-xl">{t('dashboard.brandPlus')}</span>
            <span className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase ml-2">{t('dashboard.brandSuffix')}</span>
          </Link>
          {onNavItemClick && (
            <Button variant="ghost" onClick={onNavItemClick} className="md:hidden text-muted-foreground hover:text-foreground focus:text-primary cursor-pointer p-1.5 h-8 w-8 flex items-center justify-center rounded-none">
              <X className="size-4" />
            </Button>
          )}
        </div>
        <div className="px-6 py-4">
          <span className="font-heading text-xs font-semibold text-muted-foreground uppercase tracking-wider block">{t('dashboard.workspacePortal')}</span>
        </div>

        {/* Navigation Sidebar Tabs */}
        <nav className="flex-grow px-4 py-2 space-y-4 overflow-y-auto max-h-[calc(100vh-160px)]">
          {/* Main System Group */}
          <div className="space-y-1">
            <span className="font-heading text-[10px] uppercase font-bold text-muted-foreground/60 px-3 block mb-1 tracking-wider">System</span>
            <Button
              id="tab-overview"
              variant="ghost"
              onClick={() => { setActiveTab('overview'); onNavItemClick?.(); }}
              className={`w-full justify-start gap-3 px-3 py-2 font-sans text-xs font-medium transition-all duration-200 rounded-none border-l-2 ${
                activeTab === 'overview'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-transparent text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-muted/30'
              }`}
            >
              <LayoutDashboard className="size-4 shrink-0" />
              <span>Overview</span>
            </Button>
            {hasPermission(['admin']) && (
              <Button
                id="tab-users"
                variant="ghost"
                onClick={() => { setActiveTab('users'); onNavItemClick?.(); }}
                className={`w-full justify-start gap-3 px-3 py-2 font-sans text-xs font-medium transition-all duration-200 rounded-none border-l-2 ${
                  activeTab === 'users'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-transparent text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-muted/30'
                }`}
              >
                <ShieldCheck className="size-4 shrink-0 text-primary" />
                <span>User Management</span>
              </Button>
            )}
          </div>

          {/* Knowledge Hub CMS Group */}
          <div className="space-y-1">
            <span className="font-heading text-[10px] uppercase font-bold text-muted-foreground/60 px-3 block mb-1 tracking-wider">Knowledge Hub CMS</span>
            <Button
              id="tab-uploader"
              variant="ghost"
              onClick={() => { setActiveTab('uploader'); onNavItemClick?.(); }}
              className={`w-full justify-start gap-3 px-3 py-2 font-sans text-xs font-medium transition-all duration-200 rounded-none border-l-2 ${
                activeTab === 'uploader'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-transparent text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-muted/30'
              }`}
            >
              <UploadCloud className="size-4 shrink-0" />
              <span>Resource Manager</span>
            </Button>
            <Button
              id="tab-ai-matrix"
              variant="ghost"
              onClick={() => { setActiveTab('ai-matrix'); onNavItemClick?.(); }}
              className={`w-full justify-start gap-3 px-3 py-2 font-sans text-xs font-medium transition-all duration-200 rounded-none border-l-2 ${
                activeTab === 'ai-matrix'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-transparent text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-muted/30'
              }`}
            >
              <Cpu className="size-4 shrink-0" />
              <span>AI Guidelines</span>
            </Button>
          </div>

          {/* Assets & Communications */}
          <div className="space-y-1">
            <span className="font-heading text-[10px] uppercase font-bold text-muted-foreground/60 px-3 block mb-1 tracking-wider">Assets & Inbox</span>
            <Button
              id="tab-media"
              variant="ghost"
              onClick={() => { setActiveTab('media'); onNavItemClick?.(); }}
              className={`w-full justify-start gap-3 px-3 py-2 font-sans text-xs font-medium transition-all duration-200 rounded-none border-l-2 ${
                activeTab === 'media'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-transparent text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-muted/30'
              }`}
            >
              <FileImage className="size-4 shrink-0" />
              <span>Media Library</span>
            </Button>
            <Button
              id="tab-inbox"
              variant="ghost"
              onClick={() => { setActiveTab('inbox'); onNavItemClick?.(); }}
              className={`w-full justify-start gap-3 px-3 py-2 font-sans text-xs font-medium transition-all duration-200 rounded-none border-l-2 ${
                activeTab === 'inbox'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-transparent text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-muted/30'
              }`}
            >
              <Inbox className="size-4 shrink-0" />
              <span>Inbox & Chat Logs</span>
            </Button>
            <Button
              id="tab-settings"
              variant="ghost"
              onClick={() => { setActiveTab('settings'); onNavItemClick?.(); }}
              className={`w-full justify-start gap-3 px-3 py-2 font-sans text-xs font-medium transition-all duration-200 rounded-none border-l-2 ${
                activeTab === 'settings'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-transparent text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-muted/30'
              }`}
            >
              <Settings className="size-4 shrink-0" />
              <span>Security & MFA</span>
            </Button>
          </div>
        </nav>
      </div>

      {/* Footer profile card trigger dialog */}
      <div className="p-4 border-t border-border bg-card font-sans relative">
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogTrigger asChild>
            <button className="w-full flex items-center gap-3 py-3 px-2 border-none hover:bg-muted/20 focus:outline-none transition-colors duration-200 text-left cursor-pointer rounded-none group">
              <Avatar className="size-9 border-none rounded-none shrink-0 transition-opacity duration-200 group-hover:opacity-80">
                <AvatarImage src={user?.user_metadata?.avatar_url} className="rounded-none object-cover" />
                <AvatarFallback className="bg-muted text-muted-foreground font-sans text-xs rounded-none flex items-center justify-center">
                  {profileName.substring(0, 2).toUpperCase() || 'AD'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-grow min-w-0">
                <p className="font-sans text-sm text-foreground truncate transition-colors">
                  {profileName || 'Administrator'}
                </p>
                <div className="flex items-center gap-2 mt-0.5 opacity-60">
                  <p className="font-sans text-[10px] truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </button>
          </DialogTrigger>

          <DialogContent className="max-w-md w-full bg-card border border-border/40 text-foreground rounded-none p-0 shadow-lg font-sans overflow-hidden max-h-[85vh] overflow-y-auto">
            {/* Profile Identity Header */}
            <div className="p-6 pb-2 flex flex-col items-center text-center mt-4">
              <div className="relative group mb-4">
                <Avatar className="size-16 border-none rounded-none shrink-0">
                  <AvatarImage src={profileAvatar} className="rounded-none object-cover" />
                  <AvatarFallback className="bg-muted text-muted-foreground font-sans text-lg rounded-none flex items-center justify-center">
                    {profileName.substring(0, 2).toUpperCase() || 'AD'}
                  </AvatarFallback>
                </Avatar>
                <label className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center cursor-pointer border border-primary/20">
                  {isUploadingAvatar ? (
                    <span className="text-xs font-sans text-muted-foreground animate-pulse">Wait...</span>
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
                    <span className="text-[10px] font-sans capitalize">
                      {selectedRole.replace('_', ' ')}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Dialog description for a11y */}
            <DialogDescription className="sr-only">
              Manage your display name, avatar image, and workspace parameters.
            </DialogDescription>

            {/* Form body */}
            {/* Form body */}
            <form onSubmit={handleUpdateProfile} className="px-6 pb-6 space-y-5 font-sans">
              <div className="space-y-1.5">
                <Label className="text-sm font-sans text-muted-foreground font-normal">Display name</Label>
                <Input
                  type="text"
                  required
                  autoComplete="off"
                  value={profileName}
                  onChange={e => setProfileName(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-border px-0 py-2 outline-none focus:border-foreground focus:ring-0 rounded-none text-foreground font-sans text-base transition-colors shadow-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-sans text-muted-foreground font-normal">About</Label>
                <Textarea
                  value={profileBio}
                  onChange={e => setProfileBio(e.target.value)}
                  rows={2}
                  className="w-full bg-transparent border-0 border-b border-border px-0 py-2 outline-none focus:border-foreground focus:ring-0 rounded-none text-foreground font-sans text-base resize-none min-h-[60px] transition-colors shadow-none"
                />
              </div>

              {/* Dev role switcher — simulated sessions only */}
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

              {/* Actions */}
              <div className="pt-4 flex flex-col gap-5">
                {/* Primary Form Actions */}
                <div className="flex justify-end gap-5 items-center">
                  <button 
                    type="button" 
                    onClick={() => setIsSettingsOpen(false)} 
                    className="text-xs font-sans text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                  >
                    Cancel
                  </button>
                  <Button 
                    type="submit" 
                    className="px-6 bg-foreground text-background hover:bg-foreground/90 transition-colors font-sans text-[11px] font-medium cursor-pointer rounded-none h-9 shadow-none border-none tracking-wide"
                  >
                    Save changes
                  </Button>
                </div>
                
                {/* Delicate Separator */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
                
                {/* Session Action */}
                <button
                  type="button"
                  onClick={() => { setIsSettingsOpen(false); handleLogout(); }}
                  className="text-[10px] font-sans text-muted-foreground hover:text-foreground transition-colors focus:outline-none uppercase tracking-widest text-center pb-2"
                >
                  Sign out of account
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-x-hidden bg-background text-foreground font-sans relative">
      {/* Onboarding Tour Spotlight */}
      {showTour && <DashboardOnboardingTour onComplete={() => setShowTour(false)} />}

      {/* Global HUD elements removed for minimalistic aesthetic */}

      {/* Mobile Drawer Header */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-card border-b border-border z-40 w-full font-sans">
        <Link to="/" className="flex items-center gap-0 hover:text-primary focus:outline-none focus:ring-1 focus:ring-primary/70">
          <span className="font-heading font-bold text-lg text-foreground">{t('dashboard.brand')}</span>
          <span className="text-primary font-light text-lg">{t('dashboard.brandPlus')}</span>
          <span className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase ml-2">{t('dashboard.brandSuffix')}</span>
        </Link>
        <Button variant="outline" onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 border border-border hover:border-primary text-muted-foreground hover:text-primary rounded-none h-9 w-9 flex items-center justify-center cursor-pointer">
          <Menu className="size-4" />
        </Button>
      </div>

      {/* Desktop Sidebar (hidden on mobile, static on desktop) */}
      <div className="hidden md:flex md:w-64 md:shrink-0 md:h-full">
        {renderSidebarContents()}
      </div>

      {/* Mobile Drawer (via shadcn Sheet) */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="w-64 p-0 border-r border-border animate-in slide-in-from-left duration-300 rounded-none" showCloseButton={false}>
          <SheetTitle className="sr-only">{t('dashboard.header.adminNavWorkspace')}</SheetTitle>
          <SheetDescription className="sr-only">{t('dashboard.header.adminNavWorkspaceDesc')}</SheetDescription>
          {renderSidebarContents(() => setIsMobileOpen(false))}
        </SheetContent>
      </Sheet>

      {/* Main Workspace viewport layout */}
      <div className="flex-grow flex flex-col min-h-0 relative overflow-hidden w-full">
        {/* Topbar Telemetry Header */}
        <header className="bg-card border-b border-border px-6 md:px-12 py-4 flex flex-col sm:flex-row gap-4 justify-between items-center z-30">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-muted/30 border border-border text-foreground font-sans text-xs font-medium select-none">
              <span className="w-1.5 h-1.5 bg-primary rounded-none shadow-[0_0_4px_oklch(var(--primary)/0.6)]"></span>
              <span>System Active</span>
            </div>
            
            <span className="text-muted-foreground/20 font-mono text-[10px] hidden sm:inline">|</span>
            
            {/* Breadcrumb based on active tab */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground font-sans">
              <span>{t('dashboard.header.adminBreadcrumb')}</span>
              <span>/</span>
              <span className="text-foreground capitalize font-medium">{activeTab.replace('-', ' ')}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Sonar Bell notifications */}
            <div className="relative">
              <Button
                id="bell-sonar"
                variant="ghost"
                onClick={() => { setShowBellDropdown(!showBellDropdown); setUnreadMessagesCount(0); }}
                className="relative p-2 text-muted-foreground hover:text-primary hover:bg-accent/50 transition-colors cursor-pointer rounded-none"
              >
                <Bell className="size-4" />
                {unreadMessagesCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-none"></span>
                )}
              </Button>

              {showBellDropdown && (
                <div className="absolute right-0 mt-3 w-80 bg-card border border-border p-4 shadow-xl z-50 rounded-none text-left font-sans animate-fade-in">
                  <h4 className="font-sans text-xs font-semibold text-foreground tracking-wide border-b border-border pb-2 mb-2">
                    Inbound Inquiries
                  </h4>
                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {contactMessages.filter(m => m.status === 'unread').length === 0 ? (
                      <p className="text-[10px] text-muted-foreground/50 font-mono py-4 text-center">{t('dashboard.header.noActivePings')}</p>
                    ) : (
                      contactMessages
                        .filter(m => m.status === 'unread')
                        .map(m => (
                          <div key={m.id} className="border-b border-border pb-2 text-[11px] last:border-0 last:pb-0">
                            <p className="font-mono text-[10px] text-primary">{m.name} // {m.profile.toUpperCase()}</p>
                            <p className="text-muted-foreground line-clamp-1 mt-0.5">{m.message}</p>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <AnimatedThemeToggler variant="square" duration={400} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" />

            <Button
              variant="outline"
              size="md"
              onClick={() => { localStorage.removeItem('edu_plus_onboarding_completed'); setShowTour(true); }}
              className="border border-border hover:border-primary text-foreground hover:text-primary hover:bg-primary/5 focus:outline-none px-3.5 font-sans text-xs transition-all duration-300 cursor-pointer rounded-none"
            >
              Tour
            </Button>
          </div>
        </header>

        {/* Content area workspace */}
        <main className="flex-1 h-0 p-4 sm:p-6 md:p-12 pb-24 md:pb-24 relative flex flex-col justify-start overflow-y-auto bg-background">
          <Card className="border border-border bg-card/30 p-4 sm:p-8 rounded-none min-h-[500px] shrink-0 mb-12">
            {/* TAB OVERVIEW */}
            {activeTab === 'overview' && (
              <div id="view-overview" className="space-y-8 animate-in fade-in duration-300">
                <div className="border-b border-border pb-4">
                  <h2 className="font-heading text-2xl font-light text-foreground">{t('dashboard.overview.heading')}</h2>
                  <p className="font-mono text-xs text-muted-foreground mt-1">{t('dashboard.overview.telemetryLink')}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
                  <MagicCard className="border-border bg-card rounded-none text-left p-5 flex flex-col gap-0 py-5" gradientColor="oklch(var(--primary)/0.08)" gradientSize={150}>
                    <span className="font-sans text-xs font-medium text-muted-foreground block mb-1">{t('dashboard.overview.hubResources')}</span>
                    <span className="font-heading text-3xl font-light text-foreground">
                      <NumberTicker value={knowledgeHubItems.length} />
                    </span>
                  </MagicCard>
                  <MagicCard className="border-border bg-card rounded-none text-left p-5 flex flex-col gap-0 py-5" gradientColor="oklch(var(--primary)/0.08)" gradientSize={150}>
                    <span className="font-sans text-xs font-medium text-muted-foreground block mb-1">{t('dashboard.overview.aiTrainingRules')}</span>
                    <span className="font-heading text-3xl font-light text-foreground">
                      <NumberTicker value={kbDocuments.length} />
                    </span>
                  </MagicCard>
                  <MagicCard className="border-border bg-card rounded-none text-left p-5 flex flex-col gap-0 py-5" gradientColor="oklch(var(--primary)/0.08)" gradientSize={150}>
                    <span className="font-sans text-xs font-medium text-muted-foreground block mb-1">{t('dashboard.overview.inboundInquiries')}</span>
                    <span className="font-heading text-3xl font-light text-foreground">
                      <NumberTicker value={contactMessages.length} />
                    </span>
                  </MagicCard>
                </div>

                {/* Interactive Area Chart */}
                <Card className="rounded-none border border-border bg-card/50 overflow-visible flex flex-col gap-0 py-0">
                  {/* Chart Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b border-border py-5 px-6">
                    <div className="grid flex-1 gap-1 text-left">
                      <div className="font-heading text-lg font-medium text-foreground">{t('dashboard.overview.systemAnalytics')}</div>
                      <div className="text-muted-foreground font-sans text-xs">
                        Showing visitor metric data
                      </div>
                    </div>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger
                        className="w-full sm:w-[160px] rounded-none sm:ml-auto flex border border-border hover:border-primary/50 bg-background text-xs font-mono tracking-wider px-3 py-1.5 h-auto text-foreground outline-none mt-2 sm:mt-0"
                        aria-label="Select a value"
                      >
                        <SelectValue placeholder="Last 3 months" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none bg-card border border-border text-foreground font-mono text-xs z-50">
                        <SelectItem value="90d" className="rounded-none cursor-pointer focus:bg-primary/10 text-[10px]">
                          Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-none cursor-pointer focus:bg-primary/10 text-[10px]">
                          Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-none cursor-pointer focus:bg-primary/10 text-[10px]">
                          Last 7 days
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Chart Content */}
                  <div className="px-2 pt-4 pb-6 sm:px-6 sm:pt-6">
                    <ChartContainer
                      config={chartConfig}
                      className="aspect-[4/3] sm:aspect-auto h-[250px] sm:h-[350px] w-full"
                    >
                      <AreaChart data={filteredData} margin={{ left: 12, right: 12, top: 20, bottom: 12 }}>
                        <defs>
                          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={chartConfig.desktop.color} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={chartConfig.desktop.color} stopOpacity={0.02} />
                          </linearGradient>
                          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={chartConfig.mobile.color} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={chartConfig.mobile.color} stopOpacity={0.02} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="oklch(var(--border)/0.2)" />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          minTickGap={32}
                          tick={{ fill: 'currentColor', fontSize: 10 }}
                          className="fill-muted-foreground font-sans"
                          tickFormatter={(value) => {
                            const date = new Date(value)
                            return date.toLocaleDateString("en-US", {
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
                                return new Date(value).toLocaleDateString("en-US", {
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
                          fill="url(#fillMobile)"
                          fillOpacity={1}
                          stroke={chartConfig.mobile.color}
                          strokeWidth={1.5}
                        />
                        <Area
                          dataKey="desktop"
                          type="linear"
                          fill="url(#fillDesktop)"
                          fillOpacity={1}
                          stroke={chartConfig.desktop.color}
                          strokeWidth={1.5}
                        />
                      </AreaChart>
                    </ChartContainer>

                    {/* Manual legend - rendered outside SVG so it's never clipped */}
                    <div className="flex items-center justify-center gap-6 pt-3 pb-1">
                      <div className="flex items-center gap-2">
                        <div className="h-[2px] w-5 rounded-none" style={{ backgroundColor: chartConfig.desktop.color }} />
                        <span className="font-sans font-medium text-[10px] text-muted-foreground uppercase tracking-wider">{t('dashboard.overview.desktop')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-[2px] w-5 rounded-none" style={{ backgroundColor: chartConfig.mobile.color }} />
                        <span className="font-sans font-medium text-[10px] text-muted-foreground uppercase tracking-wider">{t('dashboard.overview.mobile')}</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Content Category Distribution */}
                <Card className="border border-border p-6 bg-card rounded-none text-left flex flex-col gap-0 py-6">
                  <h3 className="font-heading text-sm font-medium text-foreground mb-4">{t('dashboard.overview.contentCategoryDistribution')}</h3>
                  <div className="space-y-4">
                    {['tutorial', 'podcast', 'webinar', 'study_material'].map(cat => {
                      const count = knowledgeHubItems.filter(i => i.category === cat).length;
                      const percent = knowledgeHubItems.length > 0 ? (count / knowledgeHubItems.length) * 100 : 0;
                      return (
                        <div key={cat} className="space-y-1">
                          <div className="flex justify-between text-xs font-sans text-foreground capitalize">
                            <span>{cat.replace('_', ' ')}</span>
                            <span className="text-muted-foreground">{count} Nodes ({percent.toFixed(0)}%)</span>
                          </div>
                          <div className="w-full bg-background h-2 border border-border rounded-none">
                            <div
                              style={{ width: `${percent}%` }}
                              className="h-full bg-primary shadow-[0_0_8px_oklch(var(--primary))] rounded-none"
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>
            )}

            {/* TAB UPLOADER */}
            {activeTab === 'uploader' && (
              <div id="view-uploader">
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

            {/* TAB AI MATRIX */}
            {activeTab === 'ai-matrix' && (
              <div id="view-ai-matrix" className="space-y-6 animate-in fade-in duration-300 text-left">
                <div className="border-b border-border pb-4">
                  <h2 className="font-heading text-2xl font-light text-foreground">{t('dashboard.aiMatrix.heading')}</h2>
                  <p className="font-mono text-xs text-muted-foreground mt-1">{t('dashboard.aiMatrix.subheading')}</p>
                </div>

                {hasPermission(['admin', 'educator']) ? (
                  <div className="space-y-8">
                    <form onSubmit={handleCreateKbDoc} className="space-y-4 border border-border p-5 bg-card rounded-none">
                      <h3 className="font-heading text-sm font-medium text-foreground mb-2">{t('dashboard.aiMatrix.newFactualGuideline')}</h3>
                      <div className="space-y-3">
                        <Input
                          type="text"
                          required
                          value={newKbDoc.question}
                          onChange={e => setNewKbDoc(p => ({ ...p, question: e.target.value }))}
                          placeholder="Fact Topic (e.g. Founder Bikash Oinam Email?)"
                          className="w-full bg-background border border-border text-xs px-4 py-2.5 outline-none focus:border-primary rounded-none text-foreground font-sans h-9"
                        />
                        <Textarea
                          required
                          value={newKbDoc.answer}
                          onChange={e => setNewKbDoc(p => ({ ...p, answer: e.target.value }))}
                          placeholder="Factual Knowledge Answer (e.g. Mr. Bikash Oinam can be reached at info@eduplus.in)"
                          rows={2}
                          className="w-full bg-background border border-border text-xs px-4 py-2 outline-none focus:border-primary rounded-none text-foreground font-sans resize-none min-h-20"
                        />
                      </div>
                      <Button type="submit" size="lg" className="px-6 bg-primary text-primary-foreground hover:bg-foreground hover:text-background focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300 font-sans text-sm font-medium rounded-none cursor-pointer">
                        Add Guideline
                      </Button>
                    </form>

                    {/* Loaded Rules */}
                    <div className="space-y-3">
                      <h3 className="font-heading text-sm font-medium text-foreground">{t('dashboard.aiMatrix.activeFactMatrix')}</h3>
                      {kbDocuments.length === 0 ? (
                        <p className="text-sm text-muted-foreground font-sans py-4">{t('dashboard.aiMatrix.noTrainingInjections')}</p>
                      ) : (
                        <div className="space-y-2 max-h-80 overflow-y-auto">
                          {kbDocuments.map(doc => (
                            <Card key={doc.id} className="border border-border p-4 flex justify-between items-center rounded-none bg-card/30 flex-row gap-4 py-4">
                              <div className="text-left max-w-[80%]">
                                <p className="font-sans text-sm font-medium text-foreground">{doc.question}</p>
                                <p className="text-xs text-muted-foreground mt-1">{doc.answer}</p>
                              </div>
                              <Button
                                variant="ghost"
                                onClick={() => handleToggleKbActive(doc.id, doc.is_active)}
                                className={`px-3 py-1.5 text-xs font-sans font-medium rounded-none transition-all duration-300 cursor-pointer h-8 border ${
                                  doc.is_active
                                    ? 'bg-primary/5 border-primary/20 text-primary hover:bg-primary/10'
                                    : 'bg-muted/10 border-muted/40 text-muted-foreground hover:bg-muted/20'
                                }`}
                              >
                                {doc.is_active ? 'Active' : 'Deactivated'}
                              </Button>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : isRoleResolving ? (
                  <div className="flex items-center justify-center py-16">
                    <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase animate-pulse">Verifying permissions...</span>
                  </div>
                ) : (
                  <Card className="p-8 text-center font-mono text-xs border border-border bg-card/30 rounded-none flex flex-col gap-2 py-8">
                    <span className="text-foreground font-semibold text-sm">Access Restricted</span>
                    <span className="text-muted-foreground text-[11px]">AI Knowledge Base management requires Educator or Admin privileges.</span>
                  </Card>
                )}
              </div>
              )}

            {/* TAB USER MANAGEMENT */}
            {activeTab === 'users' && (
              <div id="view-users">
                <UserManagement />
              </div>
            )}

            {/* TAB MEDIA LIBRARY */}
            {activeTab === 'media' && (
              <div id="view-media">
                <MediaLibrary />
              </div>
            )}

            {/* TAB INBOX & COMMUNICATIONS */}
            {activeTab === 'inbox' && (
              <div id="view-inbox">
                <InboxManager />
              </div>
            )}

            {/* TAB SETTINGS */}
            {activeTab === 'settings' && (
              <div id="view-settings">
                <SettingsHub />
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
}
