import { auth } from '@/lib/auth/server';
import { getLinksForUser } from '@/lib/db/queries/links';
import { DashboardView } from '@/views/dashboard/dashboard.view';

export default async function DashboardPage() {
  const { data: session } = await auth.getSession();
  const links = session?.user ? await getLinksForUser(session.user.id) : [];
  return <DashboardView links={links} />;
}
