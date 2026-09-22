import { cn } from '@/lib/utils'
import React, { useRef } from 'react'
import { ClippedAreaChart } from './charts'
import { TimelineAnimation } from '@/components/timeline-animation'
import { Users } from 'lucide-react'

const kpis = [
  { label: 'Total Revenue', value: '$2.4M', change: '+12.5%', status: 'up' },
  {
    label: 'Active Subscriptions',
    value: '14,205',
    change: '+4.2%',
    status: 'up',
  },
  {
    label: 'Avg. Response Time',
    value: '184ms',
    change: '-8.1%',
    status: 'down',
  },
  { label: 'Churn Rate', value: '1.2%', change: '-0.4%', status: 'down' },
]

const translations = {
  primaryGoal: "Primary Goal",
  enterpriseAdoption: "Enterprise Adoption",
  targetLabel: "Target: 90%",
  userGrowth: "User Growth",
  organicAcquisitionUp: "Organic acquisition is up",
  comparedToQuarter: "compared to previous quarter."
};

const translationMap = new Map<string, string>(Object.entries(translations));
const t = (key: keyof typeof translations) => translationMap.get(key) || '';

export const AdvancedStats: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={timelineRef}
      className="flex flex-col gap-8 py-4 bg-background min-h-dvh justify-center md:px-0 px-5 font-sans"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Section */}
          <TimelineAnimation
            animationNum={1}
            timelineRef={timelineRef}
            className="lg:col-span-2 p-8 rounded-none bg-card border border-border"
          >
            <ClippedAreaChart />
          </TimelineAnimation>

          {/* Breakdown Section */}
          <div>
            <div className="flex flex-col gap-4">
              <TimelineAnimation
                animationNum={2}
                timelineRef={timelineRef}
                className="p-6 rounded-none h-full bg-[#0B0F14] text-foreground flex flex-col justify-between shadow-lg"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    {t('primaryGoal')}
                  </p>
                  <h4 className="text-xl font-bold tracking-tight">
                    {t('enterpriseAdoption')}
                  </h4>
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-3xl font-semibold tracking-tighter ">
                      82%
                    </span>
                    <span className="text-xs font-medium text-muted-foreground mb-1">
                      {t('targetLabel')}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-muted/60 rounded-none overflow-hidden">
                    <div className="h-full bg-primary w-[82%] rounded-none" />
                  </div>
                </div>
              </TimelineAnimation>

              <TimelineAnimation
                animationNum={3}
                timelineRef={timelineRef}
                className="p-6 rounded-none h-full bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-8 rounded-none bg-muted flex items-center justify-center border border-border">
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h4 className="font-bold text-foreground">{t('userGrowth')}</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('organicAcquisitionUp')}{' '}
                  <span className="text-primary font-semibold">24%</span>{' '}
                  {t('comparedToQuarter')}
                </p>
              </TimelineAnimation>
            </div>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
          {kpis.map((kpi, index) => (
            <TimelineAnimation
              animationNum={4 + index}
              timelineRef={timelineRef}
              key={kpi.label}
              className={cn(
                'p-6 rounded-none border bg-card border-border transition-colors',
                kpi.status === 'up'
                  ? 'hover:border-[#22C55E] hover:bg-[#22C55E]/10'
                  : 'hover:border-[#EF4444] hover:bg-[#EF4444]/10'
              )}
            >
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                {kpi.label}
              </p>
              <div className="flex items-baseline justify-between">
                <p className="text-2xl font-black text-foreground tracking-tighter">
                  {kpi.value}
                </p>
                <span
                  className={cn(
                    'text-xs font-bold px-1.5 py-0.5 rounded-none',
                    kpi.status === 'up'
                      ? 'text-[#22C55E] bg-[#22C55E]/10'
                      : 'text-[#EF4444] bg-[#EF4444]/10'
                  )}
                >
                  {kpi.change}
                </span>
              </div>
            </TimelineAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
