import { useState, useRef } from 'react';

export function MagicCard({ children, heightClass = "h-[280px] md:h-[340px]" }: { children: React.ReactNode; heightClass?: string }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative w-full ${heightClass} overflow-hidden bg-card rounded-none shadow-md transition-all duration-300 select-none border border-border`}
    >
      {/* Background Magic Glow Spotlight */}
      {hovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300 opacity-40 z-0 w-80 h-80 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${coords.x}px`,
            top: `${coords.y}px`,
            background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
            filter: 'blur(30px)',
            opacity: 0.15,
          }}
        />
      )}

      {/* Content wrapper */}
      <div className="relative w-full h-full z-10 bg-card/90 p-6 flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
