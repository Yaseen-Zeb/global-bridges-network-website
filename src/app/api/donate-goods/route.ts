import { NextResponse } from "next/server";
import { z } from "zod";
import { transporter } from "@/lib/mailer";
import { createClient } from "next-sanity";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "YOUR_PROJECT_ID",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
}); // always fresh for admin-configured values

const goodsSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().optional(),
  itemCategory: z.string().min(1, "Please select an item category."),
  description: z.string().trim().min(10, "Item description must be at least 10 characters."),
  quantity: z.string().trim().optional(),
  condition: z.string().optional(),
  preferredContact: z.string().optional(),
  notes: z.string().trim().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge the consent statement to submit.",
  }),
});

/**
 * STATELESS API ROUTE: /api/donate-goods
 * STRICT REQUIREMENT: ZERO persistence, ZERO database, ZERO CRM storage.
 * Dispatches goods offer payload directly via SMTP to the configured recipient inbox.
 *
 * Recipient email is managed by the admin in Sanity Studio → Contact Information
 * (donateGoodsRecipientEmail field), falling back to the primary email, then env var.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = goodsSchema.parse(body);

    // Fetch recipient email from Sanity (admin-configurable)
    const contactInfo = await sanityClient.fetch<{
      email?: string;
      donateGoodsRecipientEmail?: string;
    }>(`*[_type == "contactInfo" && _id == "contactInfo"][0]{ email, donateGoodsRecipientEmail }`);

    const recipientEmail =
      contactInfo?.donateGoodsRecipientEmail ??
      contactInfo?.email ??
      process.env.DONATE_GOODS_RECIPIENT_EMAIL ??
      "donations@bridgeglobalnetwork.org";

    await transporter.sendMail({
      from: `"Bridge Global Network Website" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      replyTo: data.email,
      subject: `[Goods Donation Offer] ${data.itemCategory} from ${data.name}`,
      text: `
Goods Donation Offer — Bridge Global Network Website
=====================================================
Full Name:          ${data.name}
Email:              ${data.email}
Phone:              ${data.phone ?? "Not provided"}
Item Category:      ${data.itemCategory}
Item Description:   ${data.description}
Quantity:           ${data.quantity ?? "Not specified"}
Condition:          ${data.condition ?? "Not specified"}
Preferred Contact:  ${data.preferredContact ?? "Email"}
Additional Notes:   ${data.notes ?? "None"}

Privacy Acknowledged: Yes
Submitted At: ${new Date().toISOString()}
=====================================================
      `.trim(),
      html: `
<!DOCTYPE html>
<html lang="en">
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
  <div style="background:#0f172a;padding:24px 32px;border-radius:8px 8px 0 0;">
    <h1 style="color:#ffffff;font-size:18px;margin:0;">Goods Donation Offer</h1>
    <p style="color:#94a3b8;font-size:13px;margin:4px 0 0;">Bridge Global Network Website</p>
  </div>
  <div style="border:1px solid #e2e8f0;border-top:none;padding:24px 32px;border-radius:0 0 8px 8px;">
    <h2 style="font-size:14px;color:#64748b;text-transform:uppercase;letter-spacing:.05em;margin:0 0 12px;">Donor Details</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:8px 0;color:#64748b;width:160px;">Full Name</td><td style="padding:8px 0;font-weight:600;">${data.name}</td></tr>
      <tr><td style="padding:8px 0;color:#64748b;">Email</td><td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#2563eb;">${data.email}</a></td></tr>
      <tr><td style="padding:8px 0;color:#64748b;">Phone</td><td style="padding:8px 0;">${data.phone ?? "Not provided"}</td></tr>
      <tr><td style="padding:8px 0;color:#64748b;">Preferred Contact</td><td style="padding:8px 0;">${data.preferredContact ?? "Email"}</td></tr>
    </table>
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;"/>
    <h2 style="font-size:14px;color:#64748b;text-transform:uppercase;letter-spacing:.05em;margin:0 0 12px;">Item Details</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:8px 0;color:#64748b;width:160px;">Category</td><td style="padding:8px 0;"><span style="background:#dcfce7;color:#166534;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:600;">${data.itemCategory}</span></td></tr>
      <tr><td style="padding:8px 0;color:#64748b;">Quantity</td><td style="padding:8px 0;">${data.quantity ?? "Not specified"}</td></tr>
      <tr><td style="padding:8px 0;color:#64748b;">Condition</td><td style="padding:8px 0;">${data.condition ?? "Not specified"}</td></tr>
    </table>
    <p style="color:#64748b;font-size:13px;margin:16px 0 8px;">Description</p>
    <div style="background:#f8fafc;border-left:3px solid #16a34a;padding:12px 16px;border-radius:4px;font-size:14px;line-height:1.6;white-space:pre-wrap;">${data.description}</div>
    ${data.notes ? `
    <p style="color:#64748b;font-size:13px;margin:16px 0 8px;">Additional Notes</p>
    <div style="background:#f8fafc;border-left:3px solid #94a3b8;padding:12px 16px;border-radius:4px;font-size:14px;line-height:1.6;white-space:pre-wrap;">${data.notes}</div>
    ` : ""}
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
          "Thank you for your generous goods offer! Your details have been submitted to our team and we will reach out shortly.",
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

    console.error("[/api/donate-goods] Email send error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "An unexpected error occurred while processing your submission. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}
