import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export default function BillingPage() {
  // Placeholder; real implementation pulls from the customer tRPC router.
  const plan = {
    name: "PRO",
    priceCents: 4900,
    interval: "month",
    renewsOn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 18),
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
        <p className="text-sm text-muted-foreground">
          Manage your plan, invoices, and payment method.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Current plan</CardTitle>
          <CardDescription>
            {plan.name} &middot; {formatCurrency(plan.priceCents)} / {plan.interval}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Renews on {plan.renewsOn.toLocaleDateString()}.</p>
          <div className="flex gap-3">
            <Button variant="outline">Manage subscription</Button>
            <Button variant="ghost">Download invoices</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
