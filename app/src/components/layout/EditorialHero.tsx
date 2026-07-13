import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type EditorialHeroLayout = 'split' | 'offset' | 'poster';

interface EditorialHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  imageAlt: string;
  layout?: EditorialHeroLayout;
  actions?: ReactNode;
  proof?: ReactNode;
  className?: string;
}

const layoutClasses: Record<EditorialHeroLayout, { shell: string; copy: string; media: string }> = {
  split: {
    shell: 'lg:grid-cols-12 lg:items-stretch',
    copy: 'lg:col-span-5 lg:py-24',
    media: 'lg:col-span-7 lg:min-h-[620px]',
  },
  offset: {
    shell: 'lg:grid-cols-12 lg:items-end',
    copy: 'lg:col-span-7 lg:pb-24 lg:pr-12',
    media: 'lg:col-span-5 lg:min-h-[680px]',
  },
  poster: {
    shell: 'lg:grid-cols-12 lg:items-end',
    copy: 'lg:col-span-8 lg:pb-20',
    media: 'lg:col-span-4 lg:min-h-[600px]',
  },
};

export function EditorialHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  layout = 'split',
  actions,
  proof,
  className,
}: EditorialHeroProps) {
  const classes = layoutClasses[layout];

  return (
    <header
      data-testid="editorial-hero"
      data-layout={layout}
      className={cn('relative overflow-hidden border-b border-border bg-background pt-20', className)}
    >
      <div className={cn('editorial-container grid min-h-[640px] gap-10 py-10 lg:gap-0 lg:py-0', classes.shell)}>
        <div className={cn('relative z-10 flex flex-col justify-end', classes.copy)}>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-title mt-5 max-w-[11ch] text-balance text-foreground">{title}</h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">{description}</p>
          {actions ? <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div> : null}
          {proof ? <div className="mt-10 border-l-2 border-primary pl-4 text-sm text-muted-foreground">{proof}</div> : null}
        </div>

        <figure className={cn('relative min-h-[340px] overflow-hidden border border-border bg-muted', classes.media)}>
          <img src={image} alt={imageAlt} className="absolute inset-0 size-full object-cover" />
          <span aria-hidden className="absolute left-0 top-0 h-12 w-px bg-primary" />
          <span aria-hidden className="absolute left-0 top-0 h-px w-12 bg-primary" />
          <span aria-hidden className="absolute bottom-0 right-0 h-12 w-px bg-primary" />
          <span aria-hidden className="absolute bottom-0 right-0 h-px w-12 bg-primary" />
        </figure>
      </div>
    </header>
  );
}
