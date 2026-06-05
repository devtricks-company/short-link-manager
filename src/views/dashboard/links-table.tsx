'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Copy, Check, ExternalLink, Eye, Trash2, Loader2 } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DialogRoot,
  DialogBackdrop,
  DialogPortal,
  DialogPopup,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { deleteLinkAction } from '@/lib/actions/link';

type Link = {
  id: string;
  slug: string;
  longUrl: string;
  title: string | null;
  clickCount: number;
  createdAt: Date;
};

type LinksTableProps = {
  links: Link[];
};

function CopyButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const shortUrl = `${window.location.origin}/r/${slug}`;

  async function handleCopy() {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button variant="ghost" size="icon-sm" onClick={handleCopy} aria-label="Copy short link">
      {copied ? <Check className="size-3.5 text-green-500" /> : <Copy className="size-3.5" />}
    </Button>
  );
}

function ViewButton({ id }: { id: string }) {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() => router.push(`/dashboard/links/${id}`)}
      aria-label="View link details"
      className="text-muted-foreground hover:text-foreground"
    >
      <Eye className="size-3.5" />
    </Button>
  );
}

function DeleteButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteLinkAction(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success('Link deleted');
        setOpen(false);
      }
    });
  }

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => setOpen(true)}
        aria-label="Delete link"
        className="text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="size-3.5" />
      </Button>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup className="rounded-xl border bg-background p-6 shadow-lg">
          <DialogTitle className="mb-2">Delete link?</DialogTitle>
          <DialogDescription className="mb-6">
            This action cannot be undone. The short link will stop working immediately.
          </DialogDescription>
          <div className="flex justify-end gap-2">
            <DialogClose render={
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            } />
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={handleDelete}
            >
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              Delete
            </Button>
          </div>
        </DialogPopup>
      </DialogPortal>
    </DialogRoot>
  );
}

export function LinksTable({ links }: LinksTableProps) {
  if (links.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-muted/30 flex items-center justify-center h-64">
        <p className="text-sm text-muted-foreground">
          No links yet. Create your first short link!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-background overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Short link</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead className="text-right">Clicks</TableHead>
            <TableHead>Created</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link) => (
            <TableRow key={link.id}>
              <TableCell className="font-medium max-w-[160px]">
                <span className="truncate block">
                  {link.title || link.slug}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                    /{link.slug}
                  </code>
                  <CopyButton slug={link.slug} />
                </div>
              </TableCell>
              <TableCell className="max-w-[220px]">
                <a
                  href={link.longUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="truncate block text-xs">{link.longUrl}</span>
                  <ExternalLink className="size-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </TableCell>
              <TableCell className="text-right tabular-nums text-sm">
                {link.clickCount.toLocaleString()}
              </TableCell>
              <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                {new Date(link.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <ViewButton id={link.id} />
                  <DeleteButton id={link.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
