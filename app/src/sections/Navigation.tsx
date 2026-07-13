import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { Menu, X } from 'lucide-react';
import { toast } from 'sonner';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '../lib/AuthContext';

const NAV_LINKS = [
  { label: 'About', path: '/about', priority: true },
  { label: 'Programs', path: '/programs', priority: true },
  { label: 'Knowledge', path: '/knowledge-hub', priority: true },
  { label: 'Events', path: '/events', priority: true },
  { label: 'Council', path: '/council', priority: false },
  { label: 'Guidance', path: '/guidance', priority: false },
  { label: 'News', path: '/news', priority: false },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `relative flex h-[72px] items-center border-b-2 px-1 text-sm font-medium transition-colors ${
    isActive ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
  }`;

export default function Navigation() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully.');
      navigate('/', { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Logout failed.');
    }
  };

  return (
    <nav aria-label="Main navigation" className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center px-5 md:px-8 xl:px-12">
        <Link
          to="/"
          className="mr-8 flex h-full items-center font-heading text-2xl font-bold tracking-[-0.04em] text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Edu<span className="font-light text-primary">+</span>
        </Link>

        <div className="hidden h-full items-center gap-5 md:flex xl:gap-7">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `${linkClass({ isActive })} ${link.priority ? '' : 'hidden xl:flex'}`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm"><Link to="/dashboard">Workspace</Link></Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>Sign out</Button>
            </>
          ) : (
            <Button asChild variant="ghost" size="sm"><Link to="/auth/sign-in">Sign in</Link></Button>
          )}
          <AnimatedThemeToggler />
          <Button asChild variant="raised" size="sm"><Link to="/programs">Start learning</Link></Button>
        </div>

        <div className="ml-auto md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full border-l border-border bg-background px-6 pt-20 sm:max-w-sm">
              <SheetTitle className="font-heading text-2xl">Explore EduPlus</SheetTitle>
              <SheetDescription className="mt-2">Learning, guidance, and community resources.</SheetDescription>
              <div className="mt-8 grid border-t border-border">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `border-b border-border py-4 text-lg font-medium transition-colors ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
              <div className="mt-8 grid gap-3">
                <Button asChild variant="raised"><Link to="/programs" onClick={() => setIsOpen(false)}>Start learning</Link></Button>
                {user ? (
                  <Button variant="outline" onClick={() => { setIsOpen(false); void handleLogout(); }}>Sign out</Button>
                ) : (
                  <Button asChild variant="outline"><Link to="/auth/sign-in" onClick={() => setIsOpen(false)}>Sign in</Link></Button>
                )}
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-border pt-5 text-sm text-muted-foreground">
                <span>Appearance</span><AnimatedThemeToggler />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
