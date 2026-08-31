import { NextResponse } from "next/server";

import { certificateNumberValidationMessage } from "@/lib/certificate-verify";
import { searchEthicalWebClientsByCertificateNumber } from "@/lib/ethical-api";

type Payload = {
  certificateNumber?: string;
  query?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Payload;

    if (body.query && !body.certificateNumber) {
      return NextResponse.json(
        { error: "Verification is by certificate number only. Please enter the certificate number." },
        { status: 400 },
      );
    }

    const certificateNumber = String(body.certificateNumber || "").trim();
    const validationError = certificateNumberValidationMessage(certificateNumber);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const clients = await searchEthicalWebClientsByCertificateNumber(certificateNumber);

    return NextResponse.json({
      ok: true,
      clients,
      message:
        clients.length > 0
          ? `Found ${clients.length} matching record${clients.length === 1 ? "" : "s"}.`
          : "No matching certification records found for this certificate number.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to process verification. Please email info@etcert.com.",
      },
      { status: 500 },
    );
  }
}
