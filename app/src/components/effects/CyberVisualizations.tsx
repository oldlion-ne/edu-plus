import { useState, useRef } from 'react';

// Reusable MagicCard component from Magic UI style, completely borderless and sharp-lined
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
      className={`relative w-full ${heightClass} overflow-hidden bg-[#0E131A] rounded-none shadow-2xl transition-all duration-300 select-none border-0`}
    >
      {/* Background Magic Glow Spotlight */}
      {hovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300 opacity-40 z-0 w-80 h-80 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" /* ui-ignore */
          style={{
            left: `${coords.x}px`,
            top: `${coords.y}px`,
            background: 'radial-gradient(circle, rgba(125,249,255,0.2) 0%, rgba(125,249,255,0) 70%)',
            filter: 'blur(30px)'
          }}
        />
      )}

      {/* Content wrapper with deep backdrop blur and zero borders */}
      <div className="relative w-full h-full z-10 bg-[#0E131A]/90 p-6 flex flex-col justify-between">
        {/* Subtle dot matrix grid pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ 
               backgroundImage: `radial-gradient(circle, #7DF9FF 1px, transparent 1px)`, 
               backgroundSize: '16px 16px' 
             }} 
         />
        {children}
      </div>
    </div>
  );
}


