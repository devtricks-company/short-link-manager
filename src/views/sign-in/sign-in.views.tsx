'use client'

import { useActionState } from "react";
import Link from "next/link";
import { signInWithEmail } from "@/lib/actions/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SignInViews() {
  const [state, formAction, isPending] = useActionState(signInWithEmail, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background px-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="size-12 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6 text-primary-foreground"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">LinkSnap</h1>
          <p className="text-sm text-muted-foreground mt-1">Short links, big impact</p>
        </div>

        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to manage your links.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form action={formAction} className="flex flex-col gap-5">
              {/* Error banner */}
              {state?.error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {state.error}
                </div>
              )}

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  autoComplete="email"
                  className="h-10"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="h-10"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isPending}
                className="mt-1 h-10 w-full text-sm font-semibold"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Signing in…
                  </span>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center text-sm text-muted-foreground">
            Don&apos;t have an account?&nbsp;
            <Link href="/sign-up" className="font-medium text-primary underline-offset-4 hover:underline">
              Sign up
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
