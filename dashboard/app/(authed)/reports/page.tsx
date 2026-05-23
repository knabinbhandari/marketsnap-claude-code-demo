import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { relativeTime } from "@/lib/utils";

// Placeholder data. Real implementation fetches via the reports tRPC router.
const recentReports = [
  {
    id: "rep_demo_1",
    title: "Which Q1 cohorts are churning?",
    status: "COMPLETED" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 35),
  },
  {
    id: "rep_demo_2",
    title: "Compare onboarding funnel: PRO vs TEAM",
    status: "RUNNING" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
        <p className="text-sm text-muted-foreground">All AI-generated reports for your account.</p>
      </header>

      <div className="space-y-3">
        {recentReports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{report.title}</CardTitle>
                <span className="text-xs uppercase text-muted-foreground">{report.status}</span>
              </div>
              <CardDescription>{relativeTime(report.createdAt)}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Click to view the full report.
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
