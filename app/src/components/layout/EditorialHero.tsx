import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EditorialHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  imageAlt: string;
  actions?: ReactNode;
  proof?: ReactNode;
  className?: string;
}

/**
 * EditorialHero — Nordic Lagom standard hero layout.
 *
 * Grid: 7/12 copy | 5/12 image (md+)
 * Image: flush to section boundary, no border box
 * Typography: display-title at restrained scale, eyebrow label above
 */
export function EditorialHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  actions,
  proof,
  className,
}: EditorialHeroProps) {
  return (
    <header
      data-testid="editorial-hero"
      className={cn(
        'relative overflow-hidden border-b border-border bg-background pt-[72px]',
        className,
      )}
    >
      {/* Outer: full-width, no horizontal padding — let the grid columns handle alignment */}
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 md:grid-cols-12">

        {/* Copy column — left-aligned, 7/12 at md+ */}
        <div className="flex flex-col justify-center px-6 py-12 md:col-span-7 md:px-10 md:py-16 lg:px-16 lg:py-20">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-title mt-4 max-w-[20ch] text-foreground">
            {title}
          </h1>
          <p className="mt-4 max-w-[48ch] text-base leading-7 text-muted-foreground md:mt-5 md:text-[1.0625rem] md:leading-8">
            {description}
          </p>
          {actions ? (
            <div className="mt-6 flex flex-wrap items-center gap-3">{actions}</div>
          ) : null}
          {proof ? (
            <div className="mt-8 border-l-2 border-primary pl-4 text-sm text-muted-foreground">
              {proof}
            </div>
          ) : null}
        </div>

        {/* Image column — right side, 5/12 at md+, flush to section boundary */}
        <figure className="relative min-h-[18rem] self-stretch md:col-span-5 md:min-h-0">
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 size-full object-cover object-center"
          />
          {/* Architectural corner accents — amber, top-left and bottom-right */}
          <span aria-hidden className="absolute left-0 top-0 h-10 w-px bg-primary" />
          <span aria-hidden className="absolute left-0 top-0 h-px w-10 bg-primary" />
          <span aria-hidden className="absolute bottom-0 right-0 h-10 w-px bg-primary" />
          <span aria-hidden className="absolute bottom-0 right-0 h-px w-10 bg-primary" />
        </figure>
      </div>
    </header>
  );
}
