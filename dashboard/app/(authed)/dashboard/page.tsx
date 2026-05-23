import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Pick up where you left off.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Reports this month</CardTitle>
            <CardDescription>Across all teammates.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active queries</CardTitle>
            <CardDescription>Background agent runs in flight.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">3</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credits remaining</CardTitle>
            <CardDescription>Resets on your billing date.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">487</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button>New report</Button>
        <Button variant="outline">View history</Button>
      </div>
    </div>
  );
}
