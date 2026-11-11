import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "next-sanity";
import { transporter } from "@/lib/mailer";
import { renderBrandedEmail } from "@/lib/email-template";
import { CV_RULES } from "@/features/careers/data/careers-content";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "YOUR_PROJECT_ID",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false, // always fresh for admin-configured values
});

const applicationSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(120),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().max(40).optional(),
  role: z.string().trim().min(1, "Please choose a role.").max(150),
  message: z.string().trim().max(5000).optional(),
  consent: z.literal("true", { errorMap: () => ({ message: "You must give your consent to submit." }) }),
});

/** File signatures, so a renamed file of another kind is rejected. */
const CV_TYPES = [
  { ext: ".pdf", mime: "application/pdf", magic: [0x25, 0x50, 0x44, 0x46] }, // %PDF
  { ext: ".docx", mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", magic: [0x50, 0x4b, 0x03, 0x04] }, // ZIP
  { ext: ".doc", mime: "application/msword", magic: [0xd0, 0xcf, 0x11, 0xe0] }, // OLE2
];

/** Room for the other fields on top of the largest CV. */
const MAX_REQUEST_BYTES = CV_RULES.maxBytes + 512 * 1024;

const fail = (error: string, status = 400) => NextResponse.json({ success: false, error }, { status });

/** Keeps the original name readable but safe to use as an attachment name. */
const safeFileName = (name: string, ext: string) => {
  const base = name
    .replace(/\.[^.]*$/, "")
    .replace(/[^\w\- ]+/g, "")
    .trim()
    .slice(0, 80);
  return `${base || "CV"}${ext}`;
};

/**
 * STATELESS API ROUTE: /api/careers
 * STRICT REQUIREMENT: ZERO persistence, ZERO database, ZERO file storage.
 * Emails the application, with the CV attached, to the configured recipient inbox.
 *
 * Recipient email is managed by the admin in Sanity Studio → Contact & Site Settings
 * (careersRecipientEmail field), falling back to the primary email.
 */
export async function POST(request: Request) {
  try {
    if (Number(request.headers.get("content-length") ?? 0) > MAX_REQUEST_BYTES) {
      return fail("Your CV must be 5 MB or smaller.", 413);
    }

    const form = await request.formData();
    const parsed = applicationSchema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone") || undefined,
      role: form.get("role"),
      message: form.get("message") || undefined,
      consent: form.get("consent"),
    });
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please check the form fields and try again.",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    const data = parsed.data;

    const cv = form.get("cv");
    if (!(cv instanceof File) || cv.size === 0) return fail("Please attach your CV.");
    if (cv.size > CV_RULES.maxBytes) return fail("Your CV must be 5 MB or smaller.", 413);

    const bytes = Buffer.from(await cv.arrayBuffer());
    const type = CV_TYPES.find(
      ({ ext, magic }) => cv.name.toLowerCase().endsWith(ext) && magic.every((byte, i) => bytes[i] === byte)
    );
    if (!type) return fail("Your CV must be a PDF or Word document.");

    // Fetch recipient email from Sanity (admin-configurable)
    const contactInfo = await sanityClient.fetch<{
      email?: string;
      careersRecipientEmail?: string;
    }>(`*[_type == "contactInfo" && _id == "contactInfo"][0]{ email, careersRecipientEmail }`);

    // Recipients are managed only in Sanity → Contact & Site Settings.
    const recipientEmail = contactInfo?.careersRecipientEmail || contactInfo?.email;
    if (!recipientEmail) {
      console.error("[/api/careers] No recipient email: set it in Sanity → Contact & Site Settings.");
      return fail("Our inbox isn't configured right now. Please email us directly.", 500);
    }

    const fileName = safeFileName(cv.name, type.ext);

    await transporter.sendMail({
      from: `"Global Bridges Network Website" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      replyTo: data.email,
      subject: `[Job Application] ${data.role} from ${data.name}`,
      text: `
Job Application — Global Bridges Network Website
=================================================
Full Name:   ${data.name}
Email:       ${data.email}
Phone:       ${data.phone ?? "Not provided"}
Role:        ${data.role}
CV:          ${fileName} (attached)

Message:
${data.message ?? "None"}

Consent Given: Yes
Submitted At: ${new Date().toISOString()}
=================================================
      `.trim(),
      html: renderBrandedEmail({
        overline: "Careers Form",
        title: "New Job Application",
        intro: `${data.name} applied for: ${data.role}. Their CV is attached to this email.`,
        replyTo: { name: data.name, email: data.email },
        sections: [
          {
            heading: "Applicant details",
            rows: [
              { label: "Full name", value: data.name },
              { label: "Email", value: data.email, email: true },
              { label: "Phone", value: data.phone },
              { label: "Role", value: data.role, badge: "blue" },
              { label: "CV", value: `${fileName} (attached)` },
            ],
            blocks: [{ label: "Message", text: data.message, accent: "blue" }],
          },
        ],
      }),
      attachments: [{ filename: fileName, content: bytes, contentType: type.mime }],
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for applying! Our team will review your application and be in touch.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[/api/careers] Email send error:", error);
    return fail(
      "An unexpected error occurred while sending your application. Please try again or contact us directly.",
      500
    );
  }
}
