import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEnquiryEmail } from "@/lib/email";

/**
 * Enquiry submission endpoint. Sends an email via Resend (see
 * src/lib/email.ts and EMAIL-SETUP.md for configuration).
 *
 * If RESEND_API_KEY isn't set — e.g. local development without a key, or a
 * preview deploy — the enquiry is logged server-side instead of failing the
 * request outright, so the form still confirms success to the visitor.
 */

const enquirySchema = z.object({
  name: z.string().min(1).max(200),
  company: z.string().max(200).optional(),
  phone: z.string().min(1).max(50),
  email: z.string().email().max(200),
  message: z.string().min(1).max(4000),
  context: z.string().max(300).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid enquiry data" }, { status: 400 });
  }

  try {
    await sendEnquiryEmail(parsed.data);
  } catch (err) {
    // Falls back to a server log so the enquiry isn't silently lost when
    // email isn't configured (e.g. local dev, or a preview deploy).
    console.error("[enquiry] email send failed, logging instead:", err);
    console.log("[enquiry]", JSON.stringify(parsed.data));
  }

  return NextResponse.json({ ok: true });
}
