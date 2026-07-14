const STATS = [
  { value: '4,200+', label: 'Active Learners' },
  { value: '38',     label: 'Countries Reached' },
  { value: '98%',    label: 'Placement Rate' },
  { value: '1.2M+',  label: 'Learning Hours' },
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
              {/* Ochre dot accent */}
              <div className="w-1 h-1 bg-primary mb-4 rounded-none" />

              {/* Metric number */}
              <span className="text-[48px] font-medium text-foreground leading-none tracking-tight">
                {stat.value}
              </span>

              {/* Label */}
              <span className="text-[13px] font-medium text-muted-foreground uppercase tracking-wide mt-3 block">
                {stat.label}
              </span>

              {/* Single 1px vertical rule between col 2 and 3 only */}
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
