import { useEffect, useState } from 'react';

interface ImmersiveHeroProps {
  bgImage: string;
  category: string;
  titleNormal: string;
  titleHighlighted: string;
  description: string;
  telemetryLeft?: string;
  telemetryRight?: string;
  children?: React.ReactNode;
}

export default function ImmersiveHero({
  bgImage,
  category,
  titleNormal,
  titleHighlighted,
  description,
  telemetryLeft,
  telemetryRight,
  children
}: ImmersiveHeroProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[60vh] min-h-[460px] md:h-[65vh] overflow-hidden bg-[#0B0F14] border-b border-[#7DF9FF]/10 select-none group">
      {/* Parallax Background Layer */}
      <div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none transition-transform duration-1200 ease-out group-hover:scale-[1.03]"
        style={{
          transform: `translateY(${scrollY * 0.4}px)`,
        }}
      >
        <img 
          src={bgImage} 
          alt="Storytelling Background Illustration" 
          className="w-full h-full object-cover" 
        />
        {/* Double Gradient Mask Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F14]/80 via-[#0B0F14]/45 to-[#0B0F14]" />
        {/* Horizontal Gradient Mask Layer - Left-heavy to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F14] via-[#0B0F14]/80 to-[#0B0F14]/10 backdrop-blur-[1px]" />
      </div>

      {/* Retro Dot Matrix Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-1 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #7DF9FF 1px, transparent 1px)', 
          backgroundSize: '18px 18px' 
        }} 
      />

      {/* Holographic Scanline noise overlay */}
      <div 
        className="absolute inset-0 z-2 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(125, 249, 255, 0.1) 50%, rgba(0, 0, 0, 0.4) 50%)', 
          backgroundSize: '100% 4px' 
        }} 
      />

      {/* Canvas Widget Slot */}
      {children && (
        <div className="absolute inset-0 z-3">
          {children}
        </div>
      )}

      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col justify-between py-12 md:py-16">
        {/* Bottom spacer replaced or top spacing element */}
        <div />

        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-sans font-medium tracking-[0.3em] uppercase text-[#7DF9FF] block drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
            {category}
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-light leading-tight tracking-tight text-[#E6EDF3] mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {titleNormal} <span className="text-[#7DF9FF] font-medium">{titleHighlighted}</span>
          </h1>
          <p className="text-[#E6EDF3]/85 text-sm md:text-base max-w-2xl leading-relaxed font-sans drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            {description}
          </p>
        </div>

        {/* Telemetry Corner Footers */}
        <div className="flex justify-between items-end text-[9px] font-mono text-[#E6EDF3]/45 pt-6 border-t border-white/[0.04]">
          <span>{telemetryLeft || "SYSTEM_ACTIVE_NODES // OK"}</span>
          <span>{telemetryRight || "UTC_COORDINATES_ACTIVE"}</span>
        </div>
      </div>
    </div>
  );
}
