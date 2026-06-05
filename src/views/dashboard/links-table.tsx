'use client';

import { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

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
  const shortUrl = `${window.location.origin}/${slug}`;

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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
