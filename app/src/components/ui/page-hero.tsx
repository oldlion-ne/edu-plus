import type { ReactNode } from 'react';

import type { EditorialIllustration } from '@/lib/editorialIllustrations';

import { EditorialMedia } from './editorial-media';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  illustration?: EditorialIllustration;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  illustration,
  children,
}: PageHeroProps) {
  return (
    <section className="w-full border-b border-border/50 bg-background pt-12">
      <div
        className={
          illustration
            ? 'grid min-h-[75vh] lg:grid-cols-[55fr_45fr]'
            : 'mx-auto flex min-h-[65vh] max-w-4xl items-center justify-center'
        }
      >
        <div
          className={`flex w-full flex-col justify-center px-8 py-16 md:px-12 lg:px-24 lg:py-24 ${illustration ? '' : 'items-center text-center'}`}
        >
          <div className={`max-w-lg ${illustration ? '' : 'mx-auto'}`}>
            <span className="mb-5 block text-[10px] font-medium uppercase tracking-[0.3em] text-primary">
              {eyebrow}
            </span>
            <h1 className="mb-6 text-3xl font-medium leading-[1.15] tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mb-10 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              {description}
            </p>
            {children ? (
              <div
                className={`flex flex-col gap-3 sm:flex-row ${illustration ? 'items-start' : 'items-center justify-center'}`}
              >
                {children}
              </div>
            ) : null}
          </div>
        </div>
        {illustration ? (
          <div className="flex w-full items-center justify-center border-t border-border/30 bg-muted/5 px-6 pb-16 pt-8 md:px-10 md:pb-20 lg:border-l lg:border-t-0 lg:px-14 lg:pb-24 lg:pt-14">
            <EditorialMedia
              asset={illustration}
              priority
              frameClassName="max-w-xl"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
