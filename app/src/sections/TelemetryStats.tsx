import { BookOpen, Globe, MessageCircle, TrendingUp } from 'lucide-react'
import DottedMap from 'dotted-map'

// ── Inline logo ──────────────────────────────────────────────────────────────
const Logo = ({ className }: { className?: string }) => (
  <span
    className={`font-sans font-bold text-[8px] text-foreground flex items-center justify-center leading-none ${className}`}
  >
    E<span className="text-primary font-light">+</span>
  </span>
)

// ── Dotted world map ─────────────────────────────────────────────────────────
const map = new DottedMap({ height: 55, grid: 'diagonal' })
const points = map.getPoints()

const Map = () => (
  <svg
    viewBox="0 0 120 60"
    className="w-full h-auto text-muted-foreground/35 bg-[oklch(var(--background))]"
    aria-label="Dotted World Map showing global learner reach"
  >
    {points.map((point, index) => (
      <circle key={index} cx={point.x} cy={point.y} r={0.15} fill="currentColor" />
    ))}
  </svg>
)

// ── Milestone stats shown in the bottom panel ────────────────────────────────
const MILESTONES = [
  { value: '4,200+', label: 'Active Learners' },
  { value: '38',     label: 'Countries Reached' },
  { value: '98%',    label: 'Placement Rate' },
  { value: '1.2M+',  label: 'Learning Hours' },
]

// ── Section ──────────────────────────────────────────────────────────────────
export default function TelemetryStats() {
  return (
    <section
      id="telemetry"
      className="relative w-full px-4 py-16 md:py-32 bg-background overflow-hidden"
    >
      <div className="mx-auto grid max-w-5xl border border-border md:grid-cols-2 bg-card/10 backdrop-blur-sm">

        {/* ── Left panel: Global learner reach ── */}
        <div className="border-b border-border md:border-b-0">
          <div className="p-6 sm:p-12">
            <span className="text-muted-foreground flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
              <Globe className="size-4 text-primary" />
              Global learner reach
            </span>

            <p className="mt-8 text-2xl font-light text-foreground leading-snug">
              Learners from 38 countries - every timezone, one platform.
            </p>
          </div>

          {/* Map with location pill */}
          <div
            aria-hidden="true"
            className="relative h-60 flex items-center justify-center overflow-hidden border-t border-border"
          >
            {/* Location pill */}
            <div className="absolute inset-0 z-10 m-auto size-fit flex flex-col items-center justify-center">
              <div className="rounded-none bg-background relative flex size-fit w-fit items-center gap-2 border border-border px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase shadow-md shadow-zinc-950/5">
                <span className="text-sm">🇸🇬</span> Latest enrolment from Singapore
              </div>
              <div className="rounded-none bg-background absolute inset-2 -bottom-2 mx-auto border border-border px-3 py-4 text-xs shadow-md shadow-zinc-950/5 dark:bg-[#0B0F14] -z-10" />
            </div>

            {/* Dotted map */}
            <div className="w-full relative">
              <div
                className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle,transparent_25%,oklch(var(--background))_75%)]"
              />
              <Map />
            </div>
          </div>
        </div>

        {/* ── Right panel: AI mentor support ── */}
        <div className="overflow-hidden bg-card/5 p-6 sm:p-12 md:border-l border-border dark:bg-transparent">
          <div className="relative z-10">
            <span className="text-muted-foreground flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
              <MessageCircle className="size-4 text-primary" />
              AI mentor support
            </span>

            <p className="my-8 text-2xl font-light text-foreground leading-snug">
              Instant guidance, available 24/7 - no learner left without a next step.
            </p>
          </div>

          {/* Simulated chat thread */}
          <div aria-hidden="true" className="flex flex-col gap-8 pt-4">
            {/* Learner message */}
            <div>
              <div className="flex items-center gap-2">
                <span className="flex size-5 rounded-none border border-border items-center justify-center bg-card">
                  <Logo className="m-auto size-3" />
                </span>
                <span className="text-muted-foreground font-mono text-[10px] uppercase tracking-wider">
                  Mon 19 May
                </span>
              </div>
              <div className="rounded-none bg-card mt-1.5 w-3/5 border border-border p-3 text-xs text-foreground font-sans leading-relaxed">
                Which pathway should I choose for a UX design career?
              </div>
            </div>

            {/* EduPlus AI response */}
            <div>
              <div className="rounded-none mb-1 ml-auto w-4/5 bg-primary p-3 text-xs text-primary-foreground font-sans leading-relaxed">
                Based on your profile, the Product Design Pathway aligns best. Start with the Foundations module - it maps directly to your goals.
              </div>
              <span className="text-muted-foreground block text-right font-mono text-[9px] uppercase tracking-widest mt-1">
                Now
              </span>
            </div>
          </div>
        </div>

        {/* ── Highlight banner ── */}
        <div className="col-span-full border-t border-b border-border p-12 bg-card/5 dark:bg-transparent">
          <p className="text-center text-4xl font-light tracking-tight text-primary lg:text-7xl font-sans">
            98% Placement Rate
          </p>
        </div>

        {/* ── Bottom panel: Learner milestone stats ── */}
        <div className="relative col-span-full flex flex-col">
          <div className="relative z-10 px-6 pt-6 md:px-12 md:pt-12 pb-4">
            <span className="text-muted-foreground flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
              <TrendingUp className="size-4 text-primary" />
              Platform milestones
            </span>

            <p className="my-6 text-2xl font-light text-foreground leading-snug">
              Impact that compounds.{' '}
              <span className="text-muted-foreground">
                Every learner milestone strengthens the entire network.
              </span>
            </p>
          </div>

          {/* Stat grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-border">
            {MILESTONES.map((m, i) => (
              <div
                key={m.label}
                className={`flex flex-col items-center justify-center gap-1 px-6 py-10 ${
                  i < MILESTONES.length - 1 ? 'border-r border-border' : ''
                } ${i >= 2 ? 'border-t border-border md:border-t-0' : ''}`}
              >
                <span className="text-3xl md:text-4xl font-light text-primary font-sans tracking-tight">
                  {m.value}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground text-center leading-tight">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Decorative icon */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 right-8 opacity-[0.04]"
          >
            <BookOpen className="size-40 text-primary" strokeWidth={0.5} />
          </div>
        </div>

      </div>
    </section>
  )
}
