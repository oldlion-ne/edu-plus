import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'sonner';
import { useAuth } from '../lib/AuthContext';
import DashboardOnboardingTour from '../components/DashboardOnboardingTour';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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
import { Sheet, SheetContent, SheetTitle } from '../components/ui/sheet';
import { AnimatedThemeToggler } from '../components/ui/animated-theme-toggler';
import { 
  Bell, 
  LayoutDashboard, 
  UploadCloud, 
  Cpu, 
  Mail, 
  Menu, 
  X
} from 'lucide-react';

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
    color: "oklch(var(--primary))",
  },
  mobile: {
    label: "Mobile",
    color: "oklch(var(--secondary))",
  },
} satisfies ChartConfig;

export default function Dashboard() {
  const { user, role: selectedRole, isSimulated, signOut, signInSimulated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'uploader' | 'ai-matrix' | 'messages'>('overview');
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
          toast.success('[SIMULATED COGNITIVE OVERRIDE SUCCESS]', {
            description: 'Local simulated session profile nodes re-aligned successfully.',
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

        toast.success('[DATABASE SYNC COMPLETE]', {
          description: 'Your profile credentials have been updated securely.',
          style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--primary)/0.3)', color: 'oklch(var(--foreground))', borderRadius: '0px' }
        });
      }
      setIsSettingsOpen(false);
    } catch (err: any) {
      toast.error('COMPILATION_ERROR', {
        description: err.message || 'Failed to update user profile.',
        style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--destructive)/0.3)', color: 'oklch(var(--foreground))', borderRadius: '0px' }
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('[SESSION TERMINATED]', {
        description: 'You have logged out successfully from Dashboard.',
        style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--primary)/0.3)', color: 'oklch(var(--foreground))', borderRadius: '0px' }
      });
      navigate('/', { replace: true });
    } catch (err: any) {
      toast.error('LOGOUT_ERROR', {
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
  const [newHubItem, setNewHubItem] = useState({
    title: '',
    description: '',
    category: 'tutorial',
    media_type: 'video_embed',
    url: '',
    author_name: ''
  });

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
          toast(`[ALERT // NEW INQUIRY TRANSMITTED]`, {
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

  const handleCreateHubItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('knowledge_hub').insert({
        title: newHubItem.title,
        description: newHubItem.description,
        category: newHubItem.category,
        media_type: newHubItem.media_type,
        url: newHubItem.url,
        author_name: newHubItem.author_name || 'Staff Advisor'
      });

      if (error) throw error;

      toast.success('[TRANSMISSION SUCCESSFUL]', {
        description: 'Knowledge node has been compiled to public database.',
        style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--primary)/0.3)', color: 'oklch(var(--foreground))', borderRadius: '0px' }
      });

      setNewHubItem({
        title: '',
        description: '',
        category: 'tutorial',
        media_type: 'video_embed',
        url: '',
        author_name: ''
      });

      fetchData();
    } catch (err) {
      toast.error('TRANSMISSION_ERROR', {
        description: 'Unauthorized role or empty input variables.',
        style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--destructive)/0.3)', color: 'oklch(var(--foreground))', borderRadius: '0px' }
      });
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

      toast.success('[COGNITIVE COMPILATION SUCCESS]', {
        description: 'AI custom factual guideline loaded dynamically.',
        style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--primary)/0.3)', color: 'oklch(var(--foreground))', borderRadius: '0px' }
      });

      setNewKbDoc({ question: '', answer: '' });
      fetchData();
    } catch (err) {
      toast.error('COMPILATION_ERROR', {
        description: 'Failed to write fact to AI matrix.',
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

  const handleMarkMessageRead = async (id: string) => {
    try {
      const { error } = await supabase.from('contact_messages').update({ status: 'read' }).eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const hasPermission = (allowed: UserRole[]) => {
    return allowed.includes(selectedRole || 'none');
  };

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
            <span className="font-heading font-bold text-xl text-foreground">Edu</span>
            <span className="text-primary font-light text-xl">+</span>
            <span className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase ml-2">// ADMIN</span>
          </Link>
          {onNavItemClick && (
            <Button variant="ghost" onClick={onNavItemClick} className="md:hidden text-muted-foreground hover:text-foreground focus:text-primary cursor-pointer p-1.5 h-8 w-8 flex items-center justify-center rounded-none">
              <X className="size-4" />
            </Button>
          )}
        </div>
        <div className="px-6 py-4">
          <span className="font-mono text-[9px] text-primary tracking-[0.2em] uppercase font-bold block">WORKSPACE PORTAL</span>
        </div>

        {/* Navigation Sidebar Tabs */}
        <nav className="flex-grow px-4 py-2 space-y-1">
          <Button
            id="tab-overview"
            variant="ghost"
            onClick={() => { setActiveTab('overview'); onNavItemClick?.(); }}
            className={`w-full justify-start gap-3 px-4 py-2.5 font-sans text-sm font-medium transition-all duration-200 rounded-none border-l-2 ${
              activeTab === 'overview'
                ? 'border-l-primary bg-primary/10 text-primary font-semibold'
                : 'border-l-transparent text-muted-foreground hover:text-primary hover:bg-primary/5'
            }`}
          >
            <LayoutDashboard className="size-4 shrink-0" />
            <span>Overview</span>
          </Button>
          <Button
            id="tab-uploader"
            variant="ghost"
            onClick={() => { setActiveTab('uploader'); onNavItemClick?.(); }}
            className={`w-full justify-start gap-3 px-4 py-2.5 font-sans text-sm font-medium transition-all duration-200 rounded-none border-l-2 ${
              activeTab === 'uploader'
                ? 'border-l-primary bg-primary/10 text-primary font-semibold'
                : 'border-l-transparent text-muted-foreground hover:text-primary hover:bg-primary/5'
            }`}
          >
            <UploadCloud className="size-4 shrink-0" />
            <span>Upload Station</span>
          </Button>
          <Button
            id="tab-ai-matrix"
            variant="ghost"
            onClick={() => { setActiveTab('ai-matrix'); onNavItemClick?.(); }}
            className={`w-full justify-start gap-3 px-4 py-2.5 font-sans text-sm font-medium transition-all duration-200 rounded-none border-l-2 ${
              activeTab === 'ai-matrix'
                ? 'border-l-primary bg-primary/10 text-primary font-semibold'
                : 'border-l-transparent text-muted-foreground hover:text-primary hover:bg-primary/5'
            }`}
          >
            <Cpu className="size-4 shrink-0" />
            <span>AI Chat Training</span>
          </Button>
          <Button
            id="tab-messages"
            variant="ghost"
            onClick={() => { setActiveTab('messages'); onNavItemClick?.(); }}
            className={`w-full justify-start gap-3 px-4 py-2.5 font-sans text-sm font-medium transition-all duration-200 rounded-none border-l-2 ${
              activeTab === 'messages'
                ? 'border-l-primary bg-primary/10 text-primary font-semibold'
                : 'border-l-transparent text-muted-foreground hover:text-primary hover:bg-primary/5'
            }`}
          >
            <Mail className="size-4 shrink-0" />
            <span>Message Hub</span>
          </Button>
        </nav>
      </div>

      {/* Footer profile card trigger dialog */}
      <div className="p-4 border-t border-border bg-background/50 font-sans">
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogTrigger asChild>
            <button className="w-full flex items-center gap-3 p-3 border border-border hover:border-primary/30 bg-card hover:bg-primary/5 focus:outline-none focus:ring-1 focus:ring-primary/70 focus:border-primary/30 transition-all duration-300 text-left cursor-pointer rounded-none group">
              <Avatar className="border border-primary/20 group-hover:border-primary shadow-[0_0_8px_oklch(var(--primary)/0.05)] rounded-none shrink-0">
                <AvatarImage src={user?.user_metadata?.avatar_url} className="rounded-none object-cover" />
                <AvatarFallback className="bg-background text-primary font-mono font-bold text-xs rounded-none flex items-center justify-center">
                  {profileName.substring(0, 2).toUpperCase() || 'AD'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-grow min-w-0">
                <p className="font-sans text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                  {profileName}
                </p>
                <p className="font-mono text-[9px] text-muted-foreground truncate">
                  {user?.email}
                </p>
                <span className={`inline-block mt-1 px-1.5 py-0.5 text-[7px] font-mono rounded-none uppercase border font-bold tracking-widest ${
                  selectedRole === 'admin'
                    ? 'border-destructive/50 bg-destructive/10 text-destructive'
                    : selectedRole === 'educator'
                    ? 'border-[#22C55E]/50 bg-[#22C55E]/10 text-[#4ADE80]'
                    : 'border-primary/50 bg-primary/10 text-primary'
                }`}>
                  {selectedRole ? selectedRole.replace('_', ' ') : 'NONE'}
                </span>
              </div>
            </button>
          </DialogTrigger>

          <DialogContent className="max-w-md bg-card border border-border text-foreground rounded-none p-6 shadow-xl font-sans animate-fade-in">
            <DialogHeader className="border-b border-border pb-4">
              <DialogTitle className="text-foreground font-sans font-semibold text-lg tracking-tight">Profile Settings</DialogTitle>
              <DialogDescription className="text-muted-foreground font-sans text-xs">
                Manage your display name, avatar image, and workspace parameters.
              </DialogDescription>
            </DialogHeader>

            {/* Form and Settings section */}
            <form onSubmit={handleUpdateProfile} className="space-y-4 pt-3 font-sans">
              <div className="flex justify-center mb-4">
                <Avatar className="size-16 border-2 border-primary rounded-none shadow-md animate-pulse">
                  <AvatarImage src={profileAvatar} className="rounded-none object-cover" />
                  <AvatarFallback className="bg-background text-primary font-sans font-bold text-lg rounded-none flex items-center justify-center">
                    {profileName.substring(0, 2).toUpperCase() || 'AD'}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider block">Display Full Name</Label>
                <Input
                  type="text"
                  required
                  value={profileName}
                  onChange={e => setProfileName(e.target.value)}
                  className="w-full bg-background border border-border text-xs px-4 py-2.5 outline-none focus:border-primary rounded-none text-foreground font-sans h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider block">Avatar Image URL</Label>
                <Input
                  type="url"
                  value={profileAvatar}
                  onChange={e => setProfileAvatar(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-background border border-border text-xs px-4 py-2.5 outline-none focus:border-primary rounded-none text-foreground font-mono h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider block">Administrative Summary (Bio)</Label>
                <Textarea
                  value={profileBio}
                  onChange={e => setProfileBio(e.target.value)}
                  rows={3}
                  className="w-full bg-background border border-border text-xs px-4 py-2 outline-none focus:border-primary rounded-none text-foreground font-sans resize-none min-h-20"
                />
              </div>

              {/* Quick simulated bypass swapper (only for dev simulated user sessions) */}
              {isSimulated && (
                <div className="border border-primary/20 bg-primary/5 p-3 rounded-none mt-2 text-left space-y-2">
                  <span className="font-mono text-[9px] text-primary tracking-wider uppercase block font-bold">// DEV BYPASS ACCESS PANEL</span>
                  <span className="font-mono text-[8px] text-muted-foreground block">SWAP MOCK CLEARANCE ROLES DYNAMICALLY:</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['admin', 'educator', 'resource_person'] as const).map(role => (
                      <Button key={role} type="button" variant="outline" onClick={() => { signInSimulated(role); toast.success(`[ROLE_OVERRIDE: ${role.toUpperCase()}]`, { description: `Simulated identity shifted successfully.`, style: { background: 'oklch(var(--card))', border: '1px solid oklch(var(--primary))', color: 'oklch(var(--foreground))', borderRadius: '0px' } }); setIsSettingsOpen(false); }} className={`py-1 text-center font-mono text-[8px] uppercase tracking-wider border cursor-pointer transition-all rounded-none focus:outline-none focus:ring-1 focus:ring-primary/70 ${selectedRole === role ? 'border-primary bg-primary/10 text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'}`}>
                        {role.replace('_', ' ')}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Controls panel */}
              <div className="flex gap-2 pt-2 border-t border-border">
                <Button type="submit" className="flex-grow py-2 bg-primary text-primary-foreground hover:bg-foreground hover:text-background focus:outline-none focus:ring-1 focus:ring-primary/70 transition-all font-mono text-[9px] font-bold tracking-wider uppercase cursor-pointer rounded-none h-9">
                  Save Changes
                </Button>
                <Link to="/" onClick={() => setIsSettingsOpen(false)} className="px-4 py-2 border border-border hover:border-foreground focus:outline-none focus:ring-1 focus:ring-primary/70 text-center font-mono text-[9px] uppercase tracking-wider transition-all inline-flex items-center justify-center h-9 text-foreground hover:bg-accent hover:text-accent-foreground">
                  Exit Site
                </Link>
                <Button type="button" variant="destructive" onClick={() => { setIsSettingsOpen(false); handleLogout(); }} className="px-4 py-2 border border-destructive/30 hover:border-destructive hover:bg-destructive/10 bg-destructive/5 text-destructive focus:outline-none focus:ring-1 focus:ring-destructive font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer rounded-none h-9">
                  Logout
                </Button>
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

      {/* Global HUD elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/3 rounded-none blur-[140px] pointer-events-none" />

      {/* Mobile Drawer Header */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-card border-b border-border z-40 w-full font-sans">
        <Link to="/" className="flex items-center gap-0 hover:text-primary focus:outline-none focus:ring-1 focus:ring-primary/70">
          <span className="font-heading font-bold text-lg text-foreground">Edu</span>
          <span className="text-primary font-light text-lg">+</span>
          <span className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase ml-2">// ADMIN</span>
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
          <SheetTitle className="sr-only">Admin Navigation Workspace</SheetTitle>
          {renderSidebarContents(() => setIsMobileOpen(false))}
        </SheetContent>
      </Sheet>

      {/* Main Workspace viewport layout */}
      <div className="flex-grow flex flex-col min-h-0 relative overflow-hidden w-full">
        {/* Topbar Telemetry Header */}
        <header className="bg-card border-b border-border px-6 md:px-12 py-4 flex flex-col sm:flex-row gap-4 justify-between items-center z-30">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 bg-primary/10 border border-primary/20 text-primary font-mono text-[9px] uppercase tracking-wider select-none">
              <span>Link: Active</span>
              <span className="w-1.5 h-1.5 bg-primary rounded-none animate-pulse"></span>
            </div>
            
            <span className="text-muted-foreground/20 font-mono text-[10px] hidden sm:inline">|</span>
            
            {/* Breadcrumb based on active tab */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground font-sans">
              <span>Admin</span>
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
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-none animate-ping"></span>
                )}
              </Button>

              {showBellDropdown && (
                <div className="absolute right-0 mt-3 w-80 bg-card border border-border p-4 shadow-xl z-50 rounded-none text-left font-sans animate-fade-in">
                  <h4 className="font-sans text-xs font-semibold text-foreground tracking-wide border-b border-border pb-2 mb-2">
                    Inbound Inquiry Signals
                  </h4>
                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {contactMessages.filter(m => m.status === 'unread').length === 0 ? (
                      <p className="text-[10px] text-muted-foreground/50 font-mono py-4 text-center">NO ACTIVE INBOUND PINGS.</p>
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

            <AnimatedThemeToggler variant="circle" duration={400} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer" />

            <Button
              variant="outline"
              onClick={() => { localStorage.removeItem('edu_plus_onboarding_completed'); setShowTour(true); }}
              className="border border-border hover:border-primary text-foreground hover:text-primary hover:bg-primary/5 focus:outline-none px-3.5 py-1.5 font-sans text-xs transition-all duration-300 cursor-pointer rounded-none h-8"
            >
              Tutorial Tour
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
                  <h2 className="font-heading text-2xl font-light text-foreground">Ecosystem Overview</h2>
                  <p className="font-mono text-xs text-muted-foreground mt-1">TELEMETRY_LINK // DIAGNOSTIC_ACTIVE</p>
                </div>

                <div className="grid sm:grid-cols-3 gap-5 w-full">
                  <Card className="border border-border bg-card rounded-none text-left p-5 flex flex-col gap-0 py-5">
                    <span className="font-mono text-[9px] text-primary tracking-wider block mb-1">HUB RESOURCES</span>
                    <span className="font-heading text-3xl font-light text-foreground">{knowledgeHubItems.length}</span>
                  </Card>
                  <Card className="border border-border bg-card rounded-none text-left p-5 flex flex-col gap-0 py-5">
                    <span className="font-mono text-[9px] text-primary tracking-wider block mb-1">AI TRAINING RULES</span>
                    <span className="font-heading text-3xl font-light text-foreground">{kbDocuments.length}</span>
                  </Card>
                  <Card className="border border-border bg-card rounded-none text-left p-5 flex flex-col gap-0 py-5">
                    <span className="font-mono text-[9px] text-primary tracking-wider block mb-1">INBOUND INQUIRIES</span>
                    <span className="font-heading text-3xl font-light text-foreground">{contactMessages.length}</span>
                  </Card>
                </div>

                {/* Interactive Area Chart */}
                <Card className="rounded-none border border-border bg-card/50 overflow-visible flex flex-col gap-0 py-0">
                  {/* Chart Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b border-border py-5 px-6">
                    <div className="grid flex-1 gap-1 text-left">
                      <div className="font-mono text-[11px] font-bold text-primary tracking-[0.2em] uppercase">SYSTEM ANALYTICS TELEMETRY</div>
                      <div className="text-muted-foreground/50 font-mono text-[9px] uppercase tracking-wider">
                        Showing interactive visitor metric influx nodes
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
                      className="aspect-auto h-[250px] sm:h-[350px] w-full"
                    >
                      <AreaChart data={filteredData} margin={{ left: 12, right: 12, top: 20, bottom: 12 }}>
                        <defs>
                          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={chartConfig.desktop.color} stopOpacity={0.5} />
                            <stop offset="95%" stopColor={chartConfig.desktop.color} stopOpacity={0.05} />
                          </linearGradient>
                          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={chartConfig.mobile.color} stopOpacity={0.5} />
                            <stop offset="95%" stopColor={chartConfig.mobile.color} stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="oklch(var(--border)/0.2)" />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          minTickGap={32}
                          tick={{ fill: 'currentColor', fontSize: 10, fontFamily: 'monospace' }}
                          className="fill-muted-foreground"
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
                              className="rounded-none border border-primary/30 bg-card text-foreground"
                            />
                          }
                        />
                        <Area
                          dataKey="mobile"
                          type="natural"
                          fill="url(#fillMobile)"
                          fillOpacity={1}
                          stroke={chartConfig.mobile.color}
                          strokeWidth={1.5}
                        />
                        <Area
                          dataKey="desktop"
                          type="natural"
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
                        <div className="h-[2px] w-5 rounded-none" style={{ backgroundColor: chartConfig.desktop.color, boxShadow: `0 0 6px ${chartConfig.desktop.color}` }} />
                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Desktop</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-[2px] w-5 rounded-none" style={{ backgroundColor: chartConfig.mobile.color, boxShadow: `0 0 6px ${chartConfig.mobile.color}` }} />
                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Mobile</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Content Category Distribution */}
                <Card className="border border-border p-6 bg-card rounded-none text-left flex flex-col gap-0 py-6">
                  <h3 className="font-mono text-[10px] font-bold text-primary tracking-wider mb-4 uppercase">Content Category Distribution</h3>
                  <div className="space-y-4">
                    {['tutorial', 'podcast', 'webinar', 'study_material'].map(cat => {
                      const count = knowledgeHubItems.filter(i => i.category === cat).length;
                      const percent = knowledgeHubItems.length > 0 ? (count / knowledgeHubItems.length) * 100 : 0;
                      return (
                        <div key={cat} className="space-y-1">
                          <div className="flex justify-between text-[10px] font-mono text-foreground">
                            <span className="uppercase">{cat.replace('_', ' ')}</span>
                            <span className="text-muted-foreground">{count} NODES ({percent.toFixed(0)}%)</span>
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
              <div id="view-uploader" className="space-y-6 animate-in fade-in duration-300 text-left">
                <div className="border-b border-border pb-4">
                  <h2 className="font-heading text-2xl font-light text-foreground">Content Upload Station</h2>
                  <p className="font-mono text-xs text-muted-foreground mt-1">Compile new courses, files, and lectures.</p>
                </div>

                {hasPermission(['admin', 'educator', 'resource_person']) ? (
                  <form onSubmit={handleCreateHubItem} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">Title</Label>
                        <Input
                          type="text"
                          required
                          value={newHubItem.title}
                          onChange={e => setNewHubItem(p => ({ ...p, title: e.target.value }))}
                          placeholder="Technical Introduction to React 19..."
                          className="w-full bg-background border border-border text-xs px-4 py-2.5 outline-none focus:border-primary rounded-none text-foreground font-sans h-9"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">Author Name</Label>
                        <Input
                          type="text"
                          required
                          value={newHubItem.author_name}
                          onChange={e => setNewHubItem(p => ({ ...p, author_name: e.target.value }))}
                          placeholder="e.g., Roshan Khumukcham"
                          className="w-full bg-background border border-border text-xs px-4 py-2.5 outline-none focus:border-primary rounded-none text-foreground font-sans h-9"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2 flex flex-col gap-1.5">
                        <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">Category</Label>
                        <Select
                          value={newHubItem.category}
                          onValueChange={val => setNewHubItem(p => ({ ...p, category: val }))}
                        >
                          <SelectTrigger className="w-full bg-background border border-border text-xs px-4 py-2.5 outline-none focus:border-primary rounded-none text-foreground font-mono h-9">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none bg-card border border-border text-foreground font-mono text-xs z-50">
                            <SelectItem value="tutorial" className="rounded-none cursor-pointer">Tutorial</SelectItem>
                            <SelectItem value="podcast" className="rounded-none cursor-pointer">Podcast</SelectItem>
                            <SelectItem value="webinar" className="rounded-none cursor-pointer">Webinar</SelectItem>
                            <SelectItem value="study_material" className="rounded-none cursor-pointer">Study Material</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 flex flex-col gap-1.5">
                        <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">Media Type</Label>
                        <Select
                          value={newHubItem.media_type}
                          onValueChange={val => setNewHubItem(p => ({ ...p, media_type: val }))}
                        >
                          <SelectTrigger className="w-full bg-background border border-border text-xs px-4 py-2.5 outline-none focus:border-primary rounded-none text-foreground font-mono h-9">
                            <SelectValue placeholder="Select Media Type" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none bg-card border border-border text-foreground font-mono text-xs z-50">
                            <SelectItem value="video_embed" className="rounded-none cursor-pointer">YouTube/Video link (Embedded player)</SelectItem>
                            <SelectItem value="document_url" className="rounded-none cursor-pointer">Study PDF link</SelectItem>
                            <SelectItem value="external_link" className="rounded-none cursor-pointer">Generic External Link</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">Resource URL</Label>
                      <Input
                        type="url"
                        required
                        value={newHubItem.url}
                        onChange={e => setNewHubItem(p => ({ ...p, url: e.target.value }))}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full bg-background border border-border text-xs px-4 py-2.5 outline-none focus:border-primary rounded-none text-foreground font-sans h-9"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">Brief Description</Label>
                      <Textarea
                        value={newHubItem.description}
                        onChange={e => setNewHubItem(p => ({ ...p, description: e.target.value }))}
                        placeholder="A concise synopsis detailing what core concepts this resource node will cover..."
                        rows={3}
                        className="w-full bg-background border border-border text-xs px-4 py-2 outline-none focus:border-primary rounded-none text-foreground font-sans resize-none min-h-20"
                      />
                    </div>

                    <Button type="submit" className="px-6 py-3 bg-primary text-primary-foreground hover:bg-foreground hover:text-background focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300 font-mono text-[10px] font-bold tracking-widest uppercase cursor-pointer rounded-none h-10">
                      COMPILE RESOURCE
                    </Button>
                  </form>
                ) : (
                  <Card className="p-8 text-center text-destructive font-mono text-xs border border-destructive/20 bg-destructive/5 rounded-none flex flex-col gap-0 py-8">
                    ACCESS DENIED. USER PROTOCOL REQUIRES LEVEL: STAFF, EDUCATOR, OR ADMIN.
                  </Card>
                )}
              </div>
            )}

            {/* TAB AI MATRIX */}
            {activeTab === 'ai-matrix' && (
              <div id="view-ai-matrix" className="space-y-6 animate-in fade-in duration-300 text-left">
                <div className="border-b border-border pb-4">
                  <h2 className="font-heading text-2xl font-light text-foreground">AI Cognitive Training Matrix</h2>
                  <p className="font-mono text-xs text-muted-foreground mt-1">Inject custom facts directly into the site advisor chatbot.</p>
                </div>

                {hasPermission(['admin', 'educator']) ? (
                  <div className="space-y-8">
                    <form onSubmit={handleCreateKbDoc} className="space-y-4 border border-border p-5 bg-card rounded-none">
                      <h3 className="font-mono text-[10px] font-bold text-primary tracking-wider uppercase mb-2">New Factual Guideline Influx</h3>
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
                      <Button type="submit" className="px-4 py-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300 font-mono text-[9px] font-bold tracking-wider rounded-none cursor-pointer h-9">
                        TRAIN COGNITIVE ADVISOR
                      </Button>
                    </form>

                    {/* Loaded Rules */}
                    <div className="space-y-3">
                      <h3 className="font-mono text-[10px] font-bold text-muted-foreground tracking-wider uppercase">Active Fact Matrix</h3>
                      {kbDocuments.length === 0 ? (
                        <p className="text-xs text-muted-foreground/30 font-mono py-4">NO TRAINING INJECTIONS RECORDED.</p>
                      ) : (
                        <div className="space-y-2 max-h-80 overflow-y-auto">
                          {kbDocuments.map(doc => (
                            <Card key={doc.id} className="border border-border p-4 flex justify-between items-center rounded-none bg-card/30 flex-row gap-4 py-4">
                              <div className="text-left max-w-[80%]">
                                <p className="font-mono text-[10px] text-primary">TOPIC: {doc.question}</p>
                                <p className="text-xs text-muted-foreground mt-1">{doc.answer}</p>
                              </div>
                              <Button
                                variant="ghost"
                                onClick={() => handleToggleKbActive(doc.id, doc.is_active)}
                                className={`px-2 py-1 text-[8px] font-mono rounded-none uppercase transition-all duration-300 cursor-pointer h-6 border ${
                                  doc.is_active
                                    ? 'bg-[#22C55E]/10 border-[#22C55E]/40 text-[#4ADE80] hover:bg-[#22C55E]/20'
                                    : 'bg-destructive/10 border-destructive/40 text-destructive hover:bg-destructive/20'
                                }`}
                              >
                                {doc.is_active ? 'ACTIVE' : 'DEACTIVATED'}
                              </Button>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Card className="p-8 text-center text-destructive font-mono text-xs border border-destructive/20 bg-destructive/5 rounded-none flex flex-col gap-0 py-8">
                    ACCESS DENIED. AI COMPILING CAPABILITIES REQUIRE SECURITY LEVEL: EDUCATOR OR ADMIN.
                  </Card>
                )}
              </div>
            )}

            {/* TAB MESSAGES */}
            {activeTab === 'messages' && (
              <div id="view-message-hub" className="space-y-6 animate-in fade-in duration-300 text-left">
                <div className="border-b border-border pb-4">
                  <h2 className="font-heading text-2xl font-light text-foreground">Sonar Inquiries Terminal</h2>
                  <p className="font-mono text-xs text-muted-foreground mt-1">Signals received from public contact nodes.</p>
                </div>

                {hasPermission(['admin', 'educator']) ? (
                  <div className="space-y-4">
                    {contactMessages.length === 0 ? (
                      <p className="text-center py-10 font-mono text-muted-foreground/40 text-xs uppercase">No inquiries received yet.</p>
                    ) : (
                      <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-2">
                        {contactMessages.map(msg => (
                          <Card
                            key={msg.id}
                            className={`p-5 border text-left transition-colors duration-300 rounded-none flex flex-col gap-0 py-5 ${
                              msg.status === 'unread'
                                ? 'border-primary/40 bg-primary/5 shadow-[0_0_8px_oklch(var(--primary)/0.05)]'
                                : 'border-border bg-card/30'
                            }`}
                          >
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <span className="font-mono text-[9px] text-primary uppercase tracking-wider block">
                                  {msg.profile} inquiry
                                </span>
                                <h4 className="font-heading text-base font-light text-foreground mt-1">{msg.name}</h4>
                                <span className="font-mono text-[10px] text-muted-foreground block mt-0.5">{msg.email}</span>
                              </div>
                              {msg.status === 'unread' && (
                                <Button
                                  onClick={() => handleMarkMessageRead(msg.id)}
                                  className="px-2.5 py-0.5 bg-primary hover:bg-foreground hover:text-background text-primary-foreground transition-colors font-mono text-[8px] font-bold tracking-wider uppercase rounded-none cursor-pointer h-6"
                                >
                                  Mark Read
                                </Button>
                              )}
                            </div>
                            <p className="font-sans text-xs text-muted-foreground leading-relaxed mt-4 pt-4 border-t border-border">
                              {msg.message}
                            </p>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Card className="p-8 text-center text-destructive font-mono text-xs border border-destructive/20 bg-destructive/5 rounded-none flex flex-col gap-0 py-8">
                    ACCESS DENIED. COMPROMISED CLEARANCE LEVEL. REQUIRED NODES: EDUCATOR OR ADMIN.
                  </Card>
                )}
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
}
