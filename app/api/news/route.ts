import { NextResponse } from "next/server";

import { fetchEthicalWebNews } from "@/lib/ethical-api";

export async function GET() {
  const items = await fetchEthicalWebNews();
  return NextResponse.json(items);
}
