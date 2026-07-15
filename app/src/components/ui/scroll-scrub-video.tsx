import { useEffect, useRef, useState } from 'react';
import { useScrollContainer } from '../../lib/ScrollContext';

interface ScrollScrubVideoProps {
  src: string;
  className?: string;
  scrollFactor?: number; // how fast scroll progresses video (defaults to 1.5 viewport heights)
  children?: React.ReactNode;
}

export function ScrollScrubVideo({ src, className = '', scrollFactor = 1.5, children }: ScrollScrubVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollContext = useScrollContainer();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Math references for lerping
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);

  // Load video via Blob so it's fully seekable on all servers
  useEffect(() => {
    let active = true;
    fetch(src)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
        return r.blob();
      })
      .then((blob) => {
        if (active) {
          const url = URL.createObjectURL(blob);
          setVideoUrl(url);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load scroll-scrub video:', err);
      });

    return () => {
      active = false;
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [src]);

  // Scroll listener and RequestAnimationFrame lerp loop
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let animId: number;
    const scrollContainer = scrollContext?.scrollContainerRef?.current || window;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollHeight = container.clientHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      // Calculate progress relative to container viewport entry
      const topOffset = -rect.top;
      const progress = Math.min(Math.max(topOffset / scrollHeight, 0), 1);
      
      const duration = video.duration || 1;
      targetTimeRef.current = progress * (duration - 0.05); // slightly subtract to prevent end-of-file stall

      // Apply fade out and translation to overlay text as we scroll
      if (overlayRef.current) {
        const fadeProgress = Math.min(progress / 0.4, 1); // Fades completely by 40% scroll
        overlayRef.current.style.opacity = (1 - fadeProgress).toString();
        overlayRef.current.style.transform = `translateY(${-progress * 15}vh)`;
        overlayRef.current.style.pointerEvents = fadeProgress > 0.85 ? 'none' : 'auto';
      }
    };

    const updateFrame = () => {
      if (video.seeking) {
        // Coalesce seeks: wait for the decoder to resolve the last frame seek
        animId = requestAnimationFrame(updateFrame);
        return;
      }

      const diff = targetTimeRef.current - currentTimeRef.current;
      if (Math.abs(diff) > 0.001) {
        // Smoothly interpolate playhead (lerp)
        currentTimeRef.current += diff * 0.15;
        try {
          video.currentTime = currentTimeRef.current;
        } catch (e) {
          // ignore transient seek errors
        }
      }

      animId = requestAnimationFrame(updateFrame);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    animId = requestAnimationFrame(updateFrame);

    // Initial triggers
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, [videoUrl, scrollContext?.scrollContainerRef?.current]);

  // Prime video on iOS touch events to avoid blank frames
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const primeVideo = () => {
      try {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              video.pause();
            })
            .catch(() => {});
        }
      } catch (e) {}
    };

    window.addEventListener('touchstart', primeVideo, { once: true, passive: true });
    window.addEventListener('pointerdown', primeVideo, { once: true, passive: true });

    return () => {
      window.removeEventListener('touchstart', primeVideo);
      window.removeEventListener('pointerdown', primeVideo);
    };
  }, [videoUrl]);

  return (
    <div
      ref={containerRef}
      style={{ height: `${scrollFactor * 100}vh` }}
      className={`relative w-full overflow-visible ${className}`}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background text-muted-foreground text-sm font-medium tracking-wide uppercase">
            Loading Pathway...
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              src={videoUrl || undefined}
              muted
              playsInline
              className="w-full h-full object-cover rounded-none"
            />
            {children && (
              <div 
                ref={overlayRef}
                className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none transition-all duration-75"
              >
                {children}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
