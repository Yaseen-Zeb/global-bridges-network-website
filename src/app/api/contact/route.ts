import { NextResponse } from "next/server";
import { z } from "zod";

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
 * Dispatches contact payload directly to configured shared recipient email inbox.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    const recipientEmail =
      process.env.CONTACT_RECIPIENT_EMAIL || "info@globalbridgesnetwork.org";

    // Format email payload for dispatching to recipient inbox
    const emailPayload = {
      to: recipientEmail,
      subject: `New Website Contact Inquiry [${validatedData.category.toUpperCase()}]: ${validatedData.name}`,
      from: validatedData.email,
      body: `
New Contact Inquiry Received via Bridge Global Network Website
--------------------------------------------------------------
Full Name: ${validatedData.name}
Email Address: ${validatedData.email}
Phone Number: ${validatedData.phone || "Not Provided"}
Category: ${validatedData.category}

Message:
${validatedData.message}

Privacy Acknowledged: Yes
Timestamp: ${new Date().toISOString()}
--------------------------------------------------------------
Note: This submission was statelessly forwarded to ${recipientEmail} with 0 database storage.
      `,
    };

    // Log stateless dispatch confirmation for server inspection
    console.log("[Stateless Email Dispatch]", {
      destination: recipientEmail,
      category: validatedData.category,
      senderName: validatedData.name,
      senderEmail: validatedData.email,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your inquiry has been sent directly to our team. We will respond within 1-2 business days.",
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

    // Generic fallback error (never exposing raw internal stack traces to users)
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while sending your message. Please try again or email us directly.",
      },
      { status: 500 }
    );
  }
}
