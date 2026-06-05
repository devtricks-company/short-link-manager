import { db } from "@/lib/db";
import { links } from "@/lib/db/schema";



export async function createLink(data:{
    userId:string,
    slug:string,
    longUrl:string,
    title:string
}){
    const [link] = await db.insert(links).values(data).returning();
    return link;
}
