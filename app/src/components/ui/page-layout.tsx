import React from 'react';
import { cn } from '../../lib/utils';
import { BlurFade } from './blur-fade';

// ─── CONTAINERS ─────────────────────────────────────────────────────────────

export const PageSection = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(
        "relative w-full py-20 md:py-32 lg:py-40 bg-background border-t border-border/50 first:border-none",
        className
      )}
      {...props}
    />
  )
);
PageSection.displayName = "PageSection";

export const PageContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("max-w-[1440px] mx-auto px-6 md:px-12 relative z-10", className)}
      {...props}
    />
  )
);
PageContainer.displayName = "PageContainer";


// ─── TYPOGRAPHY ─────────────────────────────────────────────────────────────

export const Heading = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("text-3xl sm:text-4xl lg:text-5xl font-light text-foreground tracking-tight leading-[1.2]", className)}
      {...props}
    />
  )
);
Heading.displayName = "Heading";

export const Subheading = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-[16px] text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  )
);
Subheading.displayName = "Subheading";

export const Eyebrow = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-[10px] md:text-[11px] font-mono tracking-[0.3em] uppercase text-primary mb-4 block", className)}
      {...props}
    />
  )
);
Eyebrow.displayName = "Eyebrow";


// ─── ANIMATION WRAPPERS ─────────────────────────────────────────────────────

interface AnimatedHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function AnimatedHeader({ eyebrow, title, description, align = 'left', className, ...props }: AnimatedHeaderProps) {
  return (
    <div className={cn("mb-16", align === 'center' && "text-center mx-auto", className)} {...props}>
      {eyebrow && (
        <BlurFade delay={0.15} inView>
          <Eyebrow>{eyebrow}</Eyebrow>
        </BlurFade>
      )}
      <BlurFade delay={0.2} inView>
        <Heading className={align === 'center' ? "mx-auto" : ""}>{title}</Heading>
      </BlurFade>
      {description && (
        <BlurFade delay={0.25} inView>
          <Subheading className={cn("mt-4 max-w-[55ch]", align === 'center' && "mx-auto")}>
            {description}
          </Subheading>
        </BlurFade>
      )}
    </div>
  );
}
