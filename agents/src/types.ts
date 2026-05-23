import type { z } from "zod";

/**
 * Tool contract used by the orchestrator registry. Every tool exports one
 * of these from its module file. See `tools/stripe.ts` for a reference
 * implementation.
 */
export type Tool<TInput extends z.ZodTypeAny = z.ZodTypeAny, TOutput = unknown> = {
  name: string;
  description: string;
  inputSchema: TInput;
  handler: (input: z.infer<TInput>) => Promise<TOutput>;
};

export type ToolResult<T = unknown> = {
  ok: true;
  data: T;
} | {
  ok: false;
  error: string;
};
