import { DashboardView } from '@/views/dashboard/dashboard.view';
import { LinkDetailsSkeleton } from '@/views/dashboard/link-details/link-details-skeleton';

export default function LinkDetailsLoading() {
  return (
    <DashboardView>
      <LinkDetailsSkeleton />
    </DashboardView>
  );
}
