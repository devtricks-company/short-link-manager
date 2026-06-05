import { Suspense } from 'react';
import { DashboardView } from '@/views/dashboard/dashboard.view';
import { LinksTableServer } from '@/views/dashboard/links-table-server';
import { LinksTableSkeleton } from '@/views/dashboard/links-table-skeleton';

export default function DashboardPage() {
  return (
    <DashboardView>
      <Suspense fallback={<LinksTableSkeleton />}>
        <LinksTableServer />
      </Suspense>
    </DashboardView>
  );
}
