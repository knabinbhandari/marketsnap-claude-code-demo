import type { Plan, ReportStatus, SubscriptionStatus } from "@prisma/client";

export type PlanTier = Plan;
export type ReportState = ReportStatus;
export type SubState = SubscriptionStatus;

export type AgentToolCall = {
  tool: string;
  input: Record<string, unknown>;
  result?: unknown;
  durationMs?: number;
};
