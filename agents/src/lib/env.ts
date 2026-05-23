import { config } from "dotenv-flow";
import { z } from "zod";

// Loaded once at module import. The root `dotenv-flow` setup picks up
// .env, .env.local, etc. New env vars belong in `.env.example` first
// (see the root CLAUDE.md for the convention).
config({ path: "../" });

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  ANTHROPIC_API_KEY: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  EMAIL_FROM: z.string().email().or(z.string().includes("<")),
  DATABASE_URL: z.string().url(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success && process.env.NODE_ENV !== "test") {
  console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment. See .env.example.");
}

export const env = parsed.success ? parsed.data : (process.env as unknown as z.infer<typeof schema>);
