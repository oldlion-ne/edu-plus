import React from 'react';
import { cn } from '@/lib/utils';

type As = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export type KineticTextProps = React.HTMLAttributes<HTMLElement> & {
  text: string;
  as?: As;
};

export function KineticText({
  text,
  as: Tag = 'h1',
  className = '',
  style,
  ...rest
}: KineticTextProps) {
  const mergedStyle = {
    '--text-stroke-width': 'calc(1em * 125 / 6000)',
    ...style,
  } as React.CSSProperties;

  const letters = text.split('');

  const children = (
    <>
      {letters.map((letter, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block [will-change:font-weight,transform] [transition:font-weight_0.4s,transform_0.4s] hover:scale-110 hover:font-[900] has-[+span+span:hover]:font-[400] has-[+span:hover]:scale-105 has-[+span:hover]:font-[600] [:hover+&]:scale-105 [:hover+&]:font-[600] [:hover+span+&]:font-[400]"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </>
  );

  return React.createElement(
    Tag,
    {
      ...rest,
      className: cn('flex flex-wrap font-[300]', className),
      style: mergedStyle,
    } as any,
    children
  );
}
