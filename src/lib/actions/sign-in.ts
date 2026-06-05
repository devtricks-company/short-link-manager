'use server'

import {auth} from '@/lib/auth/server';
import { redirect } from 'next/navigation';
import { signInSchema } from '../validations/sign-in';

export async function signInWithEmail(
    _prevState:{error:string} | null,
    formData: FormData
){
    const parsed = signInSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!parsed.success)
        return { error: parsed.error.issues[0].message };

    const { email, password } = parsed.data;

    const {error} = await auth.signIn.email({ email, password })

    if(error)
            return  { error: error.message || 'Failed to sign in. Try again' };
     redirect('/dashboard')   

}