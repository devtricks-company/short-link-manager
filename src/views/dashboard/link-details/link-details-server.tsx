import { notFound } from 'next/navigation';
import { auth } from '@/lib/auth/server';
import { getLinkById, getClicksPerDay } from '@/lib/db/queries/links';
import { LinkDetailsView } from './link-details.view';

export async function LinkDetailsServer({ id }: { id: string }) {
  const { data: session } = await auth.getSession();
  if (!session?.user) return null;

  const [link, clicksPerDay] = await Promise.all([
    getLinkById(id, session.user.id),
    getClicksPerDay(id),
  ]);

  if (!link) notFound();

  return <LinkDetailsView link={link} clicksPerDay={clicksPerDay} />;
}
