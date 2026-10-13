import { NextResponse } from "next/server";
import { z } from "zod";
import { transporter } from "@/lib/mailer";
import { renderBrandedEmail } from "@/lib/email-template";
import { createClient } from "next-sanity";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "YOUR_PROJECT_ID",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false, // always fresh for admin-configured values
});

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
 * Recipient email is managed by the admin in Sanity Studio → Contact & Site Settings
 * (contactRecipientEmail field), falling back to the primary email.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // Fetch recipient email from Sanity (admin-configurable)
    const contactInfo = await sanityClient.fetch<{
      email?: string;
      contactRecipientEmail?: string;
    }>(`*[_type == "contactInfo" && _id == "contactInfo"][0]{ email, contactRecipientEmail }`);

    // Recipients are managed only in Sanity → Contact & Site Settings.
    const recipientEmail = contactInfo?.contactRecipientEmail || contactInfo?.email;
    if (!recipientEmail) {
      console.error("[/api/contact] No recipient email: set it in Sanity → Contact & Site Settings.");
      return NextResponse.json(
        { success: false, error: "Our inbox isn't configured right now. Please email us directly." },
        { status: 500 }
      );
    }

    await transporter.sendMail({
      from: `"Global Bridges Network Website" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      replyTo: data.email,
      subject: `New Contact Inquiry [${data.category.toUpperCase()}] from ${data.name}`,
      text: `
New Contact Inquiry — Global Bridges Network Website
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
      html: renderBrandedEmail({
        overline: "Website Contact Form",
        title: "New Contact Inquiry",
        intro: `${data.name} sent a message through the website.`,
        replyTo: { name: data.name, email: data.email },
        sections: [
          {
            rows: [
              { label: "Full name", value: data.name },
              { label: "Email", value: data.email, email: true },
              { label: "Phone", value: data.phone },
              { label: "Category", value: data.category, badge: "blue" },
            ],
            blocks: [{ label: "Message", text: data.message, accent: "blue" }],
          },
        ],
      }),
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
