import { Link } from 'react-router';
import type { UserRole } from '../../lib/useAuth';
import type { DashboardTab } from '../../pages/Dashboard';
import { useTranslation } from '../../i18n/useTranslation';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  LogOut,
  Users,
  BookOpen,
  Library,
  Image,
  Mail,
  UserCheck,
  Bot,
  User,
  Shield,
  BrainCircuit,
  Key
} from 'lucide-react';

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  selectedRole: UserRole | null;
  profileName: string;
  profileAvatar: string;
  userEmail: string | undefined;
  unreadMessagesCount: number;
  onProfileClick: () => void;
  onLogout: () => void;
  hasPermission: (roles: UserRole[]) => boolean;
}

const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Admin',
  educator: 'Educator',
  resource_person: 'Resource',
  none: 'Guest',
};

function SidebarNavItem({
  id,
  icon: Icon,
  label,
  tabKey,
  activeTab,
  setActiveTab,
  badge,
}: {
  id: string;
  icon: React.ElementType;
  label: string;
  tabKey: string;
  activeTab: string;
  setActiveTab: (t: any) => void;
  badge?: number;
}) {
  const { setOpenMobile } = useSidebar();
  const isActive = activeTab === tabKey;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        id={id}
        isActive={isActive}
        tooltip={label}
        onClick={() => {
          setActiveTab(tabKey);
          setOpenMobile(false);
        }}
        className={[
          'w-full justify-start gap-2.5 px-3 font-sans text-[13.5px] font-medium',
          'transition-all duration-150 rounded-none h-[36px] border leading-none',
          isActive
            ? 'bg-muted/30 text-foreground border-transparent border-l-[2.5px] border-l-primary'
            : 'border-transparent text-muted-foreground hover:border-border/20 hover:text-foreground hover:bg-muted/10',
        ].join(' ')}
      >
        <Icon className="size-4 shrink-0" />
        <span className="truncate">{label}</span>
        {badge !== undefined && badge > 0 && (
          <span className="ml-auto flex h-4 min-w-4 items-center justify-center bg-primary/15 text-primary text-[9px] font-bold px-1">
            {badge}
          </span>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function DashboardSidebar({
  activeTab,
  setActiveTab,
  selectedRole,
  profileName,
  profileAvatar,
  userEmail,
  unreadMessagesCount,
  onProfileClick,
  onLogout,
  hasPermission,
}: DashboardSidebarProps) {
  const { t } = useTranslation();

  return (
    <Sidebar
      collapsible="icon"
      className="font-sans"
    >
      {/* ── Header: Brand + User Identity ────────────────────────── */}
      <SidebarHeader className="border-b border-border p-0 gap-0">
        {/* Brand row - exactly 52px to align with statusbar */}
        <div className="h-[52px] flex items-center justify-between px-[18px] border-b border-border/80">
          <Link
            to="/"
            className="flex items-baseline gap-1 hover:opacity-85 transition-opacity focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/70 group-data-[collapsible=icon]:hidden"
          >
            <span className="font-heading text-[19px] text-foreground font-normal tracking-tight">
              Edu<b className="text-primary font-normal">+</b>
            </span>
            <span className="font-mono text-[9.5px] tracking-[.14em] text-muted-foreground uppercase ml-1">
              Admin
            </span>
          </Link>
          <SidebarTrigger className="text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors rounded-none size-7" />
        </div>

        {/* User identity badge — hidden when collapsed to icon */}
        <button
          onClick={onProfileClick}
          className="group/user w-full flex items-center gap-2.5 px-[18px] py-3.5 hover:bg-muted/20 transition-colors text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/70 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
          aria-label="Open profile settings"
        >
          <Avatar className="size-[34px] border border-border/60 rounded-none shrink-0">
            <AvatarImage src={profileAvatar} className="rounded-none object-cover" />
            <AvatarFallback className="bg-muted text-muted-foreground font-heading text-sm rounded-none flex items-center justify-center">
              {profileName.substring(0, 2).toUpperCase() || 'AD'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="text-[13.5px] font-semibold text-foreground truncate leading-[1.25]">
              {profileName || 'Administrator'}
            </p>
            <p className="text-[11.5px] text-muted-foreground truncate leading-tight mt-0.5">
              {userEmail}
            </p>
          </div>
          {selectedRole && selectedRole !== 'none' && (
            <span className="shrink-0 font-mono text-[9px] tracking-[.1em] text-primary border border-primary/35 px-[7px] py-[3px] uppercase rounded-none group-data-[collapsible=icon]:hidden">
              {ROLE_LABELS[selectedRole] ?? selectedRole}
            </span>
          )}
        </button>
      </SidebarHeader>

      {/* ── Navigation ──────────────────────────────────────────── */}
      <SidebarContent className="py-2 overflow-y-auto gap-0 rail">
        <SidebarGroup className="px-2 pb-0">
          <SidebarMenu className="gap-0.5">
            <SidebarNavItem
              id="tab-overview"
              icon={LayoutDashboard}
              label={'Overview'}
              tabKey="overview"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {hasPermission(['admin']) && (
              <SidebarNavItem
                id="tab-users"
                icon={Users}
                label={'People'}
                tabKey="users"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            )}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="px-2 pb-0 rail-group">
          <div className="px-3 pt-3 mb-1.5 font-mono text-[9.5px] text-muted-foreground tracking-[.16em] uppercase">Content</div>
          <SidebarMenu className="gap-0.5">
            <SidebarNavItem
              id="tab-courses"
              icon={BookOpen}
              label="Courses"
              tabKey="courses"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <SidebarNavItem
              id="tab-library"
              icon={Library}
              label="Library"
              tabKey="library"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <SidebarNavItem
              id="tab-media"
              icon={Image}
              label="Media"
              tabKey="media"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="px-2 pb-0 rail-group">
          <div className="px-3 pt-3 mb-1.5 font-mono text-[9.5px] text-muted-foreground tracking-[.16em] uppercase">Communication</div>
          <SidebarMenu className="gap-0.5">
            <SidebarNavItem
              id="tab-inquiries"
              icon={Mail}
              label="Inquiries"
              tabKey="inquiries"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              badge={unreadMessagesCount}
            />
            <SidebarNavItem
              id="tab-subscribers"
              icon={UserCheck}
              label="Subscribers"
              tabKey="subscribers"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <SidebarNavItem
              id="tab-aichats"
              icon={Bot}
              label="AI Chats"
              tabKey="ai-chats"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="px-2 pb-0 mt-3 mb-4">
          <div className="px-3 pt-3 mb-1.5 font-mono text-[9.5px] text-muted-foreground tracking-[.16em] uppercase">Settings</div>
          <SidebarMenu className="gap-0.5">
            <SidebarNavItem
              id="tab-profile"
              icon={User}
              label="Profile"
              tabKey="profile"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <SidebarNavItem
              id="tab-security"
              icon={Shield}
              label="Security & MFA"
              tabKey="security"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {hasPermission(['admin', 'educator']) && (
              <SidebarNavItem
                id="tab-aiadvisor"
                icon={BrainCircuit}
                label="AI Advisor"
                tabKey="ai-advisor"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            )}
            {hasPermission(['admin']) && (
              <SidebarNavItem
                id="tab-access"
                icon={Key}
                label="Access Control"
                tabKey="access-control"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer: Actions ───────────────────────────── */}
      <SidebarFooter className="border-t border-border p-2 gap-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between px-3 py-1.5">
              <AnimatedThemeToggler
                variant="square"
                duration={400}
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              />
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-destructive transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/70 group-data-[collapsible=icon]:hidden"
                aria-label={t('dashboard.navSignOut') || 'Sign out'}
              >
                <LogOut className="size-3 shrink-0" />
                <span>{t('dashboard.navSignOut') || 'Sign out'}</span>
              </button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
