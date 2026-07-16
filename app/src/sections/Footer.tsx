import { Link } from 'react-router';
import { GridPattern } from '@/components/magicui/GridPattern';

const navLinks = [
  { title: 'About',       href: '/about'    },
  { title: 'Programs',    href: '/programs' },
  { title: 'Council',     href: '/council'  },
  { title: 'Resources',   href: '/resources' },
  { title: 'Pricing',     href: '/pricing'  },
  { title: 'Connect',     href: '/connect'  },
];

const legalLinks = [
  { title: 'Terms of Service', href: '/legal#terms' },
  { title: 'Privacy Policy',   href: '/legal#privacy' },
  { title: 'Cookie Policy',    href: '/legal#cookies' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-background pt-16 pb-16 overflow-x-clip font-sans">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className="[mask-image:linear-gradient(to_bottom,white,transparent,transparent)]"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <span className="font-heading font-bold text-2xl text-foreground tracking-tight">Edu<span className="text-primary font-light">Plus</span></span>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Empowering the next generation through structured, compliant, and progressive educational frameworks.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col gap-4 md:border-l md:border-border md:pl-8">
            <h4 className="font-mono text-[10px] text-foreground uppercase tracking-widest font-bold">Platform</h4>
            <ul className="flex flex-col gap-3 p-0 m-0 list-none">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-muted-foreground text-sm hover:text-primary focus:outline-none focus:text-primary transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col gap-4 md:border-l md:border-border md:pl-8">
            <h4 className="font-mono text-[10px] text-foreground uppercase tracking-widest font-bold">Trust & Legal</h4>
            <ul className="flex flex-col gap-3 p-0 m-0 list-none">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-muted-foreground text-sm hover:text-primary focus:outline-none focus:text-primary transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-muted-foreground/60 text-xs text-center md:text-left">
            © {new Date().getFullYear()} EduPlus Skills. All rights reserved.
          </span>
          <div className="flex gap-4">
            {/* Optional social icons or status link could go here. For now just standard footer balancing */}
            <span className="text-muted-foreground/40 font-mono text-[9px] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary block"></span>
              System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
