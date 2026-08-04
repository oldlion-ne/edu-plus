import type { ReactNode } from 'react';

import type { EditorialIllustration } from '@/lib/editorialIllustrations';

import { FadeIn } from '@/components/effects/FadeIn';
import { TypingAnimation } from '@/components/effects/TypingAnimation';

import { EditorialMedia } from './editorial-media';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  /** If provided, replaces the last word of `title` with an animated cycling word. */
  titleSuffixWords?: string[];
  description: string;
  illustration?: EditorialIllustration;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  titleSuffixWords,
  description,
  illustration,
  children,
}: PageHeroProps) {
  // Split the title so the last word can be animated
  const titleWords = title.trim().split(' ');
  const hasValidSuffixWords = titleSuffixWords && titleSuffixWords.length > 0;
  const hasValidPrefix = titleWords.length > 1;
  const titlePrefix = hasValidSuffixWords && hasValidPrefix ? titleWords.slice(0, -1).join(' ') : null;

  return (
    <section className="relative w-full overflow-hidden border-b border-border/50 bg-background pt-8">
      <div className="mx-auto max-w-[1440px]">
        <div
          className={
            illustration
              ? 'relative z-10 grid min-h-[55vh] lg:grid-cols-[55fr_45fr]'
              : 'relative z-10 mx-auto flex min-h-[50vh] max-w-4xl items-center justify-center'
          }
        >
        <div
          className={`flex w-full flex-col justify-start px-8 pt-10 pb-16 md:px-12 lg:px-24 lg:pt-16 lg:pb-24 ${illustration ? '' : 'items-center text-center'}`}
        >
          <div className={`max-w-lg ${illustration ? '' : 'mx-auto'}`}>
            <FadeIn delay={0.1}>
              <span className="mb-5 block text-[10px] font-medium uppercase tracking-[0.3em] text-primary">
                {eyebrow}
              </span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 
                className="mb-6 text-3xl font-medium leading-[1.15] tracking-tight text-foreground md:text-4xl lg:text-5xl"
                aria-label={title}
              >
                {titleSuffixWords && titlePrefix ? (
                  <>
                    {/* Line 1: static — never moves */}
                    <span className="block">{titlePrefix}</span>
                    {/* Line 2: reserved height = 1 line at current font size so the
                        layout NEVER shifts regardless of which word is typed */}
                    <span className="block min-h-[1.15em]">
                      <TypingAnimation
                        words={titleSuffixWords}
                        className="text-primary"
                        typeSpeed={80}
                        deleteSpeed={45}
                        pauseDelay={2000}
                        delay={800}
                        loop
                      />
                    </span>
                  </>
                ) : (
                  title
                )}
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="mb-10 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                {description}
              </p>
            </FadeIn>
            {children ? (
              <FadeIn delay={0.4}>
                <div
                  className={`flex flex-col gap-3 sm:flex-row ${illustration ? 'items-start' : 'items-center justify-center'}`}
                >
                  {children}
                </div>
              </FadeIn>
            ) : null}
          </div>
        </div>
        {illustration ? (
          <FadeIn delay={0.3} className="flex w-full items-center justify-center border-t border-border/30 bg-muted/5 px-6 pb-16 pt-8 md:px-10 md:pb-20 lg:border-l lg:border-t-0 lg:px-14 lg:pb-24 lg:pt-14">
            <EditorialMedia
              asset={illustration}
              priority
              frameClassName="max-w-xl"
            />
          </FadeIn>
        ) : null}
        </div>
      </div>
    </section>
  );
}
