import { NumberTicker } from '../components/magicui/NumberTicker';

// Each stat: numeric value for animation + display prefix/suffix for formatting
const STATS = [
  { value: 4200, prefix: '',    suffix: '+', label: 'Active Learners' },
  { value: 38,   prefix: '',    suffix: '',  label: 'Countries Reached' },
  { value: 98,   prefix: '',    suffix: '%', label: 'Placement Rate' },
  { value: 1.2,  prefix: '',    suffix: 'M+', label: 'Learning Hours', decimalPlaces: 1 },
];

export default function TelemetryStats() {
  return (
    <section
      id="telemetry"
      className="relative w-full py-40 bg-background border-t border-border/50"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-0 items-start">
          {STATS.map((stat, index) => (
            <div key={stat.label} className="relative flex flex-col items-start md:px-10">
              {/* Amber dot accent */}
              <div className="w-1 h-1 bg-primary mb-4 rounded-none" />

              {/* Animated metric number */}
              <span className="text-[48px] font-medium text-foreground leading-none tracking-tight">
                <NumberTicker
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimalPlaces={stat.decimalPlaces ?? 0}
                  delay={0.2 + index * 0.1}
                  className="text-[48px] font-medium text-foreground leading-none tracking-tight tabular-nums"
                />
              </span>

              {/* Label */}
              <span className="text-[13px] font-medium text-muted-foreground uppercase tracking-wide mt-3 block">
                {stat.label}
              </span>

              {/* Vertical divider between col 2 and 3 */}
              {index === 1 && (
                <div className="hidden md:block absolute -right-0 inset-y-0 w-px bg-border/50" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
