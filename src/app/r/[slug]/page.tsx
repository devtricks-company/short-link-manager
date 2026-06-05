import { redirect, notFound } from 'next/navigation';
import { findLinkBySlug, recordClick } from '@/lib/db/queries/links';

export default async function RedirectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const link = await findLinkBySlug(slug);

    if (!link) {
        notFound();
    }

    await recordClick(link.id);
    redirect(link.longUrl);
}
