import * as React from 'react';
import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { Card } from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// ── Domain definitions ────────────────────────────────────────────────────────
interface Pathway {
  name: string;
  description: string;
  path: string;
}

const DOMAINS: Pathway[] = [
  { name: 'AI Models',       description: 'Deep learning pipeline & fine-tuning architectures.',        path: 'INTEGRATION_ARCHITECT' },
  { name: 'Hydrogen Energy', description: 'Clean fuel cells and hydrogen storage operations.',            path: 'FRONTIER_SCIENTIST'    },
  { name: 'Linguistics',     description: 'Advanced structural syntactic matrices and translator pipelines.', path: 'LINGUISTIC_ANALYST'    },
  { name: 'Career Strategy', description: 'Global corporate mobility frameworks.',                       path: 'OPERATIONS_DIRECTOR'  },
];

// ── Chart data: learner engagement over 3 months ─────────────────────────────
const chartData = [
  { date: '2024-04-01', enrolments: 42,  completions: 28  },
  { date: '2024-04-03', enrolments: 58,  completions: 35  },
  { date: '2024-04-05', enrolments: 91,  completions: 62  },
  { date: '2024-04-08', enrolments: 110, completions: 74  },
  { date: '2024-04-10', enrolments: 79,  completions: 51  },
  { date: '2024-04-13', enrolments: 134, completions: 98  },
  { date: '2024-04-15', enrolments: 97,  completions: 68  },
  { date: '2024-04-18', enrolments: 156, completions: 112 },
  { date: '2024-04-20', enrolments: 88,  completions: 60  },
  { date: '2024-04-23', enrolments: 172, completions: 130 },
  { date: '2024-04-25', enrolments: 143, completions: 101 },
  { date: '2024-04-28', enrolments: 198, completions: 148 },
  { date: '2024-04-30', enrolments: 214, completions: 162 },
  { date: '2024-05-03', enrolments: 165, completions: 119 },
  { date: '2024-05-06', enrolments: 238, completions: 182 },
  { date: '2024-05-08', enrolments: 181, completions: 133 },
  { date: '2024-05-11', enrolments: 255, completions: 196 },
  { date: '2024-05-14', enrolments: 223, completions: 170 },
  { date: '2024-05-17', enrolments: 279, completions: 211 },
  { date: '2024-05-19', enrolments: 195, completions: 148 },
  { date: '2024-05-22', enrolments: 148, completions: 109 },
  { date: '2024-05-25', enrolments: 292, completions: 224 },
  { date: '2024-05-27', enrolments: 318, completions: 245 },
  { date: '2024-05-30', enrolments: 267, completions: 203 },
  { date: '2024-06-02', enrolments: 334, completions: 258 },
  { date: '2024-06-05', enrolments: 288, completions: 221 },
  { date: '2024-06-08', enrolments: 355, completions: 276 },
  { date: '2024-06-10', enrolments: 302, completions: 234 },
  { date: '2024-06-13', enrolments: 371, completions: 290 },
  { date: '2024-06-15', enrolments: 316, completions: 247 },
  { date: '2024-06-18', enrolments: 389, completions: 306 },
  { date: '2024-06-21', enrolments: 342, completions: 268 },
  { date: '2024-06-24', enrolments: 408, completions: 321 },
  { date: '2024-06-27', enrolments: 363, completions: 285 },
  { date: '2024-06-30', enrolments: 431, completions: 340 },
];

const chartConfig = {
  enrolments: {
    label: 'Enrolments',
    color: 'oklch(var(--primary))',
  },
  completions: {
    label: 'Completions',
    color: 'oklch(var(--chart-1))',
  },
} satisfies ChartConfig;

// ── Interactive chart component ───────────────────────────────────────────────
function LearnerEngagementChart() {
  const [timeRange, setTimeRange] = React.useState('90d');

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date('2024-06-30');
    const daysToSubtract = timeRange === '30d' ? 30 : timeRange === '7d' ? 7 : 90;
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Chart header */}
      <div className="flex items-center gap-2 justify-between mb-5">
        <div className="grid gap-0.5">
          <span className="font-mono text-[9px] text-muted-foreground tracking-wider uppercase">
            NODE CHECK MATRIX // VISUALIZER
          </span>
          <span className="font-mono text-[8px] text-primary/60 tracking-widest">
            Learner enrolments vs. pathway completions
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[8px] text-emerald-500 flex items-center gap-1 animate-pulse">
            <span className="w-1 h-1 bg-emerald-500 inline-block" /> LIVE
          </span>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="h-7 w-[120px] text-[10px] font-mono tracking-wider rounded-none border-border bg-background"
              aria-label="Select time range"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-none font-mono text-[10px]">
              <SelectItem value="90d" className="rounded-none text-[10px]">Last 90 days</SelectItem>
              <SelectItem value="30d" className="rounded-none text-[10px]">Last 30 days</SelectItem>
              <SelectItem value="7d"  className="rounded-none text-[10px]">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chart body */}
      <ChartContainer config={chartConfig} className="w-full flex-1 min-h-[220px]">
        <AreaChart data={filteredData} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
          <defs>
            <linearGradient id="fillEnrolments" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--color-enrolments)" stopOpacity={0.5} />
              <stop offset="95%" stopColor="var(--color-enrolments)" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="fillCompletions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--color-completions)" stopOpacity={0.5} />
              <stop offset="95%" stopColor="var(--color-completions)" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke="oklch(var(--border))" strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={36}
            className="font-mono"
            tick={{ fontSize: 9, fill: 'oklch(var(--muted-foreground))' }}
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            }
          />

          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(value) =>
                  new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                }
                indicator="dot"
                className="font-mono text-[10px] rounded-none border-border"
              />
            }
          />

          <Area
            dataKey="completions"
            type="natural"
            fill="url(#fillCompletions)"
            stroke="var(--color-completions)"
            strokeWidth={1.5}
            stackId="a"
          />
          <Area
            dataKey="enrolments"
            type="natural"
            fill="url(#fillEnrolments)"
            stroke="var(--color-enrolments)"
            strokeWidth={1.5}
            stackId="a"
          />

          <ChartLegend
            content={<ChartLegendContent className="font-mono text-[9px] uppercase tracking-wider" />}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function PathwaySimulator() {
  const [selected, setSelected] = useState(0);

  return (
    <section
      className="relative w-full py-20 bg-background border-t border-border overflow-hidden"
      id="simulator"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="mb-12">
          <span className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-primary block mb-3">
            Interactive Workspace
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground">
            Node Path Simulator
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── Left: Domain selectors ── */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {DOMAINS.map((domain, idx) => (
              <button
                key={domain.name}
                onClick={() => setSelected(idx)}
                className={`w-full text-left p-6 border transition-all duration-300 bg-card hover:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/40 ${
                  selected === idx
                    ? 'border-primary shadow-[0_0_15px_oklch(var(--primary)/0.08)]'
                    : 'border-border'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`w-1.5 h-1.5 transition-colors duration-300 ${
                      selected === idx ? 'bg-primary' : 'bg-foreground/20'
                    }`}
                  />
                  <span
                    className={`font-mono text-[10px] tracking-wider uppercase transition-colors duration-300 ${
                      selected === idx ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    DOMAIN // 0{idx + 1}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-light text-foreground">
                  {domain.name}
                </h3>
                <p className="font-sans text-xs text-muted-foreground mt-2 leading-relaxed">
                  {domain.description}
                </p>
              </button>
            ))}
          </div>

          {/* ── Right: NODE CHECK MATRIX chart panel ── */}
          <Card className="lg:col-span-7 border-border p-6 md:p-8 flex flex-col justify-between relative bg-card overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary/20" />

            {/* Interactive chart */}
            <LearnerEngagementChart />

            {/* Footer: optimized pathway */}
            <div className="mt-6 border-t border-border pt-4 flex justify-between items-center">
              <span className="font-mono text-[9px] text-muted-foreground uppercase">
                Optimized pathway
              </span>
              <span className="font-mono text-xs text-primary tracking-widest">
                // {DOMAINS[selected].path}
              </span>
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
}
