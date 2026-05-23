import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { env } from "@/lib/env";
import { log } from "@/lib/log";
import { tools, toolsByName } from "@/tools";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MAIN_PROMPT_PATH = join(__dirname, "../prompts/main.md");

const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

// Per agents/CLAUDE.md: pin full version strings, never call by alias.
const MODELS = {
  orchestrator: "claude-sonnet-4-6",
  shortTool: "claude-haiku-4-5-20251001",
  longContext: "claude-opus-4-7",
} as const;

const MAX_TURNS = 12;

export async function runOrchestrator(userInput: string) {
  const systemPrompt = readFileSync(MAIN_PROMPT_PATH, "utf8");

  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: userInput },
  ];

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    const response = await client.messages.create({
      model: MODELS.orchestrator,
      max_tokens: 4096,
      system: systemPrompt,
      tools: tools.map((t) => ({
        name: t.name,
        description: t.description,
        input_schema: t.inputSchema._def as unknown as Anthropic.Tool.InputSchema,
      })),
      messages,
    });

    log.debug({ turn, stopReason: response.stop_reason }, "Orchestrator turn complete");

    if (response.stop_reason === "end_turn") {
      return response;
    }

    if (response.stop_reason === "tool_use") {
      const toolUses = response.content.filter(
        (block): block is Anthropic.ToolUseBlock => block.type === "tool_use",
      );

      messages.push({ role: "assistant", content: response.content });
      messages.push({
        role: "user",
        content: await Promise.all(
          toolUses.map(async (use) => {
            const tool = toolsByName[use.name];
            if (!tool) {
              return {
                type: "tool_result" as const,
                tool_use_id: use.id,
                content: `Unknown tool: ${use.name}`,
                is_error: true,
              };
            }
            try {
              const parsed = tool.inputSchema.parse(use.input);
              const result = await tool.handler(parsed);
              return {
                type: "tool_result" as const,
                tool_use_id: use.id,
                content: JSON.stringify(result),
              };
            } catch (err) {
              log.error({ err, tool: use.name }, "Tool execution failed");
              return {
                type: "tool_result" as const,
                tool_use_id: use.id,
                content: err instanceof Error ? err.message : String(err),
                is_error: true,
              };
            }
          }),
        ),
      });
      continue;
    }

    // Any other stop reason (max_tokens, refusal, etc) ends the loop.
    return response;
  }

  throw new Error(`Orchestrator exceeded ${MAX_TURNS} turns without resolving.`);
}
