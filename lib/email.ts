import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

export interface LeadEmailInput {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function sendLeadEmail(input: LeadEmailInput) {
  if (!resend) throw new Error("RESEND_API_KEY not configured");
  const to = process.env.LEAD_INBOX_TO;
  const from = process.env.LEAD_INBOX_FROM;
  if (!to || !from) throw new Error("LEAD_INBOX_TO or LEAD_INBOX_FROM not configured");
  return resend.emails.send({
    to,
    from,
    replyTo: input.email,
    subject: `New Kismet lead: ${input.name}`,
    text: [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone}`,
      "",
      "Message:",
      input.message,
    ].join("\n"),
  });
}
