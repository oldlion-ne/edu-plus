import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
]

interface ClippedAreaChartProps {
  data?: Array<{ name: string; value: number }>;
}

export const ClippedAreaChart: React.FC<ClippedAreaChartProps> = ({ data: chartData = data }) => {
  return (
    <div className="w-full h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="oklch(var(--primary))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="oklch(var(--primary))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(var(--border))" />
          <XAxis dataKey="name" stroke="oklch(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="oklch(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip />
          <Area type="linear" dataKey="value" stroke="oklch(var(--primary))" fillOpacity={1} fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
