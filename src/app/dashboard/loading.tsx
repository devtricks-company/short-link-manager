import { DashboardView } from '@/views/dashboard/dashboard.view';
import { LinksTableSkeleton } from '@/views/dashboard/links-table-skeleton';

export default function DashboardLoading() {
  return (
    <DashboardView>
      <LinksTableSkeleton />
    </DashboardView>
  );
}
