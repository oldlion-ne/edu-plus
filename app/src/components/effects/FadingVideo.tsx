import React, { useEffect, useRef } from 'react';

interface FadingVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  className?: string;
  targetOpacity?: number;
}

export default function FadingVideo({
  src,
  className,
  targetOpacity = 0.55,
  ...props
}: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const fadingOutRef = useRef<boolean>(false);

  const FADE_MS = 500;
  const FADE_OUT_LEAD = 0.55;

  const fadeTo = (target: number, duration: number) => {
    const video = videoRef.current;
    if (!video) return;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    const startOpacity = parseFloat(video.style.opacity) || 0;
    const startTime = performance.now();

    const animateFade = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentOpacity = startOpacity + (target - startOpacity) * easeProgress;
      video.style.opacity = currentOpacity.toString();

      if (progress < 1) {
        rafIdRef.current = requestAnimationFrame(animateFade);
      } else {
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(animateFade);
  };

  const handleLoadedData = () => {
    const video = videoRef.current;
    if (!video) return;
    video.style.opacity = "0";
    video.play().catch(err => console.error("Error playing video:", err));
    fadeTo(targetOpacity, FADE_MS);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const remaining = video.duration - video.currentTime;
    if (!fadingOutRef.current && remaining <= FADE_OUT_LEAD && remaining > 0) {
      fadingOutRef.current = true;
      fadeTo(0, FADE_MS);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = "0";
    setTimeout(() => {
      if (!video) return;
      video.currentTime = 0;
      video.play()
        .then(() => {
          fadingOutRef.current = false;
          fadeTo(targetOpacity, FADE_MS);
        })
        .catch(err => console.error("Error replaying video:", err));
    }, 100);
  };

  // Safety net: if video is already cached and loadeddata fired before mount
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 2) {
      video.style.opacity = "0";
      video.play().catch(err => console.error("Error playing cached video:", err));
      fadeTo(targetOpacity, FADE_MS);
    }

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      onLoadedData={handleLoadedData}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleEnded}
      className={className}
      style={{ opacity: 0 }} /* ui-ignore */
      {...props}
    />
  );
}
