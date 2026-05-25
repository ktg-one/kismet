import "server-only";
import { Resend } from "resend";
import { getLeadEmailEnv } from "@/lib/env";

export interface LeadEmailInput {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function sendLeadEmail(input: LeadEmailInput) {
  const { resendApiKey, leadInboxTo, leadInboxFrom } = getLeadEmailEnv();
  const resend = new Resend(resendApiKey);

  return resend.emails.send({
    to: leadInboxTo,
    from: leadInboxFrom,
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
