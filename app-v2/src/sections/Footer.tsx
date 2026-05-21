import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="connect"
      className="relative w-full pt-16 pb-6 md:pt-24 md:pb-8 bg-background border-t border-border overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16">

          {/* Brand Column */}
          <div
            className={`md:col-span-5 space-y-6 transition-all duration-1000 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="flex items-center gap-0">
              <span className="font-heading font-bold text-5xl md:text-6xl text-foreground">Edu</span>
              <span className="text-primary font-light text-5xl md:text-6xl">+</span>
            </div>
            <p className="font-sans text-sm text-muted-foreground max-w-sm leading-relaxed">
              Building the definitive global engine for skill engineering, bridging local communities with global education and career networks.
            </p>
          </div>

          {/* Col 2: Navigation Index */}
          <div
            className={`md:col-span-2 md:col-start-7 space-y-4 transition-all duration-1000 delay-150 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              // INDEX
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', to: '/about' },
                { label: 'Programs', to: '/programs' },
                { label: 'Events Hub', to: '/events' },
                { label: 'Newsroom', to: '/news' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="group inline-flex items-center text-sm font-sans text-muted-foreground hover:text-primary transition-all duration-300">
                    <span className="max-w-0 opacity-0 group-hover:max-w-[12px] group-hover:opacity-100 group-hover:mr-1.5 transition-all duration-300 font-mono text-xs text-primary">
                      &gt;
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Engine Pages */}
          <div
            className={`md:col-span-2 space-y-4 transition-all duration-1000 delay-300 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              // ENGINE
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Advisory Council', to: '/council' },
                { label: 'Student Guidance', to: '/guidance' },
                { label: 'Connect Desk', to: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="group inline-flex items-center text-sm font-sans text-muted-foreground hover:text-primary transition-all duration-300">
                    <span className="max-w-0 opacity-0 group-hover:max-w-[12px] group-hover:opacity-100 group-hover:mr-1.5 transition-all duration-300 font-mono text-xs text-primary">
                      &gt;
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Node Locations */}
          <div
            className={`md:col-span-2 space-y-4 transition-all duration-1000 delay-450 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              // NODES
            </h4>
            <div className="space-y-3 text-xs font-sans text-muted-foreground leading-relaxed">
              <p>
                <span className="text-foreground font-medium block">Singapore Hub</span>
                Global Operations
              </p>
              <p>
                <span className="text-foreground font-medium block">Delhi &amp; Manipur</span>
                Regional Enablement
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <Separator className="mb-6" />
        <div
          className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all duration-1000 delay-600 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="font-sans text-xs text-muted-foreground md:w-1/3">
            &copy; {new Date().getFullYear()} Eduplus. All rights reserved.
          </span>

          <div className="flex md:justify-center md:w-1/3">
            <div className="inline-flex items-center gap-2 font-mono text-[9px] text-primary/80 bg-muted border border-border px-3 py-1 select-all">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 bg-primary" />
              </span>
              <span>git commit -m "Mokoro Imphal // Shipped."</span>
            </div>
          </div>

          <span className="font-sans text-xs text-muted-foreground tracking-wider uppercase md:text-right md:w-1/3">
            DESIGNED FOR THE FUTURE OF HUMAN CAPABILITY
          </span>
        </div>
      </div>
    </footer>
  );
}
