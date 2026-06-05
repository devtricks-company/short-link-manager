'use server'
import { auth } from "../auth/server";
import { redirect } from "next/navigation";
import { signUpSchema } from "../validations/sign-up";


export async function signUpWithEmail(
    _prevState:{error:string} | null,
    formData:FormData
){
    const parsed = signUpSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    });

    if (!parsed.success)
        return { error: parsed.error.issues[0].message };

    const { name, email, password } = parsed.data;

    const { error } = await auth.signUp.email({ email, name, password });

    if (error)
        return { error: error.message || 'Failed to create account' };

    redirect('/');
}