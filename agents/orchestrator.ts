import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function runOrchestrator(input: string) {
  return client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: input }],
  });
}
