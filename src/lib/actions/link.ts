'use server'

import { createLinkSchema } from "@/lib/validations/link";
import { createLink } from "@/lib/db/queries/links";
import {authClient} from '@/lib/auth/client';
import { nanoid } from "nanoid";
import {revalidatePath} from 'next/cache';

type ActionResult<T>= {data:T; error:null} | {data:null; error:string};

export async function createLinkAction(
    _prevState:ActionResult<{id:string}> | null,
    formData:FormData
):Promise<ActionResult<{id:string}>>{
    const session = await authClient.getSession();
    if(!session) return {data:null, error:'Unauthorized'};
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
            userId:session.data?.user.id as string,
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
