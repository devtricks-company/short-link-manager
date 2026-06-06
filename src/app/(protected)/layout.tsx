import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth/server';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.getSession();
  console.log('session',session);
  if (!session.data) {
    redirect('/sign-in');
  }

  return <>{children}</>;
}
