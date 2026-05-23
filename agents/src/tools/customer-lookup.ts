import { PrismaClient } from "@prisma/client";
import { z } from "zod";

import { log } from "@/lib/log";
import type { Tool } from "@/types";

const db = new PrismaClient();

const lookupInput = z.object({
  email: z.string().email().optional(),
  stripeCustomerId: z.string().startsWith("cus_").optional(),
}).refine((d) => d.email || d.stripeCustomerId, {
  message: "Provide email or stripeCustomerId",
});

/**
 * Look up a customer from the dashboard schema (Postgres via Prisma).
 * Returns the user record plus their subscription if one exists.
 */
export const lookupCustomer: Tool<typeof lookupInput> = {
  name: "customer.lookup",
  description: "Find a customer in the dashboard database by email or by Stripe customer ID.",
  inputSchema: lookupInput,
  handler: async (input) => {
    log.debug({ input }, "Looking up customer");
    const user = await db.user.findFirst({
      where: input.email
        ? { email: input.email }
        : { stripeCustomerId: input.stripeCustomerId },
      include: { subscription: true },
    });
    if (!user) return { found: false };
    return {
      found: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        stripeCustomerId: user.stripeCustomerId,
        plan: user.subscription?.plan ?? "FREE",
        status: user.subscription?.status ?? null,
      },
    };
  },
};
