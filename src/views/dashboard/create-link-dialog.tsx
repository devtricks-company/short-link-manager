'use client'

import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogClose,
} from '@/components/ui/dialog'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { createLinkAction } from '@/lib/actions/link'

export function CreateLinkDialog() {
  const [open, setOpen] = useState(false)
  const [state, formAction, pending] = useActionState(createLinkAction, null)

  useEffect(() => {
    if (state?.data) {
      setOpen(false)
      toast.success('Link created successfully!')
    }
  }, [state])

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button size="sm" className="gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Create New Link
        </Button>
      } />

      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup className="px-4">
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <CardTitle className="text-lg">Create New Link</CardTitle>
                  <CardDescription>
                    Shorten a URL and optionally give it a custom slug.
                  </CardDescription>
                </div>
                <DialogClose render={
                  <Button variant="ghost" size="icon" className="size-8 shrink-0" aria-label="Close">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </Button>
                } />
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <form id="create-link-form" action={formAction} className="flex flex-col gap-5">
                {/* Destination URL */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="longUrl">
                    Destination URL <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="longUrl"
                    name="longUrl"
                    type="url"
                    placeholder="https://example.com/your-long-url"
                    className="h-10"
                  />
                </div>

                {/* Custom Slug */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="slug">Custom slug</Label>
                    <span className="text-xs text-muted-foreground">Optional</span>
                  </div>
                  <div className="flex items-center rounded-lg border border-border bg-muted/40 h-10 overflow-hidden focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
                    <span className="pl-3 pr-2 text-sm text-muted-foreground select-none shrink-0">
                      lnk.to/
                    </span>
                    <input
                      id="slug"
                      name="slug"
                      type="text"
                      placeholder="my-link"
                      className="flex-1 h-full bg-transparent pr-3 text-sm outline-none placeholder:text-muted-foreground/60"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    3–50 characters. Letters, numbers, and dashes only.
                  </p>
                </div>

                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="title">Title</Label>
                    <span className="text-xs text-muted-foreground">Optional</span>
                  </div>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="e.g. Blog post, Campaign landing page"
                    className="h-10"
                  />
                </div>

                {state?.error && (
                  <p className="text-sm text-destructive">{state.error}</p>
                )}
              </form>
            </CardContent>

            <CardFooter className="flex gap-2 justify-end border-t pt-4">
              <DialogClose render={
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
              } />
              <Button size="sm" type="submit" form="create-link-form" disabled={pending} className="gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                {pending ? 'Creating...' : 'Create Link'}
              </Button>
            </CardFooter>
          </Card>
        </DialogPopup>
      </DialogPortal>
    </DialogRoot>
  )
}
