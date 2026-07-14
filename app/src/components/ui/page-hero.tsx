import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="pt-40 pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
      <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground mb-6 block">
        {eyebrow}
      </span>
      <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-medium text-foreground tracking-tight leading-[1.15] max-w-3xl mb-8">
        {title}
      </h1>
      <p className="text-[18px] text-muted-foreground leading-relaxed max-w-2xl mb-10">
        {description}
      </p>
      {children}
    </section>
  );
}
