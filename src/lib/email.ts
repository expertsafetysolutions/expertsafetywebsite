import { Resend } from "resend";
import { site } from "./site";

export type EnquiryPayload = {
  name: string;
  company?: string;
  phone: string;
  email: string;
  message: string;
  context?: string;
};

/**
 * Sends a new enquiry notification via Resend.
 *
 * Requires two environment variables (set in Vercel → Project → Settings →
 * Environment Variables, or in .env.local for local testing):
 *
 *   RESEND_API_KEY    — from https://resend.com/api-keys
 *   ENQUIRY_TO_EMAIL   — inbox that should receive enquiries (defaults to
 *                        the address in src/lib/site.ts if unset)
 *
 * See EMAIL-SETUP.md for the full setup walkthrough.
 *
 * If RESEND_API_KEY is not configured, this throws — the caller (the
 * /api/enquiry route) falls back to logging the enquiry server-side so local
 * development and previews without email configured don't hard-fail.
 */
export async function sendEnquiryEmail(payload: EnquiryPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const resend = new Resend(apiKey);
  const toAddress = process.env.ENQUIRY_TO_EMAIL || site.contact.email;

  const { error } = await resend.emails.send({
    // Resend's shared "onboarding@resend.dev" sender works immediately with
    // no setup; once a domain is verified in the Resend dashboard, switch
    // this to an address on that domain (e.g. enquiries@expertsafety.in) so
    // messages land in inboxes as coming from your own domain, not Resend's.
    from: process.env.ENQUIRY_FROM_EMAIL || `${site.name} Website <onboarding@resend.dev>`,
    to: toAddress,
    replyTo: payload.email,
    subject: `New enquiry — ${payload.context || "General"} — ${payload.name}`,
    text: [
      `New enquiry from ${site.name} website`,
      "",
      `Name: ${payload.name}`,
      payload.company ? `Company: ${payload.company}` : null,
      `Phone: ${payload.phone}`,
      `Email: ${payload.email}`,
      payload.context ? `Context: ${payload.context}` : null,
      "",
      "Message:",
      payload.message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}
