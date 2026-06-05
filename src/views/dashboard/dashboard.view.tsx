'use client'

import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth/client';
import { Button } from '@/components/ui/button';

export function DashboardView() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
    router.push('/sign-in');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 text-primary-foreground"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <span className="font-semibold tracking-tight">LinkSnap</span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {session?.user && (
              <span className="text-sm text-muted-foreground hidden sm:block">
                {session.user.email}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="h-8 text-xs"
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome{session?.user?.name ? `, ${session.user.name}` : ''}
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage and track all your short links in one place.
            </p>
          </div>
          <Button size="sm" className="gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Create New Link
          </Button>
        </div>

        {/* Placeholder content area */}
        <div className="rounded-xl border border-dashed bg-muted/30 flex items-center justify-center h-64">
          <p className="text-sm text-muted-foreground">Your links will appear here.</p>
        </div>
      </main>
    </div>
  );
}
