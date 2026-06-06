import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
            <p className="text-muted-foreground text-sm font-mono">404</p>
            <h1 className="text-2xl font-semibold tracking-tight">Link not found</h1>
            <p className="text-muted-foreground text-sm max-w-xs">
                This short link doesn&apos;t exist or may have been removed.
            </p>
            <Link
                href="/"
                className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
            >
                Go home
            </Link>
        </div>
    );
}
