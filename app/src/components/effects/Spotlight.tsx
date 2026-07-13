import { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
}

interface SpotlightItemProps {
  children: React.ReactNode;
  className?: string;
}

interface SpotlightContextType {
  mouseX: number | null;
  mouseY: number | null;
  setMousePos: (x: number | null, y: number | null) => void;
}

const SpotlightContext = createContext<SpotlightContextType | undefined>(undefined);

export const Spotlight = ({ children, className }: SpotlightProps) => {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [mouseY, setMouseY] = useState<number | null>(null);

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    setMouseX(e.clientX);
    setMouseY(e.clientY);
  };

  const handleGlobalMouseLeave = () => {
    setMouseX(null);
    setMouseY(null);
  };

  const setMousePos = useCallback((x: number | null, y: number | null) => {
    setMouseX(x);
    setMouseY(y);
  }, []);

  return (
    <SpotlightContext.Provider value={{ mouseX, mouseY, setMousePos }}>
      <div 
        className={cn("relative z-10", className)}
        onMouseMove={handleGlobalMouseMove}
        onMouseLeave={handleGlobalMouseLeave}
        data-testid="spotlight-container"
      >
        {children}
      </div>
    </SpotlightContext.Provider>
  );
};

export const SpotLightItem = ({ children, className }: SpotlightItemProps) => {
  const context = useContext(SpotlightContext);
  const mouseX = context?.mouseX ?? null;
  const mouseY = context?.mouseY ?? null;
  const cardRef = useRef<HTMLDivElement>(null);
  const [localMouse, setLocalMouse] = useState<{ x: number; y: number } | null>(null);
  const [globalMouse, setGlobalMouse] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setLocalMouse({ x, y });
  };

  useEffect(() => {
    if (mouseX !== null && mouseY !== null && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setGlobalMouse({
        x: mouseX - rect.left,
        y: mouseY - rect.top
      });
    } else {
      setGlobalMouse(null);
    }
  }, [mouseX, mouseY]);

  const hasGlobalMouse = globalMouse !== null;
  const borderX = globalMouse ? globalMouse.x : 0;
  const borderY = globalMouse ? globalMouse.y : 0;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setLocalMouse(null)}
      className={cn(
        "relative rounded-lg p-[1.5px] bg-border/30 overflow-hidden transition-colors duration-300",
        className
      )}
      data-testid="spotlight-item"
    >
      {/* Spotlight highlight layer */}
      {localMouse && (
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-lg transition duration-300 opacity-100"
          style={{
            background: `radial-gradient(180px circle at ${localMouse.x}px ${localMouse.y}px, oklch(var(--primary) / 0.12), transparent 80%)`
          }}
        />
      )}
      {/* Spotlight border glow layer */}
      {hasGlobalMouse && (
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-lg"
          style={{
            background: `radial-gradient(220px circle at ${borderX}px ${borderY}px, oklch(var(--primary) / 0.22), transparent 80%)`
          }}
        />
      )}
      <div className="relative z-20 h-full w-full bg-card rounded-lg">
        {children}
      </div>
    </div>
  );
};
