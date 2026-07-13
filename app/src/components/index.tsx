import { cn } from '@/lib/utils'
import React, { useRef } from 'react'
import { ClippedAreaChart } from './charts'
import { TimelineAnimation } from '@/components/timeline-animation'

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
      className="flex flex-col gap-8 py-4 bg-background min-h-screen justify-center md:px-0 px-5 font-sans"
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
      className="p-6 rounded-none h-full bg-card text-foreground flex flex-col justify-between shadow-lg"
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
          <div className="w-full h-1.5 bg-muted rounded-none overflow-hidden">
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                      color="currentColor"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z" />
                      <path d="M16 4C17.6569 4 19 5.34315 19 7C19 8.22309 18.2681 9.27523 17.2183 9.7423" />
                      <path d="M13.7143 14H10.2857C7.91876 14 5.99998 15.9188 5.99998 18.2857C5.99998 19.2325 6.76749 20 7.71426 20H16.2857C17.2325 20 18 19.2325 18 18.2857C18 15.9188 16.0812 14 13.7143 14Z" />
                      <path d="M17.7143 13C20.0812 13 22 14.9188 22 17.2857C22 18.2325 21.2325 19 20.2857 19" />
                      <path d="M8 4C6.34315 4 5 5.34315 5 7C5 8.22309 5.73193 9.27523 6.78168 9.7423" />
                      <path d="M3.71429 19C2.76751 19 2 18.2325 2 17.2857C2 14.9188 3.91878 13 6.28571 13" />
                    </svg>
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
              ? 'hover:border-primary hover:bg-primary/10'
              : 'hover:border-destructive hover:bg-destructive/10'
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
                ? 'text-primary bg-primary/10'
                : 'text-destructive bg-destructive/10'
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
