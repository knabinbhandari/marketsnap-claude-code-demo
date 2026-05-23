import pino from "pino";

import { env } from "./env";

export const log = pino({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  base: { service: "agents" },
  redact: {
    // Per agents/CLAUDE.md: payment card numbers must never appear in logs.
    // Stripe IDs (cus_..., sub_...) are fine. Raw PANs are not.
    paths: ["*.cardNumber", "*.pan", "*.cvc"],
    censor: "[REDACTED]",
  },
});
