import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router';
import { useAuth } from '../lib/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', path: '/about' },
  { label: 'Programs', path: '/programs' },
  { label: 'Knowledge Hub', path: '/knowledge-hub' },
  { label: 'Events', path: '/events' },
  { label: 'Council', path: '/council' },
  { label: 'Guidance', path: '/guidance' },
  { label: 'News', path: '/news' },
];

export default function Navigation() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully.');
      navigate('/', { replace: true });
    } catch (err: any) {
      toast.error(err.message || 'Logout failed.');
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-background/95 backdrop-blur-md ${
        scrolled ? 'shadow-sm border-b border-border' : ''
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-0">
          <span className="font-heading font-bold text-2xl text-foreground">Edu</span>
          <span className="text-primary font-light text-2xl">+</span>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-sans transition-colors duration-300 relative group ${
                  isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                }`
              }
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
            </NavLink>
          ))}
        </div>

        {/* CTA & Auth Area */}
        <div className="hidden md:flex items-center gap-6">
          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
                  isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                }`
              }
            >
              Dashboard
            </NavLink>
          )}

          {user ? (
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-xs font-mono tracking-widest uppercase text-destructive hover:text-destructive hover:bg-destructive/10 h-auto p-0"
            >
              Logout
            </Button>
          ) : (
            <Button
              asChild
              variant="ghost"
              className="text-xs font-mono tracking-widest uppercase text-primary hover:text-primary hover:bg-primary/10 h-auto p-0"
            >
              <Link to="/login">Login</Link>
            </Button>
          )}

          <Button asChild variant="outline" className="font-sans px-5 py-2 text-sm h-auto">
            <Link to="/contact">Connect</Link>
          </Button>
        </div>

        {/* Mobile Menu via Sheet */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="p-2 h-auto"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="bg-background border-b border-border pt-[80px] pb-8 px-8 flex flex-col gap-4 z-40 text-left w-full"
            >
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-sans transition-colors duration-300 ${
                      isActive ? 'text-primary font-medium' : 'text-foreground'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {user && (
                <NavLink
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-mono tracking-wider uppercase transition-colors duration-300 ${
                      isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              )}

              {user ? (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="justify-start p-0 h-auto text-left font-mono text-lg tracking-wider uppercase text-destructive hover:text-destructive hover:bg-transparent"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  asChild
                  variant="ghost"
                  className="justify-start p-0 h-auto text-left font-mono text-lg tracking-wider uppercase text-primary hover:text-primary hover:bg-transparent"
                >
                  <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                </Button>
              )}

              <Button
                asChild
                variant="outline"
                className="font-sans py-2.5 text-center text-sm w-full mt-2 h-auto"
              >
                <Link to="/contact" onClick={() => setIsOpen(false)}>Connect</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
