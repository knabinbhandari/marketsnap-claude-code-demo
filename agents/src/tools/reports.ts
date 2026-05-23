import { PrismaClient } from "@prisma/client";
import { z } from "zod";

import { log } from "@/lib/log";
import type { Tool } from "@/types";

const db = new PrismaClient();

const createInput = z.object({
  userId: z.string().min(1),
  title: z.string().min(1).max(120),
  prompt: z.string().min(20).max(4000),
});

export const createReport: Tool<typeof createInput> = {
  name: "reports.create",
  description: "Create a new report in PENDING state, ready for the background worker to pick up.",
  inputSchema: createInput,
  handler: async ({ userId, title, prompt }) => {
    log.info({ userId, title }, "Creating report");
    const report = await db.report.create({
      data: { userId, title, prompt, status: "PENDING" },
    });
    return { id: report.id, status: report.status };
  },
};

const summarizeInput = z.object({
  reportId: z.string().min(1),
  summary: z.string().min(1).max(8000),
});

export const completeReport: Tool<typeof summarizeInput> = {
  name: "reports.complete",
  description: "Mark a report COMPLETED with the generated summary.",
  inputSchema: summarizeInput,
  handler: async ({ reportId, summary }) => {
    const report = await db.report.update({
      where: { id: reportId },
      data: { summary, status: "COMPLETED", completedAt: new Date() },
    });
    return { id: report.id, status: report.status };
  },
};
