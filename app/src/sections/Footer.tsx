import { Link } from 'react-router';

import { GridPattern } from '@/components/magicui/GridPattern';

const links = [
  { title: 'About',       href: '/about'    },
  { title: 'Programs',    href: '/programs' },
  { title: 'Council',     href: '/council'  },
  { title: 'Resources',   href: '/resources' },
  { title: 'Pricing',     href: '/pricing'  },
  { title: 'Connect',     href: '/connect'  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-background py-12 overflow-hidden">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className="[mask-image:linear-gradient(to_bottom,white,transparent,transparent)]"
      />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap justify-between gap-6">
          <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
            © {new Date().getFullYear()} EduPlus Skills. All rights reserved.
          </span>
          <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
            {links.map((link) => (
              <Link key={link.href} to={link.href} className="text-muted-foreground hover:text-primary focus:outline-none focus:text-primary block duration-150 transition-colors">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
