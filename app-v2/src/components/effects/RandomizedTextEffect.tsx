import { useCallback, useEffect, useState, useRef } from 'react';
import { cn } from '../../lib/utils';

const symbols = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*-_+=;:<>,';

interface RandomizedTextEffectProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
}

export default function RandomizedTextEffect({ text, className, triggerOnHover = false }: RandomizedTextEffectProps) {
  const [animatedText, setAnimatedText] = useState(text);
  const isMounted = useRef(true);
  const animationIdRef = useRef<number | null>(null);

  const getRandomChar = useCallback(
    () => symbols[Math.floor(Math.random() * symbols.length)],
    []
  );

  const animateText = useCallback(() => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }

    const revealDuration = 40;
    const initialRandomDuration = 150;
    const startTime = Date.now();

    const tick = () => {
      if (!isMounted.current) return;
      const elapsed = Date.now() - startTime;

      if (elapsed < initialRandomDuration) {
        setAnimatedText(
          text
            .split('')
            .map((char) => (char === ' ' ? ' ' : getRandomChar()))
            .join('')
        );
        animationIdRef.current = requestAnimationFrame(tick);
      } else {
        const revealElapsed = elapsed - initialRandomDuration;
        const revealIndex = Math.floor(revealElapsed / revealDuration);

        if (revealIndex >= text.length) {
          setAnimatedText(text);
          animationIdRef.current = null;
        } else {
          setAnimatedText(
            text.slice(0, revealIndex + 1) +
            text
              .slice(revealIndex + 1)
              .split('')
              .map((char) => (char === ' ' ? ' ' : getRandomChar()))
              .join('')
          );
          animationIdRef.current = requestAnimationFrame(tick);
        }
      }
    };

    animationIdRef.current = requestAnimationFrame(tick);
  }, [text, getRandomChar]);

  useEffect(() => {
    isMounted.current = true;
    animateText();
    return () => {
      isMounted.current = false;
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [text, animateText]);

  return (
    <span 
      className={cn("inline-block", className)}
      onMouseEnter={() => {
        if (triggerOnHover) {
          animateText();
        }
      }}
      data-testid="random-text-span"
    >
      {animatedText}
    </span>
  );
}
