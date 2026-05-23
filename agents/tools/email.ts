type EmailResult = {
  id: string;
  to: string;
  subject: string;
};

export async function sendEmail(
  to: string,
  subject: string,
  body: string
): Promise<EmailResult> {
  // TODO: wire to a real transactional email provider
  return { id: "msg_placeholder", to, subject };
}
