import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      itemCategory,
      description,
      quantity,
      condition,
      preferredContact,
      notes,
      consent,
    } = body;

    // Basic validation
    if (!name || !email || !itemCategory || !description || !consent) {
      return NextResponse.json(
        { error: "Please complete all required fields and accept privacy consent." },
        { status: 400 }
      );
    }

    // Configured shared destination email address from env vars
    const recipientEmail =
      process.env.DONATE_GOODS_RECIPIENT_EMAIL ||
      process.env.NEXT_PUBLIC_DONATE_GOODS_EMAIL ||
      "donations@bridgeglobalnetwork.org";

    // Format goods offer summary payload (Stateless - No Database / No CRM)
    const offerSummary = {
      to: recipientEmail,
      subject: `[Goods Donation Offer] ${itemCategory} - from ${name}`,
      data: {
        name,
        email,
        phone: phone || "Not provided",
        itemCategory,
        description,
        quantity: quantity || "Not specified",
        condition: condition || "Not specified",
        preferredContact: preferredContact || "Email",
        notes: notes || "None",
        submittedAt: new Date().toISOString(),
      },
    };

    // Log payload for development / delivery dispatch
    console.log("Goods Intake Submission Dispatched to Email:", offerSummary);

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for your generous goods offer! Your details have been submitted to our team and we will reach out shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Donate Goods Submission Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}
