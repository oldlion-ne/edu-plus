import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { BookOpen, FileText, Inbox, LayoutDashboard, LogOut, Menu, Users, X } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { Button } from '../ui/button';
import { ContentModule } from './ContentModule';
import { InboxModule } from './InboxModule';
import { KnowledgeModule } from './KnowledgeModule';
import { OverviewModule } from './OverviewModule';
import { PeopleModule } from './PeopleModule';

type Module = 'overview' | 'content' | 'knowledge' | 'inbox' | 'people';
const baseItems = [
  { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard },
  { id: 'content' as const, label: 'Content studio', icon: FileText },
  { id: 'knowledge' as const, label: 'Knowledge base', icon: BookOpen },
  { id: 'inbox' as const, label: 'Message hub', icon: Inbox },
];

export function WorkspaceShell() {
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState<Module>('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = role === 'admin' ? [...baseItems, { id: 'people' as const, label: 'People & access', icon: Users }] : baseItems;
  const show = () => active === 'content' ? <ContentModule /> : active === 'knowledge' ? <KnowledgeModule /> : active === 'inbox' ? <InboxModule /> : active === 'people' && role === 'admin' ? <PeopleModule /> : <OverviewModule />;
  const logout = async () => { await signOut(); navigate('/', { replace: true }); };
  return (
    <div className="flex h-[100dvh] bg-background text-foreground">
      <aside className={`${mobileOpen ? 'flex' : 'hidden'} fixed inset-0 z-50 w-full flex-col border-r border-border bg-card p-5 md:static md:flex md:w-64`}>
        <div className="flex items-center justify-between border-b border-border pb-5"><Link to="/" className="font-heading text-xl font-semibold text-primary" /* ui-ignore */>EduPlus</Link><Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(false)}><X className="size-4" /></Button></div>
        <nav className="mt-6 space-y-2">{items.map((item) => <button /* ui-ignore */ key={item.id} type="button" onClick={() => { setActive(item.id); setMobileOpen(false); }} className={`flex w-full items-center gap-3 border px-3 py-3 text-left text-sm transition-colors ${active === item.id ? 'border-primary bg-primary/10 text-primary' : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'}`}><item.icon className="size-4" />{item.label}</button>)}</nav>
        <div className="mt-auto border-t border-border pt-5"><p className="truncate text-xs">{user?.email}</p><p className="mt-1 font-mono text-[9px] uppercase text-primary">{role?.replace('_', ' ')}</p><Button variant="outline" className="mt-4 w-full justify-start gap-2" onClick={logout}><LogOut className="size-4" />Sign out</Button></div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col"><header className="flex h-16 items-center justify-between border-b border-border px-5 md:px-8"><Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(true)}><Menu className="size-4" /></Button><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Secure staff workspace</p><Button asChild variant="ghost"><Link to="/" /* ui-ignore */>View site</Link></Button></header><main className="flex-1 overflow-y-auto p-5 md:p-10">{show()}</main></div>
    </div>
  );
}
