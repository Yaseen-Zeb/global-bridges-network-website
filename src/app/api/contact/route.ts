import { NextResponse } from "next/server";
import { z } from "zod";
import { transporter } from "@/lib/mailer";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().optional(),
  category: z.string().min(1, "Please select an inquiry category."),
  message: z.string().trim().min(10, "Message must be at least 10 characters long."),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge the privacy consent to submit.",
  }),
});

/**
 * STATELESS API ROUTE: /api/contact
 * STRICT REQUIREMENT: ZERO persistence, ZERO database, ZERO CRM storage.
 * Dispatches contact payload directly via SMTP to the configured recipient inbox.
 *
 * Recipient is controlled by CONTACT_RECIPIENT_EMAIL in .env.local
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const recipientEmail =
      process.env.CONTACT_RECIPIENT_EMAIL ?? "info@bridgeglobalnetwork.org";

    await transporter.sendMail({
      from: `"Bridge Global Network Website" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      replyTo: data.email,
      subject: `New Contact Inquiry [${data.category.toUpperCase()}] from ${data.name}`,
      text: `
New Contact Inquiry — Bridge Global Network Website
=====================================================
Full Name:    ${data.name}
Email:        ${data.email}
Phone:        ${data.phone ?? "Not provided"}
Category:     ${data.category}

Message:
${data.message}

Privacy Acknowledged: Yes
Submitted At: ${new Date().toISOString()}
=====================================================
      `.trim(),
      html: `
<!DOCTYPE html>
<html lang="en">
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
  <div style="background:#0f172a;padding:24px 32px;border-radius:8px 8px 0 0;">
    <h1 style="color:#ffffff;font-size:18px;margin:0;">New Contact Inquiry</h1>
    <p style="color:#94a3b8;font-size:13px;margin:4px 0 0;">Bridge Global Network Website</p>
  </div>
  <div style="border:1px solid #e2e8f0;border-top:none;padding:24px 32px;border-radius:0 0 8px 8px;">
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:8px 0;color:#64748b;width:130px;">Full Name</td><td style="padding:8px 0;font-weight:600;">${data.name}</td></tr>
      <tr><td style="padding:8px 0;color:#64748b;">Email</td><td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#2563eb;">${data.email}</a></td></tr>
      <tr><td style="padding:8px 0;color:#64748b;">Phone</td><td style="padding:8px 0;">${data.phone ?? "Not provided"}</td></tr>
      <tr><td style="padding:8px 0;color:#64748b;">Category</td><td style="padding:8px 0;"><span style="background:#dbeafe;color:#1d4ed8;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:600;">${data.category.toUpperCase()}</span></td></tr>
    </table>
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;"/>
    <p style="color:#64748b;font-size:13px;margin:0 0 8px;">Message</p>
    <div style="background:#f8fafc;border-left:3px solid #2563eb;padding:12px 16px;border-radius:4px;font-size:14px;line-height:1.6;white-space:pre-wrap;">${data.message}</div>
    <p style="color:#94a3b8;font-size:11px;margin:24px 0 0;">Submitted at ${new Date().toUTCString()}</p>
  </div>
</body>
</html>
      `.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your inquiry has been sent directly to our team. We will respond within 1–2 business days.",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please check the form fields and try again.",
          fieldErrors: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    console.error("[/api/contact] Email send error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "An unexpected error occurred while sending your message. Please try again or email us directly.",
      },
      { status: 500 }
    );
  }
}
