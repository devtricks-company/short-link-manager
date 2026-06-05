import {z} from 'zod';


export const createLinkSchema = z.object({
    longUrl:z.string().url("Must be valid http(s) url."),
    slug: z.string()
        .regex(/^[a-zA-Z0-9-]+$/,"Only alphanumeric and dashes")
        .min(3).max(50).optional().or(z.literal('')),
    title:z.string().max(100).optional()    
})


