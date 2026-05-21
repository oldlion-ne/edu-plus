'use client'

import { Activity, Map as MapIcon, MessageCircle } from 'lucide-react'
import DottedMap from 'dotted-map'
import { Area, AreaChart, CartesianGrid } from 'recharts'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const Logo = ({ className }: { className?: string }) => (
  <span className={`font-sans font-bold text-[8px] text-foreground flex items-center justify-center leading-none ${className}`}>
    E<span className="text-primary font-light">+</span>
  </span>
)

const map = new DottedMap({ height: 55, grid: 'diagonal' })
const points = map.getPoints()

const svgOptions = {
  backgroundColor: 'var(--color-background)',
  color: 'currentColor',
  radius: 0.15,
}

const Map = () => {
  const viewBox = `0 0 120 60`
  return (
    <svg
      viewBox={viewBox}
      className="w-full h-auto text-muted-foreground/35"
      style={{ background: svgOptions.backgroundColor }}
      aria-label="Dotted World Map"
    >
      {points.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={svgOptions.radius}
          fill={svgOptions.color}
        />
      ))}
    </svg>
  )
}

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--primary))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

const chartData = [
  { month: 'May', desktop: 56, mobile: 224 },
  { month: 'June', desktop: 56, mobile: 224 },
  { month: 'January', desktop: 126, mobile: 252 },
  { month: 'February', desktop: 205, mobile: 410 },
  { month: 'March', desktop: 200, mobile: 126 },
  { month: 'April', desktop: 400, mobile: 800 },
]

const MonitoringChart = () => {
  return (
    <ChartContainer
      className="h-120 aspect-auto md:h-96 w-full"
      config={chartConfig}
    >
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 0,
          right: 0,
        }}
      >
        <defs>
          <linearGradient
            id="fillDesktop"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.8}
            />
            <stop
              offset="55%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient
            id="fillMobile"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.8}
            />
            <stop
              offset="55%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="3 3" />
        <ChartTooltip
          active
          cursor={false}
          content={<ChartTooltipContent className="dark:bg-muted" />}
        />
        <Area
          strokeWidth={2}
          dataKey="mobile"
          type="stepBefore"
          fill="url(#fillMobile)"
          fillOpacity={0.1}
          stroke="var(--color-mobile)"
          stackId="a"
        />
        <Area
          strokeWidth={2}
          dataKey="desktop"
          type="stepBefore"
          fill="url(#fillDesktop)"
          fillOpacity={0.1}
          stroke="var(--color-desktop)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  )
}

export default function TelemetryStats() {
  return (
    <section 
      id="telemetry"
      className="relative w-full px-4 py-16 md:py-32 bg-background overflow-hidden"
    >
      <div className="mx-auto grid max-w-5xl border border-border md:grid-cols-2 bg-card/10 backdrop-blur-sm">
        {/* Left Side: Real-time Location Tracking */}
        <div className="border-b border-border md:border-b-0">
          <div className="p-6 sm:p-12">
            <span className="text-muted-foreground flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
              <MapIcon className="size-4 text-primary" />
              Real time location tracking
            </span>

            <p className="mt-8 text-2xl font-light text-foreground leading-snug">
              Advanced tracking system, Instantly locate all your assets.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="relative h-60 flex items-center justify-center overflow-hidden border-t border-border"
          >
            <div className="absolute inset-0 z-10 m-auto size-fit flex flex-col items-center justify-center">
              <div className="rounded-[var(--radius)] bg-background relative flex size-fit w-fit items-center gap-2 border border-border px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase shadow-md shadow-zinc-950/5">
                <span className="text-sm">🇨🇩</span> Last connection from DR Congo
              </div>
              <div className="rounded-[var(--radius)] bg-background absolute inset-2 -bottom-2 mx-auto border border-border px-3 py-4 text-xs shadow-md shadow-zinc-950/5 dark:bg-zinc-900 -z-10"></div>
            </div>

            <div className="w-full relative">
              <div 
                className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, transparent 25%, hsl(var(--background)) 75%)' }}
              />
              <Map />
            </div>
          </div>
        </div>

        {/* Right Side: Email and Web Support */}
        <div className="overflow-hidden bg-zinc-50/5 p-6 sm:p-12 md:border-l border-border dark:bg-transparent">
          <div className="relative z-10">
            <span className="text-muted-foreground flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
              <MessageCircle className="size-4 text-primary" />
              Email and web support
            </span>

            <p className="my-8 text-2xl font-light text-foreground leading-snug">
              Reach out via email or web for any assistance you need.
            </p>
          </div>
          <div
            aria-hidden="true"
            className="flex flex-col gap-8 pt-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="flex size-5 rounded-full border border-border items-center justify-center bg-card">
                  <Logo className="m-auto size-3" />
                </span>
                <span className="text-muted-foreground font-mono text-[10px] uppercase tracking-wider">Sat 22 Feb</span>
              </div>
              <div className="rounded-[var(--radius)] bg-card mt-1.5 w-3/5 border border-border p-3 text-xs text-foreground font-sans leading-relaxed">
                Hey, I'm having trouble with my account.
              </div>
            </div>

            <div>
              <div className="rounded-[var(--radius)] mb-1 ml-auto w-3/5 bg-primary p-3 text-xs text-primary-foreground font-sans leading-relaxed">
                Molestiae numquam debitis et ullam distinctio provident nobis repudiandae deleniti necessitatibus.
              </div>
              <span className="text-muted-foreground block text-right font-mono text-[9px] uppercase tracking-widest mt-1">Now</span>
            </div>
          </div>
        </div>

        {/* Uptime Banner */}
        <div className="col-span-full border-t border-b border-border p-12 bg-zinc-50/5 dark:bg-transparent">
          <p className="text-center text-4xl font-light tracking-tight text-primary lg:text-7xl font-sans">
            99.99% Uptime
          </p>
        </div>

        {/* Activity Feed Chart */}
        <div className="relative col-span-full min-h-[400px] flex flex-col justify-between">
          <div className="relative z-10 max-w-lg px-6 pr-12 pt-6 md:px-12 md:pt-12">
            <span className="text-muted-foreground flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
              <Activity className="size-4 text-primary" />
              Activity feed
            </span>

            <p className="my-8 text-2xl font-light text-foreground leading-snug">
              Monitor your application's activity in real-time.{' '}
              <span className="text-muted-foreground">Instantly identify and resolve issues.</span>
            </p>
          </div>
          <div className="w-full mt-auto">
            <MonitoringChart />
          </div>
        </div>
      </div>
    </section>
  )
}

