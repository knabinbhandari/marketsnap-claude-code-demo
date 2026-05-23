/**
 * Stripe tool. Pulls customer data and handles payment-related lookups.
 *
 * Per agents/CLAUDE.md: never log the raw card number. Always pass card
 * identifiers through maskedCardId before they touch logs or downstream tools.
 */

export function maskedCardId(rawId: string): string {
  if (rawId.length < 4) return "card_****";
  return `card_****${rawId.slice(-4)}`;
}

export async function getCustomerByStripeId(stripeId: string) {
  // TODO: replace with real Stripe API call against the dashboard schema
  return {
    id: stripeId,
    plan: "pro",
    email: "[email protected]",
  };
}
