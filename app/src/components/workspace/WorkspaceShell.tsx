import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { BookOpen, FileText, Inbox, LayoutDashboard, LogOut, Menu, Users, X } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ContentModule } from './ContentModule';
import { InboxModule } from './InboxModule';
import { KnowledgeModule } from './KnowledgeModule';
import { OverviewModule } from './OverviewModule';
import { PeopleModule } from './PeopleModule';

type Module = 'overview' | 'content' | 'knowledge' | 'inbox' | 'people';

const baseItems = [
  { id: 'overview' as const, label: 'Overview', description: 'Current activity', icon: LayoutDashboard },
  { id: 'content' as const, label: 'Content studio', description: 'Publish and review', icon: FileText },
  { id: 'knowledge' as const, label: 'Knowledge base', description: 'Grounded guidance', icon: BookOpen },
  { id: 'inbox' as const, label: 'Message hub', description: 'Community support', icon: Inbox },
];

export function WorkspaceShell() {
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState<Module>('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = role === 'admin' ? [...baseItems, { id: 'people' as const, label: 'People & access', description: 'Roles and permissions', icon: Users }] : baseItems;
  const activeLabel = items.find((item) => item.id === active)?.label ?? 'Overview';

  const show = () => active === 'content' ? <ContentModule /> : active === 'knowledge' ? <KnowledgeModule /> : active === 'inbox' ? <InboxModule /> : active === 'people' && role === 'admin' ? <PeopleModule /> : <OverviewModule />;
  const logout = async () => { await signOut(); navigate('/', { replace: true }); };

  return (
    <div className="flex h-[100dvh] bg-background text-foreground">
      <aside className={`${mobileOpen ? 'flex' : 'hidden'} fixed inset-0 z-50 w-full flex-col border-r border-border bg-card md:static md:flex md:w-[272px]`}>
        <div className="flex h-[72px] items-center justify-between border-b border-border px-5">
          <Link to="/" className="font-heading text-2xl font-bold tracking-[-0.05em] text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Edu<span className="font-light text-primary">+</span></Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(false)} aria-label="Close workspace navigation"><X className="size-4" /></Button>
        </div>
        <nav aria-label="Workspace navigation" className="space-y-1 p-3">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-current={active === item.id ? 'page' : undefined}
              onClick={() => { setActive(item.id); setMobileOpen(false); }}
              className={`grid min-h-14 w-full grid-cols-[auto_1fr] items-center gap-x-3 border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active === item.id ? 'border-primary bg-primary/10 text-foreground' : 'border-transparent text-muted-foreground hover:border-border hover:bg-muted/60 hover:text-foreground'}`}
            >
              <item.icon className="row-span-2 size-4" />
              <span className="text-sm font-semibold">{item.label}</span>
              <span className="text-[11px] text-muted-foreground">{item.description}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto border-t border-border p-5">
          <div className="flex items-center justify-between gap-3"><p className="truncate text-xs">{user?.email}</p><Badge variant="outline">{role?.replace('_', ' ')}</Badge></div>
          <Button variant="outline" className="mt-4 w-full justify-start gap-2" onClick={logout}><LogOut className="size-4" />Sign out</Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-border px-4 md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open workspace navigation"><Menu className="size-4" /></Button>
            <div><p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Staff workspace</p><p className="truncate text-sm font-medium text-foreground">{activeLabel}</p></div>
          </div>
          <Button asChild variant="ghost" size="sm"><Link to="/">View public site</Link></Button>
        </header>
        <main className="flex-1 overflow-y-auto p-5 md:p-8 xl:p-10"><div className="mx-auto max-w-[1440px]">{show()}</div></main>
      </div>
    </div>
  );
}
