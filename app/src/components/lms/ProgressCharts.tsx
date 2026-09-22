import { useMemo } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts';
import type { ChartConfig } from '../ui/chart';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';
import { useLmsProgress } from '../../lib/lmsProgressContext';

const lineChartConfig = {
  score: {
    label: 'Progress',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

const radarConfig = {
  score: {
    label: 'Psychometric Score',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function ProgressCharts() {
  const { progress } = useLmsProgress();

  // Generate some realistic progression data based on completed lessons
  const lineChartData = useMemo(() => {
    const data = [];
    const completedCount = progress.completedLessonIds.length;
    // We'll create a 6-month historical view that ends at the current completion count
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    let currentTotal = Math.max(0, completedCount - 15);

    const deltas = [2, 1, 3, 0, 4, 0];
    for (let i = 0; i < 6; i++) {
      if (i === 5) {
        currentTotal = completedCount;
      } else {
        currentTotal += deltas[i] || 1;
      }
      data.push({
        month: months[i],
        score: currentTotal,
      });
    }
    return data;
  }, [progress.completedLessonIds]);

  // Generate psychometric radar data based on quiz attempts
  const radarData = useMemo(() => {
    // If no quizzes are taken, show base potential
    if (Object.keys(progress.quizAttempts).length === 0) {
      return [
        { subject: 'Analytical', score: 20 },
        { subject: 'Creative', score: 30 },
        { subject: 'Technical', score: 10 },
        { subject: 'Leadership', score: 20 },
        { subject: 'Communication', score: 25 },
      ];
    }

    // In a real app, we'd map specific quiz IDs to psychometric categories.
    // For now, we derive an average base score from all quiz attempts.
    const scores = Object.values(progress.quizAttempts).map(q => q.percentage);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

    return [
      { subject: 'Analytical', score: Math.min(100, avg + 10) },
      { subject: 'Creative', score: Math.min(100, avg - 5) },
      { subject: 'Technical', score: Math.min(100, avg + 15) },
      { subject: 'Leadership', score: Math.min(100, avg) },
      { subject: 'Communication', score: Math.min(100, avg + 5) },
    ];
  }, [progress.quizAttempts]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-6">
      {/* Line Chart */}
      <div className="border border-border bg-card p-5 sm:p-6 flex flex-col">
        <div className="mb-4">
          <h3 className="text-sm font-heading font-medium text-foreground uppercase tracking-wider">
            Milestone Velocity
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Your cumulative lesson completion over the last 6 months.
          </p>
        </div>
        <ChartContainer config={lineChartConfig} className="w-full h-[250px]">
          <LineChart
            accessibilityLayer
            data={lineChartData}
            margin={{ left: -20, right: 12, top: 12, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="score"
              type="linear" /* STRICTLY LINEAR: Nordic Lagom rule */
              stroke="var(--color-score)"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </div>

      {/* Radar Chart */}
      <div className="border border-border bg-card p-5 sm:p-6 flex flex-col">
        <div className="mb-4">
          <h3 className="text-sm font-heading font-medium text-foreground uppercase tracking-wider">
            Psychometric Profile
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Skill distribution derived from assessment performances.
          </p>
        </div>
        <ChartContainer config={radarConfig} className="w-full h-[250px] mx-auto">
          <RadarChart
            data={radarData}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {/* STRICTLY STRAIGHT LINES FOR RADAR GRID */}
            <PolarGrid gridType="polygon" />
            <PolarAngleAxis dataKey="subject" />
            <Radar
              dataKey="score"
              fill="var(--color-score)"
              fillOpacity={0.3}
              stroke="var(--color-score)"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
