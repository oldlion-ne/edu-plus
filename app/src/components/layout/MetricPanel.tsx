import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MetricPanelProps {
  label: string;
  value: ReactNode;
  context?: string;
  tone?: 'default' | 'accent';
  className?: string;
}

export function MetricPanel({ label, value, context, tone = 'default', className }: MetricPanelProps) {
  return (
    <section
      aria-label={label}
      className={cn('surface-base min-h-40 p-5', tone === 'accent' && 'border-primary/50 bg-primary/5', className)}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
      <p className="mt-5 font-heading text-4xl font-semibold tracking-[-0.04em] text-foreground">{value}</p>
      {context ? <p className="mt-4 border-t border-border pt-3 text-xs leading-5 text-muted-foreground">{context}</p> : null}
    </section>
  );
}
