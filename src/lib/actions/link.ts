'use server'

import { createLinkSchema } from "@/lib/validations/link";
import { createLink, deleteLinkById } from "@/lib/db/queries/links";
import { auth } from '@/lib/auth/server';
import { nanoid } from "nanoid";
import {revalidatePath} from 'next/cache';

type ActionResult<T>= {data:T; error:null} | {data:null; error:string};

export async function createLinkAction(
    _prevState:ActionResult<{id:string}> | null,
    formData:FormData
):Promise<ActionResult<{id:string}>>{
    const { data: session } = await auth.getSession();
    if(!session?.user) return {data:null, error:'Unauthorized'};
    const parsed = createLinkSchema.safeParse({
        longUrl:formData.get('longUrl'),
        slug:formData.get('slug') || undefined,
        title:formData.get('title') || undefined
    });

    if(!parsed.success)
            return { data:null, error:parsed.error.message};

    const slug = parsed.data.slug || nanoid(6);


    try {
        const link = await createLink({
            userId:session.user.id,
            slug,
            longUrl:parsed.data.longUrl,
            title:parsed.data.title || '' 
        })
        revalidatePath('/dashboard')
        return {data:{id:link.id}, error:null};
    } catch (e) {
        if ((e as { code?: string }).code === '23505') 
            return { data: null, error: 'That slug is already taken' }
                 
        return { data: null, error: 'Something went wrong' }
    }
}

export async function deleteLinkAction(id: string): Promise<ActionResult<{ id: string }>> {
    const { data: session } = await auth.getSession();
    if (!session?.user) return { data: null, error: 'Unauthorized' };

    try {
        const deleted = await deleteLinkById(id, session.user.id);
        if (!deleted) return { data: null, error: 'Link not found' };
        revalidatePath('/dashboard');
        return { data: { id: deleted.id }, error: null };
    } catch {
        return { data: null, error: 'Something went wrong' };
    }
}
