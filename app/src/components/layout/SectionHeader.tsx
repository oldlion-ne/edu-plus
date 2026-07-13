import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: 'start' | 'center';
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, action, align = 'start', className }: SectionHeaderProps) {
  return (
    <div className={cn('grid gap-6 border-t border-border pt-6 md:grid-cols-12', align === 'center' && 'text-center', className)}>
      <div className={cn('md:col-span-8', align === 'center' && 'md:col-start-3')}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="section-title mt-3 text-balance text-foreground">{title}</h2>
        {description ? <div className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{description}</div> : null}
      </div>
      {action ? <div className="flex items-start md:col-span-4 md:justify-end">{action}</div> : null}
    </div>
  );
}
