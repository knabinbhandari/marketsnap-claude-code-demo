import { Resend } from "resend";
import { z } from "zod";

import { env } from "@/lib/env";
import { log } from "@/lib/log";
import type { Tool } from "@/types";

const resend = new Resend(env.RESEND_API_KEY);

const sendInput = z.object({
  to: z.string().email(),
  subject: z.string().min(1).max(200),
  body: z.string().min(1),
});

export const sendEmail: Tool<typeof sendInput> = {
  name: "email.send",
  description: "Send a transactional email to a single recipient. Subject must be specific, not generic.",
  inputSchema: sendInput,
  handler: async ({ to, subject, body }) => {
    log.info({ to, subject }, "Sending transactional email");
    const result = await resend.emails.send({
      from: env.EMAIL_FROM,
      to,
      subject,
      text: body,
    });
    if (result.error) {
      throw new Error(`Resend send failed: ${result.error.message}`);
    }
    return { id: result.data?.id ?? null, to, subject };
  },
};
