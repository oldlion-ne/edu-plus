import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

interface NordicGridProps extends SVGProps<SVGSVGElement> {
  squareSize?: number;
}

export function NordicGrid({
  squareSize = 40,
  className,
  ...props
}: NordicGridProps) {
  return (
    <svg
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full text-foreground/10',
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <pattern
          id="nordic-grid-pattern"
          width={squareSize}
          height={squareSize}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${squareSize} 0 L 0 0 0 ${squareSize}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#nordic-grid-pattern)" />
    </svg>
  );
}
