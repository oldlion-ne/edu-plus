import { Link } from 'react-router';
import type { UserRole } from '../../lib/useAuth';
import type { DashboardTab } from '../../pages/Dashboard';
import { useTranslation } from '../../i18n/useTranslation';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  UploadCloud,
  Cpu,
  Settings,
  FileImage,
  Inbox,
  ShieldCheck,
  LogOut,
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
          'w-full justify-start gap-3 px-3 py-2 font-sans text-xs font-medium',
          'transition-colors duration-150 rounded-none border-l-2 h-auto',
          isActive
            ? 'border-primary bg-primary/5 text-primary'
            : 'border-transparent text-muted-foreground hover:border-primary/30 hover:text-foreground hover:bg-muted/30',
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
        {/* Brand row */}
        <div className="flex items-center justify-between px-5 py-4">
          <Link
            to="/"
            className="flex items-baseline gap-0 hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/70 group-data-[collapsible=icon]:hidden"
          >
            <span className="font-heading font-bold text-lg text-foreground leading-none">
              {t('dashboard.brand')}
            </span>
            <span className="text-primary font-light text-lg leading-none">
              {t('dashboard.brandPlus')}
            </span>
            <span className="font-sans text-[8px] text-muted-foreground tracking-widest uppercase ml-2">
              {t('dashboard.brandSuffix')}
            </span>
          </Link>
          <SidebarTrigger className="text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors rounded-none h-7 w-7" />
        </div>

        {/* User identity badge — hidden when collapsed to icon */}
        <button
          onClick={onProfileClick}
          className="group/user w-full flex items-center gap-3 px-4 py-3 border-t border-border hover:bg-muted/20 transition-colors text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/70 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
          aria-label="Open profile settings"
        >
          <Avatar className="size-7 border border-border/60 rounded-none shrink-0">
            <AvatarImage src={profileAvatar} className="rounded-none object-cover" />
            <AvatarFallback className="bg-muted text-muted-foreground font-sans text-[10px] rounded-none">
              {profileName.substring(0, 2).toUpperCase() || 'AD'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="text-xs font-medium text-foreground truncate leading-tight">
              {profileName || 'Administrator'}
            </p>
            <p className="text-[10px] text-muted-foreground truncate leading-tight mt-0.5">
              {userEmail}
            </p>
          </div>
          {selectedRole && selectedRole !== 'none' && (
            <Badge variant="role" className="shrink-0 group-data-[collapsible=icon]:hidden">
              {ROLE_LABELS[selectedRole] ?? selectedRole}
            </Badge>
          )}
        </button>
      </SidebarHeader>

      {/* ── Navigation ──────────────────────────────────────────── */}
      <SidebarContent className="py-3 overflow-y-auto gap-0">
        {/* Group: System */}
        <SidebarGroup className="px-2 pb-0">
          <SidebarGroupLabel className="font-heading text-[10px] uppercase font-bold text-muted-foreground/60 tracking-wider px-1 mb-1 h-auto">
            {t('dashboard.navGroupSystem') || 'System'}
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarNavItem
              id="tab-overview"
              icon={LayoutDashboard}
              label={t('dashboard.navOverview') || 'Overview'}
              tabKey="overview"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {hasPermission(['admin']) && (
              <SidebarNavItem
                id="tab-users"
                icon={ShieldCheck}
                label={t('dashboard.navUsers') || 'User Management'}
                tabKey="users"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            )}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator className="mx-4 my-3 bg-border/50" />

        {/* Group: Knowledge Hub CMS */}
        <SidebarGroup className="px-2 pb-0">
          <SidebarGroupLabel className="font-heading text-[10px] uppercase font-bold text-muted-foreground/60 tracking-wider px-1 mb-1 h-auto">
            {t('dashboard.navGroupKnowledge') || 'Knowledge Hub CMS'}
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarNavItem
              id="tab-uploader"
              icon={UploadCloud}
              label={t('dashboard.navResourceManager') || 'Resource Manager'}
              tabKey="uploader"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <SidebarNavItem
              id="tab-ai-matrix"
              icon={Cpu}
              label={t('dashboard.navAiGuidelines') || 'AI Guidelines'}
              tabKey="ai-matrix"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator className="mx-4 my-3 bg-border/50" />

        {/* Group: Assets & Inbox */}
        <SidebarGroup className="px-2 pb-0">
          <SidebarGroupLabel className="font-heading text-[10px] uppercase font-bold text-muted-foreground/60 tracking-wider px-1 mb-1 h-auto">
            {t('dashboard.navGroupAssets') || 'Assets & Inbox'}
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarNavItem
              id="tab-media"
              icon={FileImage}
              label={t('dashboard.navMediaLibrary') || 'Media Library'}
              tabKey="media"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <SidebarNavItem
              id="tab-inbox"
              icon={Inbox}
              label={t('dashboard.navInbox') || 'Inbox & Chat Logs'}
              tabKey="inbox"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              badge={unreadMessagesCount}
            />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer: Settings + Actions ───────────────────────────── */}
      <SidebarFooter className="border-t border-border p-2 gap-1">
        <SidebarMenu>
          <SidebarNavItem
            id="tab-settings"
            icon={Settings}
            label={t('dashboard.navSecurity') || 'Security & MFA'}
            tabKey="settings"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
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
