import { Link } from 'react-router';

const links = [
  { title: 'About',       href: '/about'    },
  { title: 'Programs',    href: '/programs' },
  { title: 'Events',      href: '/events'   },
  { title: 'Council',     href: '/council'  },
  { title: 'Guidance',    href: '/guidance' },
  { title: 'News',        href: '/news'     },
  { title: 'Contact',     href: '/contact'  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap justify-between gap-6">
          <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
            © {new Date().getFullYear()} EduPlus Skills. All rights reserved.
          </span>
          <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-muted-foreground hover:text-primary block duration-150 transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
