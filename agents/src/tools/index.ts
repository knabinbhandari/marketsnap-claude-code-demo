import type { Tool } from "@/types";

import { lookupCustomer } from "./customer-lookup";
import { sendEmail } from "./email";
import { completeReport, createReport } from "./reports";
import { getCustomer, listInvoices } from "./stripe";

/**
 * Central registry. The orchestrator iterates over `tools` to build the
 * tool list it sends to Claude. To add a new tool, define it in
 * `tools/<name>.ts` and append it here. The `add-api-route` skill at
 * `.claude/skills/add-api-route/SKILL.md` codifies this whole flow.
 */
export const tools: Tool[] = [
  getCustomer,
  listInvoices,
  lookupCustomer,
  createReport,
  completeReport,
  sendEmail,
];

export const toolsByName: Record<string, Tool> = Object.fromEntries(
  tools.map((t) => [t.name, t]),
);
