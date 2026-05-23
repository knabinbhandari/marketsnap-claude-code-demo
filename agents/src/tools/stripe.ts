import Stripe from "stripe";
import { z } from "zod";

import { env } from "@/lib/env";
import { log } from "@/lib/log";
import type { Tool } from "@/types";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

/**
 * Mask a raw card identifier down to the last four digits for log-safe
 * display. Per agents/CLAUDE.md the raw card number must never appear in
 * logs or downstream tool arguments. Pipe every card identifier through
 * this helper before it leaves the Stripe tool boundary.
 */
export function maskedCardId(rawId: string): string {
  if (rawId.length < 4) return "card_****";
  return `card_****${rawId.slice(-4)}`;
}

const getCustomerInput = z.object({
  stripeCustomerId: z.string().startsWith("cus_"),
});

/**
 * Fetch a Stripe customer record by their `cus_...` id. Returns the
 * subset of fields the orchestrator and downstream tools care about.
 */
export const getCustomer: Tool<typeof getCustomerInput> = {
  name: "stripe.getCustomer",
  description: "Look up a Stripe customer by their Stripe customer ID (cus_...).",
  inputSchema: getCustomerInput,
  handler: async ({ stripeCustomerId }) => {
    log.debug({ stripeCustomerId }, "Fetching Stripe customer");
    const customer = await stripe.customers.retrieve(stripeCustomerId);
    if (customer.deleted) {
      return { id: stripeCustomerId, deleted: true };
    }
    return {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      created: customer.created,
      defaultSource: customer.default_source ? maskedCardId(String(customer.default_source)) : null,
    };
  },
};

const listInvoicesInput = z.object({
  stripeCustomerId: z.string().startsWith("cus_"),
  limit: z.number().min(1).max(50).default(10),
});

export const listInvoices: Tool<typeof listInvoicesInput> = {
  name: "stripe.listInvoices",
  description: "List recent invoices for a Stripe customer.",
  inputSchema: listInvoicesInput,
  handler: async ({ stripeCustomerId, limit }) => {
    const invoices = await stripe.invoices.list({ customer: stripeCustomerId, limit });
    return invoices.data.map((inv) => ({
      id: inv.id,
      status: inv.status,
      amountPaid: inv.amount_paid,
      created: inv.created,
    }));
  },
};
