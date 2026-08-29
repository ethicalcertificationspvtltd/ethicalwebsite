import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const company = String(body.company || "").trim();

    if (!company) {
      return NextResponse.json(
        { error: "Please enter your company name." },
        { status: 400 },
      );
    }

    // TODO: Persist feedback metrics for service improvement reporting.
    return NextResponse.json({
      ok: true,
      message: "Thank you for your feedback. It helps us improve our certification services.",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to submit feedback. Please email info@etcert.com." },
      { status: 500 },
    );
  }
}
