import type { ReactNode } from 'react';

interface BulletListProps {
  children: ReactNode;
  className?: string;
}

export function BulletList({ children, className = '' }: BulletListProps) {
  return <ul className={`flex flex-col gap-4 ${className}`}>{children}</ul>;
}

interface BulletItemProps {
  children: ReactNode;
  className?: string;
}

export function BulletItem({ children, className = '' }: BulletItemProps) {
  return (
    <li className={`text-[15px] text-foreground flex items-start gap-3 ${className}`}>
      <span className="mt-2 w-1 h-1 bg-primary rounded-none shrink-0" />
      {children}
    </li>
  );
}
