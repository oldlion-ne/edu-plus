import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router';
import { useAuth } from '../lib/AuthContext';
import { toast } from 'sonner';

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
        isOpen ? '!overflow-visible' : ''
      } ${
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
            <button
              onClick={handleLogout}
              className="font-mono text-xs tracking-widest uppercase text-white/50 hover:text-red-400 transition-colors duration-300 cursor-pointer"
            >
              [ Logout ]
            </button>
          ) : (
            <Link
              to="/login"
              className="font-mono text-xs tracking-widest uppercase text-[#7DF9FF] hover:text-white transition-colors duration-300"
            >
              [ Login ]
            </Link>
          )}

          <Link
            to="/contact"
            className="inline-flex items-center px-5 py-2 text-sm font-sans text-[#7DF9FF] border border-[#7DF9FF] hover:bg-[#7DF9FF] hover:text-[#0B0F14] transition-all duration-300"
          >
            Connect
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none z-50"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span className={`w-5 h-0.5 bg-[#E6EDF3] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
          <span className={`w-5 h-0.5 bg-[#E6EDF3] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-[#E6EDF3] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 mt-[72px]"
        />
      )}

      {/* Mobile Drawer */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden absolute top-[72px] left-0 right-0 bg-[#0B0F14]/95 backdrop-blur-lg border-b border-[#7DF9FF]/10 py-6 px-8 flex flex-col gap-4 z-50">
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
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="text-left font-mono text-lg tracking-wider uppercase text-red-400 hover:text-red-300 transition-colors duration-300 cursor-pointer"
            >
              [ Logout ]
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="font-mono text-lg tracking-wider uppercase text-[#7DF9FF] hover:text-white transition-colors duration-300"
            >
              [ Login ]
            </Link>
          )}

          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center py-2.5 text-center text-sm font-sans text-[#7DF9FF] border border-[#7DF9FF] hover:bg-[#7DF9FF] hover:text-[#0B0F14] transition-all duration-300 mt-2"
          >
            Connect
          </Link>
        </div>
      )}
    </nav>
  );
}

