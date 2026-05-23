import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

export const reportsRouter = router({
  list: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(50).default(20) }).optional())
    .query(async ({ ctx, input }) => {
      return ctx.db.report.findMany({
        where: { userId: ctx.userId },
        orderBy: { createdAt: "desc" },
        take: input?.limit ?? 20,
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(120),
        prompt: z.string().min(20).max(4000),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.report.create({
        data: {
          userId: ctx.userId,
          title: input.title,
          prompt: input.prompt,
          status: "PENDING",
        },
      });
    }),

  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.report.findFirstOrThrow({
        where: { id: input.id, userId: ctx.userId },
      });
    }),
});
