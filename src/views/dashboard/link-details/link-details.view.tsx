import Link from 'next/link';
import { ArrowLeft, ExternalLink, MousePointerClick, Calendar } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ClicksChart } from './clicks-chart';

type LinkRow = {
  id: string;
  slug: string;
  longUrl: string;
  title: string | null;
  clickCount: number;
  createdAt: Date;
};

type DayCount = {
  day: string;
  count: number;
};

type ChartDataPoint = {
  day: string;
  count: number;
  label: string;
};

function buildChartData(rows: DayCount[], days: number): ChartDataPoint[] {
  return Array.from({ length: days }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - i));
    const dayStr = d.toISOString().split('T')[0];
    const row = rows.find((r) => r.day === dayStr);
    return {
      day: dayStr,
      count: row?.count ?? 0,
      label: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    };
  });
}

export function LinkDetailsView({
  link,
  clicksPerDay,
}: {
  link: LinkRow;
  clicksPerDay: DayCount[];
}) {
  const chartData = buildChartData(clicksPerDay, 7);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), '-ml-2 gap-1.5')}
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">{link.title || link.slug}</h1>
        <p className="text-sm text-muted-foreground font-mono">/{link.slug}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="sm:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <ExternalLink className="size-4" />
              Destination
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a
              href={link.longUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary underline-offset-4 hover:underline break-all"
            >
              {link.longUrl}
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <MousePointerClick className="size-4" />
              Total Clicks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-bold tabular-nums">
              {link.clickCount.toLocaleString()}
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <Calendar className="size-4" />
              Created
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-sm font-medium">
              {new Date(link.createdAt).toLocaleDateString(undefined, {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Clicks per day — last 7 days</CardTitle>
        </CardHeader>
        <CardContent>
          <ClicksChart data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
}
