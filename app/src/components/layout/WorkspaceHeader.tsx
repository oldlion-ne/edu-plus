import type { ReactNode } from 'react';

interface WorkspaceHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}

export function WorkspaceHeader({ eyebrow, title, description, actions }: WorkspaceHeaderProps) {
  return (
    <header className="mb-8 grid gap-5 border-b border-border pb-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.035em] text-foreground md:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap gap-2 md:justify-end">{actions}</div> : null}
    </header>
  );
}
