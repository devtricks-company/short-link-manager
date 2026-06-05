'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

type ChartDataPoint = {
  day: string;
  count: number;
  label: string;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: { value: number; payload: ChartDataPoint }[];
};

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-background px-3 py-2 text-sm shadow-sm">
      <p className="font-medium">{payload[0].payload.label}</p>
      <p className="text-muted-foreground">{payload[0].value} clicks</p>
    </div>
  );
}

export function ClicksChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-muted)' }} />
        <Bar dataKey="count" radius={[4, 4, 0, 0]} style={{ fill: 'var(--color-primary)' }} />
      </BarChart>
    </ResponsiveContainer>
  );
}
