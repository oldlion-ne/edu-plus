import { useEffect, useRef, useState } from 'react';

interface TypeScrambleProps {
  text: string;
  className?: string;
  delay?: number;
}

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#&*()-+=';

export default function TypeScramble({ text, className = '', delay = 0 }: TypeScrambleProps) {
  const elRef = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started || !elRef.current) return;

    const el = elRef.current;
    let iterations = 0;

    const interval = setInterval(() => {
      let output = '';
      for (let i = 0; i < text.length; i++) {
        if (i < iterations) {
          output += text[i];
        } else {
          output += LETTERS[Math.floor(Math.random() * LETTERS.length)];
        }
      }
      el.innerText = output;
      iterations += 1 / 3;

      if (iterations >= text.length) {
        el.innerText = text;
        clearInterval(interval);
      }
    }, 33);

    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      <span ref={elRef} className="scramble-glow" aria-hidden="true">
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
