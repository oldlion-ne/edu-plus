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
    shell: 'md:grid-cols-12 md:items-stretch',
    copy: 'md:col-span-5 md:py-12 md:pr-6 lg:py-16 lg:pr-8',
    media: 'md:col-span-7 md:min-h-[32rem] lg:min-h-[34rem]',
  },
  offset: {
    shell: 'md:grid-cols-12 md:items-end',
    copy: 'md:col-span-7 md:pb-12 md:pr-6 lg:pb-16 lg:pr-8',
    media: 'md:col-span-5 md:min-h-[34rem] lg:min-h-[36rem]',
  },
  poster: {
    shell: 'md:grid-cols-12 md:items-end',
    copy: 'md:col-span-8 md:pb-12 md:pr-6 lg:pb-16 lg:pr-8',
    media: 'md:col-span-4 md:min-h-[30rem] lg:min-h-[32rem]',
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
      className={cn('relative overflow-hidden border-b border-border bg-background pt-[72px]', className)}
    >
      <div className={cn('editorial-container grid min-h-0 gap-8 py-8 sm:gap-10 sm:py-10 md:gap-0 md:py-0', classes.shell)}>
        <div className={cn('relative z-10 flex flex-col justify-end', classes.copy)}>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-title mt-5 max-w-[11ch] text-balance text-foreground">{title}</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground md:mt-6 md:text-lg md:leading-8">{description}</p>
          {actions ? <div className="mt-6 flex flex-wrap items-center gap-3 md:mt-7">{actions}</div> : null}
          {proof ? <div className="mt-7 border-l-2 border-primary pl-4 text-sm text-muted-foreground md:mt-8">{proof}</div> : null}
        </div>

        <figure className={cn('relative min-h-[18rem] overflow-hidden border border-border bg-muted sm:min-h-[22rem]', classes.media)}>
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
