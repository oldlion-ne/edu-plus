import { useEffect, useRef, useState } from 'react';

interface TourStep {
  targetId: string;
  title: string;
  text: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: 'nav-roles',
    title: 'Telemetry Access Matrix',
    text: 'Switch authorized profiles instantly using this developer simulator. Explore layout access for Admin, Educator, and Resource Persons.',
  },
  {
    targetId: 'tab-overview',
    title: 'Diagnostics & Analytics',
    text: 'Track real-time content volumes, load statistics, active chatbot factual matrices, and system telemetry from a high-level viewport.',
  },
  {
    targetId: 'tab-uploader',
    title: 'Content Uploader',
    text: 'Upload and categorize online webinars, tutorials, or study materials. Authorized roles can update content nodes instantly.',
  },
  {
    targetId: 'tab-ai-matrix',
    title: 'AI Cognitive Knowledge Grid',
    text: 'Train the Edu+ AI Cognitive Advisor. Add custom facts or specific QA points that compile dynamically into chatbot core prompts.',
  },
  {
    targetId: 'tab-messages',
    title: 'Sonar Message Terminal',
    text: 'Sync and read messages sent from the Contact page. Real-time sonar channels alert you instantly when a new inquiry pings.',
  },
];

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const PADDING = 10; // px clearance around the highlighted element

export default function DashboardOnboardingTour({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const currentStep = TOUR_STEPS[stepIndex];

  // ── Measure target element ──────────────────────────────────────────────────
  useEffect(() => {
    function measure() {
      const el = document.getElementById(currentStep.targetId);
      if (!el) {
        setRect(null);
        return;
      }
      const r = el.getBoundingClientRect();
      setRect({
        top:    r.top    - PADDING,
        left:   r.left   - PADDING,
        width:  r.width  + PADDING * 2,
        height: r.height + PADDING * 2,
      });
    }

    const t = setTimeout(measure, 80);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [stepIndex, currentStep.targetId]);

  // ── Tooltip placement - prefer below, fall back to above ───────────────────
  function tooltipStyle(): React.CSSProperties {
    if (!rect) return { top: '50%', left: '50%', transform: 'translate(-50%,-50%)' };

    const TW = 300; // tooltip width
    const GAP = 14;
    const VP_W = window.innerWidth;
    const VP_H = window.innerHeight;

    const below = rect.top + rect.height + GAP;
    const above = rect.top - GAP - 220; // estimated tooltip height

    const top  = below + 220 < VP_H ? below : Math.max(8, above);
    const left = Math.max(8, Math.min(VP_W - TW - 8, rect.left));

    return { top, left, width: TW };
  }

  const handleNext = () => {
    if (stepIndex < TOUR_STEPS.length - 1) {
      setStepIndex((p) => p + 1);
    } else {
      localStorage.setItem('edu_plus_onboarding_completed', 'true');
      onComplete();
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex((p) => p - 1);
  };

  const handleSkip = () => {
    localStorage.setItem('edu_plus_onboarding_completed', 'true');
    onComplete();
  };

  // ── SVG spotlight mask ──────────────────────────────────────────────────────
  // Strategy: render a full-viewport SVG with a rectangle cut out over the
  // target element. The cut-out is transparent; everything else is the dark
  // overlay. This guarantees the target element is ALWAYS clearly visible.
  const VW = typeof window !== 'undefined' ? window.innerWidth  : 1440;
  const VH = typeof window !== 'undefined' ? window.innerHeight : 900;

  return (
    <div className="fixed inset-0 z-[98] pointer-events-none">

      {/* ── SVG overlay with spotlight cutout ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ display: 'block' }} /* ui-ignore */
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="spotlight-mask">
            {/* White = visible (the overlay shows here) */}
            <rect width={VW} height={VH} fill="white" />
            {/* Black = transparent (the cutout - target element shows through) */}
            {rect && (
              <rect
                x={rect.left}
                y={rect.top}
                width={rect.width}
                height={rect.height}
                fill="black"
                rx="2"
              />
            )}
          </mask>
        </defs>

        {/* Dark overlay applied only where mask is white */}
        <rect
          width={VW}
          height={VH}
          fill="rgba(0,0,0,0.72)"
          mask="url(#spotlight-mask)"
        />

        {/* Highlight border around cutout */}
        {rect && (
          <rect
            x={rect.left}
            y={rect.top}
            width={rect.width}
            height={rect.height}
            fill="none"
            stroke="oklch(var(--primary))"
            strokeWidth="1.5"
            rx="0"
            style={{
              filter: 'drop-shadow(0 0 6px oklch(var(--primary) / 0.7))',
            }}
          />
        )}
      </svg>

      {/* ── Tooltip card (pointer-events-auto so buttons work) ── */}
      <div
        ref={tooltipRef}
        className="fixed z-[100] bg-card border border-border shadow-2xl pointer-events-auto"
        style={tooltipStyle()}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-border">
          <span
            className="w-1.5 h-1.5 bg-primary shrink-0"
            style={{ boxShadow: '0 0 6px oklch(var(--primary) / 0.8)' }} /* ui-ignore */
          />
          <span className="font-heading text-sm font-semibold text-foreground leading-none">
            {currentStep.title}
          </span>
          <span className="ml-auto font-sans text-xs font-medium text-muted-foreground shrink-0">
            {stepIndex + 1} / {TOUR_STEPS.length}
          </span>
        </div>

        {/* Body */}
        <p className="px-4 py-3 text-[13px] text-muted-foreground leading-relaxed min-h-[56px]">
          {currentStep.text}
        </p>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 pb-2">
          {TOUR_STEPS.map((_, i) => (
            <span
              key={i}
              className="w-1 h-1 rounded-none transition-all duration-300"
              style={{
                background: i === stepIndex
                  ? 'oklch(var(--primary))'
                  : 'oklch(var(--primary) / 0.25)',
              }}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 pb-4 pt-2 border-t border-border">
          <button /* ui-ignore */
            type="button"
            onClick={handleSkip}
            className="text-xs font-sans font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Skip Tour
          </button>
          <div className="flex gap-2">
            {stepIndex > 0 && (
              <button /* ui-ignore */
                type="button"
                onClick={handleBack}
                className="px-4 py-2 border border-border hover:border-foreground hover:text-foreground transition-all text-xs font-medium font-sans cursor-pointer rounded-none"
              >
                Previous
              </button>
            )}
            <button /* ui-ignore */
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all text-xs font-sans cursor-pointer rounded-none"
            >
              {stepIndex === TOUR_STEPS.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
