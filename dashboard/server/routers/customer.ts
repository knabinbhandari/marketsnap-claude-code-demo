import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

export const customerRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findUniqueOrThrow({
      where: { id: ctx.userId },
      include: { subscription: true },
    });
  }),

  getByStripeId: protectedProcedure
    .input(z.object({ stripeCustomerId: z.string().startsWith("cus_") }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { stripeCustomerId: input.stripeCustomerId },
        include: { subscription: true },
      });
      return user;
    }),

  updateName: protectedProcedure
    .input(z.object({ name: z.string().min(1).max(80) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: ctx.userId },
        data: { name: input.name },
      });
    }),
});
