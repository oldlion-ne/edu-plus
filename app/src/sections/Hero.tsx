import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import RandomizedTextEffect from '../components/effects/RandomizedTextEffect';
import ScrollTextMarquee from '../components/effects/ScrollTextMarquee';

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      id="story"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://res.cloudinary.com/don7nlsnp/video/upload/v1779208942/hero-bg_dlyb9f.mp4"
      />

      {/* Sleek Dark Vignette & Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at center, rgba(11, 15, 20, 0.3) 0%, rgba(11, 15, 20, 0.7) 100%),
            linear-gradient(to bottom, rgba(11, 15, 20, 0.6) 0%, transparent 40%, rgba(11, 15, 20, 0.9) 100%)
          `
        }}
      />

      {/* Parallax Scroll Marquee background watermark */}
      <div className="absolute inset-x-0 bottom-24 z-[1] pointer-events-none">
        <ScrollTextMarquee text="BUILDING • REDEFINING • REDIRECTION • MOBILIZING" baseSpeed={-300} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 text-center">
        {/* Soft Radial Neon Glow behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#7DF9FF]/8 rounded-none blur-[110px] pointer-events-none z-0" />

        {/* Subtitle */}
        <div
          className={`mb-6 transition-all duration-1000 relative z-10 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-xs md:text-sm font-sans font-semibold tracking-[0.4em] uppercase text-[#7DF9FF]">
            <RandomizedTextEffect text="Eduplus" triggerOnHover />
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light leading-[1.05] tracking-tight mb-8 relative z-10">
          <span className="block text-[#E6EDF3]">
            {'Shaping '}
            <RandomizedTextEffect
              text="tomorrow"
              className="text-[#7DF9FF] font-heading"
            />
          </span>
        </h1>

        {/* Body */}
        <p
          className={`max-w-xl mx-auto text-base md:text-lg font-sans text-[#E6EDF3]/85 leading-relaxed mb-12 transition-all duration-1000 delay-500 relative z-10 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          We are building a global network of innovators, educators, and visionaries
          to redefine human capability.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-700 relative z-10 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#7DF9FF] text-[#0B0F14] font-sans font-semibold text-sm tracking-wide hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(125,249,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.45)]"
          >
            Start a Chat
          </Link>
          <Link
            to="/about"
            className="liquid-glass inline-flex items-center justify-center px-8 py-3.5 text-[#E6EDF3] font-sans font-medium text-sm tracking-wide hover:text-[#7DF9FF] hover:border-[#7DF9FF]/40 transition-all duration-300"
          >
            Explore Now
          </Link>
        </div>
      </div>

      {/* Bottom Right Tag */}
      <div
        className={`absolute bottom-8 right-6 md:right-12 z-10 transition-all duration-1000 delay-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="border border-[#7DF9FF]/25 bg-[#0B0F14]/70 backdrop-blur-md px-5 py-3 shadow-[0_0_15px_rgba(125,249,255,0.08)]">
          <span className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-[#7DF9FF]">
            Investing. Building. Advisory.
          </span>
        </div>
      </div>

      {/* Bottom Edge Gradient for Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0B0F14] to-transparent z-[2] pointer-events-none" />
    </section>
  );
}
