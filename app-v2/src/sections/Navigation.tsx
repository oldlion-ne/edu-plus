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
      toast.success('[SESSION TERMINATED]', {
        description: 'You have logged out successfully.',
        style: { background: '#0E131A', border: '1px solid #7DF9FF', color: '#E6EDF3', borderRadius: '0px' }
      });
      navigate('/', { replace: true });
    } catch (err: any) {
      toast.error('LOGOUT_ERROR', {
        description: err.message || 'Logout failed.',
        style: { borderRadius: '0px' }
      });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'liquid-glass-strong backdrop-blur-md shadow-lg border-b border-[#7DF9FF]/10' : 'liquid-glass'
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-0">
          <span className="font-heading font-bold text-2xl text-[#E6EDF3]">Edu</span>
          <span className="text-[#7DF9FF] font-light text-2xl">+</span>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-sans transition-colors duration-300 relative group ${
                  isActive ? 'text-[#7DF9FF]' : 'text-[#E6EDF3] hover:text-[#7DF9FF]'
                }`
              }
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#7DF9FF] transition-all duration-300 group-hover:w-full" />
            </NavLink>
          ))}
        </div>

        {/* CTA & Auth Area */}
        <div className="hidden md:flex items-center gap-6">
          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `font-mono text-xs tracking-widest uppercase transition-all duration-300 relative group ${
                  isActive ? 'text-[#7DF9FF]' : 'text-[#E6EDF3] hover:text-[#7DF9FF]'
                }`
              }
            >
              [ Dashboard ]
            </NavLink>
          )}

          {user ? (
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="rounded-none font-mono text-xs tracking-widest uppercase text-white/50 hover:text-red-400 hover:bg-transparent transition-colors duration-300 cursor-pointer h-auto p-0"
            >
              [ Logout ]
            </Button>
          ) : (
            <Button
              asChild
              variant="ghost"
              className="rounded-none font-mono text-xs tracking-widest uppercase text-[#7DF9FF] hover:text-white hover:bg-transparent transition-colors duration-300 h-auto p-0"
            >
              <Link to="/login">[ Login ]</Link>
            </Button>
          )}

          <Button
            asChild
            variant="outline"
            className="rounded-none border-[#7DF9FF] text-[#7DF9FF] hover:bg-[#7DF9FF] hover:text-[#0B0F14] bg-transparent font-sans px-5 py-2 text-sm h-auto transition-all duration-300"
          >
            <Link to="/contact">Connect</Link>
          </Button>
        </div>

        {/* Mobile Menu via Sheet */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="p-2 h-auto text-[#E6EDF3] hover:bg-transparent hover:text-[#7DF9FF]"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="bg-[#0B0F14]/95 backdrop-blur-lg border-b border-[#7DF9FF]/10 pt-[80px] pb-8 px-8 flex flex-col gap-4 z-40 text-left w-full rounded-none"
            >
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-sans transition-colors duration-300 ${
                      isActive ? 'text-[#7DF9FF] font-medium' : 'text-[#E6EDF3]'
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
                      isActive ? 'text-[#7DF9FF] font-medium' : 'text-white/70'
                    }`
                  }
                >
                  [ Dashboard ]
                </NavLink>
              )}

              {user ? (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="justify-start rounded-none p-0 h-auto text-left font-mono text-lg tracking-wider uppercase text-red-400 hover:text-red-300 hover:bg-transparent transition-colors duration-300 cursor-pointer"
                >
                  [ Logout ]
                </Button>
              ) : (
                <Button
                  asChild
                  variant="ghost"
                  className="justify-start rounded-none p-0 h-auto text-left font-mono text-lg tracking-wider uppercase text-[#7DF9FF] hover:text-white hover:bg-transparent transition-colors duration-300"
                >
                  <Link to="/login" onClick={() => setIsOpen(false)}>[ Login ]</Link>
                </Button>
              )}

              <Button
                asChild
                variant="outline"
                className="rounded-none border-[#7DF9FF] text-[#7DF9FF] hover:bg-[#7DF9FF] hover:text-[#0B0F14] bg-transparent font-sans py-2.5 text-center text-sm w-full transition-all duration-300 mt-2 h-auto"
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

