import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';
import { useAuth } from '../lib/useAuth';
import DashboardOnboardingTour from '../components/DashboardOnboardingTour';
import SettingsHub from '../components/dashboard/SettingsHub';
import { Bell } from 'lucide-react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '../components/ui/sidebar';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import UserManagement from '../components/dashboard/UserManagement';
import MediaLibrary from '../components/dashboard/MediaLibrary';
import InboxManager from '../components/dashboard/InboxManager';
import ResourceManager from '../components/dashboard/ResourceManager';
import LmsManager from '../components/dashboard/LmsManager';
import OverviewTab from '../components/dashboard/OverviewTab';
import ProfileSettingsDialog from '../components/dashboard/ProfileSettingsDialog';
import { useDashboardTelemetry } from '../hooks/useDashboardTelemetry';

export type DashboardTab = 'overview' | 'users' | 'courses' | 'library' | 'media' | 'inquiries' | 'subscribers' | 'ai-chats' | 'profile' | 'security' | 'ai-advisor' | 'access-control';
const VALID_TABS: DashboardTab[] = ['overview', 'users', 'courses', 'library', 'media', 'inquiries', 'subscribers', 'ai-chats', 'profile', 'security', 'ai-advisor', 'access-control'];

export default function Dashboard() {
  const { user, role: selectedRole, isSimulated, signOut, signInSimulated } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as DashboardTab;
  const activeTab = VALID_TABS.includes(tabParam) ? tabParam : 'overview';
  const [showTour, setShowTour] = useState(false);
  const [showBellDropdown, setShowBellDropdown] = useState(false);
  const mainScrollRef = useRef<HTMLElement>(null);

  const {
    knowledgeHubItems,
    kbDocuments,
    contactMessages,
    unreadMessagesCount,
    setUnreadMessagesCount
  } = useDashboardTelemetry();

  const handleTabChange = (tab: DashboardTab) => {
    setSearchParams({ tab });
    if (mainScrollRef.current) mainScrollRef.current.scrollTop = 0;
  };

  const [profileName, setProfileName] = useState('');
  const [profileAvatar, setProfileAvatar] = useState('');
  const [profileBio, setProfileBio] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'Advisor');
      setProfileAvatar(user.user_metadata?.avatar_url || '');
      setProfileBio(user.user_metadata?.bio || 'Authorized administrator of the Edu+ Core Net.');
    }
  }, [user]);

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

  useEffect(() => {
    const completed = localStorage.getItem('edu_plus_onboarding_completed');
    if (!completed) {
      setShowTour(true);
    }
  }, []);

  const hasPermission = (allowed: any[]) => {
    if (user && !selectedRole) return false;
    return allowed.includes(selectedRole || 'none');
  };

  return (
    <SidebarProvider
      style={{ '--sidebar-width': '15rem', '--sidebar-width-icon': '3rem' } as React.CSSProperties}
      className="h-dvh overflow-hidden"
    >
      {showTour && <DashboardOnboardingTour onComplete={() => setShowTour(false)} />}

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

      <SidebarInset className="flex flex-col min-h-0 overflow-hidden">
        <header className="h-[52px] border-b border-border bg-background flex items-center px-6 md:px-10 shrink-0 z-30 w-full">
          <div className="w-full flex items-center gap-2 max-w-[calc(var(--content-max)+80px)] mx-auto text-muted-foreground text-[13px]">
            <SidebarTrigger className="md:hidden text-muted-foreground hover:text-foreground rounded-none mr-2 size-7" />
            <span className="size-[7px] rounded-none bg-[oklch(var(--moss))] shrink-0" />
            <span className="font-sans text-foreground font-medium">System Active</span>
            {(unreadMessagesCount > 0 || showBellDropdown) && (
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

        <main ref={mainScrollRef} className="flex-1 h-0 overflow-y-auto overflow-x-hidden">
          <ProfileSettingsDialog
            isOpen={isSettingsOpen}
            onOpenChange={setIsSettingsOpen}
            user={user}
            isSimulated={isSimulated}
            selectedRole={selectedRole}
            signInSimulated={signInSimulated}
            handleLogout={handleLogout}
            initialName={profileName}
            initialAvatar={profileAvatar}
            initialBio={profileBio}
            onProfileUpdated={(name, avatar, bio) => {
              setProfileName(name);
              setProfileAvatar(avatar);
              setProfileBio(bio);
            }}
          />

          <div className="w-full min-h-[500px] flex flex-col">
            {activeTab === 'overview' && (
              <OverviewTab
                knowledgeHubItems={knowledgeHubItems}
                kbDocuments={kbDocuments}
                contactMessages={contactMessages}
              />
            )}

            {activeTab === 'users' && (
              <div id="view-people" className="page animate-in fade-in duration-300">
                <UserManagement />
              </div>
            )}

            {activeTab === 'courses' && (
              <div id="view-courses" className="page animate-in fade-in duration-300">
                <LmsManager />
              </div>
            )}

            {activeTab === 'library' && hasPermission(['admin', 'educator', 'resource_person']) && (
              <div id="view-library" className="page animate-in fade-in duration-300">
                <ResourceManager />
              </div>
            )}

            {activeTab === 'media' && (
              <div id="view-media" className="page animate-in fade-in duration-300">
                <MediaLibrary />
              </div>
            )}

            {(activeTab === 'inquiries' || activeTab === 'subscribers' || activeTab === 'ai-chats') && (
              <div id="view-inbox" className="page animate-in fade-in duration-300">
                <InboxManager activeFolder={activeTab as any} />
              </div>
            )}

            {(activeTab === 'profile' || activeTab === 'security' || activeTab === 'ai-advisor' || activeTab === 'access-control') && (
              <div id="view-settings" className="page animate-in fade-in duration-300">
                <SettingsHub activeTab={activeTab as any} />
              </div>
            )}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
