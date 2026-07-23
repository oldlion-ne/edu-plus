import React from 'react';
import { cn } from '../../lib/utils';
import { BlurFade } from './blur-fade';

interface InvisibleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  inView?: boolean;
}

export const InvisibleCard = React.forwardRef<HTMLDivElement, InvisibleCardProps>(
  ({ className, children, delay = 0.25, inView = true, ...props }, ref) => {
    
    const CardContent = (
      <div
        ref={ref}
        className={cn(
          "group relative flex flex-col items-start p-8 md:p-10 bg-transparent transition-colors duration-200 hover:bg-secondary h-full overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Amber accent hover line */}
        <div className="absolute top-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-700 ease-out" />
        {children}
      </div>
    );

    // If no animation delay is provided, or we explicitly don't want to animate
    if (delay === 0) {
      return CardContent;
    }

    return (
      <BlurFade delay={delay} inView={inView} className="h-full">
        {CardContent}
      </BlurFade>
    );
  }
);
InvisibleCard.displayName = "InvisibleCard";

export const InvisibleCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-6 flex w-full flex-col gap-1.5", className)} {...props} />
  )
);
InvisibleCardHeader.displayName = "InvisibleCardHeader";

export const InvisibleCardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-[20px] font-medium text-foreground leading-snug", className)}
      {...props}
    />
  )
);
InvisibleCardTitle.displayName = "InvisibleCardTitle";

export const InvisibleCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-[15px] text-muted-foreground leading-relaxed flex-1", className)}
      {...props}
    />
  )
);
InvisibleCardDescription.displayName = "InvisibleCardDescription";
