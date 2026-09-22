import { useEffect, useRef, useState } from 'react';
import { motion, type Variants, useReducedMotion } from 'framer-motion';
import { NavLink, Link, useNavigate, useLocation } from 'react-router';
import { useScrollContainer } from '../lib/ScrollContext';
import { useAuth } from '../lib/useAuth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Menu, X, ChevronDown, User, Search } from 'lucide-react';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { GlobalSearch } from '@/components/GlobalSearch';

// ─── Data ──────────────────────────────────────────────────────────────────


const PLATFORM_LINKS = [
  {
    label: 'Learning Portal (LMS)',
    path: '/lms',
    description: 'Interactive curriculum modules, assessments, and council certificates.',
  },
  {
    label: 'Programs',
    path: '/programs',
    description: 'Explore structured learning tracks and certifications.',
  },
  {
    label: 'Knowledge Hub',
    path: '/knowledge-hub',
    description: 'Articles, guides, and curated research resources.',
  },
  {
    label: 'Guidance',
    path: '/guidance',
    description: 'Expert advice and personalised mentoring pathways.',
  },
];

const COMMUNITY_LINKS = [
  {
    label: 'Events',
    path: '/events',
    description: 'Workshops, webinars, and in-person gatherings.',
  },
  {
    label: 'Council',
    path: '/council',
    description: 'Meet the leaders and advisory board shaping EduPlus.',
  },
  {
    label: 'News',
    path: '/news',
    description: 'Latest announcements, press releases, and updates.',
  },
];

// Flat list used by the mobile drawer
const ALL_MOBILE_LINKS = [
  { label: 'About', path: '/about' },
  { label: 'LMS Portal', path: '/lms' },
  { label: 'Programs', path: '/programs' },
  { label: 'Knowledge Hub', path: '/knowledge-hub' },
  { label: 'Guidance', path: '/guidance' },
  { label: 'Events', path: '/events' },
  { label: 'Council', path: '/council' },
  { label: 'News', path: '/news' },
  { label: 'Tracks', path: '/pricing' },
];

const translations = {
  brandName: 'Edu',
  brandPlus: '+',
  platform: 'Platform',
  community: 'Community',
  dashboard: 'Dashboard',
  account: 'Account',
  logout: 'Logout',
  login: 'Login',
  connect: 'Contact',
  themeLabel: 'Theme',
  menuTitle: 'Navigation Menu',
  menuDesc: 'Access site sections and pages.',
};

const translationMap = new Map<string, string>(Object.entries(translations));
const t = (key: keyof typeof translations) => translationMap.get(key) || '';

const logoContainerVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.15 } },
  hover: {}
};

const logoTextVariants: Variants = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const logoPlusVariants: Variants = {
  initial: { opacity: 0, scale: 0.8, rotate: -45 },
  animate: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { rotate: 90, scale: 1.1, transition: { duration: 0.3, ease: 'easeInOut' } }
};

// ─── Sub-components ─────────────────────────────────────────────────────────

/** A single item inside the desktop mega-panel */
function PanelLink({ label, path, description }: { label: string; path: string; description: string }) {
  const location = useLocation();
  const isActive = path === '/' 
    ? location.pathname === '/' 
    : location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <NavLink
      to={path}
      className={`group block px-4 py-3 transition-colors duration-200 border-l-2 ${
        isActive
          ? 'border-primary text-primary bg-primary/5'
          : 'border-transparent text-foreground hover:border-primary hover:text-primary hover:bg-muted/50'
      }`}
    >
      <span className="block text-sm font-medium leading-tight">{label}</span>
      <span className="block text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</span>
    </NavLink>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function Navigation() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);
  const scrollContext = useScrollContainer();

  useEffect(() => {
    const el = scrollContext?.scrollContainerRef.current;

    const handleScroll = () => {
      if (el) {
        setScrolled(el.scrollTop > 50);
      } else {
        setScrolled(window.scrollY > 50);
      }
    };

    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      return () => el.removeEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollContext?.scrollContainerRef.current]);

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
      className={`sticky top-0 left-0 z-50 w-full transition-all duration-500 bg-background/95 ${
        scrolled ? 'border-b border-border/60' : ''
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-8 md:px-14 py-4">

        {/* ── Logo ── */}
        <motion.div
          variants={logoContainerVariants}
          initial={shouldReduceMotion ? false : "initial"}
          animate="animate"
          whileHover={shouldReduceMotion ? undefined : "hover"}
        >
          <Link
            to="/"
            className="flex items-center gap-0 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="EduPlus home"
          >
            <motion.span 
              variants={logoTextVariants}
              className="font-heading font-bold text-xl text-foreground tracking-tight"
            >
              {t('brandName')}
            </motion.span>
            <motion.span 
              variants={logoPlusVariants}
              className="text-primary font-light text-xl origin-center"
            >
              {t('brandPlus')}
            </motion.span>
          </Link>
        </motion.div>

        {/* ── Desktop Navigation ── */}
        <div className="hidden xl:flex items-center gap-1">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-0">

              {/* About */}
              <NavigationMenuItem>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `inline-flex h-9 items-center px-4 text-sm transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
                    }`
                  }
                >
                  About
                </NavLink>
              </NavigationMenuItem>

              {/* Platform dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="h-9 px-4 text-sm font-normal text-foreground/80 hover:text-foreground bg-transparent hover:bg-transparent data-popup-open:bg-transparent data-open:bg-transparent data-open:text-foreground"
                >
                  {t('platform')}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[280px] p-2">
                  <div className="flex flex-col gap-0.5">
                    {PLATFORM_LINKS.map((link) => (
                      <PanelLink key={link.path} {...link} />
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Community dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="h-9 px-4 text-sm font-normal text-foreground/80 hover:text-foreground bg-transparent hover:bg-transparent data-popup-open:bg-transparent data-open:bg-transparent data-open:text-foreground"
                >
                  {t('community')}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[280px] p-2">
                  <div className="flex flex-col gap-0.5">
                    {COMMUNITY_LINKS.map((link) => (
                      <PanelLink key={link.path} {...link} />
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Pricing */}
              <NavigationMenuItem>
                <NavLink
                  to="/pricing"
                  className={({ isActive }) =>
                    `inline-flex h-9 items-center px-4 text-sm transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
                    }`
                  }
                >
                  Pricing
                </NavLink>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* ── Right-side Actions ── */}
        <div className="hidden xl:flex items-center gap-3">

          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center justify-between gap-4 h-9 px-3 border border-border bg-muted/20 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all duration-200 rounded-none w-56 text-sm"
          >
            <div className="flex items-center gap-2">
              <Search className="size-4 shrink-0" />
              <span className="font-sans text-xs">Search...</span>
            </div>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-none border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 uppercase tracking-widest">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <AnimatedThemeToggler />

          {/* Auth: unified account dropdown or login */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1.5 h-9 px-3 text-sm text-foreground/80 hover:text-foreground hover:bg-muted/60 font-normal"
                  aria-label="Account menu"
                >
                  <User className="size-4 shrink-0" />
                  <span className="text-sm">{t('account')}</span>
                  <ChevronDown className="size-3 ml-0.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[160px]">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer w-full">
                    {t('dashboard')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  {t('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              variant="ghost"
              className="h-9 px-3 text-sm font-normal text-foreground/80 hover:text-foreground hover:bg-muted/60"
            >
              <Link to="/login">{t('login')}</Link>
            </Button>
          )}

          {/* Primary CTA */}
          <Button
            asChild
            variant="outline"
            className="h-9 px-5 text-sm font-medium whitespace-nowrap"
          >
            <Link to="/contact">{t('connect')}</Link>
          </Button>

        </div>

        {/* ── Mobile Hamburger ── */}
        <div className="xl:hidden flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center justify-center h-9 w-9 border border-transparent hover:border-border text-muted-foreground hover:text-foreground bg-transparent hover:bg-muted/50 transition-all duration-200 cursor-pointer rounded-none"
            aria-label="Search"
          >
            <Search className="size-4" />
          </button>
          <AnimatedThemeToggler />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="p-2 h-auto"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="bg-background border-b border-border pt-[72px] pb-8 px-8 flex flex-col gap-0 text-left w-full"
            >
              <SheetTitle className="sr-only">{t('menuTitle')}</SheetTitle>
              <SheetDescription className="sr-only">{t('menuDesc')}</SheetDescription>

              {/* Grouped mobile links */}
              <div className="flex flex-col gap-0 mb-4">
                <p className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground mb-2">
                  Navigation
                </p>
                {ALL_MOBILE_LINKS.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `py-2.5 text-base font-sans border-b border-border/30 last:border-b-0 transition-colors duration-200 ${
                        isActive ? 'text-primary font-medium' : 'text-foreground'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              {/* Auth section */}
              <div className="flex flex-col gap-2 pt-4 border-t border-border/40">
                {user ? (
                  <>
                    <NavLink
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `py-2 text-sm font-sans transition-colors duration-200 ${
                          isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                        }`
                      }
                    >
                      {t('dashboard')}
                    </NavLink>
                    <button
                      onClick={() => { setIsOpen(false); handleLogout(); }}
                      className="py-2 text-sm font-sans text-left text-muted-foreground hover:text-destructive transition-colors duration-200"
                    >
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="py-2 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {t('login')}
                  </Link>
                )}

                <Button
                  asChild
                  variant="outline"
                  className="mt-2 text-sm h-10 w-full font-medium"
                >
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    {t('connect')}
                  </Link>
                </Button>
              </div>

            </SheetContent>
          </Sheet>
        </div>

      </div>
      
      <GlobalSearch open={searchOpen} setOpen={setSearchOpen} />
    </nav>
  );
}
