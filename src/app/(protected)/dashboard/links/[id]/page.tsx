import type { Metadata } from 'next';
import { Suspense } from 'react';
import { DashboardView } from '@/views/dashboard/dashboard.view';
import { LinkDetailsServer } from '@/views/dashboard/link-details/link-details-server';
import { LinkDetailsSkeleton } from '@/views/dashboard/link-details/link-details-skeleton';

export const metadata: Metadata = {
  title: 'LinkSnap - Dashboard',
};

export default async function LinkDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <DashboardView>
      <Suspense fallback={<LinkDetailsSkeleton />}>
        <LinkDetailsServer id={id} />
      </Suspense>
    </DashboardView>
  );
}
