import { useState } from 'react';
import { useTranslation } from '../../i18n/useTranslation';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { NumberTicker } from '../magicui/NumberTicker';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { chartData, chartConfig } from '../../lib/mock-data/analytics';

interface OverviewTabProps {
  knowledgeHubItems: any[];
  kbDocuments: any[];
  contactMessages: any[];
}

export default function OverviewTab({
  knowledgeHubItems,
  kbDocuments,
  contactMessages
}: OverviewTabProps) {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  });

  return (
    <div id="view-overview" className="page animate-in fade-in duration-300">
      <div className="page-head">
        <h1>{t('dashboard.overview.heading')}</h1>
        <span className="sub">{t('dashboard.overview.telemetryLink')}</span>
      </div>

      <div className="stack flex flex-col gap-7">
        <div className="stats">
          <div className="card stat p-[18px_20px]">
            <div className="text-[13px] text-muted-foreground whitespace-nowrap">{t('dashboard.overview.hubResources')}</div>
            <div className="font-heading text-[32px] leading-[1.2] mt-0.5 text-foreground font-normal tabular-nums">
              <NumberTicker value={knowledgeHubItems.length} />
            </div>
            <div className="text-[12px] mt-0.5 text-muted-foreground font-sans">
              {knowledgeHubItems.length === 0 ? 'Library is nearly empty' : `${knowledgeHubItems.length} published`}
            </div>
          </div>
          <div className="card stat p-[18px_20px]">
            <div className="text-[13px] text-muted-foreground whitespace-nowrap">{t('dashboard.overview.aiTrainingRules')}</div>
            <div className="font-heading text-[32px] leading-[1.2] mt-0.5 text-foreground font-normal tabular-nums">
              {kbDocuments.length === 0 ? '—' : <NumberTicker value={kbDocuments.length} />}
            </div>
            <div className="text-[12px] mt-0.5 text-muted-foreground font-sans">
              {kbDocuments.length === 0 ? 'None yet · add in AI Advisor' : `${kbDocuments.length} active rules`}
            </div>
          </div>
          <div className="card stat p-[18px_20px]">
            <div className="text-[13px] text-muted-foreground whitespace-nowrap">{t('dashboard.overview.inboundInquiries')}</div>
            <div className="font-heading text-[32px] leading-[1.2] mt-0.5 text-foreground font-normal tabular-nums">
              <NumberTicker value={contactMessages.length} />
            </div>
            <div className={`text-[12px] mt-0.5 font-sans ${contactMessages.length > 0 ? 'text-[oklch(var(--moss))]' : 'text-muted-foreground'}`}>
              {contactMessages.length > 0 ? `+${Math.min(contactMessages.length, 2)} this week` : 'No inquiries yet'}
            </div>
          </div>
        </div>

        {/* Interactive Area Chart */}
        <div className="card">
          {/* Chart Header */}
          <div className="chart-head flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-3 p-[22px_24px_0]">
            <div>
              <h3 className="font-sans text-[16px] font-semibold text-foreground leading-[1.15]">{t('dashboard.overview.systemAnalytics')}</h3>
              <div className="text-muted-foreground font-sans text-[12.5px] mt-0.5">Sessions per day</div>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="w-[140px] rounded-none border border-border bg-transparent text-xs font-mono tracking-wider px-3 h-[34px] text-muted-foreground outline-none"
                aria-label="Select a value"
              >
                <SelectValue placeholder="Last 3 months" />
              </SelectTrigger>
              <SelectContent className="rounded-none bg-card border border-border text-foreground font-mono text-xs z-50">
                <SelectItem value="90d" className="rounded-none cursor-pointer focus:bg-primary/10 text-[11px]">
                  Last 3 months
                </SelectItem>
                <SelectItem value="30d" className="rounded-none cursor-pointer focus:bg-primary/10 text-[11px]">
                  Last 30 days
                </SelectItem>
                <SelectItem value="7d" className="rounded-none cursor-pointer focus:bg-primary/10 text-[11px]">
                  Last 7 days
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Chart Content */}
          <div className="chart-box p-[8px_12px_16px]">
            <ChartContainer
              config={chartConfig}
              className="aspect-[4/3] sm:aspect-auto h-[240px] w-full"
            >
              <AreaChart data={filteredData} margin={{ left: 12, right: 12, top: 20, bottom: 12 }}>
                <defs>
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(var(--primary))" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="oklch(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="oklch(var(--border) / 0.4)" strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={64}
                  tick={{ fill: 'currentColor', fontSize: 10.5 }}
                  className="fill-muted-foreground font-mono"
                  tickFormatter={(value) => {
                    if (!value) return '';
                    const d = new Date(`${value}T00:00:00`);
                    if (isNaN(d.getTime())) return String(value);
                    return d.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        if (!value) return '';
                        const d = new Date(`${value}T00:00:00`);
                        if (isNaN(d.getTime())) return String(value);
                        return d.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      }}
                      indicator="dot"
                      className="rounded-none border border-border bg-card text-foreground shadow-lg"
                    />
                  }
                />
                <Area
                  dataKey="mobile"
                  type="linear"
                  fill="none"
                  stroke="oklch(var(--muted-foreground) / 0.6)"
                  strokeWidth={1.5}
                  strokeDasharray="2 3"
                />
                <Area
                  dataKey="desktop"
                  type="linear"
                  fill="url(#fillDesktop)"
                  fillOpacity={1}
                  stroke="oklch(var(--primary))"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </div>

          <div className="legend flex items-center gap-4 px-6 pb-4 text-[12px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><i className="inline-block w-3.5 h-[2.5px] rounded-none bg-[oklch(var(--primary))]" /> Desktop</span>
            <span className="flex items-center gap-1.5"><i className="inline-block w-3.5 h-[2.5px] rounded-none bg-muted-foreground/60" /> Mobile</span>
          </div>
        </div>

        {/* Content Category Distribution */}
        <div className="card card-pad">
          <h3 className="font-sans text-[16px] font-semibold text-foreground leading-[1.15]">{t('dashboard.overview.contentCategoryDistribution')}</h3>
          <div className="text-[12.5px] text-muted-foreground mt-0.5 mb-4">Knowledge Hub resources by format</div>
          <div className="w-full h-2.5 flex rounded-none overflow-hidden bg-muted border border-border/40">
            {['tutorial', 'podcast', 'webinar', 'study_material'].map((cat, i) => {
              const count = knowledgeHubItems.filter(item => item.category === cat).length;
              const percent = knowledgeHubItems.length > 0 ? (count / knowledgeHubItems.length) * 100 : 0;
              if (percent === 0) return null;
              const opacity = 1 - (i * 0.2);
              return (
                <div
                  key={cat}
                  style={{ width: `${percent}%`, backgroundColor: `oklch(var(--primary) / ${opacity})` }}
                  className="h-full transition-all duration-300"
                />
              );
            })}
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-3 text-[12.5px] text-muted-foreground">
            {['tutorial', 'podcast', 'webinar', 'study_material'].map((cat, i) => {
              const count = knowledgeHubItems.filter(item => item.category === cat).length;
              const percent = knowledgeHubItems.length > 0 ? (count / knowledgeHubItems.length) * 100 : 0;
              const opacity = 1 - (i * 0.2);
              return (
                <div key={cat} className="flex items-center gap-2">
                  <span className="inline-block size-2 rounded-none" style={{ backgroundColor: `oklch(var(--primary) / ${opacity})` }} />
                  <span className="font-sans capitalize">{cat.replace('_', ' ')}</span>
                  <span className="font-mono text-[11px] text-foreground tabular-nums">{count} ({percent.toFixed(0)}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
