import { NextResponse } from "next/server";

/**
 * New client application API abstraction.
 * Wire email/CRM delivery later. Currently validates and acknowledges receipt.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const clientName = String(body.clientName || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const country = String(body.country || "").trim();
    const applicantName = String(body.applicantName || "").trim();
    const address = String(body.address || "").trim();
    const scope = String(body.scope || "").trim();

    if (!clientName || !email || !phone || !country || !applicantName || !address || !scope) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    // TODO: Forward to CRM / email provider when configured.
    return NextResponse.json({
      ok: true,
      message:
        "Thank you. Your new client application has been received. Our team will contact you shortly regarding certification cost and next steps. For urgent requests, email info@etcert.com.",
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Unable to process your application. Please try again or email info@etcert.com.",
      },
      { status: 500 },
    );
  }
}
