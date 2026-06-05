import { db } from "@/lib/db";
import { links, clickEvents } from "@/lib/db/schema";
import { eq, desc, and, gte, sql } from "drizzle-orm";



export async function createLink(data:{
    userId:string,
    slug:string,
    longUrl:string,
    title:string
}){
    const [link] = await db.insert(links).values(data).returning();
    return link;
}

export async function getLinksForUser(userId: string) {
    return db
        .select()
        .from(links)
        .where(eq(links.userId, userId))
        .orderBy(desc(links.createdAt));
}

export async function deleteLinkById(id: string, userId: string) {
    const [deleted] = await db
        .delete(links)
        .where(and(eq(links.id, id), eq(links.userId, userId)))
        .returning();
    return deleted;
}

export async function findLinkBySlug(slug: string) {
    const [link] = await db
        .select()
        .from(links)
        .where(eq(links.slug, slug))
        .limit(1);
    return link ?? null;
}

export async function recordClick(linkId: string) {
    await Promise.all([
        db.update(links)
            .set({ clickCount: sql`${links.clickCount} + 1` })
            .where(eq(links.id, linkId)),
        db.insert(clickEvents).values({ lingId: linkId }),
    ]);
}

export async function getLinkById(id: string, userId: string) {
    const [link] = await db
        .select()
        .from(links)
        .where(and(eq(links.id, id), eq(links.userId, userId)))
        .limit(1);
    return link ?? null;
}

export async function getClicksPerDay(linkId: string, days: number = 7) {
    const since = new Date();
    since.setDate(since.getDate() - days + 1);
    since.setHours(0, 0, 0, 0);

    return db
        .select({
            day: sql<string>`date_trunc('day', ${clickEvents.clickedAt})::date::text`,
            count: sql<number>`count(*)::int`,
        })
        .from(clickEvents)
        .where(and(eq(clickEvents.lingId, linkId), gte(clickEvents.clickedAt, since)))
        .groupBy(sql`date_trunc('day', ${clickEvents.clickedAt})`)
        .orderBy(sql`date_trunc('day', ${clickEvents.clickedAt})`);
}
