import { auth } from '@/lib/auth/server';
import { getLinksForUser } from '@/lib/db/queries/links';
import { LinksTable } from './links-table';

export async function LinksTableServer() {
  const { data: session } = await auth.getSession();
  const links = session?.user ? await getLinksForUser(session.user.id) : [];
  return <LinksTable links={links} />;
}
