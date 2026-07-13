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
    <div className="min-h-screen bg-background px-5 py-12 flex items-center justify-center">
      <section className="w-full max-w-md border border-border bg-card p-7 md:p-9 rounded-none shadow-sm">
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
