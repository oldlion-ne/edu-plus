import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export interface AnimatedListProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedList = React.memo(
  ({ className, children, delay = 1000 }: AnimatedListProps) => {
    const [index, setIndex] = useState(0);
    // Memoize the children array so it doesn't recalculate unnecessarily
    const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

    useEffect(() => {
      if (index < childrenArray.length - 1) {
        const timeout = setTimeout(() => {
          setIndex((prevIndex) => prevIndex + 1);
        }, delay);
        return () => clearTimeout(timeout);
      }
    }, [index, delay, childrenArray.length]);

    const itemsToShow = useMemo(() => {
      return childrenArray.slice(0, index + 1);
    }, [index, childrenArray]);

    return (
      <div className={`rounded-none ${className || ""}`}>
        <AnimatePresence>
          {itemsToShow.map((item, i) => (
            <AnimatedListItem key={(item as any).key || String(i)}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  },
);

AnimatedList.displayName = "AnimatedList";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0.95, opacity: 0, y: 10 },
    animate: { scale: 1, opacity: 1, y: 0, originY: 0 },
    exit: { scale: 0.95, opacity: 0, y: -10 },
    transition: { type: "spring" as const, stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout className="w-full">
      {children}
    </motion.div>
  );
}
