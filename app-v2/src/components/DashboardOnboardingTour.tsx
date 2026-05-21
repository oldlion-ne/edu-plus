import { useEffect, useState } from 'react';

interface TourStep {
  targetId: string;
  title: string;
  text: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: 'nav-roles',
    title: 'TELEMETRY ACCESS MATRIX',
    text: 'Switch authorized profiles instantly using this developer simulator. Explore layout access for Admin, Educator, and Resource Persons.'
  },
  {
    targetId: 'tab-overview',
    title: 'DIAGNOSTICS & ANALYTICS',
    text: 'Track real-time content volumes, load statistics, active chatbot factual matrices, and system telemetry from a high-level viewport.'
  },
  {
    targetId: 'tab-uploader',
    title: 'CONTENT UPLOADER',
    text: 'Upload and categorize online webinars, tutorials, or study materials. Authorized roles can update content nodes instantly.'
  },
  {
    targetId: 'tab-ai-matrix',
    title: 'AI COGNITIVE KNOWLEDGE GRID',
    text: 'Train the Edu+ AI Cognitive Advisor. Add custom facts or specific QA points that compile dynamically into chatbot core prompts.'
  },
  {
    targetId: 'tab-messages',
    title: 'SONAR MESSAGE TERMINAL',
    text: 'Sync and read messages sent from the Contact page. Real-time sonar channels alert you instantly when a new inquire pings.'
  }
];

export default function DashboardOnboardingTour({ onComplete }: { onComplete: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [boxStyle, setBoxStyle] = useState<React.CSSProperties>({ display: 'none' });

  const currentStep = TOUR_STEPS[stepIndex];

  useEffect(() => {
    function calculatePosition() {
      const element = document.getElementById(currentStep.targetId);
      if (!element) {
        setBoxStyle({ display: 'none' });
        return;
      }

      const rect = element.getBoundingClientRect();
      setBoxStyle({
        position: 'fixed',
        top: rect.top - 8,
        left: rect.left - 8,
        width: rect.width + 16,
        height: rect.height + 16,
        border: '2px solid hsl(var(--primary))',
        boxShadow: '0 0 18px hsl(var(--primary)/0.6), inset 0 0 8px hsl(var(--primary)/0.3)',
        transition: 'all 0.3s ease-in-out',
        zIndex: 99,
        pointerEvents: 'none'
      });
    }

    // Wait slightly to let DOM render
    const timer = setTimeout(calculatePosition, 100);
    window.addEventListener('resize', calculatePosition);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [stepIndex]);

  const handleNext = () => {
    if (stepIndex < TOUR_STEPS.length - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      localStorage.setItem('edu_plus_onboarding_completed', 'true');
      onComplete();
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('edu_plus_onboarding_completed', 'true');
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[98] pointer-events-auto">
      {/* Dark Screen Matrix */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />

      {/* Cyberpunk Highlight Box */}
      <div style={boxStyle} className="rounded-none animate-pulse" />

      {/* floating Instruction Guidance Card */}
      <div
        className="fixed z-[100] w-[320px] bg-card border border-border p-5 rounded-none shadow-[0_0_20px_rgba(0,0,0,0.8)] text-card-foreground transition-all duration-300 font-sans"
        style={{
          top: boxStyle.top ? Number(boxStyle.top) + Number(boxStyle.height) + 16 : '40%',
          left: boxStyle.left ? Math.max(16, Math.min(window.innerWidth - 336, Number(boxStyle.left))) : '50%'
        }}
      >
        <div className="flex items-center gap-1.5 mb-2 border-b border-border pb-2">
          <span className="w-1.5 h-1.5 bg-primary shadow-[0_0_6px_hsl(var(--primary))]"></span>
          <span className="font-mono text-[9px] font-bold tracking-widest text-primary">
            {currentStep.title} (STEP {stepIndex + 1}/{TOUR_STEPS.length})
          </span>
        </div>

        <p className="text-[11px] leading-relaxed mb-4 text-muted-foreground min-h-[44px]">
          {currentStep.text}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <button
            onClick={handleSkip}
            className="text-[9px] font-mono text-muted-foreground hover:text-foreground cursor-pointer uppercase"
          >
            [ SKIP TOUR ]
          </button>
          <div className="flex gap-2">
            {stepIndex > 0 && (
              <button
                onClick={handleBack}
                className="px-2.5 py-1 bg-muted border border-border hover:border-foreground hover:text-foreground transition-all duration-200 text-[9px] font-mono rounded-none cursor-pointer"
              >
                PREV
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-3 py-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-all duration-200 text-[9px] font-mono rounded-none cursor-pointer"
            >
              {stepIndex === TOUR_STEPS.length - 1 ? 'COMPLETE' : 'NEXT'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
