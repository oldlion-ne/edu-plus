
import { motion, type HTMLMotionProps } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";

interface AuroraTextProps extends Omit<HTMLMotionProps<"span">, "className" | "style"> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

export function AuroraText({
  className,
  children,
  as: Component = "span",
  ...props
}: AuroraTextProps) {
  const MotionComponent = React.useMemo(() => motion.create(Component as any), [Component]);

  return (
    // eslint-disable-next-line react-hooks/static-components
    <MotionComponent
      className={cn(
        "text-primary font-bold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
