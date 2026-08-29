import { NextResponse } from "next/server";

type QuotePayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
};

/**
 * Quote API abstraction.
 * Wire email delivery later via Resend/SendGrid/Nodemailer using env vars.
 * Currently validates and acknowledges receipt without claiming email delivery.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QuotePayload;
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const service = String(body.service || "").trim();
    const message = String(body.message || "").trim();
    const company = String(body.company || "").trim();

    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    // TODO: Integrate email provider. Persist or forward:
    // { name, email, phone, company, service, message, receivedAt: new Date().toISOString() }
    void company;

    return NextResponse.json({
      ok: true,
      message:
        "Thank you. Your inquiry has been received. Our team will contact you shortly. For urgent requests, email info@etcert.com.",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to process your request. Please try again or email info@etcert.com." },
      { status: 500 },
    );
  }
}
