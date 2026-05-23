import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <p className="text-sm text-muted-foreground">
        Pick up where you left off.
      </p>
      <Button>New report</Button>
    </div>
  );
}
