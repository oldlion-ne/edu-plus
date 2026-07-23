import { Link } from 'react-router';
import { motion } from 'framer-motion';


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

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <span className="font-heading font-bold text-2xl text-foreground tracking-tight">Edu<span className="text-primary font-light">Plus</span></span>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Empowering the next generation through structured, compliant, and progressive educational frameworks.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col gap-4 md:border-l md:border-border md:pl-8">
            <h4 className="font-mono text-[10px] text-primary uppercase tracking-[0.3em]">Platform</h4>
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
            <h4 className="font-mono text-[10px] text-primary uppercase tracking-[0.3em]">Trust & Legal</h4>
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

        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-muted-foreground/60 text-xs text-center md:text-left">
            © {new Date().getFullYear()} EduPlus Skills. All rights reserved.
          </span>

          <div className="flex flex-col md:flex-row items-center justify-center md:justify-end gap-2 text-sm text-muted-foreground mt-4 md:mt-0">
            <span className="flex items-center gap-1.5">
              Fueled by code & coffee <span className="text-base leading-none">☕</span>
            </span>
            <span className="hidden md:inline text-border font-bold mx-1">•</span>
            <span className="flex items-center gap-1.5">
              Crafted by <a href="https://github.com/arra-core" target="_blank" rel="noopener noreferrer" className="text-foreground font-semibold hover:text-primary transition-colors">arra-core</a>
              <span className="text-[10px] tracking-widest uppercase text-muted-foreground/80 font-bold ml-1">(Imphal — New Delhi)</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
