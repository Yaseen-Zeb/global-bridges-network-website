import { NextResponse } from "next/server";
import { z } from "zod";
import { transporter } from "@/lib/mailer";
import { renderBrandedEmail } from "@/lib/email-template";
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
      "donations@globalbridgesnetwork.org";

    await transporter.sendMail({
      from: `"Global Bridges Network Website" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      replyTo: data.email,
      subject: `[Goods Donation Offer] ${data.itemCategory} from ${data.name}`,
      text: `
Goods Donation Offer — Global Bridges Network Website
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
      html: renderBrandedEmail({
        overline: "Donate Goods Form",
        title: "Goods Donation Offer",
        intro: `${data.name} would like to donate ${data.itemCategory.toLowerCase()}.`,
        replyTo: { name: data.name, email: data.email },
        sections: [
          {
            heading: "Donor details",
            rows: [
              { label: "Full name", value: data.name },
              { label: "Email", value: data.email, email: true },
              { label: "Phone", value: data.phone },
              { label: "Contact method", value: data.preferredContact ?? "Email" },
            ],
          },
          {
            heading: "Item details",
            rows: [
              { label: "Category", value: data.itemCategory, badge: "green" },
              { label: "Quantity", value: data.quantity },
              { label: "Condition", value: data.condition },
            ],
            blocks: [
              { label: "Description", text: data.description, accent: "green" },
              { label: "Additional notes", text: data.notes, accent: "muted" },
            ],
          },
        ],
      }),
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
