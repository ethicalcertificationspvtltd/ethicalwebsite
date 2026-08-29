import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const company = String(body.company || "").trim();
    const email = String(body.email || "").trim();
    const relationship = String(body.relationship || "").trim();
    const nature = String(body.nature || "").trim();

    if (!company || !email || !relationship || !nature) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    // TODO: Forward to operations inbox / ticketing.
    return NextResponse.json({
      ok: true,
      message:
        "Thank you. Your complaint has been received and will be reviewed by our team.",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to submit complaint. Please email info@etcert.com." },
      { status: 500 },
    );
  }
}
