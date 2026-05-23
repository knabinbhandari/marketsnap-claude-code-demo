import { log } from "@/lib/log";
import { runOrchestrator } from "@/orchestrator";

async function main() {
  const userInput = process.argv.slice(2).join(" ");
  if (!userInput) {
    console.error("Usage: pnpm --filter agents start \"<your request>\"");
    process.exit(1);
  }

  log.info({ userInput }, "Starting orchestrator run");
  const response = await runOrchestrator(userInput);

  const textBlocks = response.content.filter((b) => b.type === "text");
  for (const block of textBlocks) {
    if (block.type === "text") {
      process.stdout.write(block.text + "\n");
    }
  }
}

main().catch((err) => {
  log.error({ err }, "Orchestrator failed");
  process.exit(1);
});
