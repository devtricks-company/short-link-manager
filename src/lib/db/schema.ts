import { pgTable, text, integer,timestamp,uuid} from 'drizzle-orm/pg-core';


export const links = pgTable('links',{
    id:uuid('id').defaultRandom().primaryKey(),
    userId:text('user_id').notNull(),
    slug:text('slug').notNull().unique(),
    longUrl:text('long_url').notNull(),
    title:text('title'),
    clickCount:integer('click_count').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow().notNull()
});


export const clickEvents = pgTable('click_events',{
    id:uuid('id').defaultRandom().primaryKey(),
    lingId:uuid('link_id').notNull().references(() => links.id,{onDelete:"cascade"}),
    clickedAt:timestamp('click_at').defaultNow().notNull()
})