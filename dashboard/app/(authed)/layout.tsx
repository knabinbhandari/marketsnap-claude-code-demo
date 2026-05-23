import { DashboardShell } from "@/components/dashboard-shell";

export default function AuthedLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
