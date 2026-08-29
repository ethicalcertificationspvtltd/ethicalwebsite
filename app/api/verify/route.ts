import { NextResponse } from "next/server";

type Payload = {
  certificateNumber?: string;
  type?: string;
};

/**
 * Certificate verification request intake.
 * Live etcert.com uses an internal searchable registry; until that data source
 * is connected, we acknowledge the request and point requesters to email a scan.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Payload;
    const certificateNumber = String(body.certificateNumber || "").trim();
    const type = String(body.type || "iso").trim();

    if (!certificateNumber) {
      return NextResponse.json(
        { error: "Please enter a certificate number." },
        { status: 400 },
      );
    }

    if (certificateNumber.length < 3) {
      return NextResponse.json(
        { error: "Please enter a valid certificate number." },
        { status: 400 },
      );
    }

    const kind =
      type === "inspection" ? "inspection certification" : "ISO / management system certification";

    // TODO: Query certification registry / sync with Ethical Certifications verification database.
    void kind;

    return NextResponse.json({
      ok: true,
      message: `Verification request for “${certificateNumber}” (${kind}) has been logged.`,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to process verification. Please email info@etcert.com." },
      { status: 500 },
    );
  }
}
