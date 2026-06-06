import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link2, Zap, BarChart3, Shield, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground">
              <Link2 className="size-4" />
            </div>
            <span className="text-lg font-bold tracking-tight">LinkSnap</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
              Sign in
            </Link>
            <Link href="/sign-up" className={cn(buttonVariants({ size: "sm" }))}>
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-border bg-muted text-muted-foreground text-xs font-medium">
          <Zap className="size-3 text-primary" />
          Fast, smart URL shortening
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground max-w-3xl leading-tight">
          Snap your links,{" "}
          <span className="text-primary">share them faster</span>
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
          LinkSnap turns long, messy URLs into clean vanity slugs you control.
          Track every click and share with confidence — all in one place.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/sign-up"
            className={cn(buttonVariants({ size: "lg" }), "gap-2 px-6")}
          >
            Start for free
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/sign-in"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-6")}
          >
            Sign in to dashboard
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/40 px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-12">
            Everything you need
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Link2 className="size-5" />}
              title="Vanity slugs"
              description="Pick a memorable, branded short URL instead of a random string of characters."
            />
            <FeatureCard
              icon={<BarChart3 className="size-5" />}
              title="Click analytics"
              description="See exactly how many times each link has been clicked in real time."
            />
            <FeatureCard
              icon={<Shield className="size-5" />}
              title="Secure & private"
              description="Your links are tied to your account. Only you can manage and delete them."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Link2 className="size-3" />
            <span className="font-semibold">LinkSnap</span>
          </div>
          <span>© {new Date().getFullYear()} LinkSnap. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-background p-6">
      <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
