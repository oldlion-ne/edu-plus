import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router';
import { useAuth } from '../lib/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';

const NAV_LINKS = [
  { label: 'About', path: '/about' },
  { label: 'Programs', path: '/programs' },
  { label: 'Council', path: '/council' },
  { label: 'Resources', path: '/resources' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Connect', path: '/connect' },
];

const translations = {
  brandName: "Edu",
  brandPlus: "+",
  dashboard: "Dashboard",
  logout: "Logout",
  login: "Login",
  connect: "Connect",
  themeLabel: "Theme",
  menuTitle: "Navigation Menu",
  menuDesc: "Access site sections and pages.",
};

const translationMap = new Map<string, string>(Object.entries(translations));
const t = (key: keyof typeof translations) => translationMap.get(key) || '';

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
        <Link to="/" className="flex items-center gap-0 hover:text-primary focus:outline-none focus:text-primary">
          <span className="font-heading font-bold text-2xl text-foreground">{t('brandName')}</span>
          <span className="text-primary font-light text-2xl">{t('brandPlus')}</span>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink /* ui-ignore */
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
          {user ? (
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-xs font-mono tracking-widest uppercase text-destructive hover:text-destructive hover:bg-destructive/10 h-auto p-0"
            >
              {t('logout')}
            </Button>
          ) : (
            <NavLink /* ui-ignore */
              to="/login"
              className={({ isActive }) =>
                `font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
                  isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                }`
              }
            >
              {t('login')}
            </NavLink>
          )}

          <AnimatedThemeToggler />
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
              className="bg-background border-b border-border pt-[80px] pb-8 px-8 flex flex-col gap-4 text-left w-full"
            >
              <SheetTitle className="sr-only">{t('menuTitle')}</SheetTitle>
              <SheetDescription className="sr-only">{t('menuDesc')}</SheetDescription>
              {NAV_LINKS.map((link) => (
                <NavLink /* ui-ignore */
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

              {user ? (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="justify-start p-0 h-auto text-left font-mono text-lg tracking-wider uppercase text-destructive hover:text-destructive hover:bg-transparent"
                >
                  {t('logout')}
                </Button>
              ) : (
                <NavLink /* ui-ignore */
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-mono tracking-wider uppercase transition-colors duration-300 ${
                      isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                    }`
                  }
                >
                  {t('login')}
                </NavLink>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-border/40 mt-2">
                <span className="text-sm text-muted-foreground font-sans">{t('themeLabel')}</span>
                <AnimatedThemeToggler />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
