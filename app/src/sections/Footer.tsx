import { Link } from 'react-router';

const groups = [
  { title: 'Learning', links: [['Programs', '/programs'], ['Knowledge Hub', '/knowledge-hub'], ['Guidance', '/guidance']] },
  { title: 'Community', links: [['About', '/about'], ['Events', '/events'], ['Council', '/council']] },
  { title: 'Support', links: [['News', '/news'], ['Contact', '/contact'], ['Sign in', '/auth/sign-in']] },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card" aria-label="Site footer">
      <div className="editorial-container py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="font-heading text-3xl font-bold tracking-[-0.05em] text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Edu<span className="font-light text-primary">+</span>
            </Link>
            <p className="mt-5 max-w-sm text-base leading-7 text-muted-foreground">A calmer, more connected learning community—rooted in local identity and open to global possibility.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {groups.map((group) => (
              <section key={group.title} aria-labelledby={`footer-${group.title.toLowerCase()}`}>
                <h2 id={`footer-${group.title.toLowerCase()}`} className="eyebrow text-foreground">{group.title}</h2>
                <ul className="mt-5 space-y-3 text-sm">
                  {group.links.map(([label, href]) => (
                    <li key={href}><Link to={href} className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{label}</Link></li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} EduPlus Skills. All rights reserved.</p>
          <p>Designed for clarity, access, and lifelong learning.</p>
        </div>
      </div>
    </footer>
  );
}
