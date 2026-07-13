import type { ReactNode } from 'react';
import { Link } from 'react-router';

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthLayout({ title, description, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-2">
      <aside className="relative hidden min-h-screen overflow-hidden border-r border-border bg-card lg:block">
        <img src="/images/HomeHeroVisual.webp" alt="East Asian learners sharing ideas in a calm learning space" className="absolute inset-0 size-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/65 to-background/10" />
        <div className="relative z-10 flex min-h-screen flex-col justify-end p-12 xl:p-16">
          <p className="eyebrow">Welcome to EduPlus</p>
          <h2 className="mt-4 max-w-lg font-heading text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-foreground">Built for the East Asian learning community</h2>
          <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">Secure access to learning resources, event registrations, and the staff workspace.</p>
        </div>
      </aside>
      <div className="flex min-h-screen items-center justify-center px-5 py-12 lg:px-10">
      <section className="surface-raised w-full max-w-md p-7 md:p-9">
        <Link to="/" className="inline-flex text-xl font-bold text-foreground hover:text-primary focus:outline-none focus:ring-1 focus:ring-primary">
          Edu<span className="text-primary font-light">+</span>
        </Link>
        <div className="mt-8 mb-7">
          <p className="text-xs uppercase tracking-[0.16em] text-primary mb-2">Secure account</p>
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{description}</p>
        </div>
        {children}
        {footer && <div className="mt-7 pt-5 border-t border-border text-sm text-muted-foreground">{footer}</div>}
      </section>
      </div>
    </div>
  );
}

export function AuthError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div role="alert" className="border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive rounded-none">
      {message}
    </div>
  );
}
