import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-semibold tracking-tight">MarketSnap</h1>
      <p className="mt-4 max-w-xl text-base text-muted-foreground">
        AI-powered customer insights for small SaaS teams. Ask a question in plain English, get a
        report grounded in your actual data.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/dashboard">
          <Button size="lg">Open dashboard</Button>
        </Link>
        <Link href="/pricing">
          <Button size="lg" variant="outline">
            See pricing
          </Button>
        </Link>
      </div>
    </main>
  );
}
