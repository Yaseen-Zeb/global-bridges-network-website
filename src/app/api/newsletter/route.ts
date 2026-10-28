import { NextResponse } from "next/server";
import { newsletterSchema } from "@/features/newsletter/schema";
import { addNewsletterContact, BrevoConfigError } from "@/lib/brevo";

/**
 * POST /api/newsletter  { email, company? }
 *
 * The browser posts here (not to Brevo) so the Brevo API key never leaves the server.
 * Flow: validate → drop bots (honeypot) → add the contact to the Brevo list.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);

  if (!parsed.success) {
    // A filled honeypot means a bot: pretend it worked so it doesn't retry.
    if (body && typeof body === "object" && "company" in body && body.company) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message ?? "Please enter a valid email address." },
      { status: 400 }
    );
  }

  try {
    await addNewsletterContact(parsed.data.email);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof BrevoConfigError) {
      console.error("[/api/newsletter] Not configured:", error.message);
    } else {
      console.error("[/api/newsletter] Brevo error:", error);
    }
    return NextResponse.json(
      { success: false, error: "We couldn't sign you up right now. Please try again later." },
      { status: 502 }
    );
  }
}
